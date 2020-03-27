var CSSArt = new ControlChange;
CSSArt['number'] = 58;
var RestoredModwheel = new ControlChange;
RestoredModwheel['number'] = 1;
var NewOn = new NoteOn;
var SecondNoteOn = new NoteOn;
var NewOff = new NoteOff;
var SecondNoteOff = new NoteOff;
var DelayCompensator;
var LastKnownModwheel;

function HandleMIDI(event) {
    StoreModwheel(event);
    if (event['articulationID'] == 2) {
        if (event instanceof NoteOn && event['velocity'] <= 64) {
            Relay(event, 300, 10)
        } else if (event instanceof NoteOn && event['velocity'] >= 65 && event['velocity'] <= 100) {
            Relay(event, 215, 10)
        } else if (event instanceof NoteOn && event['velocity'] >= 101) {
            Relay(event, 120, 10)
        } else if (event instanceof NoteOff) {
            Relay(event, 150, 10)
        } else {
            Relay(event, 0, 10)
        }
    } else if (event['articulationID'] == 3) {
        if (event instanceof NoteOn || event instanceof NoteOff) {
            Relay(event, 10, 10)
        } else {
            Relay(event, 0, 10)
        }
    } else if (event['articulationID'] == 12) {
        if (event instanceof NoteOn || event instanceof NoteOff) {
            Relay(event, 60, 27)
        } else {
            Relay(event, 0, 27)
        }
    } else if (event['articulationID'] == 13) {
        if (event instanceof NoteOn || event instanceof NoteOff) {
            Relay(event, 60, 24)
        } else {
            Relay(event, 0, 24)
        }
    } else if (event['articulationID'] == 14) {
        if (event instanceof NoteOn || event instanceof NoteOff) {
            Relay(event, 60, 18)
        } else {
            Relay(event, 0, 18)
        }
    } else if (event['articulationID'] == 15) {
        if (event instanceof NoteOn || event instanceof NoteOff) {
            Relay(event, 60, 14)
        } else {
            Relay(event, 0, 14)
        }
    } else if (event['articulationID'] == 16) {
        if (event instanceof NoteOn || event instanceof NoteOff) {
            Relay(event, 60, 33)
        } else {
            Relay(event, 0, 33)
        }
    } else if (event['articulationID'] == 17) {
        if (event instanceof NoteOn || event instanceof NoteOff) {
            Relay(event, 60, 37)
        } else {
            Relay(event, 0, 37)
        }
    } else if (event['articulationID'] == 18) {
        if (event instanceof NoteOn || event instanceof NoteOff) {
            Relay(event, 60, 44)
        } else {
            Relay(event, 0, 44)
        }
    } else if (event['articulationID'] == 19) {
        if (event instanceof NoteOn || event instanceof NoteOff) {
            Relay(event, 10, 53)
        } else {
            Relay(event, 0, 53)
        }
    } else if (event['articulationID'] == 20) {
        if (event instanceof NoteOn || event instanceof NoteOff) {
            Relay(event, 10, 57)
        } else {
            Relay(event, 0, 57)
        }
    } else if (event['articulationID'] == 21) {
        if (event instanceof NoteOn || event instanceof NoteOff) {
            Relay(event, 10, 63)
        } else {
            Relay(event, 0, 63)
        }
    } else if (event['articulationID'] == 22) {
        if (event instanceof NoteOn) {
            TrillRelayOn(event, 10, 1)
        } else if (event instanceof NoteOff) {
            TrillRelayOff(event, 10, 1)
        } else {
            Relay(event, 0, 48)
        }
    } else if (event['articulationID'] == 23) {
        if (event instanceof NoteOn) {
            TrillRelayOn(event, 10, 2)
        } else if (event instanceof NoteOff) {
            TrillRelayOff(event, 10, 2)
        } else {
            Relay(event, 0, 48)
        }
    } else if (event['articulationID'] == 4) {
        if (event instanceof NoteOn || event instanceof NoteOff) {
            Relay(event, 50, 67)
        } else {
            Relay(event, 0, 67)
        }
    } else if (event['articulationID'] == 5) {
        if (event instanceof NoteOn || event instanceof NoteOff) {
            Relay(event, 10, 67)
        } else {
            Relay(event, 0, 67)
        }
    } else if (event['articulationID'] == 26) {
        if (event instanceof NoteOn || event instanceof NoteOff) {
            Relay(event, 50, 73)
        } else {
            Relay(event, 0, 73)
        }
    } else if (event['articulationID'] == 27) {
        if (event instanceof NoteOn || event instanceof NoteOff) {
            Relay(event, 10, 73)
        } else {
            Relay(event, 0, 73)
        }
    } else if (event instanceof NoteOn || event instanceof NoteOff) {
    } else {
        Relay(event, 0, 0)
    }
}

function Relay(event, offset, cc58KeySwitch) {
    DelayCompensator = 500 - offset;
    if (cc58KeySwitch > 0) {
        CSSArt['value'] = cc58KeySwitch;
        CSSArt['channel'] = event['channel'];
        CSSArt['sendAfterMilliseconds'](DelayCompensator)
    };
    event['sendAfterMilliseconds'](DelayCompensator);
    RestoreModwheel(event)
}

function StoreModwheel(event) {
    if (event instanceof ControlChange && event['number'] == 1) {
        LastKnownModwheel = event['value']
    }
}

function RestoreModwheel(event) {
    if (event['articulationID'] == 2 || 3 || 19 || 20 || 21 || 22 || 4 || 5 || 22 || 23 || 26 || 27) {
        RestoredModwheel['value'] = LastKnownModwheel;
        RestoredModwheel['channel'] = event['channel'];
        RestoredModwheel['sendAfterMilliseconds'](DelayCompensator)
    }
}

function TrillRelayOn(event, offset, halfSteps) {
    DelayCompensator = 500 - offset;
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

function TrillRelayOff(event, offset, halfSteps) {
    DelayCompensator = 500 - offset;
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
