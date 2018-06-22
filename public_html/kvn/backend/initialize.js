$(document).ready(function () {
    var timeout = setTimeout(function () {
        if (!window.imagesLoaded) {
            displayError("unable to load images");
        }
        if (!isAllSoundLoaded()) {
            displayError("unable to load sound");
        }
        if (!isAllScriptLoaded()) {
            displayError("unable to load scripts");
            for (var i2 = 0; i2 < sArr.length; i2++) {
                if (!sArr[i2])
                    console.log(i2);
            }
        }
        if(!window.paceDone){
            displayError("pace failed. try disabling pace and runing the engine again");
        }
    }, 10000);

    var loadLoop = setInterval(function () {
        
        if (window.imagesLoaded && isAllSoundLoaded() && isAllScriptLoaded() && window.paceDone) {

            clearTimeout(timeout);
            clearInterval(loadLoop);

            
            $("#loadingscreen").css("display", "none");
         
            $("#the-rest-of-the-game").fadeIn(500);

            engineStarted = true;
            setTimeout(function () {
                try {
                    window.heartbeat = new GameSound(SFX, "heartbeat.mp3", false);
                    soundLoadPhase();
                    completeSoundLoad();
                } catch (e) {
                    displayRealError("Native Exception: soundLoadPhase may not be called or defined by scripter. Please defined the function soundLoadPhase(){} and put all GameSound constructor within (or leave it blank) within any part of your script (out side of scene and frame scope)", e);
                }
                var fsW = window.embbedFSWidth;
                if (screenfull.enabled) {
                    if (embbedMode) {
                        if (!screenfull.isFullscreen) {
                            //calcualte ratio to multiply by
                            window.kvnCurrentRatio = (window.gkvnW / 100);
                        } else {
                            //tabulate new ratio
                            window.kvnCurrentRatio = fsW / 100;
                        }
                        //adjust name text
                        var fs = 1.5 * window.kvnCurrentRatio;
                        $("#nametext").css("font-size", fs + "vw");
                    }
                }

                if (typeof psvm === "undefined" || psvm === null) {
                    publicStaticVoidMain(0);
                    initDebugger();
                } else {
                    if (psvm === "nubmarc") {
                        playScene(sid, frameVar);
                        initDebugger();
                    } else {
                        publicStaticVoidMain(psvm);
                        initDebugger();
                    }
                }
                setTimeout(function () {
                    $(window).trigger("resize");
                }, 100);
                
            }, 500);
        }
    }, 100);
});