'use strict';

class Stage {

    constructor(id, background, width, height, x, y, oriX, oriY) {

        if (typeof id !== "string") {
            this.typeError("id in constructor must be a string! ", id);
        }

        if (typeof background !== "string") {
            this.typeError("background image in constructor must be a string (location to image)! ", background);
        }

        if (!contains.call(stageIDArray, id)) {
            this.id = id;
            stageIDArray.push(id);
            stages[id] = this;
        } else {
            displayError("Illegal Argument Exception: Character ID for " + name + " has been used. ID: " + id);
        }

        width = this.checkNumberError("width", "constructor", width, 100);
        height = this.checkNumberError("height", "constructor", height, 100);

        x = this.checkNumberError("x", "constructor", x, 0);
        y = this.checkNumberError("y", "constructor", y, 0);

        oriX = this.checkNumberError("anchor X", "constructor", oriX, 50);
        oriY = this.checkNumberError("anchor Y", "constructor", oriY, 50);

        this.isActive = false;

        this.id = id;

        this.charArray = new Array();
        this.dcharArray = new Array();

        this.cbkgd = "def";
        this.dcbkgd = "def";


        this.bkgdArr = [];
        this.bkgdArr["default"] = background;
        this.bkgdArr["def"] = background;
        this.dbkgdArr = [];
        this.dbkgdArr["default"] = background;
        this.dbkgdArr["def"] = background;

        this.textbox = new Textbox();

        this.centered = true;
        this.cSize = "2.5vw";
        this.nSize = "1.5vw";
        this.tColor = "black";
        this.bold = false;
        this.italic = false;
        this.tName = "none";

        this.dcentered = true;
        this.dcSize = "2.5vw";
        this.dnSize = "1.5vw";
        this.dtColor = "black";
        this.dbold = false;
        this.ditalic = false;
        this.dtName = "none";

        this.dSkip = true;
        this.ddSkip = true;

        this.dGraph = linear;
        this.ddGraph = linear;

        this.opacity = 0;
        this.dopacity = 0;

        this.overlayColor = "black";
        this.doverlayColor = "black";

        this.overlayOpacity = 0;
        this.doverlayOpacity = 0;

        this.backdropColor = "black";
        this.dbackdropColor = "black";

        this.backdropOpacity = 1;
        this.dbackdropOpacity = 1;

        this.coverColor = "black";
        this.dcoverColor = "black";

        this.coverOpacity = 0;
        this.dcoverOpacity = 0;

        this.gloop = null;


        //background positioning and stuff
        this.w = width;
        this.dw = width;

        this.h = height;
        this.dh = height;

        this.oriX = oriX;
        this.doriX = oriX;

        this.oriY = oriY;
        this.doriY = oriY;

        this.x = x;
        this.dx = x;
        this.y = y;
        this.dy = y;

        //sepia and stuff
        this.vsepia = 0;
        this.dsepia = 0;
        this.vgray = 0;
        this.dgray = 0;
        this.vblur = 0;
        this.dblur = 0;
        this.vinvert = 0;
        this.dinvert = 0;

        //extra filter
        this.vcontrast = 1;
        this.dcontrast = 1;

        this.vsaturation = 1;
        this.dsaturation = 1;

        this.vbrightness = 1;
        this.dbrightness = 1;

        this.vhue = 0;
        this.dhue = 0;

        this.vrotate = 0;
        this.drotate = 0;

        this.vskewx = 0;
        this.dskewx = 0;

        this.vskewy = 0;
        this.dskewy = 0;

        this.vflipv = false;
        this.dflipv = false;

        this.vfliph = false;
        this.dfliph = false;

        /*pause engine for filter*/
        this.animationDuration = -1;
        this.animationProgress = -1;
        this.currentFilter = "penis5";
        this.finalFilter = "penis5";

        //sound integration
        this.animatingSound = new Array();

        this.customDir = null;

        //can skip?
        this.canSkip = true;

        this.waiting = new Array();

        this.completed = false;

        //hidden
        this.previousCharacter = null;

    }
    //x y calculations
    getProjectedX(x, w, ori) {
        return x - (ori / 100 * w) + ori;
    }

    getProjectedY(y, h, ori) {
        return y - (ori / 100 * h) + ori;
    }

    getRealX() {
        return this.getProjectedX(this.x, this.w, this.oriX);
    }

    getRealY() {
        return this.getProjectedY(this.y, this.h, this.oriY);
    }

    //private mtheods
    isSkippable() {
        return this.canSkip;
    }

    isAnimating() {
        var bg = "#vn-bkgd-r";
        var bd = "#vn-bkgd";
        var overlay = "#overlay";
        var cover = "#clickbox";
        var vn = "#vn-screen";
        var bgh = "#bkgd-holder";
        return TweenLite.getTweensOf([bg, bd, overlay, cover, vn, bgh]).length > 0;
    }

    pause() {
        if (this.isAnimating()) {
            var bg = "#vn-bkgd-r";
            var bd = "#vn-bkgd";
            var overlay = "#overlay";
            var cover = "#clickbox";
            var vn = "#vn-screen";
            var bgh = "#bkgd-holder";
            var animations = TweenLite.getTweensOf([bg, bd, overlay, cover, vn, bgh]);
            for (var i = 0; i < animations.length; i++) {
                animations[i].pause();
            }

            this.currentFilter = $(bg).css("filter");
            this.animationProgress = TweenLite.getTweensOf([bg])[0].progress();

            var char = this;

            $(bg).css("transition", "").promise().done(function () {
                $(bg).css("filter", char.currentFilter);
            });

        }
    }

    resume() {

        var bg = "#vn-bkgd-r";
        var bd = "#vn-bkgd";
        var overlay = "#overlay";
        var cover = "#clickbox";
        var vn = "#vn-screen";
        var bgh = "#bkgd-holder";
        var animations = TweenLite.getTweensOf([bg, bd, overlay, cover, vn, bgh]);
        for (var i = 0; i < animations.length; i++) {
            if (animations[i].paused()) {
                animations[i].play();
            }
        }


        if (this.animationDuration !== -1 && this.animationProgress !== -1 && this.currentFilter !== "penis5" && this.finalFilter !== "penis5") {

            var time = (1 - this.animationProgress) * this.animationDuration;
            var state = this.finalFilter;

            $(bg).css("transition", "filter " + time / 1000 + "s " + "linear").promise().done(function () {
                $(bg).css("filter", state);
            });
        }
    }

    proceed(force) {
        if (this.isAnimating()) {
            if (this.isSkippable() || force) {
                var bg = "#vn-bkgd-r";
                var bd = "#vn-bkgd";
                var overlay = "#overlay";
                var cover = "#clickbox";
                var vn = "#vn-screen";
                var bgh = "#bkgd-holder";
                var anim = TweenLite.getTweensOf([bg, bd, overlay, cover, vn, bgh]);
                for (var i = 0; i < anim.length; i++) {
                    anim[i].progress(1);
                }
                return this.proceed(force);
            } else {
                return false;
            }
        } else {
            return true;
        }
    }

