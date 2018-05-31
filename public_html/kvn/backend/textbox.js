'use strict';
    
class Textbox {

    constructor() {

        this.currentName = "none";
        this.centered = false;
        this.animating = false;
        this.italic = false;
        this.bold = false;
        this.nfontsize = "1.5vw";
        this.cfontsize = "2.5vw";
        this.color = "black";
        this.cLoop = null;
        this.speed = 1;
        this.textDelay = textSpeed;
        this.skippable = true;
        this.count = 0;

        //
        this.end = null;
    }

    //setters
    setName(name) {
        this.currentName = name;
    }

    setCenter(center) {
        this.centered = center;
    }

    setUnskippable() {
        this.skippable = false;
    }

    setSize(size) {
        if (this.centered) {
            this.cfontsize = size;
        } else {
            this.nfontsize = size;
        }
    }

    setColor(color) {
        this.color = color;
    }

    setBold(bold) {
        this.bold = bold;
    }

    setItalic(i) {
        this.italic = i;
    }

    removeName() {
        this.currentName = "none";
    }

    //getters
    isAnimating() {
        return this.animating;
    }

    isSkippable() {
        return this.skippable;
    }

    getCurrentText() {
        return this.currentText;
    }

    //Methods, Abilites
    closeTextBox(promise) {
        $("#maintext").css("display", "none");
        $("#centered").css("display", "none");
        $("#top-left").css("display", "none");
        $("#nametext").css("display", "none").promise().done(function () {
            if (promise !== null && typeof promise !== "undefined") {
                if (typeof promise === "function") {
                    promise();
                } else {
                    displayError("Promise exception: promise isn't a function! <br> PromiseType : " +
                            typeof promise + "<br> Promise: " + promise);
                }
            }
        });
        this.currentText = "nulldefaulttext";
    }

    kill() {
        clearInterval(this.cLoop);
    }

    pause() {
        if (this.isAnimating()) {
            var c = "#centered span";
            var t = "#top-left span";
            var animations = TweenLite.getTweensOf([c, t]);
            for (var i = 0; i < animations.length; i++) {
                animations[i].pause();
            }
        }
    }

    resume() {
        var c = "#centered span";
        var t = "#top-left span";
        var animations = TweenLite.getTweensOf([c, t]);
        for (var i = 0; i < animations.length; i++) {
            if (animations[i].paused()) {
                animations[i].play();
            }
        }
    }

    displayfinish(force) {
        var ele = this;
        if (ele.animating) {
            if (ele.skippable || force) {
                if (this.cLoop === null || typeof this.cLoop === "undefined") {
                    var c = "#centered span";
                    var t = "#top-left span";
                    var animations = TweenLite.getTweensOf([c, t]);
                    for (var i = 0; i < animations.length; i++) {
                        animations[i].progress(1);
                    }
                } else {
                    this.end();
                }
                return this.displayfinish(force);
            } else {
                return false;
            }
        } else {
            return true;
        }
    }
    
    

    getFontSize(){
        var cfs = this.cfontsize;
        var cfsv = parseFloat(cfs.match(/^(\d+(?:\.\d+)?)(.*)$/)[1]);
        var cfsu = cfs.match(/^(\d+(?:\.\d+)?)(.*)$/)[2];
        var cfsf = (cfsv*window.kvnCurrentRatio) + cfsu;
        
        
        var nfs = this.nfontsize;
        var nfsv = parseFloat(nfs.match(/^(\d+(?:\.\d+)?)(.*)$/)[1]);
        var nfsu = nfs.match(/^(\d+(?:\.\d+)?)(.*)$/)[2];
        var nfsf = (nfsv*window.kvnCurrentRatio) + nfsu;
        
        return this.centered ? cfsf : nfsf;
    }
    
    getOFontSize(){
        return this.centered ? this.cfontsize : this.nfontsize;
    }

    fadeInText(text, promise, time, clear) {
        if (!this.animating) {

            //increment
            this.count++;

            //mark current text
            if (clear) {
                $("#centered").html("");
                $("#top-left #actual-text").html("");
                this.count = 0;
            }

            //cleani nput
            time = this.sanitizeInput("number", time, 1000, "time", "displayText in text engine");
            clear = this.sanitizeInput("boolean", clear, true, "clear", "displayText in text engine");
            text = this.sanitizeInput("string", text, "If you see this text, you probably fucked up! :> - Kirinnee", "displayText in text engine");

            this.animating = true;

            //scope pointer
            var tb = this;
            var name = this.currentName;
            var center = this.centered;

            //displays name
            var showName = this.currentName !== "none";

            //adjust box
            $("#name-text").html(showName ? name : "");
            tb.toggleToCorrect($("#nametext"), showName);

            //flag for centering
            var dEle = center ? $("#centered") : $("#top-left #actual-text");

            //obtain fontsize
            var fs = tb.getFontSize();
            var fso = tb.getOFontSize();

            //toggle transparency properly
            tb.toggleToCorrect($("#maintext"), true);
            tb.toggleToCorrect($("#centered"), center);
            tb.toggleToCorrect($("#top-left"), !center);

            //unique
            var uid = "kvn-text-engine-id-" + this.count;
            var cls = (this.italic ? "italic " : "") + (this.bold ? "bold" : "");




            //add the newest element in!
            console.log(fs());
            dEle.append("<span class='knv-th-ele " + cls + "' id='" + uid + "' style='font-size:" + tb.getFontSize() + ";color:" + this.color + ";opacity:0;' ofs='"+tb.getOFontSize()+"'>" + this.parseHTMLString(text) + "</span>");

            TweenLite.to($("#" + uid), time / 1000, {opacity: 1, immediateRender: true, onComplete: function () {
                    tb.animating = false;
                    tb.skippable = true;

                    if (typeof promise === "function") {
                        promise();
                    }

                }});

            return true;
        } else {
            return false;
        }
    }

