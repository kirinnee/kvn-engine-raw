//global registries
var activeStage = null;
var isOption = false;
var currentScene = null;

var def = "defaultValueForVN-marcusIsNub";

var scenes = new Array();
var sceneIDArray = new Array();

var optionIDArray = new Array();
var optionList = new Array();

var characters = new Array();
var charIDArray = new Array();

var stages = new Array();
var stageIDArray = new Array();

var weathers = new Array();
var weatherIDArray = new Array();

var preNotify = new Array();

var backlog = "";
var isBacklog = false;
var bottomOfBL = false;
var scrollCount = 0;

var onClick = false;

var externalScrollCount = 0;

var mobileSwitch = true;

var cMarker = false;


$(document).ready(function () {





    if (hideOverflow) {
        //console.log("hiding");
        $("body").css("overflow", "hidden");
        var overflow = 0;
        $("#canvas").css("marginTop", "0");
        if ($("body").prop('scrollHeight') > $("body").height()) {
            overflow = $("body").prop('scrollHeight') - $("body").height();
            console.log(overflow);
        }

        var browser = navigator.userAgent.toLowerCase();
        if (browser.indexOf('firefox') > -1) {
            console.log(overflow);
            overflow = 0;
        }

        $("#canvas").css("marginTop", -overflow + "px");
        $("#backlog").css("top", overflow + "px");
        $("#debugger").css("margin-top", overflow + "px");
    }

    setInterval(function () {
        if (cMarker) {
            if (!pause) {
                window.adjustMarker();
            }
        }
    }, 50);



    //VN click representitives
    $("#kirinnee-visual-novel-engine").mousewheel(function (event) {
        if (pause) {
            return;
        }

        if (!embbedScrollTrigger && embbedMode && !screenfull.isFullscreen) {
            return;
        }

        if (event.deltaY < -0.5) {
            //console.log(scrollCount);
            if (isBacklog) {
                var elem = $("#backlog").get(0);
                console.log(elem.scrollTop + ": " + elem.scrollHeight + ": " + elem.offsetHeight);
                if (elem.scrollTop >= (elem.scrollHeight - elem.offsetHeight)) {
                    scrollCount++;
                    if (scrollCount > 10) {
                        externalScrollCount = 0;
                        closeBacklog();
                    }
                }

            } else {
                if (externalScrollCount > 2) {
                    onVNClick();
                    externalScrollCount = 0;
                } else {
                    externalScrollCount++;
                }
            }
        }
        if (event.deltaY > 0.5) {
            if (!isBacklog) {
                showBacklog();
            }
            scrollCount = 0;
        }

    });
    $(document).keyup(function (event) {
        if (pause) {
            return;
        }
        //console.log(event.keyCode);
        if (event.keyCode === 32 || event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40) {
            onVNClick();
        }
        if (isBacklog) {
            if (event.keyCode === 39 || event.keyCode === 40 || event.keyCode === 27) {
                closeBacklog();
            }
        }
    });



});

//event handlers
$(window).resize(function () {
    if (hideOverflow) {
        //console.log("resizing");
        var overflow = 0;
        $("#kirinnee-visual-novel-engine").css("top", 0);
        if ($("#kirinnee-visual-novel-engine").height() > window.innerHeight) {
            overflow = window.innerHeight - $("#kirinnee-visual-novel-engine").height();
        }
        //console.log(overflow);

        /*
         var browser = navigator.userAgent.toLowerCase();
         if (browser.indexOf('firefox') > -1) {
         console.log(overflow);
         overflow = 0;
         }
         */
        console.log(overflow);
        $("#kirinnee-visual-novel-engine").css("top", overflow + "px");
        $(".toggle-fs").css("top", -overflow + "px");
        $("#debugger").css("margin-top", -overflow + "px");
    }
});


//on swipe down
$(document).on("swipeDown", function () {
    if (!isiOS && !pause && !embbedMode) {
        if (!isBacklog) {
            showBacklog();
        }
        scrollCount = 0;
    }

});

//on swipe up
$(document).on("swipeUp", function () {
    if (!isiOS && !pause && !embbedMode) {
        if (isBacklog) {
            var elem = $("#backlog").get(0);
            console.log(elem.scrollTop + ": " + elem.scrollHeight + ": " + elem.offsetHeight);
            if (elem.scrollTop >= (elem.scrollHeight - elem.offsetHeight)) {
                scrollCount++;
                if (scrollCount > 0) {
                    externalScrollCount = 0;
                    closeBacklog();
                }
            }
        } else {
            if (externalScrollCount > 1) {
                onVNClick();
                externalScrollCount = 0;
            } else {
                externalScrollCount++;
            }
        }
    }
});