    getCurrentBackground() {
        return this.getBackgroundPath(this.cbkgd);
    }

    getBackgroundPath(sprite) {
        var sp = this.bkgdArr[sprite];
        if (sp.charAt(0) === "/") {
            sp = sp.substring(1, sp.length);
        }
        return this.getImageDirectory() + sp;
    }

    selfReapplyFilterCSS() {
        var bg = "#vn-bkgd-r";
        var blur = "blur(" + this.vblur * 10 + "px)";
        var invert = " invert(" + this.vinvert * 100 + "%)";
        var grayscale = " grayscale(" + this.vgray * 100 + "%)";
        var sepia = " sepia(" + this.vsepia * 100 + "%)";
        var contrast = " contrast(" + this.vcontrast * 100 + "%)";
        var saturate = " saturate(" + this.vsaturation * 100 + "%)";
        var brightness = " brightness(" + this.vbrightness * 100 + "%)";
        var hue = " hue-rotate(" + this.vhue + "deg)";
        $(bg).css("transition", "").promise().done(function () {
            $(bg).css("filter", blur + invert + grayscale + sepia + contrast + saturate + brightness + hue);
        });
    }

    setCharArray(array, promise) {
        if (this.isActive) {
            var parent = $("#preoverlay");
            parent.html("");

            for (var i = 0; i < array.length; i++) {
                var char = array[i];
                parent.append(char.generateDOM());
            }
        }
        this.charArray = array;
        this.changeArrayOrder(array, promise);
    }

    changeArrayOrder(array, promise) {
        if (array.length === this.charArray.length) {
            this.charArray = array;
            if (this.isActive) {

                for (var i = 0; i < this.charArray.length; i++) {
                    var zI = i * 3;
                    var bonus = this.charArray[i].getOverlay() ? 500001 : 1;
                    var newZ = bonus + zI;
                    this.charArray[i].apply();
                    if (i === this.charArray.length - 1) {
                        this.charArray[i].getDiv().css("z-index", newZ).promise().done(function () {
                            if (promise !== null && typeof promise === "function") {
                                promise();
                            }
                        });
                    } else {
                        this.charArray[i].getDiv().css("z-index", newZ);
                    }
                }
            } else {
                if (promise !== null && typeof promise === "function") {
                    promise();
                }
            }

        }
    }

    hdisplay(backgroundOpacity, backdropOpacity, time, promise, swing, skippable) {
        window.activeStage = this;
        this.isActive = true;
        var s = this;
        var pArr = [];
        $(".bkgd-sprite-kvn").remove().promise().done(function () {
            for (var k in s.bkgdArr) {
                if (jom.string(k) && jom.string(s.bkgdArr[k])) {
                    k = k.trim();
                    var bkgd = s.getBackgroundPath(k);
                    var uuid = s.getBackgroundID(k);
                    var img = jom.img(bkgd, uuid, "bkgd-sprite-kvn");
                    if (k === "def") {
                        img.css('visibility', 'visible');
                    }
                    pArr.push($("#vn-bkgd-r").prepend(img).promise());
                }

            }
        });

                    s.animate(0, function () {
                        s.setOpacity(backgroundOpacity);
                        s.setBackdropOpacity(backdropOpacity);
                        s.animate(time, promise, swing, skippable);
                        s.setCharArray(s.charArray);
                    }, swing, skippable);

    }

    getImageDirectory() {
        if (this.customDir === null || typeof this.customDir !== "string") {
            return dir + "images/bkgd/";
        } else {
            var cd = this.customDir;
            if (cd.charAt(cd.length - 1) !== "/") {
                cd += "/";
            }
            return cd;
        }
    }

    getBackgroundID(background) {
        return "kvn-engine-background-id-for-" + this.id.trim() + "-sprite-" + background;
    }

    //globals
    display(bkgdAlpha, bkdpAlpha, time, promise, swing, skippable) {
        var s = this;
        bkgdAlpha = this.sanitizeInput("number", bkgdAlpha, 1, 1, "time", "unDsiplay");
        bkdpAlpha = this.sanitizeInput("number", bkdpAlpha, 1, 1, "time", "unDsiplay");
        if (window.activeStage !== null) {
            window.activeStage.unDisplay(time, promise, swing, skippable, false, this, bkgdAlpha, bkdpAlpha);

        } else {
            this.hdisplay(bkgdAlpha, bkdpAlpha, time, promise, swing, skippable);
        }
    }

    unDisplay(time, promise, swing, skippable, offBackDrop, nStage, bkgdA, bkdpA) {
        if (!this.completed) {
            this.throwError("Object Construction Exception: Stage object construction not completed. Call .complete() to complete the construction of the stage.");
        }
        time = this.sanitizeInput("number", time, 0, 1000, "time", "unDsiplay");

        if (offBackDrop === null || typeof offBackDrop === "undefined" || offBackDrop === def) {
            offBackDrop = false;
        }

        if (this.isActive) {

            var hT = time;
            if (typeof nStage !== "undefined") {
                hT = time / 2;
            }

            var s = this;

            if (offBackDrop) {
                this.setBackdropOpacity(0);
            }
            this.setOverlayOpacity(0);
            this.setOpacity(0);
            this.setCoverOpacity(0);
            this.animate(hT, function () {
                window.activeStage.closeTextBox(function () {
                    window.activeStage = null;
                    s.isActive = false;
                    if (typeof nStage !== "undefined") {
                        nStage.hdisplay(bkgdA, bkdpA, hT, promise, swing, skippable);
                    } else {
                        if (promise !== null && typeof promise !== "undefined") {
                            if (typeof promise === "function") {
                                promise();
                            } else {
                                s.typeError("Promise must be a function for method 'display' ", promise);
                            }
                        }
                    }
                });

            }, swing, skippable);
        }
    }

    bringCharacter(char, promise) {
        if (!this.completed) {
            this.throwError("Object Construction Exception: Stage object construction not completed. Call .complete() to complete the construction of the stage. ");
        }

        if (!contains.call(this.charArray, char)) {
            if (char.getStage() !== null) {
                char.getStage().removeCharacter(char);
            }
            char.setStage(this);

            $("#preoverlay").append(char.generateDOM());
            this.charArray.push(char);
            this.changeArrayOrder(this.charArray, promise);
        }
        return this;
    }

    removeCharacter(char, promise) {
        if (!this.completed) {
            this.throwError("Object Construction Exception: Stage object construction not completed. Call .complete() to complete the construction of the stage. ");
        }

        if (contains.call(this.charArray, char)) {
            for (var i = this.charArray.length - 1; i >= 0; i--) {
                if (this.charArray[i] === char) {
                    this.charArray.splice(i, 1);
                    char.setStage(null);
                }
            }
            char.getDiv().remove();
            this.charArray.push(char);
            this.changeArrayOrder(this.charArray, promise);
        }
    }

    //getters
    getCharArray() {
        return this.charArray;
    }

    getTextbox() {
        return this.textbox;
    }

    getID() {
        return this.id;
    }

