'use strict';

class Character {
    //constructor
    constructor(id, name, defaultImage, width, height, xOffSet, yOffSet, valign, halign) {
        if (!contains.call(charIDArray, id)) {
            this.id = id;
            charIDArray.push(id);
            characters[id] = this;
            //console.log(characters[id].id);
        } else {
            displayError("Illegal Argument: Character ID for " + name + " has been used. ID: " + id);
        }


        id = this.constructorInput("string", id, "id");
        name = this.constructorInput("string", name, "name");
        defaultImage = this.constructorInput("string", defaultImage, "default Sprite");
        width = this.constructorInput("number", width, "width");
        height = this.constructorInput("number", height, "height");
        xOffSet = this.cSInput("number", xOffSet, 0, 0, "xOffSet");
        yOffSet = this.cSInput("number", yOffSet, 0, 0, "yOffSet");
        valign = this.cSInput("number", valign, 0, 0, "vertical alignment and vertical anchoring");
        halign = this.cSInput("number", halign, 0, 0, "horizontal alignment and horizontal anchroing");

        this.name = name;
        this.dName = name;

        this.spriteArray = [];
        this.spriteArray["default"] = defaultImage;
        this.spriteArray["def"] = defaultImage;

        this.dspriteArray = [];
        this.dspriteArray["default"] = defaultImage;
        this.dspriteArray["def"] = defaultImage;

        this.cyspriteArray = [];
        this.cyspriteArray["default"] = defaultImage;
        this.cyspriteArray["def"] = defaultImage;

        this.currentImage = defaultImage;

        if (width <= 0) {
            displayError("Illegal Argument: Attempt to create a character with 0 or negative width. Character ID: " + id);
        }

        if (height <= 0) {
            displayError("Illegal Argument: Attempt to create a character with 0 or negative height. Character ID: " + id);
        }

        this.w = width;
        this.h = height;

        this.dW = width;
        this.dH = height;

        this.x = xOffSet;
        this.dX = xOffSet;

        this.y = yOffSet;
        this.dY = yOffSet;

        this.xAlign = halign;
        this.yAlign = valign;

        this.dxA = halign;
        this.cyxA = halign;

        this.anchorX = halign;
        this.anchorY = valign;

        this.daX = halign;
        this.daY = valign;

        this.overlay = false;
        this.dOverlay = false;

        this.flipped = false;
        this.dflipped = false;

        this.vflipped = false;
        this.dvflipped = false;

        this.opacity = 0;
        this.dopacity = 0;

        this.xscale = function(){ return window.kvnXScale};
        this.yscale = function(){ return window.kvnYscale};

        this.dSkip = true;
        this.ddSkip = true;

        this.dGraph = linear;
        this.ddGraph = linear;

        //text
        this.textcolor = "black";
        this.dTextcolor = "black";

        this.fontsize = "1.7vw";
        this.dfontsize = "1.7vw";

        this.bold = false;
        this.dBold = false;

        this.italic = false;
        this.dItalic = false;

        //filter
        this.vblur = 0;
        this.dblur = 0;

        this.vinvert = 0;
        this.dinvert = 0;

        this.vgrayscale = 0;
        this.dgrayscale = 0;

        this.vsepia = 0;
        this.dsepia = 0;

        //new
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

        this.gloop = null;

        this.waiting = new Array();

        //cycle stuff
        this.dName = this.name;
        this.dspriteArray = clone(this.spriteArray);
        this.dW = this.w;
        this.dH = this.h;
        this.dX = this.x;
        this.dY = this.y;
        this.dxA = this.xAlign;
        this.dyA = this.yAlign;
        this.daX = this.anchorX;
        this.daY = this.anchorY;
        this.doverlay = this.overlay;
        this.dflipped = this.flipped;
        this.dvflipped = this.vflipped;
        this.dopacity = this.opacity;
        this.ddSkip = this.dSkip;
        this.ddGraph = this.dGraph;
        this.dTextcolor = this.textcolor;
        this.dfontsize = this.fontsize;
        this.dBold = this.bold;
        this.dItalic = this.italic;
        this.dblur = this.vblur;
        this.dgrayscale = this.vgrayscale;
        this.dinvert = this.vinvert;
        this.dsepia = this.vsepia;
        this.dcontrast = this.vcontrast;
        this.dsaturation = this.vsaturation;
        this.dbrightness = this.vbrightness;
        this.dhue = this.vhue;
        this.drotate = this.vrotate;
        this.dskewx = this.vskewx;
        this.dskewy = this.vskewy;

        this.isCycle = false;
        this.cycleseq = null;

        this.canSkip = true;

        /*pause engine for filter*/
        this.animationDuration = -1;
        this.animationProgress = -1;
        this.currentFilter = "penis5";
        this.finalFilter = "penis5";

        this.currentSprite = "default";

        this.checkingLoop = null;

        //logginh
        this.logging = false;
        
        this.customDir = null;

        this.stage = null;
        this.completed = false;
    }
    //getters
    getName() {
        return this.name;
    }
    
    getID() {
        return this.id;
    }

    getImage() {
        return this.spriteArray['default'];
    }

    getOverlay() {
        return this.overlay;
    }

    getWidth() {
        return this.w;
    }

    getHeight() {
        return this.h;
    }

    getHFlip() {
        return this.flipped;
    }

    getVFlip() {
        return this.vflipped;
    }

    getOpacity() {
        return this.opacity;
    }

    getCurrentI() {
        return this.currentImage;
    }

    getGrayScale() {
        return this.vgrayscale;
    }

    getBlur() {
        return this.vblur;
    }

    getSepia() {
        return this.vsepia;
    }

    getInvert() {
        return this.vinvert;
    }

    isSkippable() {
        return this.canSkip;
    }

    isAnimating() {
        if (this.isCycle) {
            return false;
        }
        var id = "#" + this.id;
        var ghost0 = "#ghost-" + 0 + "-" + this.id;
        var ghost1 = "#ghost-" + 1 + "-" + this.id;
        var ghost2 = "#ghost-" + 2 + "-" + this.id;
        var ghost3 = "#ghost-" + 3 + "-" + this.id;
        return TweenLite.getTweensOf([id, ghost0, ghost1, ghost2, ghost3]).length > 0;
    }

    isCycling() {
        return this.isCycle;
    }

    //privates
    getStage() {
        return this.stage;
    }

    setStage(stage) {
        if (this.completed) {
            this.stage = stage;
        } else {
            displayError("Incomplete Object Construction Exception: Character object not completed in construction. Please call chain-able method '.complete()' to complete construction. Character id: " + this.id + "; Character name: " + this.name);
        }
    }

    proceed(force) {
        if (this.isAnimating()) {
            if (this.isSkippable() || force) {
                if (!this.isCycle) {
                    var id = "#" + this.id;
                    var ghost0 = "#ghost-" + 0 + "-" + this.id;
                    var ghost1 = "#ghost-" + 1 + "-" + this.id;
                    var ghost2 = "#ghost-" + 2 + "-" + this.id;
                    var ghost3 = "#ghost-" + 3 + "-" + this.id;
                    var animations = TweenLite.getTweensOf([id, ghost0, ghost1, ghost2, ghost3]);
                    for (var i = 0; i < animations.length; i++) {
                        animations[i].progress(1);
                    }
                    return this.proceed(force);
                } else {
                    return true;
                }

            } else {
                return false;
            }
        } else {
            return true;
        }
    }