//on option choose
$(document).on('click', '.option', function () {
    if (!pause) {
        var id = $(this).attr('optionid');
        $(".option").remove();
        $("#optionholder").css("display", "none");
        if (optionList[id] !== null && typeof optionList[id] !== "undefined") {
            optionList[id]();
        }
        isOption = false;
    }
});

//on click screen
$(document).on('click', '#hclickbox', function () {
    if (!pause) {
        if (isBacklog) {
            closeBacklog();
        } else {
            onVNClick();
        }
    }
});

$(document).on('click', '#ok-button', function () {
    if (dontPauseMusic === true) {
        playEngine(true);
    } else {
        playEngine();
    }
    dontPauseMusic = false;

    $(".alert-title").html("");
    $(".alert-text").html("");
    $(".alert").css("display", "none");


    inAlert = false;

    if (typeof alertPromise === "function") {
        alertPromise();
        alertPromise = null;
    }
});

//vn-utils
function cutDownLayers() {
    $("#overlay").css("display", "none");
    $("#postoverlay").css("display", "none");
    $("#clickbox").css("display", "none");
    $("#hclickbox").css("display", "none");
    $(".glitch__img").css("display", "none");
}

function bringBackLayers() {
    $("#overlay").css("display", "block");
    $("#postoverlay").css("display", "block");
    $("#clickbox").css("display", "block");
    $("#hclickbox").css("display", "block");
    $(".glitch__img").css("display", "block");
}

function debugText() {
    $("#overlay").css("display", "none");
    //$("#postoverlay").css("display", "none");
    $("#clickbox").css("display", "none");
    $("#hclickbox").css("display", "none");
    $(".glitch__img").css("display", "none");
}

function getSceneByID(id) {
    return scenes[id];
}

function getOptionsByID(id) {
    return optionList[id];
}

function getCharacterByID(id) {
    return characters[id];
}

function getStageByID(id) {
    return stages[id];
}

//backend
function onVNClick() {
    if (!pause) {
        if (!isOption && $("#optionholder").css("display") === "none" && !isBacklog) {

            if (currentScene !== null) {
                try {
                    if (!onClick) {
                        onClick = true;
                        currentScene.onClick();
                    }
                } catch (e) {
                    displayRealError("Native Exception: Unknown native error occured in scene: " + currentScene.getID() + " frame " + currentScene.getCurrent(), e);
                }
            }
        }
    }
}


//Core Methods
function showBacklog() {
    scrollCount = 0;
    $("#backlog").html(backlog);

    $("#backlog").slideDown();
    $("#backlog").scrollTop($("#backlog").prop("scrollHeight"));
    isBacklog = true;
}
function closeBacklog() {
    $("#backlog").slideUp();
    isBacklog = false;
}

function pauseEngine(music) {
    pause = true;
    if (currentScene !== null) {
        currentScene.getCurrentFrame().pause();
    }
    if (typeof music === "undefined") {

        pauseAllSound();
    }
}

function playEngine(music) {


    pause = false;
    if (currentScene !== null) {
        currentScene.getCurrentFrame().resume();
    }
    if (typeof music === "undefined") {
        playAllSound();
    }
}

var alertPromise = null;
var dontPauseMusic = null;
var inAlert = false;


function kvnAlert(title, text, promise, dontPauseMusic) {

    $(".alert-title").html(title);
    $(".alert-text").html(text);
    $(".alert").css("display", "block");
    alertPromise = promise;
    inAlert = true;
    if (dontPauseMusic === true) {
        dontPauseMusic = true;
        pauseEngine(true);
    } else {
        pauseEngine();
    }
}

function updateSave(id, subid) {

}