    //Setters
    resetValues() {
        this.charArray = this.dcharArray.slice();
        this.cbkgd = this.dcbkgd;
        this.bkgdArr = clone(this.dbkgdArr);
        this.centered = this.dcentered;
        this.cSize = this.dcSize;
        this.nSize = this.dnSize;
        this.tColor = this.dtColor;
        this.bold = this.dbold;
        this.italic = this.ditalic;
        this.tName = this.dtName;
        this.dSkip = this.ddSkip;
        this.dGraph = this.ddGraph;
        this.opacity = this.dopacity;
        this.overlayColor = this.doverlayColor;
        this.overlayOpacity = this.doverlayOpacity;
        this.backdropColor = this.dbackdropColor;
        this.backdropOpacity = this.dbackdropOpacity;
        this.coverColor = this.dcoverColor;
        this.coverOpacity = this.dcoverOpacity;
        this.vinvert = this.dinvert;
        this.vblur = this.dblur;
        this.vgray = this.dgray;
        this.vsepia = this.dsepia;
        this.vcontrast = this.dcontrast;
        this.vsaturation = this.dsaturation;
        this.vbrightness = this.dbrightness;
        this.vhue = this.dhue;
        this.vrotate = this.drotate;
        this.vskewx = this.dskewx;
        this.vskewy = this.dskewy;
        this.vflipv = this.dflipv;
        this.vfliph = this.dfliph;

        this.animationDuration = 0;
        this.animationProgress = 0;
        this.currentFilter = "";
        this.finalFilter = "";

        this.animatingSound = new Array();

        this.previousCharacter = null;

        this.fix();

        this.textbox.kill();

        this.textbox = new Textbox();

    }

    //CCs
    setCustomDirectory(text) {
        text = this.sanitizeInput("string", text, null, null, "Custom Directory", "setCustomDirectory");
        this.customDir = text;
        return this;
    }

    setDefaultSkippable(dskip) {
        dskip = this.sanitizeInput("boolean", dskip, this.ddSkip, true, "skippable", "setDefaultSkippable");
        this.dSkip = dskip;
        return this;
    }

    setDefaultAnimateInterpolation(g) {
        if (g === null || typeof g === "undefined") {
            g = this.ddGraph;
        }

        if (g === def) {
            g = linear;
        }

        if (!isEasingValid(g)) {
            displayError("Illegal Argument Exception: Unknown default stage interpoaltion. Stage id: " + this.id);
        }

        this.dGraph = g;
        return this;
    }

    addBackground(name, background) {
        this.bkgdArr[name] = background;
        return this;
    }

    setOpacity(opacity) {
        opacity = this.sanitizeInput("number", opacity, this.dopacity, 0, "opacity", "setOpacity");
        if (opacity < 0) {
            this.throwError("Opacity cannot be smaller than 0. Your opacity: " + opacity);
        }
        opacity = Math.max(Math.min(opacity, 1), 0);
        this.opacity = opacity;
        return this;
    }

    setCoverOpacity(opacity) {
        opacity = this.sanitizeInput("number", opacity, this.dcoverOpacity, 0, "opacity", "setCoverOpacity");
        if (opacity < 0) {
            this.throwError("Cover opacity cannot be smaller than 0. Your cover opacity: " + opacity);
        }
        opacity = Math.max(Math.min(opacity, 1), 0);
        this.coverOpacity = opacity;
        return this;
    }

    setBackdropOpacity(opacity) {
        opacity = this.sanitizeInput("number", opacity, this.dbackdropOpacity, 1, "opacity", "setBackdropOpacity");
        if (opacity < 0) {
            this.throwError("Backdrop opacity cannot be smaller than 0. Your backdrop opacity: " + opacity);
        }
        opacity = Math.max(Math.min(opacity, 1), 0);
        this.backdropOpacity = opacity;
        return this;
    }

    setOverlayOpacity(opacity) {
        opacity = this.sanitizeInput("number", opacity, this.doverlayOpacity, 0, "opacity", "setOverlayOpacity");
        if (opacity < 0) {
            this.throwError("Overlay opacity cannot be smaller than 0. Your overlay opacity: " + opacity);
        }
        opacity = Math.max(Math.min(opacity, 1), 0);
        this.overlayOpacity = opacity;
        return this;
    }

    setCoverColor(color) {
        color = this.sanitizeInput("string", color, this.dcoverColor, "black", "color", "setCoverColor");
        this.coverColor = color;
        return this;
    }

    setBackdropColor(color) {
        color = this.sanitizeInput("string", color, this.dbackdropColor, "black", "color", "setBackdropColor");
        this.backdropColor = color;
        return this;
    }

    setOverlayColor(color) {
        color = this.sanitizeInput("string", color, this.doverlayColor, "black", "color", "setOverlayColor");
        this.overlayColor = color;
        return this;
    }

    setInvert(invert) {
        invert = this.sanitizeInput("number", invert, this.dinvert, 0, "invert", "setInvert");
        this.vinvert = invert;
        return this;
    }

    setBlur(blur) {
        blur = this.sanitizeInput("number", blur, this.dblur, 0, "blur", "setBlur");
        this.vblur = blur;
        return this;
    }

    setGrayscale(gs) {
        gs = this.sanitizeInput("number", gs, this.dgray, 0, "grayscale", "setGrayscale");
        this.vgray = gs;
        return this;
    }

    setSepia(sepia) {
        sepia = this.sanitizeInput("number", sepia, this.dsepia, 0, "sepia", "setSepia");
        this.vsepia = sepia;
        return this;
    }

    setContrast(contrast) {
        contrast = this.sanitizeInput("number", contrast, this.dcontrast, 1, "contrast", "setContrast");
        this.vcontrast = contrast;
        return this;
    }

    setSaturation(saturation) {
        saturation = this.sanitizeInput("number", saturation, this.dsaturation, 1, "saturation", "setSaturation");
        this.vsaturation = saturation;
        return this;
    }

    setBrightness(brightness) {
        brightness = this.sanitizeInput("number", brightness, this.dsaturation, 1, "brightness", "setBrightness");
        this.vbrightness = brightness;
        return this;
    }

    setHueRotation(angle) {
        angle = this.sanitizeInput("number", angle, this.dhue, 0, "angle", "setHueRotation");
        this.vhue = angle;
        return this;
    }

    setRotation(angle) {
        angle = this.sanitizeInput("number", angle, this.drotate, 0, "angle", "setRotation");
        this.vrotate = angle;
        return this;
    }

    setXSkew(skewX) {
        skewX = this.sanitizeInput("number", skewX, this.dskewx, 0, "angle", "setXSkew");
        this.vskewx = skewX;
        return this;
    }

    setYSkew(skewY) {
        skewY = this.sanitizeInput("number", skewY, this.dskewy, 0, "angle", "setYSkew");
        this.vskewy = skewY;
        return this;
    }

    setVerticalFlip(boolean) {
        boolean = this.sanitizeInput("boolean", boolean, this.dflipv, false, "boolean", "setVerticalFlip");
        this.vflipv = boolean;
        return this;
    }

