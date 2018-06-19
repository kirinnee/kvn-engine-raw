'use strict';

class Scene {
    constructor(id, frameArray, onEndCallback) {
        //console.log("consturctor called for id: "+id);
        if (!window.contains.call(window.sceneIDArray, id)) {
            window.sceneIDArray.push(id);
            window.scenes[id] = this;
            // console.log(window.scenes[id].id);
        } else {
            displayError("Illegal Argument Exception: ID for scene id </i>" + id + "</i> has already been used.");
        }
        this.id = id;
        this.endCB = onEndCallback;
        this.fArray = frameArray;
        this.current = -1;

    }

    //getters
    getID() {
        return this.id;
    }

    getCurrent() {
        return this.current;
    }

    getCurrentFrame() {
        return this.fArray[this.current];
    }

    play() {

        this.current = 0;
        this.fArray[0].start();
    }

    playFromFrame(frame) {

        if (frame > this.fArray.length) {
            displayError("Index out of Bound: ID for frame </i>" + id + "</i> doesn't exist in scene <i>" + this.id + "</i>");
        }
        for (var i = 0; i <= frame - 1; i++) {
            this.current = i;
            this.fArray[i].start(true);
            this.fArray[i].proceed(true);
            if (isOption) {
                var op = this.fArray[i].callBackOption();
                if (op !== null) {
                    if (op.executeCallback() === true) {
                        return;
                    }
                }
                $("#optionholder").css("display", "none");
                $(".option").remove();
                isOption = false;
            }

        }
        this.current = frame;
        this.fArray[frame].start();
    }

    hasCurrentFrameEnded() {
        if (this.current > this.fArray.length) {
            displayError("Index out of Bound: ID for frame </i>" + id + "</i> doesn't exist in scene <i>" + this.id + "</i>");
        }
        if (this.current === -1) {
            return true;
        } else {
            return this.fArray[this.current].checkIfEnded();

        }
    }

    prevFrame() {
        playScene(this.id, this.current - 1);
    }

    restart() {
        playScene(this.id, 0);
    }

    restartFrame() {
        playScene(this.id, this.current);
    }

    forceNextFrame() {
        if (this.current === this.fArray.length - 1) {
            if (this.onEnd()) {
                onClick = false;
            }
        } else {
            this.fArray[this.current].proceed(true);
            if (isOption) {
                var op = this.fArray[this.current].callBackOption();
                if (op !== null) {
                    if (op.executeCallback() === true) {
                        return;
                    }
                }
                $("#optionholder").css("display", "none");
                $(".option").remove();
                isOption = false;
            }
            this.current++;
            this.fArray[this.current].start();
        }

    }

    onClick() {
        if (this.current !== -1) {

            if (this.fArray[this.current].checkIfEnded()) {
                if (this.current === this.fArray.length - 1) {
                    if (this.onEnd()) {
                        onClick = false;
                    }
                } else {
                    this.current++;
                    if (this.fArray[this.current].start()) {
                        onClick = false;
                    }
                }
            } else {
                if (this.fArray[this.current].onClick()) {
                    onClick = false;
                } else {
                    onClick = false;
                }
            }
        }
    }

    onEnd() {
        if (this.endCB !== null && typeof this.endCB === "function") {
            this.endCB();
            return true;
        } else {
            return true;
        }
    }

}