function playScene(id, subid) {
    if (catchNativeError) {
        try {
            if (subid === null || typeof subid === "undefined") {
                subid = 0;
            }
            if (scenes[id] === null || typeof scenes[id] === "undefined") {
                displayError("Null Exception: Scene id does not exist: " + id);
            }

            backlog = "";
            closeBacklog();

            //console.log("playingScene");
            for (var stage in stages) {
                stages[stage].resetValues();
            }
            for (var char in characters) {
                characters[char].resetValues();

            }

            if (isOption) {
                $("#optionholder").css("display", "none");
                $(".option").remove();
                isOption = false;
            }

            cMarker = false;

            $("#centered").html("");
            $("#top-left #actual-text").html("");
            $("#name-text").html("");

            if (subid !== 0) {
                currentScene = null;
                currentScene = scenes[id];
                scenes[id].playFromFrame(subid);

            } else {
                currentScene = null;
                currentScene = scenes[id];
                scenes[id].play();
            }

        } catch (e) {

            displayRealError("Native Exception: error attempt to play scene: " + id + "; subid: " + subid, e);
        }
    } else {
        backlog = "";
        closeBacklog();
        if (subid === null || typeof subid === "undefined") {
            subid = 0;
        }
        if (scenes[id] === null || typeof scenes[id] === "undefined") {
            displayError("Null Exception: Scene id does not exist: " + id);
        }
        //console.log("playingScene");
        for (var stage in stages) {
            stages[stage].resetValues();
        }
        for (var char in characters) {
            characters[char].resetValues();
        }
        if (isOption) {
            $("#optionholder").css("display", "none");
            $(".option").remove();
            isOption = false;
        }

        cMarker = false;
        $("#centered").html("");
        $("#top-left #actual-text").html("");
        $("#name-text").html("");


        if (subid !== 0) {
            currentScene = null;
            currentScene = scenes[id];
            scenes[id].playFromFrame(subid);

        } else {
            currentScene = null;
            currentScene = scenes[id];
            scenes[id].play();


        }
    }
}

function stopCurrentScene() {
    if (currentScene !== null && typeof currentScene !== "undefined") {
        currentScene.onEnd();
    }
    currentScene = null;
}


//full-utils
var getClassOf = Function.prototype.call.bind(Object.prototype.toString);

function chk_scroll(e) {
    var elem = $(e.currentTarget);
    if (elem[0].scrollHeight - elem.scrollTop() === elem.outerHeight()) {
        console.log("bottom");
    }
}

function clone(obj) {
    if (null === obj || "object" !== typeof obj)
        return obj;
    try {
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr))
                copy[attr] = clone(obj[attr]);
        }
    } catch (er) {
        var copy = obj.clone();
    }
    return copy;
}



function adjustMarker() {
    if (activeStage === null || typeof activeStage === "undefined" || currentScene === null || typeof currentScene === "undefined") {
        $("#completionmarker").css("display", "none");
    } else {
        if (currentScene.hasCurrentFrameEnded()) {
            $("#completionmarker").css("background", completionMarkerCompleteColor);
        } else {
            $("#completionmarker").css("background", completionMarkerRunningColor);
        }
    }
}

//easing type
var linear = new Array();
var swing = new Array();
var easeIn = new Array();
var easeOut = new Array();
var easeBack = new Array();

var elastic = new Array();
var bounce = new Array();
var slowMotion = new Array();
var stepped = new Array();
var rough = new Array();

var easeType = [rough, linear, swing, easeIn, easeOut, elastic, bounce, slowMotion, stepped, easeBack];

function isEasingValid(ease) {
    for (var k in easeType) {
        if (easeType[k] === ease) {
            return true;
        }
    }
    return false;
}

function getCurrentSceneID() {
    if (currentScene !== null && typeof currentScene === "object") {
        return currentScene.getID();

    }
    return "null";
}

function getCurrentFrame() {
    if (currentScene !== null && typeof currentScene === "object") {
        return currentScene.getCurrent();

    }
    return "null";
}

function cssEasing(easingType) {
    if (easingType === linear) {
        return "linear";
    }
    if (easingType === swing) {
        return "ease-in-out";
    }
    if (easingType === easeIn) {
        return "ease-in";
    }
    if (easingType === easeOut) {
        return "ease-out";
    }
    if (easingType === easeBack) {
        return "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    }
    return "linear";
}

function gsEasing(easingType) {
    if (easingType === linear) {
        return Power0.easeNone;
    }
    if (easingType === swing) {
        return Power1.easeInOut;
    }
    if (easingType === easeIn) {
        return Power1.easeIn;
    }
    if (easingType === easeOut) {
        return Power1.easeOut;
    }
    if (easingType === elastic) {
        return Elastic.easeOut.config(1, 0.3);
    }
    if (easingType === bounce) {
        return Bounce.easeOut;
    }
    if (easingType === slowMotion) {
        return SlowMo.ease.config(0.7, 0.7, false);
    }
    if (easingType === easeBack) {
        return Back.easeOut.config(1.7);
    }
    if (easingType === stepped) {
        return SteppedEase.config(12);
    }
    if (easingType === rough) {
        return  RoughEase.ease.config({template: Power0.easeNone, strength: 1, points: 20, taper: "none", randomize: true, clamp: false});
    }
}



var contains = function (needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if (!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (needle) {
            var i = -1, index = -1;

            for (i = 0; i < this.length; i++) {
                var item = this[i];

                if ((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};