    setHorizontalFlip(boolean) {
        boolean = this.sanitizeInput("boolean", boolean, this.dfliph, false, "boolean", "setHorziontalFlip");
        this.vfliph = boolean;
        return this;
    }

    setXOffSet(x) {
        x = this.sanitizeInput("number", x, this.dx, 0, "x", "setXOffset");
        this.x = x;
        return this;
    }

    setYOffSet(y) {
        y = this.sanitizeInput("number", y, this.dy, 0, "y", "setYOffset");
        this.y = y;
        return this;
    }

    setAnchorX(aX) {
        aX = this.sanitizeInput("number", aX, this.doriX, 50, "aX", "setAnchorX");
        this.oriX = aX;
        return this;
    }

    setAnchorY(aY) {
        aY = this.sanitizeInput("number", aY, this.doriY, 50, "aY", "setAnchorY");
        this.oriY = aY;
        return this;
    }

    setWidth(width) {
        width = this.sanitizeInput("number", width, this.dw, 100, "width", "setWidth");
        if (width < 0) {
            this.throwError("Illegal Argument Exception: Width cannot be negative. Your width: " + width);

        }
        this.w = width;
        return this;
    }

    setHeight(height) {
        height = this.sanitizeInput("number", height, this.dh, 100, "height", "setHeight");
        if (height < 0) {
            this.throwError("Illegal Argument Exception: height cannot be negative. Your height: " + height);

        }
        this.h = height;
        return this;
    }

    complete() {
        if (this.completed) {
            displayError("Unsupported Exception: Not allowed to call .complete() on a completed stage: " + this.id);
        }

        this.dcharArray = this.charArray.slice();
        this.dcbkgd = this.cbkgd;
        this.dbkgdArr = clone(this.bkgdArr);
        this.dcentered = this.centered;
        this.dcSize = this.cSize;
        this.dnSize = this.nSize;
        this.dtColor = this.tColor;
        this.dbold = this.bold;
        this.ditalic = this.italic;
        this.dtName = this.tName;
        this.ddSkip = this.dSkip;
        this.ddGraph = this.dGraph;
        this.dopacity = this.opacity;
        this.doverlayColor = this.overlayColor;
        this.doverlayOpacity = this.overlayOpacity;
        this.dbackdropColor = this.backdropColor;
        this.dbackdropOpacity = this.backdropOpacity;
        this.dcoverColor = this.coverColor;
        this.dcoverOpacity = this.coverOpacity;
        this.dinvert = this.vinvert;
        this.dgray = this.vgray;
        this.dblur = this.vblur;
        this.dsepia = this.vsepia;
        this.dcontrast = this.vcontrast;
        this.dsaturation = this.vsaturation;
        this.dbrightness = this.vbrightness;
        this.dhue = this.vhue;
        this.drotate = this.vrotate;
        this.dskewx = this.vskewx;
        this.dskewy = this.vskewy;
        this.dflipv = this.vflipv;
        this.dfliph = this.vfliph;

        this.completed = true;
        return this;
    }

    //preAnims
    preMove(x, y) {
        x = this.sanitizeInput("number", x, this.dx - this.x, 0, "x", "preMove");
        y = this.sanitizeInput("number", y, this.dy - this.y, 0, "y", "preMove");
        this.setXOffSet(this.x += x);
        this.setYOffSet(this.y += y);
    }

    preScale(x, y) {
        x = this.sanitizeInput("number", x, this.dw / this.w, 1.2, "xScale", "preScale");
        y = this.sanitizeInput("number", y, this.dh / this.h, 1.2, "yScale", "preScale");
        this.setWidth(this.w * x);
        this.setHeight(this.h * y);
    }

    preRotate(angle) {
        angle = this.sanitizeInput("number", angle, this.drotate - this.vrotate, this.drotate - this.vrotate, "angle", "preRotate");
        this.setRotation(this.vrotate += angle);
    }

    preSkew(x, y) {
        x = this.sanitizeInput("number", x, this.dskewx - this.vskewx, this.dskewx - this.vskewx, "skewXangle", "preSkew");
        y = this.sanitizeInput("number", y, this.dskewy - this.vskewy, this.dskewy - this.vskewy, "skewYangle", "preSkew");
        this.setXSkew(this.vskewx += x);
        this.setYSkew(this.vskewy += y);
    }

    //animations
    displayText(text, time, promise, name, centered, size, color, bold, italic, skippable, clear) {


        if (skippable === null || typeof skippable === "undefined") {
            skippable = this.dSkip;
        }
        if (skippable === def) {
            skippable = false;
        }
        if (time === null || typeof time === "undefined") {
            time = 0;
        }
        if (time === def) {
            time = 1000;
        }

        if (!this.completed) {
            this.throwError("Object Construction Exception: Stage object construction not completed. Call .complete() to complete the construction of the stage.");
        }
        if (!this.isActive) {
            this.throwError("Unsupported Exception: stage cannot call .displayText if its not active");
        }

        if (!this.textbox.isAnimating()) {
            if (typeof name === "undefined" || name === null) {
                name = this.tName;
            }
            if (typeof centered === "undefined" || centered === null) {
                centered = this.centered;
            }
            if (typeof size === "undefined" || size === null) {
                size = (centered ? this.cSize : this.nSize);
            }
            if (typeof color === "undefined" || color === null) {
                color = this.tColor;

            }
            if (typeof bold === "undefined" || bold === null) {
                bold = this.bold;
            }
            if (typeof italic === "undefined" || italic === null) {
                italic = this.italic;
            }
            if (skippable === "defaultValueForVN-marcusIsNub") {
                skippable = true;
            }
            if (name === "defaultValueForVN-marcusIsNub") {
                name = "none";
            }
            if (centered === "defaultValueForVN-marcusIsNub") {
                centered = false;
            }
            if (size === "defaultValueForVN-marcusIsNub") {
                size = "1.7vw";
            }
            if (color === "defaultValueForVN-marcusIsNub") {
                color = "black";
            }
            if (bold === "defaultValueForVN-marcusIsNub") {
                bold = false;
            }
            if (italic === "defaultValueForVN-marcusIsNub") {
                italic = false;
            }

            //alert(centered);
            this.textbox.setName(name);
            this.textbox.setCenter(centered);
            this.textbox.setSize(size);
            this.textbox.setColor(color);
            this.textbox.setBold(bold);
            this.textbox.setItalic(italic);
            if (skippable === false) {
                this.textbox.setUnskippable();
            }

            this.tName = name;
            this.centered = centered;
            if (centered) {
                this.cSize = size;
            } else {
                this.nSize = size;
            }
            this.tColor = color;
            this.bold = bold;
            this.italic = italic;


            let sent = this.textbox.displayText(text, promise, time, clear);
            if (sent) {
                if (centered) {
                    backlog += "<div class='large'>";
                }
                backlog += "<br>";
                if (name !== "none") {
                    backlog += "<b>" + name + ": " + "</b>";
                }

                backlog += text;


                if (centered) {
                    backlog += "</div>";
                }
            }
            return sent;
        }
        return false;

    }

