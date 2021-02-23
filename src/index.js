function recursiveEffect(effectsObj, keyframes, keyframesPrev, diff, j) {
    const keys = Object.keys(keyframes);

    if(keys.length == 0) {
        target = effectsObj;
        return;
    }

    keys.forEach((type) => {
        if(keyframes[type].length !== undefined) {
            if(!effectsObj[type]) {
                effectsObj[type] = [];
            }

            for(let i = 0; i < keyframes[type].length; i++) {
                let base = (keyframes[type][i] - keyframesPrev[type][i]) / diff;
                effectsObj[type][i] = keyframesPrev[type][i] + (base * j);
            }

            return;
        } else {
            if(!effectsObj[type]) {
                effectsObj[type] = {};
            }

            recursiveEffect(effectsObj[type], keyframes[type], keyframesPrev[type], diff, j);
        }
    })
}

function addTimedEffect(timeline, keyframes) {
    const frames = {};

    let start = -1;

    for (var i in keyframes) {
        frames[i] = {e: keyframes[i]};

        let end = parseInt(i, 10);

        if(start != -1) {
            let diff = end - start;

            for(let j = 1; j < diff; j++) {
                const effectsObj = {};
                
                recursiveEffect(effectsObj, keyframes[i], keyframes[start], diff, j);

                frames[start + j] = {
                    e: effectsObj
                };
            }
        }

        start = end;
    }

    for(var i in frames) {
        if(timeline[i]) {
            timeline[i].e = frames[i].e;
        } else {
            timeline[i] = frames[i];
        }
    }

    return timeline;
}