    pause() {
        if (this.isAnimating()) {
            var id = "#" + this.id;
            var ghost0 = "#ghost-" + 0 + "-" + this.id;
            var ghost1 = "#ghost-" + 1 + "-" + this.id;
            var ghost2 = "#ghost-" + 2 + "-" + this.id;
            var ghost3 = "#ghost-" + 3 + "-" + this.id;
            var animations = TweenLite.getTweensOf([id, ghost0, ghost1, ghost2, ghost3]);
            for (var i = 0; i < animations.length; i++) {
                animations[i].pause();
            }

            this.currentFilter = $(id).css("filter");
            this.animationProgress = TweenLite.getTweensOf([id])[0].progress();

            var char = this;

            $(id).css("transition", "").promise().done(function () {
                $(id).css("filter", char.currentFilter);
            });
        }
    }

    resume() {

        var id = "#" + this.id;
        var ghost0 = "#ghost-" + 0 + "-" + this.id;
        var ghost1 = "#ghost-" + 1 + "-" + this.id;
        var ghost2 = "#ghost-" + 2 + "-" + this.id;
        var ghost3 = "#ghost-" + 3 + "-" + this.id;
        var animations = TweenLite.getTweensOf([id, ghost0, ghost1, ghost2, ghost3]);
        for (var i = 0; i < animations.length; i++) {
            if (animations[i].paused()) {
                animations[i].play();
            }
        }

        var time = (1 - this.animationProgress) * this.animationDuration;
        var state = this.finalFilter;

        if (this.animationDuration !== -1 && this.animationProgress !== -1 && this.currentFilter !== "penis5" && this.finalFilter !== "penis5") {
            $(id).css("transition", "filter " + time / 1000 + "s " + "linear").promise().done(function () {
                $(id).css("filter", state);
            });
        }


    }

    getAlignX(x) {
        return x;
    }

    getAlignY(y) {
        return (y / 100) * heightMultiplier * vnScreenWidth;
    }

    getAnchorXOff(x, width) {
        return -(x / 100) * width;
    }

    getAnchorYOff(y, height) {
        return -(y / 100) * height;
    }

    getRealX() {
        return this.getProjectedX(this.xAlign, this.anchorX, this.x, this.w);
    }

    getRealY() {
        return this.getProjectedY(this.yAlign, this.anchorY, this.y, this.h);
    }

    getProjectedX(xAl, xAn, xOs, xWid) {
        return this.getAlignX(xAl) + xOs + this.getAnchorXOff(xAn, xWid);
    }

    getProjectedY(yAl, yAn, yOs, yWid) {
        return this.getAlignY(yAl) + yOs * this.yscale() + this.getAnchorYOff(yAn, yWid) * this.xscale();
    }

    getDiv() {
        return $("#" + this.id);
    }

    getGhost(id) {
        return $("#ghost-" + id + "-" + this.id);
    }

    reapplyFilterCSS() {
        var grayscale = (this.getGrayScale() * 100) + "%";
        var invert = (this.getInvert() * 100) + "%";
        var blur = (this.getBlur() * 10) + "px";

        var contrast = (this.vcontrast * 100) + "%";
        var saturation = (this.vsaturation * 100) + "%";
        var brightness = (this.vbrightness * 100) + "%";
        var hue = (this.vhue) + "deg";
        var sepia = (this.getSepia() * 100) + "%)";

        this.getDiv().css("filter", "grayscale(" + grayscale + ") invert(" + invert + ") blur(" + blur + ") contrast(" + contrast + ") saturate(" + saturation + ") brightness(" + brightness + ") hue-rotate(" + hue + ") sepia(" + sepia);
    }
    
    getImageDirectory(){
        if(this.customDir===null || typeof this.customDir !== "string"){
            return dir + "images/char/";
        }else{
            var cd = this.customDir;
            if(cd.charAt(cd.length-1)!=="/"){
                cd += "/";
            }
            return cd;
        }
    }

    //CCs
    complete() {
        if (this.completed) {
            displayError("Cannot call .complete() method on a compelted character");
        }
        this.dName = this.name;
        this.dspriteArray = clone(this.spriteArray);
        this.dW = this.w;
        this.dH = this.h;
        this.dX = this.x;
        this.dY = this.y;
        this.dxA = this.xAlign;
        this.dyA = this.yAlign;
        this.daX = this.anchorX;
        this.daY = this.anchorY;
        this.doverlay = this.overlay;
        this.dflipped = this.flipped;
        this.dvflipped = this.vflipped;
        this.dopacity = this.opacity;
        this.ddSkip = this.dSkip;
        this.ddGraph = this.dGraph;
        this.dTextcolor = this.textcolor;
        this.dfontsize = this.fontsize;
        this.dBold = this.bold;
        this.dItalic = this.italic;
        this.dblur = this.vblur;
        this.dgrayscale = this.vgrayscale;
        this.dinvert = this.vinvert;
        this.dsepia = this.vsepia;
        this.dcontrast = this.vcontrast;
        this.dsaturation = this.vsaturation;
        this.dbrightness = this.vbrightness;
        this.dhue = this.vhue;
        this.drotate = this.vrotate;
        this.dskewx = this.vskewx;
        this.dskewy = this.vskewy;

        this.completed = true;

        return this;
    }
    
    setCustomDirectory(text){
        text = this.sanitizeInput("string",text, null, null, "Custom Directory", "setCustomDirectory");
        this.customDir = text;
        return this;
    }