    fadeInText(text, time, promise, name, centered, size, color, bold, italic, skippable, clear) {
        if (!this.completed) {
            this.throwError("Object Construction Exception: Stage object construction not completed. Call .complete() to complete the construction of the stage.");
        }
        if (!this.isActive) {
            this.throwError("Unsupported Exception: stage cannot call .fadeInText if its not active");
        }

        if (skippable === null || typeof skippable === "undefined") {
            skippable = this.dSkip;
        }
        if (skippable === def) {
            skippable = false;
        }
        if (time === null || typeof time === "undefined") {
            time = 0;
        }
        if (time === def) {
            time = 1000;
        }


        if (!this.textbox.isAnimating()) {
            if (typeof name === "undefined" || name === null) {
                name = this.tName;
            }
            if (typeof centered === "undefined" || centered === null) {
                centered = this.centered;
            }
            if (typeof size === "undefined" || size === null) {
                size = (centered ? this.cSize : this.nSize);
            }
            if (typeof color === "undefined" || color === null) {
                color = this.tColor;
                ;
            }
            if (typeof bold === "undefined" || bold === null) {
                bold = this.bold;
            }
            if (typeof italic === "undefined" || italic === null) {
                italic = this.italic;
            }
            if (typeof skippable === "undefined" || skippable === null) {
                skippable = true;
            }

            if (name === "defaultValueForVN-marcusIsNub") {
                name = "none";
            }
            if (centered === "defaultValueForVN-marcusIsNub") {
                centered = false;
            }
            if (size === "defaultValueForVN-marcusIsNub") {
                size = "1.5vw";
            }
            if (color === "defaultValueForVN-marcusIsNub") {
                color = "black";
            }
            if (bold === "defaultValueForVN-marcusIsNub") {
                bold = false;
            }
            if (italic === "defaultValueForVN-marcusIsNub") {
                italic = false;
            }
            if (skippable === "defaultValueForVN-marcusIsNub") {
                skippable = true;
            }

            this.textbox.setName(name);
            this.textbox.setCenter(centered);
            if (skippable === false) {
                this.textbox.setUnskippable();
            }
            this.textbox.setSize(size);
            this.textbox.setColor(color);
            this.textbox.setBold(bold);
            this.textbox.setItalic(italic);

            this.tName = name;
            this.centered = centered;
            if (centered) {
                this.cSize = size;
            } else {
                this.nSize = size;
            }
            this.tColor = color;
            this.bold = bold;
            this.italic = italic;

            let sent = this.textbox.fadeInText(text, promise, time, clear);
            //console.log(sent);
            if (sent) {
                if (centered) {
                    backlog += "<div class='large'>";
                }
                backlog += "<br>";
                if (name !== "none") {
                    backlog += "<b>" + name + ": " + "</b>";
                }
                backlog += text;
                if (centered) {
                    backlog += "</div>";
                }
            }

            return sent;
        }
        return false;

    }

    wait(time, promise, skippable) {
        if (!this.completed) {
            displayError("Object Construction Exception: Stage object construction not completed. Call .complete() to complete the construction of the stage. Stage id: " + this.id);
        }
        if (!this.isActive) {
            displayError("Unsupported Exception: stage cannot call .animate if its not active: Stage id: " + this.id);
        }
        skippable = this.sanitizeInput("boolean", skippable, false, this.dSkip, "skippable", "wait");
        time = this.sanitizeInput("number", time, 0, 1000, "time", "wait");
        if (typeof time !== "number" || time < 0) {
            this.typeError("Animation 'time' parameter has to be a positive number ", time);
        }

        this.canSkip = skippable;
        var s = this;

        TweenLite.to("#vn-bkgd-r", time / 1000, {
            immediateRender: true,
            onComplete: function () {
                s.canSkip = true;
                if (typeof promise !== "undefined" && promise !== null) {
                    if (typeof promise === "function") {
                        promise();
                    } else {
                        s.typeError("Promise has to be a function! ", promise);
                    }
                }
            }
        });
    }

    fadeOutBackground(time,promise,swing,skippable){
        this.setOpacity(0);
        this.animate(time,promise,swing,skippable);
    }
    
    fadeInBackground(time,promise,swing,skippable){
        this.setOpacity(1);
        this.animate(time,promise,swing,skippable);
    }

    changeCover(opacity, color, time, promise, swing, skippable) {
        this.setCoverOpacity(opacity);
        this.setCoverColor(color);
        this.animate(time, promise, swing, skippable);
    }

    changeBackdrop(opacity, color, time, promise, swing, skippable) {
        this.setBackdropColor(color);
        this.setBackdropOpacity(opacity);
        this.animate(time, promise, swing, skippable);
    }

    changeOverlay(opacity, color, time, promise, swing, skippable) {
        this.setOverlayColor(color);
        this.setOverlayOpacity(opacity);
        this.animate(time, promise, swing, skippable);
    }

    instantChangeBG(src) {
        var bgid = this.getBackgroundID(this.cbkgd);
        jom.changeImg($("#" + bgid), src);
    }

    changeBackground(background, opacity, time, promise, swing, skippable) {
        var halfT = parseInt(time / 2);
        this.setOpacity(0);
        var s = this;

        opacity = this.sanitizeInput("number", opacity, 1, 1, "opacity", "changeBackground");

        this.animate(halfT, function () {
            var uuid = s.getBackgroundID(background);
            s.cbkgd = background;
            $(".bkgd-sprite-kvn").css("visibility", "hidden").promise().done(function () {
                $("#" + uuid).css("visibility", "visible").promise().done(function () {
                    s.setOpacity(opacity);
                    s.animate(halfT, promise, swing, skippable);
                });
            });
        }, swing, skippable);
    }

    backgroundBlur(blur, time, promise, swing, skip) {
        this.setBlur(blur);
        this.animate(time, promise, swing, skip);
    }

    backgroundInvert(invert, time, promise, swing, skip) {
        this.setInvert(invert);
        this.animate(time, promise, swing, skip);
    }

    backgroundGrayscale(grayscale, time, promise, swing, skip) {
        this.setGrayscale(grayscale);
        this.animate(time, promise, swing, skip);
    }

    backgroundSepia(sepia, time, promise, swing, skip) {
        this.setSepia(sepia);
        this.animate(time, promise, swing, skip);
    }

    backgroundContrast(contrast, time, promise, swing, skip) {
        this.setContrast(contrast);
        this.animate(time, promise, swing, skip);
    }

    backgroundSaturate(saturation, time, promise, swing, skip) {
        this.setSaturation(saturation);
        this.animate(time, promise, swing, skip);
    }

    backgroundBrightness(brightness, time, promise, swing, skip) {
        this.setBrightness(brightness);
        this.animate(time, promise, swing, skip);
    }

    backgroundRotateHue(hue, time, promise, swing, skip) {
        this.setHueRotation(hue);
        this.animate(time, promise, swing, skip);
    }