(function (PIXI, lib) {
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    PIXI.settings.ROUND_PIXELS = true;

    var MovieClip = PIXI.animate.MovieClip;
    var Container = PIXI.Container;
    var Sprite = PIXI.Sprite;
    var fromFrame = PIXI.Texture.from;
    var Graphics = PIXI.Graphics;
    var shapes = PIXI.animate.ShapesCache;

    // Filters
    PIXI.animate.filterTypes["colorMatrix"] = PIXI.filters.ColorMatrixFilter;

    // Sound
    PIXI.sound.add("HorseSound", {
        url: 'sounds/HorseSound.mp3',
        preload: true,
        loop: false,
    });

    PIXI.sound.add("sound_46", {
        url: 'sounds/sound_46.mp3',
        preload: true,
        loop: false,
    });

    PIXI.sound.add("streamsound_0", {
        url: 'sounds/streamsound_0.mp3',
        preload: true,
        loop: false,
    });

    // Functions
    function setVolume(volume) {
        PIXI.sound.volumeAll = volume;
    }

    function getx(amount) {
        return (amount * 2 / 3) + 1;
    }

    function gety(amount) {
        return ((getx(amount) - 1) * -0.5)
    }

    // Library
    lib.Vol_3 = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 4
        });
        var instance2 = new Sprite(fromFrame("Volume 3"));
        var instance1 = new Sprite(fromFrame("Volume 2"));
        var instance3 = new Sprite(fromFrame("Volume 2"));
        var instance4 = new Sprite(fromFrame("Volume 1"));
        var instance5 = new Sprite(fromFrame("Volume 0"))
            .setTransform(2, 2, 0.242, 0.242);
        this.addTimedChild(instance2, 0, 1, {
                "0": {
                    x: 2,
                    y: 2,
                    sx: 0.242,
                    sy: 0.242
                }
            })
            .addTimedChild(instance1, 0, 1, {
                "0": {
                    x: 2,
                    y: 2,
                    sx: 0.242,
                    sy: 0.242
                }
            })
            .addTimedChild(instance3, 1, 1, {
                "1": {
                    x: 2,
                    y: 2,
                    sx: 0.242,
                    sy: 0.242
                }
            })
            .addTimedChild(instance4, 2, 1, {
                "2": {
                    x: 2,
                    y: 2,
                    sx: 0.242,
                    sy: 0.242
                }
            })
            .addTimedChild(instance5, 3, 1);

        // Scale mode
        instance1.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
        instance2.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
        instance3.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
        instance4.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
        instance5.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;

        // Interactive
        this.volume = 3;
        this.buttonMode = true;
        this.interactive = true;

        this.stop();

        this.on("pointertap", () => {
            this.volume++;
            switch(this.volume) {
                case 4:
                    setVolume(0);
                    this.gotoAndStop(3);
                    this.volume = 0;
                    break;

                case 3:
                    setVolume(1);
                    this.gotoAndStop(0);
                    break;
                
                case 2:
                    setVolume(0.6);
                    this.gotoAndStop(1);
                    break;

                case 1:
                    setVolume(0.3);
                    this.gotoAndStop(2);
                    break;
            }
        });
    });

    lib.Symbol1_copy = Container.extend(function () {
        Container.call(this);
        var instance5 = new Sprite(fromFrame("Platform"))
            .setTransform(-224, -465.5);
        var instance4 = new Sprite(fromFrame("Juju"))
            .setTransform(-13.55, -399.7);
        var instance3 = new Sprite(fromFrame("JujuMask"))
            .setTransform(-21.55, -379.7);
        var instance2 = new Sprite(fromFrame("TinierClam"))
            .setTransform(13.2, -418.2, 0.862, 0.862);
        var instance1 = new Sprite(fromFrame("Tinier GT Clock"))
            .setTransform(36.9, -416.55);
        this.addChild(instance5, instance4, instance3, instance2, instance1);
    });

    lib.Symbol1 = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 30
        });
        var instance5 = new Sprite(fromFrame("Platform"));
        var instance4 = new Sprite(fromFrame("Juju"));
        var instance3 = new Sprite(fromFrame("JujuMask"));
        var instance2 = new Sprite(fromFrame("TinierClam"));
        var instance1 = new Sprite(fromFrame("Tinier GT Clock"));
        this.addTimedChild(instance5, 0, 30, {
                "0": {
                    x: -224,
                    y: -465.5
                },
                "1": {
                    x: -225
                },
                "2": {
                    x: -224
                },
                "3": {
                    x: -225
                },
                "4": {
                    x: -223
                },
                "5": {
                    x: -224
                },
                "6": {
                    x: -223
                },
                "7": {
                    x: -224
                }
            })
            .addTimedChild(instance4, 0, 30, {
                "0": {
                    x: -13.55,
                    y: -399.7
                },
                "1": {
                    x: -14.55
                },
                "2": {
                    x: -13.55
                },
                "3": {
                    x: -14.55
                },
                "4": {
                    x: -12.55
                },
                "5": {
                    x: -13.55
                },
                "6": {
                    x: -12.55
                },
                "7": {
                    x: -13.55
                }
            })
            .addTimedChild(instance3, 0, 30, {
                "0": {
                    x: -21.55,
                    y: -379.7
                },
                "1": {
                    x: -22.55
                },
                "2": {
                    x: -21.55
                },
                "3": {
                    x: -22.55
                },
                "4": {
                    x: -20.55
                },
                "5": {
                    x: -21.55
                },
                "6": {
                    x: -20.55
                },
                "7": {
                    x: -21.55
                }
            })
            .addTimedChild(instance2, 0, 30, {
                "0": {
                    x: 13.2,
                    y: -418.2,
                    sx: 0.862,
                    sy: 0.862
                },
                "1": {
                    x: 12.2
                },
                "2": {
                    x: 13.2
                },
                "3": {
                    x: 12.2
                },
                "4": {
                    x: 14.2
                },
                "5": {
                    x: 13.2
                },
                "6": {
                    x: 14.2
                },
                "7": {
                    x: 13.2
                }
            })
            .addTimedChild(instance1, 0, 30, {
                "0": {
                    x: 36.9,
                    y: -416.55
                },
                "1": {
                    x: 35.9
                },
                "2": {
                    x: 36.9
                },
                "3": {
                    x: 35.9
                },
                "4": {
                    x: 37.9
                },
                "5": {
                    x: 36.9
                },
                "6": {
                    x: 37.9
                },
                "7": {
                    x: 36.9
                }
            });
    });

    lib.Black = Container.extend(function () {
        Container.call(this);
        var instance1 = new Graphics()
            .drawCommands(shapes.S_Caliborn_Descend_PixiAnimate[0]);
        this.addChild(instance1);
    });

    lib.MaskAlone = Container.extend(function () {
        Container.call(this);
        var instance1 = new Sprite(fromFrame("JujuMask"))
            .setTransform(-18.5, -17);
        this.addChild(instance1);
    });

    lib.MaskAlone_copy = MovieClip.extend(function () {
        MovieClip.call(this, { duration: 1 });
        var instance1 = new Sprite(fromFrame("JujuMask"))
        .setTransform(-18.5, -17);
        this.addTimedChild(instance1).addTimedEffect(instance1, {
            "0": {
                colorMatrix: {
                    matrix: new Float32Array([
                        getx(-1), gety(-1), gety(-1), 0, 0,
                        gety(-1), getx(-1), gety(-1), 0, 0,
                        gety(-1), gety(-1), getx(-1), 0, 0,
                        0, 0, 0, 1, 0,
                    ])
                }
            }
        });
    });

    lib.PlatformAlone = Container.extend(function () {
        Container.call(this);
        var instance1 = new Sprite(fromFrame("Platform"))
            .setTransform(-224, -465.5);
        this.addChild(instance1);
    });

    lib.PlatformAlone_copy = MovieClip.extend(function () {
        MovieClip.call(this, { duration: 1 });
        var instance1 = new Sprite(fromFrame("Platform"))
            .setTransform(-224, -465.5);
        this.addTimedChild(instance1).addTimedEffect(instance1, {
            "0": {
                colorMatrix: {
                    matrix: new Float32Array([
                        getx(-1), gety(-1), gety(-1), 0, 0,
                        gety(-1), getx(-1), gety(-1), 0, 0,
                        gety(-1), gety(-1), getx(-1), 0, 0,
                        0, 0, 0, 1, 0,
                    ])
                }
            }
        });
    });

    lib.Symbol1_copy_3 = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 137
        });
        var instance5 = new lib.PlatformAlone();
        var instance4 = new Sprite(fromFrame("Juju"))
            .setTransform(-13.55, -399.7);
        var instance3 = new lib.MaskAlone();
        var instance2 = new Sprite(fromFrame("TinierClam"))
            .setTransform(13.2, -418.2, 0.862, 0.862);
        var instance1 = new Sprite(fromFrame("Tinier GT Clock"))
            .setTransform(36.9, -416.55);


        this.addTimedChild(instance5, 0, 137, addTimedEffect({}, {
                "0": {
                    colorMatrix: {
                        matrix: new Float32Array([
                            getx(0), gety(0), gety(0), 0, 0,
                            gety(0), getx(0), gety(0), 0, 0,
                            gety(0), gety(0), getx(0), 0, 0,
                            0, 0, 0, 1, 0,
                        ])
                    }
                },
                "78": {
                    colorMatrix: {
                        matrix: new Float32Array([
                            getx(-1), gety(-1), gety(-1), 0, 0,
                            gety(-1), getx(-1), gety(-1), 0, 0,
                            gety(-1), gety(-1), getx(-1), 0, 0,
                            0, 0, 0, 1, 0,
                        ])
                    }
                }
            }))
            .addTimedChild(instance4)
            .addTimedChild(instance3, 0, 137, addTimedEffect({
                "0": {
                    x: -3.05,
                    y: -362.7
                }
            },
            {
                "0": {
                    colorMatrix: {
                        matrix: new Float32Array([
                            getx(0), gety(0), gety(0), 0, 0,
                            gety(0), getx(0), gety(0), 0, 0,
                            gety(0), gety(0), getx(0), 0, 0,
                            0, 0, 0, 1, 0,
                        ])
                    }
                },
                "78": {
                    colorMatrix: {
                        matrix: new Float32Array([
                            getx(-1), gety(-1), gety(-1), 0, 0,
                            gety(-1), getx(-1), gety(-1), 0, 0,
                            gety(-1), gety(-1), getx(-1), 0, 0,
                            0, 0, 0, 1, 0,
                        ])
                    }
                }
            }
            ))
            .addTimedChild(instance2)
            .addTimedChild(instance1)
    });

    lib.Symbol1_copy_2 = Container.extend(function () {
        Container.call(this);
        var instance5 = new lib.PlatformAlone_copy();
        var instance4 = new Sprite(fromFrame("Juju"))
            .setTransform(-13.55, -399.7);
        var instance3 = new lib.MaskAlone_copy()
            .setTransform(-3.05, -362.7);
        var instance2 = new Sprite(fromFrame("TinierClam"))
            .setTransform(13.2, -418.2, 0.862, 0.862);
        var instance1 = new Sprite(fromFrame("Tinier GT Clock"))
            .setTransform(36.9, -416.55);
        this.addChild(instance5, instance4, instance3, instance2, instance1);
    });

    lib.Symbol_5 = Container.extend(function () {
        Container.call(this);
        var instance1 = new Sprite(fromFrame("Back button"))
            .setTransform(0, 0, 0.216, 0.217);
        this.addChild(instance1);

        // Scaling
        instance1.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
    });

    lib.Retarterest = Container.extend(function () {
        Container.call(this);
        var instance1 = new lib.Symbol_5();
        this.addChild(instance1);
    });

    lib.Restartt = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 38
        });
        this.buttonMode = true;
        this.interactive = true;
        this.on("pointertap", () => {
            scene.instance.gotoAndPlay(2);
        });
        var instance1 = new lib.Retarterest();
        this.addTimedChild(instance1, 0, 38, {
                "0": {
                    a: 0
                },
                "1": {
                    a: 0.06
                },
                "2": {
                    a: 0.13
                },
                "3": {
                    a: 0.2
                },
                "4": {
                    a: 0.26
                },
                "5": {
                    a: 0.33
                },
                "6": {
                    a: 0.4
                },
                "7": {
                    a: 0.43
                },
                "8": {
                    a: 0.46
                },
                "9": {
                    a: 0.5
                },
                "10": {
                    a: 0.53
                },
                "11": {
                    a: 0.56
                },
                "12": {
                    a: 0.6
                },
                "13": {
                    a: 0.63
                },
                "14": {
                    a: 0.66
                },
                "15": {
                    a: 0.7
                },
                "16": {
                    a: 0.73
                },
                "17": {
                    a: 0.76
                },
                "18": {
                    a: 0.8
                },
                "19": {
                    a: 0.83
                },
                "20": {
                    a: 0.86
                },
                "21": {
                    a: 0.9
                },
                "22": {
                    a: 0.87
                },
                "23": {
                    a: 0.84
                },
                "24": {
                    a: 0.81
                },
                "25": {
                    a: 0.78
                },
                "26": {
                    a: 0.75
                },
                "27": {
                    a: 0.72
                },
                "28": {
                    a: 0.69
                },
                "29": {
                    a: 0.66
                },
                "30": {
                    a: 0.63
                },
                "31": {
                    a: 0.6
                },
                "32": {
                    a: 0.57
                },
                "33": {
                    a: 0.54
                },
                "34": {
                    a: 0.51
                },
                "35": {
                    a: 0.48
                },
                "36": {
                    a: 0.45
                },
                "37": {
                    a: 0.43
                }
            })
            .addAction(function () {
                /* gotoAndPlay(7);*/
            }, 37);
    });

    var Graphic1 = MovieClip.extend(function (mode) {
        MovieClip.call(this, { mode: mode, duration: 106, loop: false });
        var instance1 = new Sprite(fromFrame("TinyHussOnAHorse"))
            .setTransform(-60, -46.5);
        this.addTimedChild(instance1);
    });

    lib.Graphic2 = Container.extend(function () {
        Container.call(this);
        var instance1 = new Sprite(fromFrame("TinyHussOnAHorse"))
            .setTransform(-60, -46.5);
        this.addChild(instance1);
    });

    lib.S_Caliborn_Descend_PixiAnimate = MovieClip.extend(function () {
        MovieClip.call(this, {
            duration: 562,
            framerate: 24
        });
        var instance81 = new lib.Restartt();
        this[instance81.name = "Restart"] = instance81;

        var instance82 = new lib.Vol_3()
            .setTransform(3, 2, 0.902, 0.902);

        var instance4 = new Sprite(fromFrame("BG"));
        var instance3 = new Sprite(fromFrame("PathBottom"));
        var instance2 = new lib.Symbol1_copy();
        var instance5 = new lib.Symbol1();
        var instance8 = new lib.Symbol1_copy();
        var instance1 = new Sprite(fromFrame("PathTop"));
        var instance7 = new lib.Black();
        var instance9 = new lib.Symbol1_copy();
        var instance10 = new lib.Symbol1_copy_3();
        var instance12 = new lib.Symbol1_copy_2();
        var instance13 = new Graphic1(MovieClip.SYNCHED);
        var instance15 = new lib.Graphic2();
        this.addTimedChild(instance4, 0, 115)
            .addTimedChild(instance3, 0, 115)
            .addTimedChild(instance2, 0, 24, {
                "0": {
                    x: 413.4,
                    y: 579.05
                }
            })
            .addTimedChild(instance5, 24, 90, {
                "24": {
                    x: 413.4,
                    y: 579.05
                },
                "32": {
                    y: 579.65
                },
                "33": {
                    y: 580.25
                },
                "34": {
                    y: 580.8
                },
                "35": {
                    y: 581.4
                },
                "36": {
                    y: 582
                },
                "37": {
                    y: 582.6
                },
                "38": {
                    y: 583.2
                },
                "39": {
                    y: 583.75
                },
                "40": {
                    y: 584.35
                },
                "41": {
                    y: 584.95
                },
                "42": {
                    y: 585.55
                },
                "43": {
                    y: 586.15
                },
                "44": {
                    y: 586.75
                },
                "45": {
                    y: 587.3
                },
                "46": {
                    y: 587.9
                },
                "47": {
                    y: 588.5
                },
                "48": {
                    y: 589.1
                },
                "49": {
                    y: 589.7
                },
                "50": {
                    y: 590.25
                },
                "51": {
                    y: 590.85
                },
                "52": {
                    y: 591.45
                },
                "53": {
                    y: 592.05
                },
                "54": {
                    y: 592.65
                },
                "55": {
                    y: 593.2
                },
                "56": {
                    y: 593.8
                },
                "57": {
                    y: 594.4
                },
                "58": {
                    y: 595
                },
                "59": {
                    y: 595.6
                },
                "60": {
                    y: 596.15
                },
                "61": {
                    y: 596.75
                },
                "62": {
                    y: 597.35
                },
                "63": {
                    y: 597.95
                },
                "64": {
                    y: 598.55
                },
                "65": {
                    y: 599.1
                },
                "66": {
                    y: 599.7
                },
                "67": {
                    y: 600.3
                },
                "68": {
                    y: 600.9
                },
                "69": {
                    y: 601.5
                },
                "70": {
                    y: 602.05
                },
                "71": {
                    y: 602.65
                },
                "72": {
                    y: 603.25
                },
                "73": {
                    y: 603.85
                },
                "74": {
                    y: 604.45
                },
                "75": {
                    y: 605.05
                },
                "76": {
                    y: 605.6
                },
                "77": {
                    y: 606.2
                },
                "78": {
                    y: 606.8
                },
                "79": {
                    y: 607.4
                },
                "80": {
                    y: 608
                },
                "81": {
                    y: 608.55
                },
                "82": {
                    y: 609.15
                },
                "83": {
                    y: 609.75
                },
                "84": {
                    y: 610.35
                },
                "85": {
                    y: 610.95
                },
                "86": {
                    y: 611.5
                },
                "87": {
                    y: 612.1
                },
                "88": {
                    y: 612.7
                },
                "89": {
                    y: 613.3
                },
                "90": {
                    y: 613.9
                },
                "91": {
                    y: 614.45
                },
                "92": {
                    y: 615.05
                },
                "93": {
                    y: 615.65
                },
                "94": {
                    y: 616.25
                },
                "95": {
                    y: 616.85
                },
                "96": {
                    y: 617.4
                },
                "97": {
                    y: 618
                },
                "98": {
                    y: 618.6
                },
                "99": {
                    y: 619.2
                },
                "100": {
                    y: 619.8
                },
                "101": {
                    y: 620.4
                },
                "102": {
                    y: 620.95
                },
                "103": {
                    y: 621.55
                },
                "104": {
                    y: 622.15
                },
                "105": {
                    y: 622.75
                },
                "106": {
                    y: 623.35
                },
                "107": {
                    y: 623.9
                },
                "108": {
                    y: 624.5
                },
                "109": {
                    y: 625.1
                },
                "110": {
                    y: 625.7
                },
                "111": {
                    y: 626.3
                },
                "112": {
                    y: 626.85
                },
                "113": {
                    y: 627.45
                }
            })
            .addTimedChild(instance8, 114, 1, {
                "114": {
                    x: 413.4,
                    y: 628.05
                }
            })
            .addTimedChild(instance1, 0, 115)
            .addTimedChild(instance7, 89, 473, {
                "89": {
                    x: 325,
                    y: 225,
                    a: 0
                },
                "90": {
                    a: 0.04
                },
                "91": {
                    a: 0.08
                },
                "92": {
                    a: 0.12
                },
                "93": {
                    a: 0.15
                },
                "94": {
                    a: 0.19
                },
                "95": {
                    a: 0.23
                },
                "96": {
                    a: 0.27
                },
                "97": {
                    a: 0.31
                },
                "98": {
                    a: 0.35
                },
                "99": {
                    a: 0.38
                },
                "100": {
                    a: 0.42
                },
                "101": {
                    a: 0.46
                },
                "102": {
                    a: 0.5
                },
                "103": {
                    a: 0.54
                },
                "104": {
                    a: 0.58
                },
                "105": {
                    a: 0.62
                },
                "106": {
                    a: 0.65
                },
                "107": {
                    a: 0.69
                },
                "108": {
                    a: 0.73
                },
                "109": {
                    a: 0.77
                },
                "110": {
                    a: 0.81
                },
                "111": {
                    a: 0.85
                },
                "112": {
                    a: 0.88
                },
                "113": {
                    a: 0.92
                },
                "114": {
                    a: 0.96
                },
                "115": {
                    a: 1
                }
            })
            .addTimedChild(instance9, 115, 165, {
                "115": {
                    x: 325,
                    y: 221.35,
                    a: 0
                },
                "116": {
                    y: 223.25,
                    a: 0.04
                },
                "117": {
                    y: 225.15,
                    a: 0.08
                },
                "118": {
                    y: 227.05,
                    a: 0.13
                },
                "119": {
                    y: 229,
                    a: 0.17
                },
                "120": {
                    y: 230.9,
                    a: 0.21
                },
                "121": {
                    y: 232.8,
                    a: 0.25
                },
                "122": {
                    y: 234.7,
                    a: 0.29
                },
                "123": {
                    y: 236.6,
                    a: 0.33
                },
                "124": {
                    y: 238.5,
                    a: 0.38
                },
                "125": {
                    y: 240.4,
                    a: 0.42
                },
                "126": {
                    y: 242.3,
                    a: 0.46
                },
                "127": {
                    y: 244.25,
                    a: 0.5
                },
                "128": {
                    y: 246.15,
                    a: 0.54
                },
                "129": {
                    y: 248.05,
                    a: 0.58
                },
                "130": {
                    y: 249.95,
                    a: 0.63
                },
                "131": {
                    y: 251.85,
                    a: 0.67
                },
                "132": {
                    y: 253.75,
                    a: 0.71
                },
                "133": {
                    y: 255.65,
                    a: 0.75
                },
                "134": {
                    y: 257.55,
                    a: 0.79
                },
                "135": {
                    y: 259.5,
                    a: 0.83
                },
                "136": {
                    y: 261.4,
                    a: 0.88
                },
                "137": {
                    y: 263.3,
                    a: 0.92
                },
                "138": {
                    y: 265.2,
                    a: 0.96
                },
                "139": {
                    y: 267.1,
                    a: 1
                },
                "140": {
                    y: 269
                },
                "141": {
                    y: 270.9
                },
                "142": {
                    y: 272.8
                },
                "143": {
                    y: 274.7
                },
                "144": {
                    y: 276.65
                },
                "145": {
                    y: 278.55
                },
                "146": {
                    y: 280.45
                },
                "147": {
                    y: 282.35
                },
                "148": {
                    y: 284.25
                },
                "149": {
                    y: 286.15
                },
                "150": {
                    y: 288.05
                },
                "151": {
                    y: 290
                },
                "152": {
                    y: 291.9
                },
                "153": {
                    y: 293.8
                },
                "154": {
                    y: 295.7
                },
                "155": {
                    y: 297.6
                },
                "156": {
                    y: 299.5
                },
                "157": {
                    y: 301.4
                },
                "158": {
                    y: 303.3
                },
                "159": {
                    y: 305.25
                },
                "160": {
                    y: 307.15
                },
                "161": {
                    y: 309.05
                },
                "162": {
                    y: 310.95
                },
                "163": {
                    y: 312.85
                },
                "164": {
                    y: 314.75
                },
                "165": {
                    y: 316.65
                },
                "166": {
                    y: 318.55
                },
                "167": {
                    y: 320.5
                },
                "168": {
                    y: 322.4
                },
                "169": {
                    y: 324.3
                },
                "170": {
                    y: 326.2
                },
                "171": {
                    y: 328.1
                },
                "172": {
                    y: 330
                },
                "173": {
                    y: 331.9
                },
                "174": {
                    y: 333.8
                },
                "175": {
                    y: 335.75
                },
                "176": {
                    y: 337.65
                },
                "177": {
                    y: 339.55
                },
                "178": {
                    y: 341.45
                },
                "179": {
                    y: 343.35
                },
                "180": {
                    y: 345.25
                },
                "181": {
                    y: 347.15
                },
                "182": {
                    y: 349.1
                },
                "183": {
                    y: 351
                },
                "184": {
                    y: 352.9
                },
                "185": {
                    y: 354.8
                },
                "186": {
                    y: 356.7
                },
                "187": {
                    y: 358.6
                },
                "188": {
                    y: 360.5
                },
                "189": {
                    y: 362.4
                },
                "190": {
                    y: 364.35
                },
                "191": {
                    y: 366.25
                },
                "192": {
                    y: 368.15
                },
                "193": {
                    y: 370.05
                },
                "194": {
                    y: 371.95
                },
                "195": {
                    y: 373.85
                },
                "196": {
                    y: 375.75
                },
                "197": {
                    y: 377.65
                },
                "198": {
                    y: 379.6
                },
                "199": {
                    y: 381.5
                },
                "200": {
                    y: 383.4
                },
                "201": {
                    y: 385.3
                },
                "202": {
                    y: 387.2
                },
                "203": {
                    y: 389.1
                },
                "204": {
                    y: 391
                },
                "205": {
                    y: 392.9
                },
                "206": {
                    y: 394.85
                },
                "207": {
                    y: 396.75
                },
                "208": {
                    y: 398.65
                },
                "209": {
                    y: 400.55
                },
                "210": {
                    y: 402.45
                },
                "211": {
                    y: 404.35
                },
                "212": {
                    y: 406.25
                },
                "213": {
                    y: 408.15
                },
                "214": {
                    y: 410.1
                },
                "215": {
                    y: 412
                },
                "216": {
                    y: 413.9
                },
                "217": {
                    y: 415.8
                },
                "218": {
                    y: 417.7
                },
                "219": {
                    y: 419.6
                },
                "220": {
                    y: 421.5
                },
                "221": {
                    y: 423.4
                },
                "222": {
                    y: 425.35
                },
                "223": {
                    y: 427.25
                },
                "224": {
                    y: 429.15
                },
                "225": {
                    y: 431.05
                },
                "226": {
                    y: 432.95
                },
                "227": {
                    y: 434.85
                },
                "228": {
                    y: 436.75
                },
                "229": {
                    y: 438.65
                },
                "230": {
                    y: 440.6
                },
                "231": {
                    y: 442.5
                },
                "232": {
                    y: 444.4
                },
                "233": {
                    y: 446.3
                },
                "234": {
                    y: 448.2
                },
                "235": {
                    y: 450.1
                },
                "236": {
                    y: 452
                },
                "237": {
                    y: 453.95
                },
                "238": {
                    y: 455.85
                },
                "239": {
                    y: 457.75
                },
                "240": {
                    y: 459.65
                },
                "241": {
                    y: 461.55
                },
                "242": {
                    y: 463.45
                },
                "243": {
                    y: 465.35
                },
                "244": {
                    y: 467.25
                },
                "245": {
                    y: 469.2
                },
                "246": {
                    y: 471.1
                },
                "247": {
                    y: 473
                },
                "248": {
                    y: 474.9
                },
                "249": {
                    y: 476.8
                },
                "250": {
                    y: 478.7
                },
                "251": {
                    y: 480.6
                },
                "252": {
                    y: 482.5
                },
                "253": {
                    y: 484.45
                },
                "254": {
                    y: 486.35
                },
                "255": {
                    y: 488.25
                },
                "256": {
                    y: 490.15
                },
                "257": {
                    y: 492.05
                },
                "258": {
                    y: 493.95
                },
                "259": {
                    y: 495.85
                },
                "260": {
                    y: 497.75
                },
                "261": {
                    y: 499.7
                },
                "262": {
                    y: 501.6
                },
                "263": {
                    y: 503.5
                },
                "264": {
                    y: 505.4
                },
                "265": {
                    y: 507.3
                },
                "266": {
                    y: 509.2
                },
                "267": {
                    y: 511.1
                },
                "268": {
                    y: 513
                },
                "269": {
                    y: 514.95
                },
                "270": {
                    y: 516.85
                },
                "271": {
                    y: 518.75
                },
                "272": {
                    y: 520.65
                },
                "273": {
                    y: 522.55
                },
                "274": {
                    y: 524.45
                },
                "275": {
                    y: 526.35
                },
                "276": {
                    y: 528.3
                },
                "277": {
                    y: 530.2
                },
                "278": {
                    y: 532.1
                },
                "279": {
                    y: 534
                }
            })
            .addTimedChild(instance10, 280, 92, {
                "280": {
                    x: 325,
                    y: 535.9
                },
                "281": {
                    y: 537.8
                },
                "282": {
                    y: 539.7
                },
                "283": {
                    y: 541.6
                },
                "284": {
                    y: 543.5
                },
                "285": {
                    y: 545.45
                },
                "286": {
                    y: 547.35
                },
                "287": {
                    y: 549.25
                },
                "288": {
                    y: 551.15
                },
                "289": {
                    y: 553.05
                },
                "290": {
                    y: 554.95
                },
                "291": {
                    y: 556.85
                },
                "292": {
                    y: 558.75
                },
                "293": {
                    y: 560.7
                },
                "294": {
                    y: 562.6
                },
                "295": {
                    y: 564.5
                },
                "296": {
                    y: 566.4
                },
                "297": {
                    y: 568.3
                },
                "298": {
                    y: 570.2
                },
                "299": {
                    y: 572.1
                },
                "300": {
                    y: 574
                },
                "301": {
                    y: 575.95
                },
                "302": {
                    y: 577.85
                },
                "303": {
                    y: 579.75
                },
                "304": {
                    y: 581.65
                },
                "305": {
                    y: 583.55
                },
                "306": {
                    y: 585.45
                },
                "307": {
                    y: 587.35
                },
                "308": {
                    y: 589.25
                },
                "309": {
                    y: 591.15
                },
                "310": {
                    y: 593.1
                },
                "311": {
                    y: 595
                },
                "312": {
                    y: 596.9
                },
                "313": {
                    y: 598.8
                },
                "314": {
                    y: 600.7
                },
                "315": {
                    y: 602.6
                },
                "316": {
                    y: 604.5
                },
                "317": {
                    y: 606.4
                },
                "318": {
                    y: 608.35
                },
                "319": {
                    y: 610.25
                },
                "320": {
                    y: 612.15
                },
                "321": {
                    y: 614.05
                },
                "322": {
                    y: 615.95
                },
                "323": {
                    y: 617.85
                },
                "324": {
                    y: 619.75
                },
                "325": {
                    y: 621.65
                },
                "326": {
                    y: 623.6
                },
                "327": {
                    y: 625.5
                },
                "328": {
                    y: 627.4
                },
                "329": {
                    y: 629.3
                },
                "330": {
                    y: 631.2
                },
                "331": {
                    y: 633.1
                },
                "332": {
                    y: 635
                },
                "333": {
                    y: 636.9
                },
                "334": {
                    y: 638.8
                },
                "335": {
                    y: 640.75
                },
                "336": {
                    y: 642.65
                },
                "337": {
                    y: 644.55
                },
                "338": {
                    y: 646.45
                },
                "339": {
                    y: 648.35
                },
                "340": {
                    y: 650.25
                },
                "341": {
                    y: 652.15
                },
                "342": {
                    y: 654.05
                },
                "343": {
                    y: 656
                },
                "344": {
                    y: 657.9
                },
                "345": {
                    y: 659.8
                },
                "346": {
                    y: 661.7
                },
                "347": {
                    y: 663.6
                },
                "348": {
                    y: 665.5
                },
                "349": {
                    y: 667.4
                },
                "350": {
                    y: 669.3
                },
                "351": {
                    y: 671.25
                },
                "352": {
                    y: 673.15
                },
                "353": {
                    y: 675.05
                },
                "354": {
                    y: 676.95
                },
                "355": {
                    y: 678.85
                },
                "356": {
                    y: 680.75
                },
                "357": {
                    y: 682.65
                },
                "358": {
                    y: 684.55
                },
                "359": {
                    y: 686.45
                },
                "360": {
                    y: 688.4
                },
                "361": {
                    y: 690.3
                },
                "362": {
                    y: 692.2
                },
                "363": {
                    y: 694.1
                },
                "364": {
                    y: 696
                },
                "365": {
                    y: 697.9
                },
                "366": {
                    y: 699.8
                },
                "367": {
                    y: 701.7
                },
                "368": {
                    y: 703.65
                },
                "369": {
                    y: 705.55
                },
                "370": {
                    y: 707.45
                },
                "371": {
                    y: 709.35
                }
            })
            .addTimedChild(instance12, 372, 190, {
                "372": {
                    x: 325,
                    y: 711.25
                },
                "373": {
                    y: 707.25
                },
                "374": {
                    y: 712.25
                },
                "375": {
                    y: 709.25
                }
            })
            .addTimedChild(instance13, 439, 106, {
                "439": {
                    x: -60,
                    y: 173
                },
                "440": {
                    x: -52.75
                },
                "441": {
                    x: -45.5
                },
                "442": {
                    x: -38.2
                },
                "443": {
                    x: -30.95
                },
                "444": {
                    x: -23.7
                },
                "445": {
                    x: -16.4
                },
                "446": {
                    x: -9.15
                },
                "447": {
                    x: -1.9
                },
                "448": {
                    x: 5.35
                },
                "449": {
                    x: 12.65
                },
                "450": {
                    x: 19.9
                },
                "451": {
                    x: 27.15
                },
                "452": {
                    x: 34.4
                },
                "453": {
                    x: 41.7
                },
                "454": {
                    x: 48.95
                },
                "455": {
                    x: 56.2
                },
                "456": {
                    x: 63.45
                },
                "457": {
                    x: 70.75
                },
                "458": {
                    x: 78
                },
                "459": {
                    x: 85.25
                },
                "460": {
                    x: 92.55
                },
                "461": {
                    x: 99.8
                },
                "462": {
                    x: 107.05
                },
                "463": {
                    x: 114.35
                },
                "464": {
                    x: 121.6
                },
                "465": {
                    x: 128.85
                },
                "466": {
                    x: 136.1
                },
                "467": {
                    x: 143.4
                },
                "468": {
                    x: 150.65
                },
                "469": {
                    x: 157.9
                },
                "470": {
                    x: 165.15
                },
                "471": {
                    x: 172.45
                },
                "472": {
                    x: 179.7
                },
                "473": {
                    x: 186.95
                },
                "474": {
                    x: 194.25
                },
                "475": {
                    x: 201.5
                },
                "476": {
                    x: 208.75
                },
                "477": {
                    x: 216
                },
                "478": {
                    x: 223.3
                },
                "479": {
                    x: 230.55
                },
                "480": {
                    x: 237.8
                },
                "481": {
                    x: 245.05
                },
                "482": {
                    x: 252.35
                },
                "483": {
                    x: 259.6
                },
                "484": {
                    x: 266.85
                },
                "485": {
                    x: 274.15
                },
                "486": {
                    x: 281.4
                },
                "487": {
                    x: 288.65
                },
                "488": {
                    x: 295.9
                },
                "489": {
                    x: 303.2
                },
                "490": {
                    x: 310.45
                },
                "491": {
                    x: 317.7
                },
                "492": {
                    x: 324.95
                },
                "493": {
                    x: 332.25
                },
                "494": {
                    x: 339.5
                },
                "495": {
                    x: 346.75
                },
                "496": {
                    x: 354.05
                },
                "497": {
                    x: 361.3
                },
                "498": {
                    x: 368.55
                },
                "499": {
                    x: 375.8
                },
                "500": {
                    x: 383.1
                },
                "501": {
                    x: 390.35
                },
                "502": {
                    x: 397.6
                },
                "503": {
                    x: 404.85
                },
                "504": {
                    x: 412.15
                },
                "505": {
                    x: 419.4
                },
                "506": {
                    x: 426.65
                },
                "507": {
                    x: 433.9
                },
                "508": {
                    x: 441.2
                },
                "509": {
                    x: 448.45
                },
                "510": {
                    x: 455.7
                },
                "511": {
                    x: 463
                },
                "512": {
                    x: 470.25
                },
                "513": {
                    x: 477.5
                },
                "514": {
                    x: 484.75
                },
                "515": {
                    x: 492.05
                },
                "516": {
                    x: 499.3
                },
                "517": {
                    x: 506.55
                },
                "518": {
                    x: 513.8
                },
                "519": {
                    x: 521.1
                },
                "520": {
                    x: 528.35
                },
                "521": {
                    x: 535.6
                },
                "522": {
                    x: 542.9
                },
                "523": {
                    x: 550.15
                },
                "524": {
                    x: 557.4
                },
                "525": {
                    x: 564.65
                },
                "526": {
                    x: 571.95
                },
                "527": {
                    x: 579.2
                },
                "528": {
                    x: 586.45
                },
                "529": {
                    x: 593.7
                },
                "530": {
                    x: 601
                },
                "531": {
                    x: 608.25
                },
                "532": {
                    x: 615.5
                },
                "533": {
                    x: 622.8
                },
                "534": {
                    x: 630.05
                },
                "535": {
                    x: 637.3
                },
                "536": {
                    x: 644.55
                },
                "537": {
                    x: 651.85
                },
                "538": {
                    x: 659.1
                },
                "539": {
                    x: 666.35
                },
                "540": {
                    x: 673.6
                },
                "541": {
                    x: 680.9
                },
                "542": {
                    x: 688.15
                },
                "543": {
                    x: 695.4
                },
                "544": {
                    x: 702.7
                }
            })
            .addTimedChild(instance15, 545, 1, {
                "545": {
                    x: 709.95,
                    y: 173
                }
            })
            .addTimedChild(instance81, 438, 198, {
                "438": {
                    x: 3,
                    y: 421.3,
                    t: "#9c9c9c"
                }
            })
            .addTimedChild(instance82)
            .addAction(function () {
                this.stop();
            }, 1)
            .addAction(function () {
                PIXI.sound.play('streamsound_0');
            }, 24)
            .addAction(function () {
                PIXI.sound.play('sound_46');
            }, 366)
            .addAction(function () {
                this.stop();
            }, 438)
            .addAction(function () {
                PIXI.sound.play('HorseSound');
            }, 439)
            .addAction(function() {
                this.stop();
            }, 545);
    });

    lib.S_Caliborn_Descend_PixiAnimate.assets = {
        "S_Caliborn_Descend_PixiAnimate": "images/S_Caliborn_Descend_PixiAnimate.shapes.json",
    };

    // Atlases
    for(let i = 0; i <= 0; i++) {
        lib.S_Caliborn_Descend_PixiAnimate.assets[`atlas-${i}`] = `images/atlas-${i}.json`;
    }
})(PIXI, lib = lib || {});
var lib;