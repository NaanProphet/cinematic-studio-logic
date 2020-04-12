// TODO: copying API from https://culturedear.wordpress.com/2015/07/23/feels-so-good-on-linnstrument-with-logic-pro-scripter/
// Would be nice to pull in real library to depend on
declare class LogicEvent {
    channel: number;
    send: () => void;
    sendAfterMilliseconds: (ms: number) => void;
    sendAtBeat: (beat: number) => void;
    sendAfterBeats: (beat: number) => void;
}

declare class ControlChange extends LogicEvent {
    number: number;
    value: number;
}

declare class NoteOn extends LogicEvent {
    pitch: number;
    velocity: number;
}

declare class NoteOff extends LogicEvent {
    pitch: number;
    velocity: number;
}

const INITIAL_DELAY_OFFSET_MS = 500;

var CSSArt = new ControlChange;
CSSArt['number'] = 58;
var RestoredModwheel = new ControlChange;
RestoredModwheel['number'] = 1;
var NewOn = new NoteOn;
var SecondNoteOn = new NoteOn;
var NewOff = new NoteOff;
var SecondNoteOff = new NoteOff;
var DelayCompensator: number;
var LastKnownModwheel: number;

type ArticulationDelayMap = {[articulationID: number]: 
    { cc58Value: number, delayOffsetMs: number, type: 'long' | 'short' }};

const thanosArticulationDelayMap: ArticulationDelayMap = {
    // Legato: SPECIAL CASE
    2: {
        cc58Value: 10,
        delayOffsetMs: 60,
        type: 'long'
    },
    // Legato Start
    3: {
        cc58Value: 10,
        delayOffsetMs: 10,
        type: 'long'
    },
    // Marcato Legato
    4: {
        cc58Value: 67,
        delayOffsetMs: 50,
        type: 'long'
    },
    // Marcato Legato Start
    5: {
        cc58Value: 67,
        delayOffsetMs: 10,
        type: 'long'
    },
    // Sforzando
    12: {
        cc58Value: 27,
        delayOffsetMs: 60,
        type: 'short'
    },
    // Staccato
    13: {
        cc58Value: 24,
        delayOffsetMs: 60,
        type: 'short'
    },
    // Staccatissimo
    14: {
        cc58Value: 18,
        delayOffsetMs: 60,
        type: 'short'
    },
    // Spiccato
    15: {
        cc58Value: 14,
        delayOffsetMs: 60,
        type: 'short'
    },
    // Pizzicato
    16: {
        cc58Value: 33,
        delayOffsetMs: 60,
        type: 'short'
    },
    // Bartok Pizzicato
    17: {
        cc58Value: 37,
        delayOffsetMs: 60,
        type: 'short'
    },
    // Con Legno Battuto
    18: {
        cc58Value: 44,
        delayOffsetMs: 60,
        type: 'short'
    },
    // Harmonics
    19: {
        cc58Value: 53,
        delayOffsetMs: 10,
        type: 'long'
    },
    // Tremolo
    20: {
        cc58Value: 57,
        delayOffsetMs: 10,
        type: 'long'
    },
    // Measured Tremolo
    21: {
        cc58Value: 63,
        delayOffsetMs: 10,
        type: 'long'
    },
    // Trill HT - SPECIAL CASE
    22: {
        cc58Value: 48,
        delayOffsetMs: 10,
        type: 'long'
    },
    // Trill WT - SPECIAL CASE
    23: {
        cc58Value: 48,
        delayOffsetMs: 10,
        type: 'long'
    },
    // Marcato Legato With Overlay
    26: {
        cc58Value: 73,
        delayOffsetMs: 50,
        type: 'long'
    },
    // Marcato Legato With Overlay (Start)
    27: {
        cc58Value: 73,
        delayOffsetMs: 10,
        type: 'long'
    }
};

