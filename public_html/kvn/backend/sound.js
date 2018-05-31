'use strict';

class GameSound {
    constructor(soundtype, source, loop) {

        if(!enableSound){
            return;
        }

        
        this.isPlaying = false;
        this.isPaused = false;

        this.soundType = soundtype;
        this.soundType.getSoundRegistered().push(this);

        this.sourceData = source;

        this.seek = -1;

        this.nIndex = window.soundCheckArray.length;
        window.soundCheckArray.push(false);
        var nI = this.nIdex;
        if (loop === null || typeof loop === "undefined") {
            loop = false;
        }
        var ele = this;

        this.promise = null;

        this.sound = new Howl({
            src: [dir + 'sound/' + source],
            html5: false, // Force to HTML5 so that the audio can stream in (best for large files).

            onload: function () {
                soundCheckArray[nI] = true;
            },

            onfade: function () {
                ele.volume = ele.sound.volume();
                ele.isFading = false;
                ele.applyVolume();
            },

            onend: function () {
                if (ele.promise !== null && typeof ele.promise === "function") {
                    ele.promise();
                }
            }

        });

        this.sound.loop(loop);

        this.volume = 1;
        this.isFading = false;
        this.registered = false;



        this.customloop = null;
    }

    register() {
        this.registered = true;
    }

    setLoop(boolean) {
        if(!enableSound){
            return;
        }
        this.sanitizeInput("boolean", boolean, false, "boolean", "setLoop");
        this.sound.loop(boolean);
    }

    play(promise) {
        if(!enableSound){
            return;
        }
        
        this.applyVolume();

        this.sanitizeInput("function", promise, function () {}, "promise", "play");

        if (!soundRegistered || !this.registered) {
            this.throwError("Incorrect Lifecycle Exception: playing sound that is not constructed under soundLoadPhase() method");
        } else {
            if (this.isPlaying && !this.isPaused) {
                this.stop();
            }
            if (this.isPaused && typeof this.seek !== "undefined" && this.seek !== -1) {
                this.sound.seek(this.seek);
            } else {
                clearInterval(this.customloop);
            }
            this.isPlaying = true;
            this.isPaused = false;
            this.sound.play();
            this.promise = promise;
        }
    }

    playFromTo(start, end, loop, promise) {
        if(!enableSound){
            return;
        }

        this.sanitizeInput("number", start, 0, "start", "playFromTo or playFromFor");
        this.sanitizeInput("number", end, null, "playFromTo or playFromFor");
        this.sanitizeInput("boolean", loop, false, "playFromTo or playFromFor");
        this.sanitizeInput("function", promise, function () {}, "playFromTo or playFromFor");

        this.play();
        this.sound.seek(start);

        var ele = this;

        this.customloop = setInterval(function () {
            if (ele.sound.seek() > end) {
                if (loop) {
                    ele.sound.seek(start);
                } else {
                    clearInterval(ele.customloop);
                    ele.stop();
                    promise();
                }
            }
        }, 10);
    }

    playFromFor(start, duration, loop, promise) {
        if(!enableSound){
            return;
        }
        this.playFromTo(start, start + duration, loop, promise);
    }

    pause() {
        if(!enableSound){
            return;
        }
        if (!soundRegistered || !this.registered) {
            this.throwError("Incorrect Lifecycle Exception: playing sound that is not constructed under soundLoadPhase() method");
        } else {
            this.seek = this.sound.seek();

            this.sound.pause();
            this.isPaused = true;
        }
    }

    stop() {
        if(!enableSound){
            return;
        }
        if (!soundRegistered || !this.registered) {
            this.throwError("Incorrect Lifecycle Exception: playing sound that is not constructed under soundLoadPhase() method");
        } else {
            clearInterval(this.customloop);
            this.isPlaying = false;
            this.isPaused = false;
            this.sound.stop();
            this.promise = null;
        }
    }