    displayText(text, promise, time, clear) {
        if (!this.animating) {
            //clean input
            time = this.sanitizeInput("number", time, null, "time", "displayText in text engine", true);
            clear = this.sanitizeInput("boolean", clear, true, "clear", "displayText in text engine");
            text = this.sanitizeInput("string", text, "If you see this text, you probably fucked up! :> - Kirinnee", "displayText in text engine");

            //increment
            this.count++;

            //mark current text
            if (clear) {
                $("#centered").html("");
                $("#top-left #actual-text").html("");
                this.count = 0;
            }

            //interval
            var interval = this.speed * 20 / this.textDelay;
            //console.log(interval)

            //time setting
            if (time !== null && typeof time !== "undefined") {
                interval = Math.ceil(time / text.length);
            }
            //console.log(interval);

            //flag
            this.animating = true;

            //loop counter
            var c = 0;

            //scope pointer
            var tb = this;
            var name = this.currentName;
            var center = this.centered;

            //displays name
            var showName = this.currentName !== "none";

            //adjust box
            $("#name-text").html(showName ? name : "");
            tb.toggleToCorrect($("#nametext"), showName);

            //flag for centering
            var dEle = center ? $("#centered") : $("#top-left #actual-text");

            //obtain fontsize
            //toggle transparency properly
            tb.toggleToCorrect($("#maintext"), true);
            tb.toggleToCorrect($("#centered"), center);
            tb.toggleToCorrect($("#top-left"), !center);

            //looping mech
            var c = 0;

            //unique
            var uid = "kvn-text-engine-id-" + this.count;

            var cls = (this.italic ? "italic " : "") + (this.bold ? "bold" : "");
            
            //add the newest element in!
            dEle.append("<span class='knv-th-ele " + cls + "' id='" + uid + "' style='font-size:" + tb.getFontSize() + ";color:" + this.color + ";' ofs='"+tb.getOFontSize()+"'></span>");

            $("#" + uid).append(this.formatForReveal(text));

            this.end = function () {
                clearInterval(tb.cLoop);
                tb.cLoop = null;
                $("#" + uid + " .engine-char").addClass("vis").promise().done(function () {
                    tb.skippable = true;
                    tb.animating = false;
                    tb.end = null;
                    if (typeof promise === "function") {
                        promise();
                    }
                });

            };

            this.cLoop = setInterval(function () {
                if (!pause) {
                    if (c === text.length - 1) {
                        tb.end();
                    } else {
                        $("#" + uid + " .word .engine-char").eq(c).addClass("vis");
                        c++;
                    }
                }
            }, interval);
            return true;
        } else {
            return false;
        }
    }

    formatForReveal(string) {
        string += " ";
        var ret = "<span class='word'>";
        for (var i = 0; i < string.length; i++) {
            var char = string.charAt(i);
            if (char === ' ') {
                ret += "</span><span class='word'><span clas='engine-char'>&nbsp;</span></span><span class='word'>";
            } else {
                ret += "<span class='engine-char'>" + this.parseHTML(char) + "</span>";
            }
        }
        ret + "</span>";
        return ret;
    }

    parseHTMLString(string) {


        return string
                .replace(">", "&lt;")
                .replace("<", "&gt;")
                .replace("&", "&amp;")
                .replace('"', "&quot;")
                .replace("'", "&apos;")
                .replace(" ", "&nbsp;");
    }

    parseHTML(character) {
        if (character === "<") {
            return "&lt;";
        }
        if (character === ">") {
            return "&gt;";
        }
        if (character === "&") {
            return "&amp;";
        }
        if (character === '"') {
            return "&quot;";
        }
        if (character === "'") {
            return "&apos;";
        }
        if (character === " ") {
            return "&nbsp;";
        }
        return character;
    }

    toggleToCorrect(selector, display) {
        var sD = selector.css("display") === "block";

        if (display !== sD) {
            var nD = (display ? "block" : "none");
            selector.css("display", nD);
        }
    }

    throwError(errorMessage) {
        displayError(errorMessage +
                "<br> At text engine" +
                "<br> Scene: " + getCurrentSceneID() +
                "<br> Frame: " + getCurrentFrame()
                );
    }

    sanitizeInput(acceptedType, input, cdef, paramName, methodName, acceptNull) {
        if (input === null || typeof input === "undefined") {
            input = cdef;
        }
        if (input === def) {
            input = cdef;
        }
        var shortcur = true;

        if (acceptNull === true) {
            if (input === null) {
                shortcur = false;
            }
        }

        if (typeof input !== acceptedType && shortcur) {
            displayError("Type Exception: '" + paramName + "' parameter in method '" + methodName + "' must be a " + acceptedType + "! " +
                    "<br>" + paramName + " input type: " + typeof input +
                    "<br>" + paramName + " input value: " + input +
                    "<br> Scene: " + getCurrentSceneID() +
                    "<br> Frame: " + getCurrentFrame()
                    );
        }
        return input;
    }

}