    setDefaultSkippable(dskip) {
        dskip = this.sanitizeInput("boolean", dskip, this.ddSkip, true, "dskip", "setDefaultSkippable");
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
            this.throwError("Illegal Argument Exception: Unknown default character interpoaltion.");
        }
        this.dGraph = g;
        return this;
    }

    addSprite(name, sprite) {
        if (typeof name !== "string") {
            this.typeError("Sprite name has to be a string: ", name);
        }
        if (typeof sprite !== "string") {
            this.typeError("Sprite has to be a string (location)", sprite);
        }
        
        if(sprite.charAt(0)==="/"){
            sprite = sprite.substring(1,sprite.length);
        }
        
        var path = this.getImageDirectory() + sprite;

        if (!this.spriteArray.hasOwnProperty(name)) {
            this.spriteArray[name] = sprite;
            if (this.stage !== null && this.stage.isActive) {
                var char = "<img class='charimg' id='kvn-api-character-sprite-" + this.id + "-" + name.trim() + "' src='" + path+ "'>";
                this.getDiv().append(char);
            }
            return this;
        } else {
            this.throwError("Illegal Argument: Sprite with that name already exist. Sprite name: " + name);
        }
    }

    setFontSize(font) {
        if (font === null || typeof font === "undefined") {
            font = this.dfontsize;
        }
        if (font === def) {
            font = "1.5vw";
        }
        this.fontsize = font;
        return this;
    }

    setBold() {
        this.bold = true;
        return this;
    }

    setItalic() {
        this.italic = true;
        return this;
    }

    editBold(bold) {
        bold = this.sanitizeInput("boolean", bold, this.ddSkip, false, "bold", "editBold");
        this.bold = bold;
        return this;
    }

    editItalic(italic) {
        italic = this.sanitizeInput("boolean", italic, this.ddSkip, true, "italic", "editLtalic");
        this.italic = italic;
        return this;
    }

    setTextColor(color) {
        color = this.sanitizeInput("string", color, this.dTextcolor, "black", "color", "setTextColor");
        this.textcolor = color;
        return this;
    }

    setOpacity(opacity) {
        opacity = this.sanitizeInput("number", opacity, this.dopacity, 0, "opacity", "setOpacity");
        this.opacity = Math.min(1, Math.max(opacity, 0));
        return this;
    }

    setAnchorX(aX) {
        aX = this.sanitizeInput("number", aX, this.daX, 0, "aX", "setAnchorX");
        this.anchorX = aX;
        return this;
    }

    setAnchorY(aY) {
        aY = this.sanitizeInput("number", aY, this.daY, 0, "aY", "setAnchorY");
        this.anchorY = aY;
        return this;
    }

    setHorizontalAlign(ha) {
        ha = this.sanitizeInput("number", ha, this.dxA, 0, "ha", "setHorizontalAlign");
        this.xAlign = ha;
        return this;
    }

    setVerticalAlign(va) {
        va = this.sanitizeInput("number", va, this.dyA, 0, "va", "setVerticalAlign");
        this.yAlign = va;
        return this;
    }

    setHorizontalFlip(boolean) {
        boolean = this.sanitizeInput("boolean", boolean, this.dflipped, false, "boolean", "setHorizontalFlip");
        this.flipped = boolean;
        return this;
    }

    setVerticalFlip(boolean) {
        boolean = this.sanitizeInput("boolean", boolean, this.dvflipped, false, "boolean", "setVerticalFlip");
        this.vflipped = boolean;
        return this;
    }

    setXOffSet(x) {
        x = this.sanitizeInput("number", x, this.dx, 0, "x", "setXOffSet");
        this.x = x;
        return this;
    }

    setYOffSet(y) {
        y = this.sanitizeInput("number", y, this.dy, 0, "y", "setYOffSet");
        this.y = y;
        return this;
    }

    setWidth(width) {
        width = this.sanitizeInput("number", width, this.dW, this.dW, "width", "setWidth");
        if (width <= 0) {
            this.throwError("Illegal Argument Exception: width has to be a non-zero positive integer! Your width: " + width);
        }
        this.w = width;
        return this;
    }

    setHeight(height) {
        height = this.sanitizeInput("number", height, this.dH, this.dH, "height", "setHeight");
        if (height <= 0) {
            this.throwError("Illegal Argument Exception: height has to be a non-zero positive integer! Your height: " + height);
        }
        this.h = height;
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
        gs = this.sanitizeInput("number", gs, this.dgrayscale, 0, "grayscale", "setGrayscale");
        this.vgrayscale = gs;
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
        brightness = this.sanitizeInput("number", brightness, this.dbrightness, 1, "brightness", "setBrightness");
        this.vbrightness = brightness;
        return this;
    }

    setHueRotation(hue) {
        hue = this.sanitizeInput("number", hue, this.dhue, 0, "hueAngle", "setHueRotation");
        this.vhue = hue;
        return this;
    }

    setRotation(rotate) {
        rotate = this.sanitizeInput("number", rotate, this.drotate, 0, "rotationAngle", "setRotation");
        this.vrotate = rotate;
        return this;
    }

    setXSkew(XSkew) {
        XSkew = this.sanitizeInput("number", XSkew, this.dskewx, 0, "XSkewAngle", "setXSkew");
        this.vskewx = XSkew;
        return this;
    }

    setYSkew(YSkew) {
        YSkew = this.sanitizeInput("number", YSkew, this.dskewy, 0, "YSkewAngle", "setYSkew");
        this.vskewy = YSkew;
        return this;
    }

    //Setters
    setNormalText() {
        this.bold = false;
        this.italic = false;
    }

    changeBold(bold) {
        bold = this.sanitizeInput("boolean", bold, this.dBold, false, "bold", "changeBold");
        this.bold = bold;
    }

    changeItalic(italic) {
        italic = this.sanitizeInput("boolean", italic, this.dItalic, false, "italic", "changeItalic");
        this.italic = italic;
    }

    changeName(name) {
        name = this.sanitizeInput("string", name, this.dName, "kirinnee", "name", "changeName");
        this.name = name;
    }

    resetValues() {
        this.name = this.dName;
        this.spriteArray = clone(this.dspriteArray);
        this.w = this.dW;
        this.h = this.dH;
        this.x = this.dX;
        this.y = this.dY;
        this.xAlign = this.dxA;
        this.yAlign = this.dyA;
        this.anchorX = this.daX;
        this.anchorY = this.daY;
        this.overlay = this.dOverlay;
        this.flipped = this.dflipped;
        this.vflipped = this.dvflipped;
        this.opacity = this.dopacity;
        this.dGraph = this.ddGraph;
        this.dSkip = this.ddSkip;
        this.textcolor = this.dTextcolor;
        this.fontsize = this.dfontsize;
        this.bold = this.dBold;
        this.italic = this.dItalic;
        this.vblur = this.dblur;
        this.vgrayscale = this.dgrayscale;
        this.vinvert = this.dinvert;
        this.vsepia = this.dsepia;
        this.vbrightness = this.dbrightness;
        this.vhue = this.dhue;
        this.vrotate = this.drotate;
        this.vsaturation = this.dsaturation;
        this.vcontrast = this.dcontrast;
        this.vskewx = this.dskewx;
        this.vskewy = this.dskewy;
        this.fix();

        /*pause engine for filter*/
        this.animationDuration = -1;
        this.animationProgress = -1;
        this.currentFilter = "penis5";
        this.finalFilter = "penis5";

        clearInterval(this.checkingLoop);

        this.checkingLoop = null;

        //logginh
        this.logging = false;

        this.currentSprite = "default";
        this.currentImage = this.spriteArray["default"];


    }

    //Pre Animations
    preScale(width, height) {
        height = this.sanitizeInput("number", height, this.dH / this.h, 1.2, "height", "preScale");
        width = this.sanitizeInput("number", width, this.dW / this.w, 1.2, "width", "preScale");
        if (width <= 0) {
            this.throwError("Argument Out of Bound Exception: Scaling x has to be a positive float value. Entered value: " + x);
        }
        if (height <= 0) {
            this.throwError("Argument Out of Bound Exception: Scaling y has to be a positive float value. Entered value: " + y);
        }
        this.setWidth(this.w * width);
        this.setHeight(this.h * height);
    }

    preMove(x, y) {
        x = this.sanitizeInput("number", x, this.dX - this.x, this.dX - this.x, "x", "preMove");
        y = this.sanitizeInput("number", y, this.dY - this.y, this.dY - this.y, "y", "preMove");

        this.setXOffSet(this.x + x);
        this.setYOffSet(this.y + y);
    }

    preRotate(angle) {
        angle = this.sanitizeInput("number", angle, this.drotate - this.vrotate, 45, "angle", "preRotate");
        this.setRotation(this.vrotate + angle);
    }

    preSkew(x, y) {
        x = this.sanitizeInput("number", x, this.dskewx - this.vskewx, 45, "skewAngleX", "preSkew");
        y = this.sanitizeInput("number", y, this.dskewy - this.vskewy, 45, "skewAngleY", "preSkew");

        this.setXSkew(this.vskewx + x);
        this.setYSkew(this.vskewy + y);
    }

    //Instants
    changeSprite(name, promise) {

        name = this.sanitizeInput("string", name, this.spriteArray['def'], this.spriteArray['def'], "name", "changeSprite");

        if (!this.spriteArray.hasOwnProperty(name)) {
            this.throwError("Missing Sprite: The sprite '" + name + "' does not exist!");
        }

        if (!this.completed) {
            this.throwError("Incomplete Object Construction Exception: Character object not completed in construction. Please call chain-able method '.complete()' to complete construction.");
        }

        if (this.stage === null) {
            this.throwError("Null Exception: Character not added to stage.");
        } else if (!this.stage.isActive) {
            this.throwError("Not loaded Exception: Not allowed to animate on stage that re not loaded. ");
        }
        var char = this;

        this.getDiv().children(".charimg").css("visibility", "hidden").promise().done(function () {
            var kID = "#" + "kvn-api-character-sprite-" + char.id + "-" + name;
            char.getDiv().children(kID).css("visibility", "visible").promise().done(function () {
                if (promise !== null & typeof promise !== "undefined") {
                    if (typeof promise === "function") {
                        promise();
                    } else {
                        char.typeError("Promise has to be a function!!", promise);
                    }
                }
            });
        });
        this.currentImage = this.spriteArray[name];
        this.currentSprite = name;

    }

    bringToFront(promise) {
        if (!this.completed) {
            this.throwError("Incomplete Object Construction Exception: Character object not completed in construction. Please call chain-able method '.complete()' to complete construction.");
        }
        if (this.stage === null) {
            this.throwError("Null Exception: Character not added to stage.");
        } else if (!this.stage.isActive) {
            this.throwError("Not loaded Exception: Not allowed to animate on stage that re not loaded.");
        }

        var newArr = new Array();
        var l = this.stage.getCharArray().length;
        for (var i = 0; i < l; i++) {
            if (this.stage.getCharArray()[i] !== this) {
                newArr.push(this.stage.getCharArray()[i]);
            }
        }
        newArr.push(this);
        this.stage.changeArrayOrder(newArr, promise);

    }

    sendToBack(promise) {
        if (!this.completed) {
            this.throwError("Incomplete Object Construction Exception: Character object not completed in construction. Please call chain-able method '.complete()' to complete construction.");
        }
        if (this.stage === null) {
            this.throwError("Null Exception: Character not added to stage.");
        } else if (!this.stage.isActive) {
            this.throwError("Not loaded Exception: Not allowed to animate on stage that re not loaded");
        }

        var newArr = new Array();
        var l = this.stage.getCharArray().length;
        newArr.push(this);
        for (var i = 0; i < l; i++) {
            if (this.stage.getCharArray()[i] !== this) {
                newArr.push(this.stage.getCharArray()[i]);
            }
        }

        this.stage.changeArrayOrder(newArr, promise);
    }

    bringBelowOverlay(promise) {
        if (!this.completed) {
            this.throwError("Incomplete Object Construction Exception: Character object not completed in construction. " +
                    "Please call chain-able method '.complete()' to complete construction.");
        }
        if (this.stage === null) {
            this.throwError("Null Exception: Character not added to stage. ");
        } else if (!this.stage.isActive) {
            this.throwError("Not loaded Exception: Not allowed to animate on stage that re not loaded. ");
        }
        this.overlay = false;
        this.stage.changeArrayOrder(this.stage.getCharArray(), promise);
    }

    bringAboveOverlay(promise) {
        if (!this.completed) {
            this.throwError("Incomplete Object Construction Exception: Character object not completed in construction. " +
                    "Please call chain-able method '.complete()' to complete construction.");
        }
        if (this.stage === null) {
            this.throwError("Null Exception: Character not added to stage. ");
        } else if (!this.stage.isActive) {
            this.throwError("Not loaded Exception: Not allowed to animate on stage that re not loaded. ");
        }

        this.overlay = true;
        this.stage.changeArrayOrder(this.stage.getCharArray(), promise);
    }

    //Animations

    speak(text, promise, time, skip, pw, bool) {
        if (!this.completed) {
            this.throwError("Incomplete Object Construction Exception: Character object not completed in construction. " +
                    "Please call chain-able method '.complete()' to complete construction.");
        }
        if (this.stage === null) {
            this.throwError("Null Exception: Character not added to stage. ");
        } else if (!this.stage.isActive) {
            this.throwError("Not loaded Exception: Not allowed to animate on stage that re not loaded. ");
        }

        var tb = this.stage.getTextbox();

        skip = this.sanitizeInput("boolean", skip, this.dSkip, true, "skip", "speak");

        tb.setName(this.name);
        tb.setCenter(false);
        tb.setSize(this.fontsize);
        tb.setColor(this.textcolor);
        tb.setBold(this.bold);
        tb.setItalic(this.italic);
        if (!skip) {
            tb.setUnskippable();
        }

        var sent = tb.displayText(text, promise, time, bool);

        //console.log(backlog);
        if (sent) {
            if (pw !== "hehehe") {
                backlog += "<br>" + "<b>" + this.name + ": </b>";
            } else {
                backlog += " ";
            }

            backlog += text;
        }
        return sent;

    }

    contSpeaking(text, promise, time, skip) {
        return this.speak(text, promise, time, skip, "hehehe", false);
    }

    setDefaultFlip(promise, time, graph, skip) {
        time = this.sanitizeInput("number", time, 0, 0, "time", "setDefaultFlip");
        this.flipped = false;
        this.vflipped = false;
        this.animate(time, promise, graph, skip);
    }

    flipVertically(promise, time, graph, skip) {
        time = this.sanitizeInput("number", time, 0, 0, "time", "flipVertically");
        this.vflipped = !this.vflipped;
        this.animate(time, promise, graph, skip);
    }

    flipHorizontally(promise, time, graph, skip) {
        time = this.sanitizeInput("number", time, 0, 0, "time", "flipHorizontally");
        this.flipped = !this.flipped;
        this.animate(time, promise, graph, skip);
    }

    scale(x, y, time, promise, swing, skippable) {
        this.preScale(x, y);
        this.animate(time, promise, swing, skippable);
    }

    move(x, y, time, promise, swing, skippable) {
        this.preMove(x, y);
        this.animate(time, promise, swing, skippable);
    }

    jump(x, y, time, promise, swing, skippable) {
        x = this.sanitizeInput("number", x, this.dX, 0, "x", "jump");
        y = this.sanitizeInput("number", y, this.dY, 0, "y", "jump");
        this.setXOffSet(x);
        this.setYOffSet(y);
        this.animate(time, promise, swing, skippable);
    }

    appear(time, promise, swing, skippable) {
        this.opacity = 1;
        this.animate(time, promise, swing, skippable);
    }

    disappear(time, promise, swing, skippable) {
        this.opacity = 0;
        this.animate(time, promise, swing, skippable);
    }

    moveAnchorX(aX, time, promise, swing, skippable, adjust) {
        aX = this.sanitizeInput("number", aX, this.daX, 0, "aX", "moveAnchorX");
        adjust = this.sanitizeInput("boolean", adjust, true, true, "adjust", "moveAnchorX");

        var cX = this.getProjectedX(this.xAlign, this.anchorX, this.x, this.w);
        var nX = this.getProjectedX(this.xAlign, aX, this.x, this.w);

        if (adjust) {
            this.x += (cX - nX);
        }

        this.setAnchorX(aX);
        this.animate(time, promise, swing, skippable);
    }

    moveAnchorY(aY, time, promise, swing, skippable, adjust) {
        aY = this.sanitizeInput("number", aY, this.daY, 0, "aY", "moveAnchorY");
        adjust = this.sanitizeInput("boolean", adjust, true, true, "adjust", "moveAnchorY");

        var cY = this.getProjectedY(this.yAlign, this.anchorY, this.y, this.h);
        var nY = this.getProjectedY(this.yAlign, aY, this.y, this.h);

        if (adjust) {
            var yDiff = (cY - nY);
            var scopedYDiff = yDiff / this.yscale();
            this.y += scopedYDiff;
        }
        this.setAnchorY(aY);
        this.animate(time, promise, swing, skippable);
    }

    moveVerticalAlign(valign, time, promise, swing, adjust, skippable) {
        valign = this.sanitizeInput("number", valign, this.dyA, 0, "valign", "moveVerticalAlign");
        adjust = this.sanitizeInput("boolean", adjust, true, true, "adjust", "moveVerticalAlign");

        var cY = this.getProjectedY(this.yAlign, this.anchorY, this.y, this.h);
        var nY = this.getProjectedY(valign, this.anchorY, this.y, this.h);

        if (adjust) {
            var yDiff = (cY - nY);
            var scopedYDiff = yDiff / this.yscale();
            this.y += scopedYDiff;
        }

        this.setVerticalAlign(valign);
        this.animate(time, promise, swing, skippable);
    }

    moveHorizontalAlign(halign, time, promise, swing, adjust, skippable) {
        halign = this.sanitizeInput("number", halign, this.dyA, 0, "halign", "moveHorizontalAlign");
        adjust = this.sanitizeInput("boolean", adjust, true, true, "adjust", "moveHorizontalAlign");

        var cX = this.getProjectedX(this.xAlign, this.anchorX, this.x, this.w);
        var nX = this.getProjectedX(halign, this.anchorX, this.x, this.w);

        if (adjust) {
            this.x += (cX - nX);
        }
        this.setHorizontalAlign(halign);
        this.animate(time, promise, swing, skippable);

    }

    blur(blur, time, promise, swing, skip) {
        this.setBlur(blur);
        this.animate(time, promise, swing, skip);
    }

    invert(invert, time, promise, swing, skip) {
        this.setInvert(invert);
        this.animate(time, promise, swing, skip);
    }

    grayscale(grayscale, time, promise, swing, skip) {
        this.setGrayscale(grayscale);
        this.animate(time, promise, swing, skip);
    }

    sepia(sepia, time, promise, swing, skip) {
        this.setSepia(sepia);
        this.animate(time, promise, swing, skip);

    }

    contrast(contrast, time, promise, swing, skip) {
        this.setContrast(contrast);
        this.animate(time, promise, swing, skip);
    }

    saturate(saturate, time, promise, swing, skip) {
        this.setSaturation(saturate);
        this.animate(time, promise, swing, skip);
    }

    brightness(brightness, time, promise, swing, skip) {
        this.setBrightness(brightness);
        this.animate(time, promise, swing, skip);
    }

    rotateHue(angle, time, promise, swing, skip) {
        this.setHueRotation(angle);
        this.animate(time, promise, swing, skip);
    }

    rotateClockwise(angle, time, promise, swing, skip) {
        this.preRotate(angle);
        this.animate(time, promise, swing, skip);
    }

    rotateAntiClockwise(angle, time, promise, swing, skip) {
        this.preRotate(-angle);
        this.animate(time, promise, swing, skip);
    }

    skew(x, y, time, promise, swing, skip) {
        this.preSkew(x, y);
        this.animate(time, promise, swing, skip);
    }

    wait(time, promise, skippable) {
        if (!this.completed) {
            this.throwError("Incomplete Object Construction Exception: Character object not completed in construction. Please call chain-able method '.complete()' to complete construction.");
        }
        if (this.stage === null) {
            this.throwError("Null Exception: Character not added to stage.");
        } else if (!this.stage.isActive) {
            this.throwError("Not loaded Exception: Not allowed to animate on stage that re not loaded.");
        }

        time = this.sanitizeInput("number", time, 0, 500, "time", "wait");
        skippable = this.sanitizeInput("boolean", skippable, this.dSkip, true, " skippable", "wait");

        if (time < 0) {
            this.throwError("Negative Time Exception: Time for appearing animation has to be positive. Entered value: " + time);
        }

        var e = "#" + this.id;
        var char = this;
        this.canSkip = skippable;
        TweenLite.to(e, time / 1000, {immediateRender: true, onComplete: function () {
                char.canSkip = true;
                if (typeof promise !== "undefined" && typeof promise !== null) {
                    if (typeof promise === "function") {
                        promise();
                    } else {
                        char.typeError("Promise has to be a function! ", promise);
                    }
                }

            }});
    }

    animate(time, promise, easing, skippable) {
        if (!this.completed) {
            this.throwError("Incomplete Object Construction Exception: Character object not" +
                    "completed in construction. Please call chain-able method '.complete()' to complete construction");
        }
        if (this.stage === null) {
            this.throwError("Null Exception: Character not added to stage. ");
        } else if (!this.stage.isActive) {
            this.throwError("Not loaded Exception: Not allowed to animate on stage that re not loaded. Character id: " + this.id + "Character name: " + this.name);
        }

        time = this.sanitizeInput("number", time, 0, 500, "time", "animate");
        skippable = this.sanitizeInput("boolean", skippable, this.dSkip, true, " skippable", "animate");
        easing = this.sanitizeInput("object", easing, this.dGraph, linear, "graph", "animate")
        if (time < 0) {
            this.throwError("Negative Time Exception: Time for appearing animation has to be positive. Entered value: " + time);
        }
        if (!isEasingValid(easing)) {
            this.throwError("Illegal Argument Exception: Unknown easing type!");
        }

        this.canSkip = skippable;

        var newX = this.getProjectedX(this.xAlign, this.anchorX, this.x, this.w);
        var newY = this.getProjectedY(this.yAlign, this.anchorY, this.y, this.h);

        //values calculation
        if (!embbedMode) {
            var x = newX * this.xscale() + "vw";      //x pos
            var y = newY + "vw";                    //y pos
            var w = this.w * this.xscale() + "vw";    //width
            var h = this.h * this.xscale() + "vw";    //height

        } else {
            var x = newX + "%";      //x pos
            var y = newY / this.yscale() + "%";                    //y pos
            var w = this.w + "%";    //width
            var h = this.h * this.xscale() / this.yscale() + "%";    //height
        }

        var a = this.opacity;                   //alpha
        var e = "#" + this.id;                  //element identifier
        var easeCSS = cssEasing(easing);        //easing for CSS

        //filters
        var blur = "blur(" + this.vblur * 10 + "px)";
        var invert = " invert(" + this.vinvert * 100 + "%)";
        var grayscale = " grayscale(" + this.vgrayscale * 100 + "%)";
        var sepia = " sepia(" + this.vsepia * 100 + "%)";
        var contrast = " contrast(" + this.vcontrast * 100 + "%)";
        var saturate = " saturate(" + this.vsaturation * 100 + "%)";
        var brightness = " brightness(" + this.vbrightness * 100 + "%)";
        var hue = " hue-rotate(" + this.vhue + "deg)";

        //transform
        var scaleX = this.flipped ? -1 : 1;
        var scaleY = this.vflipped ? -1 : 1;
        var skewX = this.vskewx + "deg";
        var skewY = this.vskewy + "deg";
        var rotate = this.vrotate + "deg";


        var char = this;

        var start = function () {
            char.getDiv().css("transition", "filter " + time / 1000 + "s " + easeCSS).promise().done(function () {
                char.getDiv().css("filter", blur + invert + grayscale + sepia + contrast + saturate + brightness + hue);
                char.finalFilter = blur + invert + grayscale + sepia + contrast + saturate + brightness + hue;
            });
            if (characterLogging && char.logging && debugMode) {

                var id = "#kvn-char-logger-for-" + char.id;
                $(id).children(".table").children("table").children("tbody").children("tr").children(".old").each(function () {
                    if ($(this).children("input").length) {
                        $(this).children("input").css("display", "none");
                        $(this).children(".act").css("display", "block");

                    }
                    $(this).children(".act").css("text-align", "right");
                });
                $(id).children(".table").children("table").children("tbody").children("tr").children(".char-animate-log").css("display", "table-cell");
                $(id).children(".table").children("table").children("tbody").children("tr").children(".log-expected-end-val").css("display", "table-cell");
                $(id).children(".table").children("table").children("tbody").children("tr").children(".log-expected-end-val").each(function () {
                    var value = char[$(this).parent("tr").attr('stat')];
                    $(this).html(value);
                });

                $(id + " .char-run-state").html("animating");
            }
        };

        this.animationDuration = time;

        TweenLite.to(e, time / 1000, {
            left: x, top: y, width: w, height: h, opacity: a,
            rotation: rotate, scaleX: scaleX, scaleY: scaleY, skewX: skewX, skewY: skewY,
            immediateRender: true, ease: gsEasing(easing),
            onStart: start, onComplete: function () {
                char.getDiv().css("transition", "").promise().done(function () {
                    char.getDiv().css("filter", blur + invert + grayscale + sepia + contrast + saturate + brightness + hue).promise().done(function () {
                        char.canSkip = true;
                        //logging
                        if (characterLogging && char.logging && debugMode) {
                            var id = "#kvn-char-logger-for-" + char.id;
                            $(id).children(".table").children("table").children("tbody").children("tr").children(".old").each(function () {
                                if ($(this).children("input").length) {
                                    $(this).children("input").css("display", "block");
                                    $(this).children(".act").css("display", "none");
                                }
                                $(this).children(".act").css("text-align", "left");
                            });
                            $(id).children(".table").children("table").children("tbody").children("tr").children(".char-animate-log").css("display", "none");
                            $(id).children(".table").children("table").children("tbody").children("tr").children(".log-expected-end-val").css("display", "none");
                            $(id).children(".table").children("table").children("tbody").children("tr").children(".old").each(function () {
                                var value = char[$(this).parent("tr").attr('stat')];

                                $(this).children(".act").html(value);
                                $(this).children("input").val(value);
                            });

                            $(id + " .char-run-state").html("static");
                        }


                        if (typeof promise !== "undefined" && promise !== null) {
                            if (typeof promise === "function") {
                                promise();
                            } else {
                                char.typeError("Promise has to be a function! ", promise);
                            }
                        }
                    });
                });
            }
        });

    }

    resetAll(time, promise, swing, skippable) {
        this.resetValues();
        this.animate(time, promise, swing, skippable);
    }

    //frill
    heartAttack(xOff, yOff, promise, skip) {
        if (!this.completed) {
            this.throwError("Incomplete Object Construction Exception: Character object not completed in construction. Please call chain-able method '.complete()' to complete construction.");
        }
        if (this.stage === null) {
            this.throwError("Null Exception: Character not added to stage.");
        } else if (!this.stage.isActive) {
            this.throwError("Not loaded Exception: Not allowed to animate on stage that re not loaded. ");
        }

        skip = this.sanitizeInput("boolean", skip, this.dSkip, true, " skippable", "heartAttack");

        yOff = this.sanitizeInput("number", yOff, 0, 0, "yOff", "heartAttack");
        xOff = this.sanitizeInput("number", xOff, 0, 0, "xOff", "heartAttack");

        var cX = this.getRealX();
        var centerX = this.getProjectedX(1, 1, this.x, this.w);
        var xOffCenter = cX - centerX;

        var cY = this.getRealY();
        var centerY = this.getProjectedY(1, 1, this.y, this.h);
        var yOffCenter = cY - centerY;

        var noOfGhost = 4;
        //console.log("called fuckers");
        var ghost = new Array();
        for (var i = 0; i < noOfGhost; i++) {
            ghost.push(this.getGhost(i));
        }

        var ww = new Array();
        for (var i = 0; i < noOfGhost; i++) {
            ww.push(this.w * (1.3 + i * 0.05));
        }

        var hh = new Array();
        for (var i = 0; i < noOfGhost; i++) {
            hh.push(this.h * (1.3 + i * 0.05));
        }

        var xx = new Array();
        for (var i = 0; i < noOfGhost; i++) {
            xx.push(this.getProjectedX(1, 1, this.x + xOffCenter, ww[i]) + xOff);
        }

        var yy = new Array();
        for (var i = 0; i < noOfGhost; i++) {
            yy.push(this.getProjectedY(1, 1, this.y + yOffCenter, hh[i]) + yOff);
        }

        var hf = (this.flipped ? "-1" : "1");
        var vf = (this.vflipped ? "-1" : "1");
        var z = this.getDiv().css("z-index");

        var char = this;

        var src = dir + "images/char/" + char.currentImage;
        char.getDiv().children(".imgchar").each(function () {
            if ($(this).css("display") !== "none") {
                src = $(this).attr('src');
            }
        });

        for (var i = 0; i < noOfGhost; i++) {
            ghost[i].children("img").attr("src", src);
            ghost[i].css("left", xx[i] * 0.85 + "vw");
            ghost[i].css("top", yy[i] + "vw");
            ghost[i].css("width", ww[i] * 0.85 + "vw");
            ghost[i].css("height", hh[i] * 0.85 + "vw");
            ghost[i].css("transform", "translate(" + hf + "," + vf + ")");
            ghost[i].css("filter", "invert(100%)");
            ghost[i].css("z-index", z);
            ghost[i].css("display", "block")
        }

        this.getDiv().css("filter", "invert(100%)");
        var time = 325;
        var pause = 0;
        var out = 325;

        var ele = this;
        var cArr = this.stage.getCharArray();
        for (var i = 0; i < cArr.length; i++) {
            cArr[i].getDiv().css("filter", "invert(100%");
        }

        this.canSkip = skip;

        $("#vn-bkgd-r").css("filter", "invert(100%)").promise().done(function () {
            for (var i = 0; i < noOfGhost; i++) {
                var last = false;
                if (i === noOfGhost - 1) {
                    last = true;
                }
                if (i === 0) {
                    window.heartbeat.play();

                }
                TweenLite.to(ghost[i], time / 1000, {
                    left: ele.getRealX() * ele.xscale() + "vw",
                    top: ele.getRealY() + "vw",
                    width: ele.w * ele.xscale() + "vw",
                    height: ele.h * ele.xscale() + "vw",
                    ease: gsEasing(easeOut),
                    onComplete: function () {
                        if (last) {
                            for (var ii = 0; ii < noOfGhost; ii++) {
                                var isLast = false;
                                if (ii === noOfGhost - 1) {
                                    isLast = true;
                                }
                                $("#vn-screen").css("transition", "0.25s filter ease-in");
                                $("#vn-screen").css("filter", "brightness(200%)");
                                TweenLite.to(ghost[ii], out / 1000, {
                                    left: xx[ii] * ele.xscale() + "vw",
                                    top: yy[ii] + "vw",
                                    width: ww[ii] * ele.xscale() + "vw",
                                    height: hh[ii] * ele.xscale() + "vw",
                                    ease: gsEasing(easeOut),
                                    onComplete: function () {
                                        if (isLast) {
                                            window.heartbeat.stop();
                                            $("#vn-screen").css("transition", "0.2s filter ease-out").promise().done(function () {
                                                $("#vn-screen").css("filter", "brightness(100%)");
                                            });
                                            ele.stage.selfReapplyFilterCSS();
                                            for (var i = 0; i < cArr.length; i++) {
                                                cArr[i].reapplyFilterCSS();
                                            }
                                            for (var i2 = 0; i2 < noOfGhost; i2++) {
                                                if (i2 === noOfGhost - 1) {
                                                    ghost[i2].css("display", "none").promise().done(function () {
                                                        $("#vn-screen").css("filter", "brightness(100%)");
                                                        TweenLite.to(ghost[i2], 0.2, {onComplete: function () {
                                                                if (promise !== null && typeof promise === "function") {
                                                                    promise();
                                                                }
                                                            }});

                                                    });
                                                } else {
                                                    ghost[i2].css("display", "none");
                                                }
                                            }

                                        }
                                    }
                                });

                            }
                        }
                    }

                });

            }
        });


    }

    triggered(time, promise, skip, shake, delay) {
        if (!this.completed) {
            this.throwError("Incomplete Object Construction Exception: Character object not completed in construction. Please call chain-able method '.complete()' to complete construction.");
        }
        if (this.stage === null) {
            displayError("Null Exception: Character not added to stage.");
        } else if (!this.stage.isActive) {
            displayError("Not loaded Exception: Not allowed to animate on stage that re not loaded.");
        }
        skip = this.sanitizeInput("boolean", skip, this.dSkip, true, "skip", "trigger");
        time = this.sanitizeInput("number", time, 500, 500, "time", "trigger");
        shake = this.sanitizeInput("number", shake, 0.5, 0.5, "shake", "trigger");
        delay = this.sanitizeInput("number", delay, 25, 25, "delay", "trigger");

        var count = 0;
        var ele = this;

        var loop = setInterval(function () {
            var arte = count % 4;
            var shak = shake / 100;
            if (arte === 0) {
                ele.getDiv().css("left", (ele.getRealX() - shak * ele.w) * ele.xscale() + "vw");
                ele.getDiv().css("top", ele.getRealY() - shak * ele.h * ele.xscale() + "vw");
            } else if (arte === 1) {
                ele.getDiv().css("left", (ele.getRealX() + shak * ele.w) * ele.xscale() + "vw");
                ele.getDiv().css("top", ele.getRealY() + shak * ele.h * ele.xscale() + "vw");
            } else if (arte === 2) {
                ele.getDiv().css("left", (ele.getRealX() + shak * ele.w) * ele.xscale() + "vw");
                ele.getDiv().css("top", ele.getRealY() - shak * ele.h * ele.xscale() + "vw");
            } else {
                ele.getDiv().css("left", (ele.getRealX() - shak * ele.w) * ele.xscale() + "vw");
                ele.getDiv().css("top", ele.getRealY() + shak * ele.h * ele.xscale() + "vw");
            }
            count++;
        }, delay);

        this.wait(time, function () {
            clearInterval(loop);
            if (typeof promise === "function") {
                promise();
            }
        }, skip);
    }

    glitch(image) {
        if (!this.completed) {
            this.throwError("Incomplete Object Construction Exception: Character object not completed in construction. Please call chain-able method '.complete()' to complete construction.");
        }
        if (this.stage === null) {
            this.throwError("Null Exception: Character not added to stage.");
        } else if (!this.stage.isActive) {
            this.throwError("Not loaded Exception: Not allowed to animate on stage that re not loaded.");
        }
        var custom = false;
        if (image !== null && typeof image !== "undefined") {
            image = dir + "images/char/" + this.spriteArray[image];
            custom = true;
        }
        var src = this.getDiv().children("img").attr("src");
        this.getDiv().children(".glitch__img").each(function (e) {
            $(this).css("background-image", "url('" + src + "')");
            if (custom) {
                $(this).css("background-image", "url('" + image + "')");
            }

            $(this).css("opacity", "1");
            $(this).css("animation-duration", "4s");
            $(this).css("animation-delay", "0s");
            $(this).css("animation-timing-function", "linear");
            $(this).css("animation-iteration-count", "infinite");
            if (e === 1) {
                $(this).css("background-color", "var(--blend-color-2)");
                $(this).css("background-blend-mode", "var(--blend-mode-2)");
                $(this).css("animation-name", "glitch-anim-1-2");
            }
            if (e === 2) {
                $(this).css("background-color", "var(--blend-color-3)");
                $(this).css("background-blend-mode", "var(--blend-mode-3)");
                $(this).css("animation-name", "glitch-anim-2-2");
            } else if (e === 3) {
                $(this).css("background-color", "var(--blend-color-4)");
                $(this).css("background-blend-mode", "var(--blend-mode-4)");
                $(this).css("animation-name", "glitch-anim-3-2");
            } else if (e === 4) {
                $(this).css("background-color", "var(--blend-color-5)");
                $(this).css("background-blend-mode", "var(--blend-mode-5)");
                $(this).css("animation-name", "glitch-anim-flash");
            }
        });
        if (!custom) {
            var ele = this;

            this.gloop = setInterval(function () {
                //console.log("trying to edit image");
                var nsrc = dir + "images/char/" + ele.currentImage;

                ele.getDiv().children(".imgchar").each(function () {
                    if ($(this).css("visibility") !== "hidden") {
                        nsrc = $(this).attr('src');
                    }
                });
                ele.getDiv().children(".glitch__img").each(function (e) {
                    //console.log("editing image");
                    $(this).css("background-image", "url('" + nsrc + "')");
                });
            }, 3000);
        }
    }

    fix() {
        clearInterval(this.gloop);

        this.getDiv().children(".glitch__img").each(function (e) {
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

    cycle(sequence) {
        if (!this.completed) {
            this.throwError("Incomplete Object Construction Exception: Character object not completed in construction. Please call chain-able method '.complete()' to complete construction.");
        }
        if (this.stage === null) {
            this.throwError("Null Exception: Character not added to stage.");
        } else if (!this.stage.isActive) {
            this.throwError("Not loaded Exception: Not allowed to animate on stage that re not loaded.");
        }
        if (this.isAnimating()) {
            this.throwError("Character cannot cycle if it is animating!");
        }
        if (this.isCycle) {
            this.throwError("Character cannot cycle if its already in a cycle");
        }

        if (typeof sequence !== "function") {
            this.throwError("Character cycle sequence has to be a function");
        }

        this.cyName = this.name;
        this.cyspriteArray = clone(this.spriteArray);
        this.cyW = this.w;
        this.cyH = this.h;
        this.cyX = this.x;
        this.cyY = this.y;
        this.cyxA = this.xAlign;
        this.cyyA = this.yAlign;
        this.cyaX = this.anchorX;
        this.cyaY = this.anchorY;
        this.cyoverlay = this.overlay;
        this.cyflipped = this.flipped;
        this.cyvflipped = this.vflipped;
        this.cyopacity = this.opacity;
        this.cydSkip = this.dSkip;
        this.cydGraph = this.dGraph;
        this.cyTextcolor = this.textcolor;
        this.cyfontsize = this.fontsize;
        this.cyBold = this.bold;
        this.cyItalic = this.italic;
        this.cyblur = this.vblur;
        this.cygrayscale = this.vgrayscale;
        this.cyinvert = this.vinvert;
        this.cysepia = this.vsepia;
        this.isCycle = true;
        this.cycleseq = sequence;
        this.cycleseq();
    }

    endOfCycle() {
        if (this.isCycle && this.cycleseq !== null) {
            this.cycleseq();
        }
    }

    stopCycle(time, promise, swing, skip) {
        this.name = this.cyName;
        this.spriteArray = clone(this.cyspriteArray);
        this.w = this.cyW;
        this.h = this.cyH;
        this.x = this.cyX;
        this.y = this.cyY;
        this.xAlign = this.cyxA;
        this.yAlign = this.cyyA;
        this.anchorX = this.cyaX;
        this.anchorY = this.cyaY;
        this.overlay = this.cyoverlay;
        this.flipped = this.cyflipped;
        this.vflipped = this.cyvflipped;
        this.opacity = this.cyopacity;
        this.dSkip = this.cydSkip;
        this.cydGraph = this.dGraph;
        this.textcolor = this.cyTextcolor;
        this.fontsize = this.cyfontsize;
        this.bold = this.cyBold;
        this.italic = this.cyItalic;
        this.vblur = this.cyblur;
        this.vgrayscale = this.cygrayscale;
        this.vinvert = this.cyinvert;
        this.vsepia = this.cysepia;
        this.cycleseq = null;
        //cut animations
        var id = "#" + this.id;
        var ghost0 = "#ghost-" + 0 + "-" + this.id;
        var ghost1 = "#ghost-" + 1 + "-" + this.id;
        var ghost2 = "#ghost-" + 2 + "-" + this.id;
        var ghost3 = "#ghost-" + 3 + "-" + this.id;
        var animations = TweenLite.getTweensOf([id, ghost0, ghost1, ghost2, ghost3]);
        for (var i = 0; i < animations.length; i++) {
            animations[i].progress(1);
        }

        var promise = function () {
            promise();
            this.cycle = false;
        };

        this.animate(time, promise, swing, skip);
    }

    //debug
    typeError(error, input) {
        displayError("Type Exception: " + error +
                "<br>Your input type: " + typeof input +
                "<br>Your input: " + input +
                "<br> Character id: " + this.id
                + "<br>Charater name: " + this.name +
                "<br>Scene: " + getCurrentSceneID() +
                "<br>Frame: " + getCurrentFrame());
    }

    throwError(error) {
        displayError(error +
                "<br> Character id: " + this.id
                + "<br>Charater name: " + this.name +
                "<br>Scene: " + getCurrentSceneID() +
                "<br>Frame: " + getCurrentFrame()
                );

    }

    constructorInput(acceptedType, input, paramName) {
        if (typeof input !== acceptedType) {
            displayError("Type Exception: '" + paramName + "' parameter in method 'contructor' must be a " + acceptedType + "! " +
                    "<br>" + paramName + " input type: " + typeof input +
                    "<br>" + paramName + " input value: " + input +
                    "<br> Character id: " + this.id
                    + "<br>Charater name: " + this.name
                    );
        } else {
            return input;
        }
    }

    cSInput(acceptedType, input, cdef, edef, paramName) {
        if (input === null || typeof input === "undefined") {
            input = cdef;
        }
        if (input === def) {
            input = edef;
        }
        if (typeof input !== acceptedType) {
            displayError("Type Exception: '" + paramName + "' parameter in constructor must be a " + acceptedType + "! " +
                    "<br>" + paramName + " input type: " + typeof input +
                    "<br>" + paramName + " input value: " + input +
                    "<br> Character id: " + this.id
                    + "<br>Charater name: " + this.name
                    );
        }
        return input;
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
                    "<br> Character id: " + this.id
                    + "<br>Charater name: " + this.name +
                    "<br>Scene: " + getCurrentSceneID() +
                    "<br>Frame: " + getCurrentFrame()
                    );
        }
        return input;
    }

    stopLogging() {
        if (debugMode) {
            this.logging = false;
            var id = "#kvn-char-logger-for-" + this.id;
            $(id).remove();
        }
    }

    startLogging() {
        if (!this.logging && this.stage !== null && this.stage.isActive && debugMode && characterLogging) {
            this.logging = true;
            var log = "<div class='debug-holder char-logger debug-dark' id='kvn-char-logger-for-" + this.id + "'>";
            log += "<div class='display'>ID:</div><div class='display red'>" + this.id + "</div>&nbsp;";
            log += "<div class='display'>State:</div><div class='char-run-state display red'>static</div>";
            log += "<div class='clickable char-log-editting' char='" + this.id + "'>edit</div>"
            log += "<div class='char-log-export clickable' char='" + this.id + "'>export</div>";
            log += "<div class='char-log-close clickable' char='" + this.id + "'>stop logging</div>";

            //basic info
            log += "<div class='title' tag='basic'>Basic -</div>";
            log += "<div class='table' tag='basic'>";

            log += "<table>";
            log += this.generateRow(false, "Name", "name");
            log += this.generateRow(false, "Sprite", "currentSprite");
            log += this.generateRow(false, "Image Src", "currentImage");
            log += this.generateRow(true, "Alpha", "opacity");

            log += "</table>";
            log += "</div>";

            //position
            log += "<div class='title' tag='pos'>Position -</div>";
            log += "<div class='table' tag='pos'>";
            log += "<table>";

            log += this.generateRow(true, "Width", "w");
            log += this.generateRow(true, "Height", "h");
            log += this.generateRow(true, "X", "x");
            log += this.generateRow(true, "Y", "y");
            log += "</table>";
            log += "</div>";

            //anchor
            log += "<div class='title' tag='align'>Align -</div>";
            log += "<div class='table' tag='align'>";

            log += "<table>";
            log += this.generateRow(true, "Horizontal Alignment", "xAlign");
            log += this.generateRow(true, "Vertical Alignment", "yAlign");
            log += this.generateRow(true, "Anchor X", "anchorX");
            log += this.generateRow(true, "Anchor Y", "anchorY");

            log += "</table>";
            log += "</div>";

            //transform
            log += "<div class='title' tag='transform'>Transform -</div>";
            log += "<div class='table' tag='transform'>";

            log += "<table>";
            log += this.generateRow(true, "Rotation (deg)", "vrotate");
            log += this.generateRow(true, "Skex X (deg)", "vskewx");
            log += this.generateRow(true, "Skew Y (deg)", "vskewy");
            log += this.generateRow(false, "Horizontal Flip", "flipped");
            log += this.generateRow(false, "Vertical Flip", "vflipped");

            log += "</table>";
            log += "</div>";

            //filters
            log += "<div class='title' tag='filter'>Filters -</div>";
            log += "<div class='table' tag='filter'>";

            log += "<table>";
            log += this.generateRow(true, "Blur", "vblur");
            log += this.generateRow(true, "Grayscale", "vgrayscale");
            log += this.generateRow(true, "Invert", "vinvert");
            log += this.generateRow(true, "Sepia", "vsepia");
            log += this.generateRow(true, "Brightness", "vbrightness");
            log += this.generateRow(true, "Hue Rotate (deg)", "vhue");
            log += this.generateRow(true, "Saturation", "vsaturation");
            log += this.generateRow(true, "Contrast", "vcontrast");

            log += "</table>";
            log += "</div>";

            //text
            log += "<div class='title' tag='text'>Text -</div>";
            log += "<div class='table' tag='text'>";

            log += "<table>";
            log += this.generateRow(false, "Color", "textcolor");
            log += this.generateRow(false, "Font Size", "fontsize");
            log += this.generateRow(false, "Bold", "bold");
            log += this.generateRow(false, "Italic", "italic");

            log += "</table>";
            log += "</div>";



            log += "</div>";

            $("html").append(log);
        }
    }

    generateRow(editable, statName, stat) {

        var row = "<tr class='log-attr kvn-char-log-" + stat + "' stat='" + stat + "'>";



        if (!this.isAnimating()) {
            row += "<td class='kvn-log-stat-name'>" + statName + "</td>";


            row += "<td class='old'>";
            row += editable ? "<input class='kvn-edit' char='" + this.id + "' type='number' value='" + this[stat] + "'>" : "";


            var x = editable ? "style='display:none;' " : "";

            row += "<div class='act' " + x + ">" + this[stat] + "</div>";
            row += "</td>";

            row += "<td class='char-animate-log' style='display:none'> --></td>";

            row += "<td class='log-expected-end-val'>";
            row += "</td>";
        } else {
            row += "<td class='kvn-log-stat-name'>" + statName + "</td>";


            row += "<td class='old'>";
            row += editable ? "<input class='kvn-edit' char='" + this.id + "' style='display:none;' type='number' value='" + this[stat] + "'>" : "";


            row += "<div class='act'>" + "?" + "</div>";
            row += "</td>";

            row += "<td class='char-animate-log' style=''> --></td>";

            row += "<td class='log-expected-end-val'>" + this[stat];
            row += "</td>";
        }
        row += "<tr>";
        return row;
    }

    //multithread support
    setWaiter(char, promise) {
        if (!this.completed) {
            this.throwError("Incomplete Object Construction Exception: Character object not completed in construction. Please call chain-able method '.complete()' to complete construction. ");
        }
        if (this.stage === null) {
            this.throwError("Null Exception: Character not added to stage.");
        } else if (!this.stage.isActive) {
            this.throwError("Not loaded Exception: Not allowed to animate on stage that re not loaded.");
        }

        if (this.waiting[char] !== preNotify) {
            if (this.waiting[char] === null || typeof this.waiting[char] === "undefined") {
                this.waiting[char] = promise;
            } else {
            }
        } else {
            promise();
            this.waiting[char] = null;

        }
    }

    notifyWaiter(char) {
        if (!this.completed) {
            this.throwError("Incomplete Object Construction Exception: Character object not completed in construction. Please call chain-able method '.complete()' to complete construction. ");
        }
        if (this.stage === null) {
            this.throwError("Null Exception: Character not added to stage.");
        } else if (!this.stage.isActive) {
            this.throwError("Not loaded Exception: Not allowed to animate on stage that re not loaded.");
        }

        if (typeof this.waiting[char] === "function") {

            this.waiting[char]();
            this.waiting[char] = null;
        } else {
            this.waiting[char] = preNotify;
        }
    }

    waitFor(char, promise) {
        char.setWaiter(this, promise);
    }

}