    rotateBackgroundClockwise(angle, time, promise, swing, skip) {
        this.preRotate(angle);
        this.animate(time, promise, swing, skip);
    }

    rotateBackgroundAntiClockwise(angle, time, promise, swing, skip) {
        this.preRotate(-angle);
        this.animate(time, promise, swing, skip);
    }

    pan(x, y, time, promise, swing, skip) {
        this.preMove(x, y);
        this.animate(time, promise, swing, skip);
    }

    shiftBackground(x, y, time, promise, swing, skip) {
        this.setXOffSet(x);
        this.setYOffSet(y);
        this.animate(time, promise, swing, skip);
    }

    scaleBackground(x, y, time, promise, swing, skip) {
        this.preScale(x, y);
        this.animate(time, promise, swing, skip);
    }

    skewBackground(x, y, time, promise, swing, skip) {
        this.preSkew(x, y);
        this.animate(time, promise, swing, skip);
    }

    flipBackgroundHorizontally(promise, time, swing, skip) {
        this.vfliph = !this.vfliph;
        this.animate(time, promise, swing, skip);
    }

    flipBackgroundVertically(promise, time, swing, skip) {
        this.vflipv = !this.vflipv;
        this.animate(time, promise, swing, skip);
    }

    animate(time, promise, swing, skippable) {
        if (!this.completed) {
            displayError("Object Construction Exception: Stage object construction not completed. Call .complete() to complete the construction of the stage. Stage id: " + this.id);
        }
        if (!this.isActive) {
            displayError("Unsupported Exception: stage cannot call .animate if its not active: Stage id: " + this.id);
        }

        skippable = this.sanitizeInput("boolean", skippable, this.dSkip, true, "skippable", "animate");
        time = this.sanitizeInput("number", time, 0, 1000, "time", "animate");
        swing = this.sanitizeInput("object", swing, this.dGraph, linear, "swing", "animate");


        if (typeof time !== "number" || time < 0) {
            this.typeError("Animation 'time' parameter has to be a positive number ", time);
        }

        if (!isEasingValid(swing)) {
            this.throwError("Illegal Argument Exception: Unknown easing type!");

        }
        this.canSkip = skippable;

        //background

        //alpha
        var bgA = this.opacity;     //background opactiy

        //position
        var x = this.getRealX() + "%";    //left
        var y = this.getRealY() + "%";    //top
        var w = this.w + "%";             //width
        var h = this.h + "%";             //height

        //transform
        var rotate = this.vrotate + "deg";    //rotation, clockwise
        var skewX = this.vskewx + "deg";      //x skew angle
        var skewY = this.vskewy + "deg";      //y skew angle
        var scaleX = this.vfliph ? -1 : 1;  //scale x
        var scaleY = this.vflipv ? -1 : 1;  //scale y

        //filters
        var blur = "blur(" + this.vblur * 10 + "px)";
        var invert = " invert(" + this.vinvert * 100 + "%)";
        var grayscale = " grayscale(" + this.vgray * 100 + "%)";
        var sepia = " sepia(" + this.vsepia * 100 + "%)";
        var contrast = " contrast(" + this.vcontrast * 100 + "%)";
        var saturate = " saturate(" + this.vsaturation * 100 + "%)";
        var brightness = " brightness(" + this.vbrightness * 100 + "%)";
        var hue = " hue-rotate(" + this.vhue + "deg)";

        var easeCSS = cssEasing(swing);

        //backdrop
        var dpA = this.backdropOpacity;     // backdrop opacity
        var dpC = this.backdropColor;       //backdrop color

        //overlay
        var oA = this.overlayOpacity;       //overlay opacity
        var oC = this.overlayColor;         //overlay color

        //cover
        var cA = this.coverOpacity;         //cover opacity
        var cC = this.coverColor;           //cover color

        //selectors
        var bg = "#vn-bkgd-r";
        var bd = "#vn-bkgd";
        var overlay = "#overlay";
        var cover = "#clickbox";

        var s = this;

        var start = function () {
            $(bg).css("transition", "filter " + time / 1000 + "s " + easeCSS).promise().done(function () {
                $(bg).css("filter", blur + invert + grayscale + sepia + contrast + saturate + brightness + hue);
                s.finalFilter = blur + invert + grayscale + sepia + contrast + saturate + brightness + hue;
            });
        };



        this.animationDuration = time;

        //tgween backdrop
        TweenLite.to(bd, time / 1000, {
            immediateRender: true, ease: gsEasing(swing),
            backgroundColor: dpC, opacity: dpA
        });

        //tween cover
        TweenLite.to(cover, time / 1000, {
            immediateRender: true, ease: gsEasing(swing),
            backgroundColor: cC, opacity: cA
        });

        //tween overlay
        TweenLite.to(overlay, time / 1000, {
            immediateRender: true, ease: gsEasing(swing),
            backgroundColor: oC, opacity: oA
        });

        TweenLite.to(bg, time / 1000, {
            immediateRender: true, ease: gsEasing(swing), onStart: start,
            left: x, top: y, width: w, height: h,
            rotation: rotate, skewX: skewX, skewY: skewY, scaleX: scaleX, scaleY: scaleY,
            opacity: bgA,
            onComplete: function () {
                $(bg).css("transition", "").promise().done(function () {
                    $(bg).css("filter", blur + invert + grayscale + sepia + contrast + saturate + brightness + hue).promise().done(function () {
                        s.canSkip = true;
                        if (typeof promise !== "undefined" && promise !== null) {
                            if (typeof promise === "function") {
                                promise();
                            } else {
                                s.typeError("Promise has to be a function! ", promise);
                            }
                        }
                    });
                });
            }

        });

    }

    resetStage(time, promise, swing, skippable) {
        this.resetValues();
        this.animate(time, promise, swing, skippable);

    }

    //instants
    closeTextBox(promise) {
        this.textbox.closeTextBox(promise);
    }