function HandleMIDI(event: any) {
    StoreModwheel(event);

    const articulationId = event['articulationID'];
    const { cc58Value, delayOffsetMs } = thanosArticulationDelayMap[articulationId];

    if (articulationId === undefined || cc58Value === undefined || delayOffsetMs === undefined) {
        // If no articulation ID or no mapping for articulation ID then
        // swallow event if note or relay without delay for all other messages
        if (event instanceof NoteOn || event instanceof NoteOff) {
            return;
        } else {
            Relay(event, 0, 0);
            return;
        }
    }

    // Legato: SPECIAL CASE
    if (articulationId == 2) {
        let delayOffset = 0;
        if (event instanceof NoteOn) {
            delayOffset = determineLegatoOffset(event['velocity'])
        }
        if (event instanceof NoteOff) {
            delayOffset = 150;
        }

        Relay(event, delayOffset, cc58Value);
        return;
    }

    // Trills: SPECIAL CASE
    if (articulationId == 22 || articulationId == 23) {
        const halfSteps = articulationId == 22 ? 1 : 2;

        if (event instanceof NoteOn) {
            TrillRelayOn(event, 10, halfSteps)
        } else if (event instanceof NoteOff) {
            TrillRelayOff(event, 10, halfSteps)
        } else {
            Relay(event, 0, 48)
        }
        return;
    }

    if (event instanceof NoteOn || event instanceof NoteOff) {
        Relay(event, delayOffsetMs, cc58Value);
    } else {
        Relay(event, 0, cc58Value);
    }
}

function determineLegatoOffset(velocity: number): number {
    if (velocity <= 64) {
        return 300;
    }
    if (velocity >= 65 && velocity <= 100) {
        return 215;
    }
    return 120;
}

function Relay(event: any, offset: number, cc58KeySwitch: number) {
    DelayCompensator = INITIAL_DELAY_OFFSET_MS - offset;
    if (cc58KeySwitch > 0) {
        CSSArt['value'] = cc58KeySwitch;
        CSSArt['channel'] = event['channel'];
        CSSArt['sendAfterMilliseconds'](DelayCompensator)
    };
    event['sendAfterMilliseconds'](DelayCompensator);
    RestoreModwheel(event)
}

function StoreModwheel(event: any) {
    if (event instanceof ControlChange && event['number'] == 1) {
        LastKnownModwheel = event['value']
    }
}

function RestoreModwheel(event: any) {
    const { type } = thanosArticulationDelayMap[event['articulationID']];

    if (type === 'long') {
        RestoredModwheel['value'] = LastKnownModwheel;
        RestoredModwheel['channel'] = event['channel'];
        RestoredModwheel['sendAfterMilliseconds'](DelayCompensator)
    }
}

function TrillRelayOn(event: any, offset: number, halfSteps: number) {
    DelayCompensator = INITIAL_DELAY_OFFSET_MS - offset;
    CSSArt['value'] = 48;
    CSSArt['channel'] = event['channel'];
    CSSArt['sendAfterMilliseconds'](DelayCompensator);
    NewOn['channel'] = event['channel'];
    NewOn['velocity'] = event['velocity'];
    SecondNoteOn['channel'] = event['channel'];
    SecondNoteOn['velocity'] = event['velocity'];
    NewOn['pitch'] = event['pitch'];
    SecondNoteOn['pitch'] = event['pitch'] + halfSteps;
    NewOn['sendAfterMilliseconds'](DelayCompensator);
    SecondNoteOn['sendAfterMilliseconds'](DelayCompensator);
    RestoreModwheel(event)
}

function TrillRelayOff(event: any, offset: number, halfSteps: number) {
    DelayCompensator = INITIAL_DELAY_OFFSET_MS - offset;
    CSSArt['value'] = 48;
    CSSArt['channel'] = event['channel'];
    CSSArt['sendAfterMilliseconds'](DelayCompensator);
    NewOff['channel'] = event['channel'];
    NewOff['velocity'] = event['velocity'];
    SecondNoteOff['channel'] = event['channel'];
    SecondNoteOff['velocity'] = event['velocity'];
    NewOff['pitch'] = event['pitch'];
    SecondNoteOff['pitch'] = event['pitch'] + halfSteps;
    NewOff['sendAfterMilliseconds'](DelayCompensator);
    SecondNoteOff['sendAfterMilliseconds'](DelayCompensator);
    RestoreModwheel(event)
}