    mute() {
        if(!enableSound){
            return;
        }
        if (!soundRegistered || !this.registered) {
            this.throwError("Incorrect Lifecycle Exception: playing sound that is not constructed under soundLoadPhase() method");
        } else {
            this.sound.mute();
        }
    }

    changeVolume(vol) {
        if(!enableSound){
            return;
        }
        if (!soundRegistered || !this.registered) {
            this.throwError("Incorrect Lifecycle Exception: playing sound that is not constructed under soundLoadPhase() method");
        } else {
            this.volume = vol;
            this.applyVolume();
        }

    }

    applyVolume() {
        if(!enableSound){
            return;
        }
        if (!soundRegistered || !this.registered) {
            this.throwError("Incorrect Lifecycle Exception: playing sound that is not constructed under soundLoadPhase() method");
        } else {
            if (!this.isFading) {
                this.sound.volume(this.volume * this.soundType.getVolume());
            }
        }
    }

    fade(duration, from, to) {
if(!enableSound){
            return;
        }

        this.sanitizeInput("number", duration, 1000, "duration", "fade");
        this.sanitizeInput("number", from, 1.0, "from", "fade");
        this.sanitizeInput("number", to, 0.0, "to", "fade");


        if (!soundRegistered || !this.registered) {
            this.throwError("Incorrect Lifecycle Exception: playing sound that is not constructed under soundLoadPhase() method");
        } else {
            clearInterval(this.customloop);
            this.sound.fade(from * this.soundType.getVolume(), to * this.soundType.getVolume(), duration);
            this.isFading = true;
        }
    }

    fadeIn(duration) {
        if(!enableSound){
            return;
        }
        this.sanitizeInput("number", duration, 1000, "duration", "fadeIn");
        if (!soundRegistered || !this.registered) {
            this.throwError("Incorrect Lifecycle Exception: playing sound that is not constructed under soundLoadPhase() method");
        } else {
            clearInterval(this.customloop);
            this.sound.fade(0, 1 * this.soundType.getVolume(), duration);
            this.isFading = true;
        }
    }

    fadeOut(duration) {
        if(!enableSound){
            return;
        }
        this.sanitizeInput("number", duration, 1000, "duration", "fadeOut");
        if (!soundRegistered || !this.registered) {
            this.throwError("Incorrect Lifecycle Exception: playing sound that is not constructed under soundLoadPhase() method");
        } else {
            clearInterval(this.customloop);
            this.sound.fade(1 * this.soundType.getVolume(), 0, duration);
            this.isFading = true;
        }
    }

    rate(rate) {
        if(!enableSound){
            return;
        }
        this.sanitizeInput("number", rate, 1, "rate", "rate");
        if (!soundRegistered || !this.registered) {
            this.throwError("Incorrect Lifecycle Exception: playing sound that is not constructed under soundLoadPhase() method");
        } else {
            this.sound.rate(rate);
        }
    }

    throwError(error) {
        if(!enableSound){
            return;
        }
        displayError(error +
                "<br> Sound id: " + this.nIdex
                + "<br>Sound source: " + this.sourceData +
                "<br>Scene: " + getCurrentSceneID() +
                "<br>Frame: " + getCurrentFrame()
                );
    }

    sanitizeInput(acceptedType, input, defa, paramName, methodName) {
        if(!enableSound){
            return;
        }
        if (input === null || typeof input === "undefined") {
            input = defa;
        }
        if (input === def) {
            input = defa;
        }
        if (typeof input !== acceptedType) {
            displayError("Type Exception: '" + paramName + "' parameter in method '" + methodName + "' must be a " + acceptedType + "! " +
                    "<br>" + paramName + " input type: " + typeof input +
                    "<br>" + paramName + " input value: " + input +
                    "<br> Sound id: " + this.nIdex
                    + "<br>Sound source: " + this.sourceData +
                    "<br>Scene: " + getCurrentSceneID() +
                    "<br>Frame: " + getCurrentFrame()
                    );
        }
        return input;
    }

}