    displayOptionPrecise(optionArray, fontsize, width, padding, margin, columns, promise) {
        var hasCallback = currentScene.getCurrentFrame().hasOptionCallBack();
        var currentFrame = currentScene.getCurrent();
        if (!hasCallback) {
            displayError("Bad Construction Exception: Frame constructed with 'stage.displayOption' method within did not provide and default option function as the second parameter of the\n\
           Frame constructor. .new Frame(frame,defOption), defOption is to return the default option callback to execute when is frame is skipped. you may return null to perform no action. Frame: " + currentFrame)
        }

        if (!this.complete) {
            displayError("Object Construction Exception: Stage object construction not completed. Call .complete() to complete the construction of the stage. Stage id: " + this.id);
        }
        width = this.sanitizeInput("number", width, 20, 20, "width", "displayOptionPrecise");
        fontsize = this.sanitizeInput("number", fontsize, 2.5, 2.5, "font size", "displayOptionPrecise");
        padding = this.sanitizeInput("number", padding, 1, 1, "padding", "displayOptionPrecise");
        margin = this.sanitizeInput("number", margin, 1, 1, "margin", "displayOptionPrecise");
        columns = this.sanitizeInput("number", columns, 1, 1, "columns", "displayOptionPrecise");


        var wr = width / 100 * vnScreenWidth; //width ratio
        var pr = padding / 100 * vnScreenWidth; //padding ratio
        var mr = margin / 100 * vnScreenWidth;//margin ratio

        for (var i = 0; i < optionArray.length; i++) {
            var x = $("<div class='option isButton' onClick='' optionid='" + optionArray[i].getID() + "'>" + optionArray[i].getText() + "</div>");


            var r = window.kvnCurrentRatio;
            x.css("width", (wr * r) + "vw");
            x.css("font-size", (fontsize * r) + "vw");
            x.css("padding", (pr * r) + "vw");
            x.css("margin", (mr * r) + "vw");

            x.attr('ow', wr + "vw");
            x.attr('opad', pr + "vw");
            x.attr('omargin', mr + "vw");
            x.attr('ofs', fontsize + "vw");

            if (columns > 1) {
                x.css("display", "inline-block");
            }
            var oh = $("#optionholder");
            oh.attr('wr', wr);
            oh.attr('pr', pr);
            oh.attr('mr', mr);
            oh.attr('col', columns);

            oh.append(x);
        }

        if (columns > 1) {
            oh.css("width", (((wr * r) + 2 * (pr * r) + 2 * (pr * r)) * columns + 0.5) + "vw");
        } else {
            oh.css("width", "auto");
        }

        $("#optionholder").css("display", "block").promise().done(function () {
            if (promise !== null && typeof promise === "function") {
                promise();
            }
        });

        $(".option.set").css("display", "block");
        window.isOption = true;
    }

    displayOption(optionArray, promise) {
        var hasCallback = currentScene.getCurrentFrame().hasOptionCallBack();
        var currentFrame = currentScene.getCurrent();
        if (!hasCallback) {
            displayError("Bad Construction Exception: Frame constructed with 'stage.displayOption' method within did not provide and default option function as the second parameter of the\n\
           Frame constructor. .new Frame(frame,defOption), defOption is to return the default option callback to execute when is frame is skipped. you may return null to perform no action. Frame: " + currentFrame)
        }

        if (!this.complete) {
            displayError("Object Construction Exception: Stage object construction not completed. Call .complete() to complete the construction of the stage. Stage id: " + this.id);
        }

        var iHtml = "";
        for (var i = 0; i < optionArray.length; i++) {
            iHtml += "<div class='option isButton' onClick='' optionid='" + optionArray[i].getID() + "'>" + optionArray[i].getText() + "</div>";
        }


        $("#optionholder").html(iHtml);
        $("#optionholder").css("width", "auto");
        $("#optionholder").css("display", "block").promise().done(function () {
            if (promise !== null && typeof promise === "function") {
                promise();
            }
        });

        $(".option.set").css("display", "block");
        window.isOption = true;
    }

    setOption(option, x, y, width, fontSize, padding) {
        var hasCallback = currentScene.getCurrentFrame().hasOptionCallBack();
        var currentFrame = currentScene.getCurrent();
        if (!hasCallback) {
            displayError("Bad Construction Exception: Frame constructed with 'stage.displayOption' method within did not provide and default option function as the second parameter of the\n\
           Frame constructor. .new Frame(frame,defOption), defOption is to return the default option callback to execute when is frame is skipped. you may return null to perform no action. Frame: " + currentFrame)
        }

        if (!this.complete) {
            displayError("Object Construction Exception: Stage object construction not completed. Call .complete() to complete the construction of the stage. Stage id: " + this.id);
        }

        x = this.sanitizeInput("number", x, 0, 0, "x", "displayOptionPrecise");
        y = this.sanitizeInput("number", y, 0, 0, "y", "displayOptionPrecise");
        width = this.sanitizeInput("number", width, 20, 20, "width", "displayOptionPrecise");
        fontSize = this.sanitizeInput("number", fontSize, 2.5, 2.5, "font size", "displayOptionPrecise");
        padding = this.sanitizeInput("number", padding, 1, 1, "padding", "displayOptionPrecise");

        var op = $("<div class='option isButton set' onClick='' optionid='" + option.getID() + "'>" + option.getText() + "</div>");
        op.css("display", "none");
        op.css("position", "absolute");

        var r = window.kvnCurrentRatio;

        op.css("left", x + "%");
        op.css("top", y + "%");
        op.css("width", width + "%");
        op.css("font-size", (fontSize * r) + "vw");
        op.css("padding", padding + "%");

        op.attr('ofs', fontSize + "vw");

        $("#hclickbox").append(op);
    }

    displayMarker(promise) {
        if (!this.complete) {
            displayError("Object Construction Exception: Stage object construction not completed. Call .complete() to complete the construction of the stage. Stage id: " + this.id);
        }

        $("#completionmarker").css("display", "block").promise().done(function () {
            cMarker = true;
            if (promise !== null && typeof promise === "function") {
                promise();
            }
        });
    }

    removeMarker(promise) {
        if (!this.complete) {
            displayError("Object Construction Exception: Stage object construction not completed. Call .complete() to complete the construction of the stage. Stage id: " + this.id);
        }

        $("#completionmarker").css("display", "none").promise().done(function () {
            cMarker = false;
            if (promise !== null && typeof promise === "function") {
                promise();
            }
        });
    }

    //frills
    glitch() {
        if (!this.completed) {
            displayError("Object Construction Exception: Stage object construction not completed. Call .complete() to complete the construction of the stage. Stage id: " + this.id);
        }
        if (!this.isActive) {
            displayError("Unsupported Exception: stage cannot call .changeBackground if its not active: Stage id: " + this.id);
        }

        var s = this;


        $("#vn-bkgd-r").children(".glitch__img").each(function (e) {
            jom.changeImg($(this).children('img'), s.getCurrentBackground());
            $(this).css("opacity", "1");
            $(this).css("animation-duration", "8s");
            $(this).css("animation-delay", "0s");
            $(this).css("animation-timing-function", "linear");
            $(this).css("animation-iteration-count", "infinite");
            if (e === 1) {
                $(this).css("animation-name", "glitch-anim-1");
            }
            if (e === 2) {
                $(this).css("animation-name", "glitch-anim-2");
            } else if (e === 3) {
                $(this).css("animation-name", "glitch-anim-3");
            } else if (e === 4) {
                $(this).css("animation-name", "glitch-anim-flas");
            }
        });

        this.gloop = setInterval(function () {
            $("#vn-bkgd-r").children(".glitch__img").each(function (e) {
                jom.changeImg($(this).children('img'), s.getCurrentBackground());
            });
        }, 2000);

    }

    fix() {
        clearInterval(this.gloop);
        $("#vn-bkgd-r").children(".glitch__img").each(function (e) {
            $(this).css("opacity", "0");
            $(this).css("animation-duration", "");
            $(this).css("animation-delay", "");
            $(this).css("animation-timing-function", "");
            $(this).css("animation-iteration-count", "");
            $(this).css("background-color", "");
            $(this).css("background-blend-mode", "");
            $(this).css("animation-name", "");
        });
    }

