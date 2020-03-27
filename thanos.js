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

function HandleMIDI(_0xb441xa) {
    StoreModwheel(_0xb441xa);
    if (_0xb441xa['articulationID'] == 2) {
        if (_0xb441xa instanceof NoteOn && _0xb441xa['velocity'] <= 64) {
            Relay(_0xb441xa, 300, 10)
        } else {
            if (_0xb441xa instanceof NoteOn && _0xb441xa['velocity'] >= 65 && _0xb441xa['velocity'] <= 100) {
                Relay(_0xb441xa, 215, 10)
            } else {
                if (_0xb441xa instanceof NoteOn && _0xb441xa['velocity'] >= 101) {
                    Relay(_0xb441xa, 120, 10)
                } else {
                    if (_0xb441xa instanceof NoteOff) {
                        Relay(_0xb441xa, 150, 10)
                    } else {
                        Relay(_0xb441xa, 0, 10)
                    }
                }
            }
        }
    } else {
        if (_0xb441xa['articulationID'] == 3) {
            if (_0xb441xa instanceof NoteOn || _0xb441xa instanceof NoteOff) {
                Relay(_0xb441xa, 10, 10)
            } else {
                Relay(_0xb441xa, 0, 10)
            }
        } else {
            if (_0xb441xa['articulationID'] == 12) {
                if (_0xb441xa instanceof NoteOn || _0xb441xa instanceof NoteOff) {
                    Relay(_0xb441xa, 60, 27)
                } else {
                    Relay(_0xb441xa, 0, 27)
                }
            } else {
                if (_0xb441xa['articulationID'] == 13) {
                    if (_0xb441xa instanceof NoteOn || _0xb441xa instanceof NoteOff) {
                        Relay(_0xb441xa, 60, 24)
                    } else {
                        Relay(_0xb441xa, 0, 24)
                    }
                } else {
                    if (_0xb441xa['articulationID'] == 14) {
                        if (_0xb441xa instanceof NoteOn || _0xb441xa instanceof NoteOff) {
                            Relay(_0xb441xa, 60, 18)
                        } else {
                            Relay(_0xb441xa, 0, 18)
                        }
                    } else {
                        if (_0xb441xa['articulationID'] == 15) {
                            if (_0xb441xa instanceof NoteOn || _0xb441xa instanceof NoteOff) {
                                Relay(_0xb441xa, 60, 14)
                            } else {
                                Relay(_0xb441xa, 0, 14)
                            }
                        } else {
                            if (_0xb441xa['articulationID'] == 16) {
                                if (_0xb441xa instanceof NoteOn || _0xb441xa instanceof NoteOff) {
                                    Relay(_0xb441xa, 60, 33)
                                } else {
                                    Relay(_0xb441xa, 0, 33)
                                }
                            } else {
                                if (_0xb441xa['articulationID'] == 17) {
                                    if (_0xb441xa instanceof NoteOn || _0xb441xa instanceof NoteOff) {
                                        Relay(_0xb441xa, 60, 37)
                                    } else {
                                        Relay(_0xb441xa, 0, 37)
                                    }
                                } else {
                                    if (_0xb441xa['articulationID'] == 18) {
                                        if (_0xb441xa instanceof NoteOn || _0xb441xa instanceof NoteOff) {
                                            Relay(_0xb441xa, 60, 44)
                                        } else {
                                            Relay(_0xb441xa, 0, 44)
                                        }
                                    } else {
                                        if (_0xb441xa['articulationID'] == 19) {
                                            if (_0xb441xa instanceof NoteOn || _0xb441xa instanceof NoteOff) {
                                                Relay(_0xb441xa, 10, 53)
                                            } else {
                                                Relay(_0xb441xa, 0, 53)
                                            }
                                        } else {
                                            if (_0xb441xa['articulationID'] == 20) {
                                                if (_0xb441xa instanceof NoteOn || _0xb441xa instanceof NoteOff) {
                                                    Relay(_0xb441xa, 10, 57)
                                                } else {
                                                    Relay(_0xb441xa, 0, 57)
                                                }
                                            } else {
                                                if (_0xb441xa['articulationID'] == 21) {
                                                    if (_0xb441xa instanceof NoteOn || _0xb441xa instanceof NoteOff) {
                                                        Relay(_0xb441xa, 10, 63)
                                                    } else {
                                                        Relay(_0xb441xa, 0, 63)
                                                    }
                                                } else {
                                                    if (_0xb441xa['articulationID'] == 22) {
                                                        if (_0xb441xa instanceof NoteOn) {
                                                            TrillRelayOn(_0xb441xa, 10, 1)
                                                        } else {
                                                            if (_0xb441xa instanceof NoteOff) {
                                                                TrillRelayOff(_0xb441xa, 10, 1)
                                                            } else {
                                                                Relay(_0xb441xa, 0, 48)
                                                            }
                                                        }
                                                    } else {
                                                        if (_0xb441xa['articulationID'] == 23) {
                                                            if (_0xb441xa instanceof NoteOn) {
                                                                TrillRelayOn(_0xb441xa, 10, 2)
                                                            } else {
                                                                if (_0xb441xa instanceof NoteOff) {
                                                                    TrillRelayOff(_0xb441xa, 10, 2)
                                                                } else {
                                                                    Relay(_0xb441xa, 0, 48)
                                                                }
                                                            }
                                                        } else {
                                                            if (_0xb441xa['articulationID'] == 4) {
                                                                if (_0xb441xa instanceof NoteOn || _0xb441xa instanceof NoteOff) {
                                                                    Relay(_0xb441xa, 50, 67)
                                                                } else {
                                                                    Relay(_0xb441xa, 0, 67)
                                                                }
                                                            } else {
                                                                if (_0xb441xa['articulationID'] == 5) {
                                                                    if (_0xb441xa instanceof NoteOn || _0xb441xa instanceof NoteOff) {
                                                                        Relay(_0xb441xa, 10, 67)
                                                                    } else {
                                                                        Relay(_0xb441xa, 0, 67)
                                                                    }
                                                                } else {
                                                                    if (_0xb441xa['articulationID'] == 26) {
                                                                        if (_0xb441xa instanceof NoteOn || _0xb441xa instanceof NoteOff) {
                                                                            Relay(_0xb441xa, 50, 73)
                                                                        } else {
                                                                            Relay(_0xb441xa, 0, 73)
                                                                        }
                                                                    } else {
                                                                        if (_0xb441xa['articulationID'] == 27) {
                                                                            if (_0xb441xa instanceof NoteOn || _0xb441xa instanceof NoteOff) {
                                                                                Relay(_0xb441xa, 10, 73)
                                                                            } else {
                                                                                Relay(_0xb441xa, 0, 73)
                                                                            }
                                                                        } else {
                                                                            if (_0xb441xa instanceof NoteOn || _0xb441xa instanceof NoteOff) {} else {
                                                                                Relay(_0xb441xa, 0, 0)
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function Relay(_0xb441xa, _0xb441xc, _0xb441xd) {
    DelayCompensator = 500 - _0xb441xc;
    if (_0xb441xd > 0) {
        CSSArt['value'] = _0xb441xd;
        CSSArt['channel'] = _0xb441xa['channel'];
        CSSArt['sendAfterMilliseconds'](DelayCompensator)
    };
    _0xb441xa['sendAfterMilliseconds'](DelayCompensator);
    RestoreModwheel(_0xb441xa)
}

function StoreModwheel(_0xb441xa) {
    if (_0xb441xa instanceof ControlChange && _0xb441xa['number'] == 1) {
        LastKnownModwheel = _0xb441xa['value']
    }
}

function RestoreModwheel(_0xb441xa) {
    if (_0xb441xa['articulationID'] == 2 || 3 || 19 || 20 || 21 || 22 || 4 || 5 || 22 || 23 || 26 || 27) {
        RestoredModwheel['value'] = LastKnownModwheel;
        RestoredModwheel['channel'] = _0xb441xa['channel'];
        RestoredModwheel['sendAfterMilliseconds'](DelayCompensator)
    }
}

function TrillRelayOn(_0xb441xa, _0xb441xc, _0xb441x11) {
    DelayCompensator = 500 - _0xb441xc;
    CSSArt['value'] = 48;
    CSSArt['channel'] = _0xb441xa['channel'];
    CSSArt['sendAfterMilliseconds'](DelayCompensator);
    NewOn['channel'] = _0xb441xa['channel'];
    NewOn['velocity'] = _0xb441xa['velocity'];
    SecondNoteOn['channel'] = _0xb441xa['channel'];
    SecondNoteOn['velocity'] = _0xb441xa['velocity'];
    NewOn['pitch'] = _0xb441xa['pitch'];
    SecondNoteOn['pitch'] = _0xb441xa['pitch'] + _0xb441x11;
    NewOn['sendAfterMilliseconds'](DelayCompensator);
    SecondNoteOn['sendAfterMilliseconds'](DelayCompensator);
    RestoreModwheel(_0xb441xa)
}

function TrillRelayOff(_0xb441xa, _0xb441xc, _0xb441x11) {
    DelayCompensator = 500 - _0xb441xc;
    CSSArt['value'] = 48;
    CSSArt['channel'] = _0xb441xa['channel'];
    CSSArt['sendAfterMilliseconds'](DelayCompensator);
    NewOff['channel'] = _0xb441xa['channel'];
    NewOff['velocity'] = _0xb441xa['velocity'];
    SecondNoteOff['channel'] = _0xb441xa['channel'];
    SecondNoteOff['velocity'] = _0xb441xa['velocity'];
    NewOff['pitch'] = _0xb441xa['pitch'];
    SecondNoteOff['pitch'] = _0xb441xa['pitch'] + _0xb441x11;
    NewOff['sendAfterMilliseconds'](DelayCompensator);
    SecondNoteOff['sendAfterMilliseconds'](DelayCompensator);
    RestoreModwheel(_0xb441xa)
}