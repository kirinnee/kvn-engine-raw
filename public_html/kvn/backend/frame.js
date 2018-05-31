'use strict';

class Frame {

    constructor(frame, optioncallback) {
        this.frameCallback = frame;
        this.checkLoop = null;
        this.optionDef = optioncallback;
        if (this.optionDef !== null && typeof this.optionDef !== "undefined") {
            if (typeof this.optionDef !== "function") {
                displayError("Illegal Constructor Argument: new Frame(frame,defOption) defOption is not a function!");
            }
        }
    }

    callBackOption() {
        if (this.optionDef !== null && typeof this.optionDef !== "undefined") {
            if (typeof this.optionDef === "function") {
                return this.optionDef();
            }
        }
        return null;

    }

    hasOptionCallBack() {
        if (this.optionDef === null || typeof this.optionDef === "undefined") {
            return false;
        } else {
            return true;
        }
    }

    start(force) {
        if (debugMode) {
            $("#sceneframe").css("display", "inline-block");
            $("#sceneframe").html("Scene <span class='red'>" + currentScene.getID() + "</span> Frame <span class='blue'>" + currentScene.getCurrent() + "</span>");
        } else {
            $("#sceneframe").css("display", "none");
        }
        if (force) {
            this.frameCallback();
            return true;
        } else {
            if (pause) {
                var f = this;
                var cI = setInterval(function () {
                    if (!pause) {
                        clearInterval(cI);
                        f.frameCallback();
                    }
                }, 10);
                return false;
            } else {
                this.frameCallback();
                return true;
            }
        }

    }

    pause() {
        if (window.activeStage !== null) {
            var stage = window.activeStage;

            stage.pause();
            var cArr = stage.getCharArray();
            for (var i = 0; i < cArr.length; i++) {
                cArr[i].pause();
            }
            stage.getTextbox().pause();
        }
    }

    resume() {
        if (window.activeStage !== null) {
            var stage = window.activeStage;

            stage.resume();

            var cArr = stage.getCharArray();
            for (var i = 0; i < cArr.length; i++) {
                cArr[i].resume();
            }
            stage.getTextbox().resume();
        }
    }

    proceed(force) {
        if (window.activeStage !== null) {
            if (!this.checkIfEnded()) {
                if (inAlert) {
                    if (force) {
                        $("#ok-button").trigger("click");
                    }
                }
                var stage = window.activeStage;
                if (!stage.proceed(force)) {
                    return false;
                }
                var cArr = stage.getCharArray();
                for (var i = 0; i < cArr.length; i++) {
                    if (!cArr[i].proceed(force)) {
                        return false;
                    }
                }
                if (!stage.getTextbox().displayfinish(force)) {
                    return false;
                }
                return this.proceed(force);
            }
        } else {
            return true;
        }

        return true;
    }

    onClick() {
        if (window.activeStage !== null) {
            return this.proceed(false);
        }
        return true;
    }

    checkIfSkippable() {
        if (window.activeStage !== null) {
            var stage = window.activeStage;
            if (!stage.isSkippable()) {
                return false;
            }
            var cArr = stage.getCharArray();
            for (var i = 0; i < cArr.length; i++) {
                if (!cArr[i].isSkippable()) {
                    return false;
                }
            }
            if (!stage.getTextbox().isSkippable()) {
                return false;
            }
            return true;
        }
        return true;
        
    }

    checkIfEnded() {
        if (window.activeStage !== null) {
            var stage = window.activeStage;
            if (stage.isAnimating()) {
                return false;
            }
            var cArr = stage.getCharArray();
            for (var i = 0; i < cArr.length; i++) {
                if (cArr[i].isAnimating()) {
                    return false;
                }
            }
            if (stage.getTextbox().isAnimating()) {
                return false;
            }

            return true;
        } else {
            return true;
        }
    }

}