    trigger(time, promise, skip, shake, delay) {
        if (!this.completed) {
            displayError("Object Construction Exception: Stage object construction not completed. Call .complete() to complete the construction of the stage. Stage id: " + this.id);
        }
        if (!this.isActive) {
            displayError("Unsupported Exception: stage cannot call .changeBackground if its not active: Stage id: " + this.id);
        }

        skip = this.sanitizeInput("boolean", skip, this.dSkip, true, "skip", "trigger");
        time = this.sanitizeInput("number", time, 500, 500, "time", "trigger");
        shake = this.sanitizeInput("number", shake, 0.5, 0.5, "shake", "trigger");
        delay = this.sanitizeInput("number", delay, 25, 25, "delay", "trigger");

        var count = 0;
        var ele = this;

        var bg = $("#bkgd-holder");

        var loop = setInterval(function () {
            var arte = count % 4;
            var shak = shake / 100;
            if (arte === 0) {
                bg.css("left", -shake * 0.85 + "%");
                bg.css("top", -shake + "%");
            } else if (arte === 1) {
                bg.css("left", shake * 0.85 + "%");
                bg.css("top", shake + "%");
            } else if (arte === 2) {
                bg.css("left", shake * 0.85 + "%");
                bg.css("top", -shake + "%");
            } else {
                bg.css("left", -shake * 0.85 + "%");
                bg.css("top", shake + "%");
            }
            count++;
        }, delay);

        TweenLite.to("#vn-screen", time / 1000, {immediateRender: true,
            onComplete: function () {
                clearInterval(loop);
                $("#bkgd-holder").css("top", 0);
                $("#bkgd-holder").css("left", 0);
                if (promise !== null && typeof promise !== "undefined") {
                    if (typeof promise === "function") {
                        promise();
                    } else {
                        ele.typeError("Promise has to be a function!");
                    }
                }
            }
        });
    }

    earthquake(time, promise, skip, shake, delay) {
        if (!this.completed) {
            displayError("Object Construction Exception: Stage object construction not completed. Call .complete() to complete the construction of the stage. Stage id: " + this.id);
        }
        if (!this.isActive) {
            displayError("Unsupported Exception: stage cannot call .changeBackground if its not active: Stage id: " + this.id);
        }
        skip = this.sanitizeInput("boolean", skip, this.dSkip, true, "skip", "trigger");
        time = this.sanitizeInput("number", time, 500, 500, "time", "trigger");
        shake = this.sanitizeInput("number", shake, 0.5, 0.5, "shake", "trigger");
        delay = this.sanitizeInput("number", delay, 25, 25, "delay", "trigger");

        var count = 0;
        var ele = this;

        var bg = $("#vn-screen");

        var loop = setInterval(function () {
            var arte = count % 4;
            var shak = shake / 100;
            if (arte === 0) {
                bg.css("left", -shake * 0.85 + "%");
                bg.css("top", -shake + "%");
            } else if (arte === 1) {
                bg.css("left", shake * 0.85 + "%");
                bg.css("top", shake + "%");
            } else if (arte === 2) {
                bg.css("left", shake * 0.85 + "%");
                bg.css("top", -shake + "%");
            } else {
                bg.css("left", -shake * 0.85 + "%");
                bg.css("top", shake + "%");
            }
            count++;
        }, delay);

        TweenLite.to("#vn-screen", time / 1000, {immediateRender: true,
            onComplete: function () {
                clearInterval(loop);
                $("#vn-screen").css("top", 0);
                $("#vn-screen").css("left", 0);
                if (promise !== null && typeof promise !== "undefined") {
                    if (typeof promise === "function") {
                        promise();
                    } else {
                        ele.typeError("Promise has to be a function!");
                    }
                }
            }
        });

    }

    //multi-threading methods
    setWaiter(char, promise) {
        if (!this.completed) {
            displayError("Object Construction Exception: Stage object construction not completed. Call .complete() to complete the construction of the stage. Stage id: " + this.id);
        }
        if (!this.isActive) {
            displayError("Unsupported Exception: stage cannot call .changeCover if its not active: Stage id: " + this.id);
        }
        if (typeof promise !== "function") {
            promise();
        } else {
            displayError("Promise exception: promise isn't a function! <br> PromiseType : " + typeof promise +
                    "<br> Promise: " + promise);
        }
        if (this.waiting[char] !== preNotify) {
            if (this.waiting[char] === null || typeof this.waiting[char] === "undefined") {
                this.waiting[char] = promise;
            }
        } else {
            if (this.waiting[char] !== null) {
                //console.log("execute 1");
                promise();
                this.waiting[char] = null;
            }
        }
    }

    notifyWaiter(char) {
        if (!this.completed) {
            displayError("Object Construction Exception: Stage object construction not completed. Call .complete() to complete the construction of the stage. Stage id: " + this.id);
        }
        if (!this.isActive) {
            displayError("Unsupported Exception: stage cannot call .changeCover if its not active: Stage id: " + this.id);
        }
        if (typeof this.waiting[char] === "function") {
            this.waiting[char]();
            //console.log("execute 2");
            this.waiting[char] = null;
        } else {
            this.waiting[char] = preNotify;
        }
    }

    waitFor(char, promise) {
        char.setWaiter(this, promise);
    }

    //debug
    typeError(error, input) {
        displayError("Type Exception: " + error +
                "<br>Your input type: " + typeof input +
                "<br>Your input: " + input +
                "<br> Stage id: " + this.id +
                "<br>Scene: " + getCurrentSceneID() +
                "<br>Frame: " + getCurrentFrame());
    }

    checkNumberError(type, method, input, def) {
        if (input !== null && typeof input !== "undefined") {
            if (typeof input !== "number") {
                displayError("Type Exception: " + type + " parameter in method " + method + " must be a number! " +
                        "<br>Your input type: " + typeof input +
                        "<br>Your input: " + input +
                        "<br> Stage id: " + this.id
                        );
            } else {
                return input;
            }
        } else {
            return def;
        }
    }

    throwError(errorMessage) {
        displayError(errorMessage +
                "<br> Stage id: " + this.id +
                "<br> Scene: " + getCurrentSceneID() +
                "<br> Frame: " + getCurrentFrame()
                );
    }

    sanitizeInput(acceptedType, input, cdef, edef, paramName, methodName) {
        if (input === null || typeof input === "undefined") {
            input = cdef;
        }
        if (input === def) {
            input = edef;
        }
        if (typeof input !== acceptedType) {
            displayError("Type Exception: '" + paramName + "' parameter in method '" + methodName + "' must be a " + acceptedType + "! " +
                    "<br>" + paramName + " input type: " + typeof input +
                    "<br>" + paramName + " input value: " + input +
                    "<br> Stage id: " + this.id +
                    "<br> Scene: " + getCurrentSceneID() +
                    "<br> Frame: " + getCurrentFrame()
                    );
        }
        return input;
    }

}
