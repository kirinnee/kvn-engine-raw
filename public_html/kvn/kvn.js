var sArr = new Array();

var imagesLoaded = false;

var engineStarted = false;

var paceDone = false;

var kvnCurrentRatio = 1;

//loading of images
$(window).on("load", function () {

    //mark that images is loaded
    window.imagesLoaded = true;
});


//check if mobile
window.mobilecheck = function () {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
            check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};




if (screenfull.enabled) {
    screenfull.on('change', () => {
        !screenfull.isFullscreen ? $(".toggle-fs img").attr("src", "gofs.svg") : $(".toggle-fs img").attr("src", "exitfs.svg");
    });
}



//force IOS to work man wtf
var isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

if (isiOS) {
    document.documentElement.classList.add('ios');
}

function dynamicallyLoadScript(url) {

    // Add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
// Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    var id = sArr.length;
    sArr.push(false);


    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = function () {
        sArr[id] = true;
    };
    script.onload = function () {
        sArr[id] = true;
    };

    // Fire the loading
    head.appendChild(script);

}

function isAllScriptLoaded() {
    for (var i = 0; i < sArr.length; i++) {
        if (!sArr[i]) {
            return false;
        }
    }
    return true;
}

var wth = document.getElementsByTagName("script");
var cEle = wth[wth.length - 1];
var dir = cEle.src;
dir = dir.substring(0, dir.lastIndexOf('/'));
dir += "/";

var kdom = {
    div:
            function div(cls, id, html) {
                var d = document.createElement("div");
                if (typeof cls === "string" || typeof cls === "number") {
                    d.setAttribute('class', cls);
                } else if (cls instanceof Array) {
                    var s = "";
                    for (var x in cls) {
                        s += cls[x] + " ";
                    }
                    d.setAttribute('class', s);
                }

                if (typeof id === "string" || typeof id === "number") {
                    d.setAttribute('id', id);
                }

                if (typeof html === "string" || typeof html === "number") {
                    d.innerHTML = html;
                }
                return d;

            },
    img: function img(src) {
        var img = document.createElement("img");
        img.setAttribute('src', src);
        return img;

    }
};

jom = {
    div: function (cls, id, html) {
        var d = $("<div/>");
        if (typeof cls === "string" || typeof cls === "number") {
            d.addClass(cls);
        } else if (cls instanceof Array) {
            for (var x in cls) {
                d.addClass(cls[x]);
            }
        }
        if (typeof id === "string" || typeof id === "number") {

            d.attr('id', id);
        }
        if (typeof html === "string" || typeof html === "number") {
            d.html(html);
        }
        return d;
    },
    img: function (src, id, cls) {
        var img = $("<img/>");
        if (typeof src === "string") {
            if (!useResponsiveImages) {
                img.attr('src', src);
            } else {
                function replaceLast(x, y, z) {
                    var a = x.split("");
                    a[x.lastIndexOf(y)] = z;
                    return a.join("");
                }

                var split = src.split(".");
                var ext = ("." + split.pop()).trim();
                var base = replaceLast(src, ext, '').trim();

                var dk = responsiveImageDefKey;
                var ri = responsiveImage;
                var unit = responsiveImageDefSize / 100;
                var srcset = "";

                img.attr('src', base + "_" + ri[dk] + ext);
                for (var x in ri) {
                    if (typeof x === "string" && typeof ri[x] === "number") {
                        var key = x.trim();
                        var val = parseInt(ri[x]);
                        srcset += ((base + "_" + key + ext).trim() + " " + (val + "w").trim() + ",").trim();
                    }
                }
                srcset = srcset.trim();
                img.attr('srcset', srcset);
                img.attr('sizes', '100vw');
            }
        }

        if (typeof cls === "string" || typeof cls === "number") {
            img.addClass(cls);
        } else if (cls instanceof Array) {
            for (var x in cls) {
                img.addClass(cls[x]);
            }
        }
        if (typeof id === "string" || typeof id === "number") {

            img.attr('id', id);
        }
        return img;

    },
    g: function (g, cls, id, html) {
        var d = $("<" + g + "/>");
        if (typeof cls === "string" || typeof cls === "number") {
            d.addClass(cls);
        } else if (cls instanceof Array) {
            for (var x in cls) {
                d.addClass(cls[x]);
            }
        }
        if (typeof id === "string" || typeof id === "number") {

            d.attr('id', id);
        }
        if (typeof html === "string" || typeof html === "number") {
            d.html(html);
        }
        return d;
    }

};

var scriptGroup1 = function () {

    var ls = kdom.div(null, "loadingscreen");
    /**/var loader = kdom.div("loader");
    /**//**/var img = kdom.img("chibi.gif");
    var game = kdom.div(null, "the-rest-of-the-game");
    /**/var turn = kdom.div(null, "turn");
    /**//**/var turnh = kdom.div(null, "turn-holder", "Please turn your device to landscape mode!<br>");
    /**//**//**/var tilt = kdom.img("tilt.png");
    /**/var kvn = kdom.div(null, "kvn");
    /**/var fs = kdom.div("toggle-fs");
    /**//**/var fsimg = kdom.img("gofs.svg");


    turnh.appendChild(tilt);

    loader.appendChild(img);
    loader.innerHTML += "<div id='pace-integration-div'>loading...</div>";
    turn.appendChild(turnh);
    fs.appendChild(fsimg);

    ls.appendChild(loader);
    game.appendChild(turn);
    game.appendChild(kvn);
    game.appendChild(fs);

    document.getElementById("kirinnee-visual-novel-engine").appendChild(ls);
    document.getElementById("kirinnee-visual-novel-engine").appendChild(game);

    if (typeof configVar === "undefined" || configVar === null) {
        dynamicallyLoadScript(dir + "config.js");
    } else {
        dynamicallyLoadScript(dir + configVar);
    }

};

function setDivWH(w, h) {
    if (cssWidth && embbedMode) {
        document.getElementById("kirinnee-visual-novel-engine").style.minWidth = "100%";
        document.getElementById("kirinnee-visual-novel-engine").style.maxWidth = "100%";
        document.getElementById("kirinnee-visual-novel-engine").style.minHeight = "100%";
        document.getElementById("kirinnee-visual-novel-engine").style.maxHeight = "100%";
        document.getElementById("kirinnee-visual-novel-engine").style.height = "100%";
        document.getElementById("kirinnee-visual-novel-engine").style.width = "100%";
    } else {
        document.getElementById("kirinnee-visual-novel-engine").style.minWidth = w + "vw";
        document.getElementById("kirinnee-visual-novel-engine").style.maxWidth = w + "vw";
        document.getElementById("kirinnee-visual-novel-engine").style.minHeight = h + "vw";
        document.getElementById("kirinnee-visual-novel-engine").style.maxHeight = h + "vw";
        document.getElementById("kirinnee-visual-novel-engine").style.height = h + "vw";
        document.getElementById("kirinnee-visual-novel-engine").style.width = w + "vw";
    }
}
function setBacklog(w, h) {
    if (cssWidth && embbedMode) {
        document.getElementById("backlog").style.minWidth = "80%";
        document.getElementById("backlog").style.maxWidth = "80%";
        document.getElementById("backlog").style.height = "80%";
        document.getElementById("backlog").style.maxHeight = "80vh";
    } else {
        document.getElementById("backlog").style.minWidth = (0.8 * w) + "vw";
        document.getElementById("backlog").style.maxWidth = (0.8 * w) + "vw";
        document.getElementById("backlog").style.height = "80vh";
        document.getElementById("backlog").style.maxHeight = (0.8 * h) + "vw";
    }
}

var landScapePause = false;
var heightMultiplier = 0.5626;
var gkvnH;
var gkvnW;

var scriptGroup2 = function () {

    var kvnWidth = vnScreenWidth;
    var ratio = vnScreenRatio.split(":");

    window.gkvnW = kvnWidth;


    var dive = parseFloat(ratio[0]);
    var nume = parseFloat(ratio[1]);

    heightMultiplier = nume / dive;

    var kvnHeight = (vnScreenWidth / dive * nume);

    window.gkvnH = kvnHeight;

    window.kvnXScale = vnScreenWidth / 100;
    window.kvnYscale = kvnHeight / 100;

    var fsW = window.embbedFSWidth;
    var fsH = fsW / dive * nume;

    //force landscape
    if (enforceLandscape) {
        setInterval(function () {
            if (window.innerHeight > window.innerWidth) {

                document.getElementById("kvn").style.display = "none";
                document.getElementById("turn").style.display = "block";

                if (engineStarted) {
                    pauseEngine();
                    landScapePause = true;
                }
            } else {
                document.getElementById("kvn").style.display = "block";
                document.getElementById("turn").style.display = "none";
                if (engineStarted) {
                    if (landScapePause) {
                        playEngine();
                        landScapePause = false;
                    }
                }
            }
        }, 100);
    }

    if (hasFullScreenOption && !isiOS) {
        document.getElementsByClassName("toggle-fs")[0].style.display = "block";
        $(".toggle-fs").css("display", "block");
    }

    setDivWH(window.gkvnW, window.gkvnH);

    //CSS Maintainence
    if (embbedMode && !hideOverflow) {
        document.getElementById("loadingscreen").style.width = "100%";
        document.getElementById("loadingscreen").style.height = "100%";
        document.getElementById("turn").style.width = "100%";
        document.getElementById("turn").style.height = "100%";
    }

    //toggling fullscreen
    $(document).on("click", ".toggle-fs", function () {
        if (screenfull.enabled) {
            if (embbedMode) {
                //do math on unit-ed values and apply on elemnent
                function modO(ele, atr, css) {
                    var o = ele.attr(atr);
                    var ov = parseFloat(o.match(/^(\d+(?:\.\d+)?)(.*)$/)[1]);
                    var ou = o.match(/^(\d+(?:\.\d+)?)(.*)$/)[2];
                    ov *= window.kvnCurrentRatio;
                    ele.css(css, ov + ou);
                }
                if (screenfull.isFullscreen) {
                    //set the width and height of backlog
                    setDivWH(window.gkvnW, window.gkvnH);
                    setBacklog(window.gkvnW, window.gkvnH);

                    //calcualte ratio to multiply by
                    window.kvnCurrentRatio = (window.gkvnW / 100);

                } else {
                    //set width and height of div and backlog
                    setDivWH(fsW, fsH);
                    setBacklog(fsW, fsH);

                    //tabulate new ratio
                    window.kvnCurrentRatio = fsW / 100;

                }


                //adjust textsize and option size
                $("#maintext .knv-th-ele, .option").each(function () {
                    modO($(this), 'ofs', 'font-size');
                });

                //adjust centered option size
                $("#optionholder .option").each(function () {
                    modO($(this), 'ow', 'width');
                    modO($(this), 'opad', 'padding');
                    modO($(this), 'omargin', 'margin');
                });

                //adjust option-holder size
                var oh = $("#optionholder");
                var columns = parseInt(oh.attr('col'));
                if (columns > 1) {
                    var r = window.kvnCurrentRatio;
                    var wr = parseFloat(oh.attr('wr'));
                    var pr = parseFloat(oh.attr('pr'));
                    oh.css("width", (((wr * r) + 2 * (pr * r) + 2 * (pr * r)) * columns + 0.5) + "vw");
                } else {
                    oh.css("width", "auto");
                }

                //adjust name text
                var fs = 1.5 * window.kvnCurrentRatio;
                $("#nametext").css("font-size", fs + "vw");
                screenfull.toggle($("#kirinnee-visual-novel-engine")[0]);
            } else {
                screenfull.toggle();
            }
        }
    });


    dynamicallyLoadScript(dir + "backend/character.js");
    dynamicallyLoadScript(dir + "backend/frame.js");
    dynamicallyLoadScript(dir + "backend/option.js");
    dynamicallyLoadScript(dir + "backend/scene.js");
    dynamicallyLoadScript(dir + "backend/soundtype.js");
    dynamicallyLoadScript(dir + "backend/sound.js");
    dynamicallyLoadScript(dir + "backend/stage.js");
    dynamicallyLoadScript(dir + "backend/textbox.js");
};

var scriptGroup3 = function () {

    dynamicallyLoadScript(dir + "backend/vnconsole.js");
};

var scriptGroup4 = function () {

    dynamicallyLoadScript(dir + "soundengine.js");
};

var scriptGroup5 = function () {

    dynamicallyLoadScript(dir + "backend/core.js");
};

var scriptGroup6 = function () {

    dynamicallyLoadScript(dir + "backend/debug.js");
};

var scriptGroup7 = function () {

    var canvas = jom.div(null, "canvas");
    /**/var vnscreen = jom.div(null, "vn-screen");
    /******/var backdrop = jom.div(null, "vn-bkgd");
    /**//**/var bkgdholder = jom.div(null, "bkgd-holder");
    /**//**//**/var realbkgd = jom.div(null, "vn-bkgd-r");
    /**//**//**//**/var glitchimg = [];
    for (var i = 0; i < 5; i++) {
        glitchimg.push(jom.div("glitch__img"));
    }
    /**//**/var preoverlay = jom.div(null, "preoverlay");
    /**//**/var overlay = jom.div(null, "overlay");
    /**//**/var postoverlay = jom.div(null, "postoverlay");
    /**//**//**/var weather = jom.div(null, "weatherEffects");
    /**//**//**/var maintext = jom.div("gameobj", "maintext");
    /**//**//**//**/var centered = jom.div(null, "centered");
    /**//**//**//**/var topleft = jom.div(null, "top-left");
    /**//**//**//**//**/var actualText = jom.div(null, "actual-text");
    /**//**//**/var nameText = jom.div("gameobj", "nametext");
    /**//**//**//**/var nametext = jom.div(null, "name-text");
    /**//**//**/var completionMarker = jom.div("gameobj", "completionmarker");
    /**//**/var clickbox = jom.div(null, "clickbox");
    /**//**/var hclickbox = jom.div(null, "hclickbox");
    /**//**//**/var opholder = jom.div(null, "optionholder");
    opholder.attr('style', "display:none");
    /**//**/var backlog = jom.div(null, "backlog");

    topleft.append(actualText);

    realbkgd.append(glitchimg);
    maintext.append([centered, topleft]);
    nameText.append(nametext);

    bkgdholder.append(realbkgd);
    postoverlay.append([weather, maintext, nameText, completionMarker]);
    hclickbox.append(opholder);

    vnscreen.append([backdrop, bkgdholder, preoverlay, overlay, postoverlay, clickbox, hclickbox, backlog]);

    canvas.append(vnscreen);

    var bgLogger = jom.div(['debug-holder', 'debug-dark']);
    /**/var input = $("<input type='file/>").attr('id', 'bgchange');
    /**/var changebg = jom.g('button', null, 'c-bg', "Change Background").attr('type', 'button');

    var charLogger = jom.div(['debug-holder', 'debug-dark']);
    /**/var select = jom.g('select', null, "char-logging");
    /**/var scl = jom.g('button', null, 's-c-l');


    //have br
    bgLogger.append([input, changebg]);
    //have br
    charLogger.append([select, scl]);

    var kvndebugger = jom.div(null, 'debugger');
    /**/var sceneframe = jom.div(null, 'sceneframe');
    /**//**/var red = jom.g('span', 'red');
    /**//**/var blue = jom.g('span', "blue");
    /**/var ado = jom.div(null, 'ado', 'Advance Debug Mode');
    /**/var edit = jom.div(null, 'toggle-debug-edit', "edit");
    //br
    /**/var adb = jom.div(null, 'advance-debug');
    /**//**/var playbacks = jom.div('debug-title', null, 'Playbacks');
    //br
    /**//**/var pbh = jom.div('debug-holder');
    /**//**//**/var prev = jom.div('pbo', 'prev').attr('title', "Previous Frame");
    /**//**//**/var play = jom.div(['pbo','debug-selected'], 'play').attr('title', "Play/Resume|Shortcut: F7");
    /**//**//**/var pause = jom.div('pbo', 'pause').attr('title', "Pause Engine|Shortcut: F7");
    /**//**//**/var replay = jom.div('pbo', 'replay').attr('title', "Replay Current Frame");
    /**//**//**/var next = jom.div('pbo', 'next').attr('title', "Next Frame");
    //br
    /**//**/var timeline = jom.div('debug-title', null, 'Timeline');
    //br
    /**//**/var tl = jom.div(['debug-holder', 'debug-dark']);
    /**//**//**/var scenes = jom.g('select', null, 'bd-scene-select');
    /**//**//**/var frameid = jom.g('input', null, 'frame-number-debug').attr('type', 'number');
    /**//**//**/var gobut = jom.g('button', null, 'go-scene-debug', 'Go!');
    /**//**//**/var restart = jom.g('button', null, 'restart-current-scene', 'Restart Current Scene');
    //br
    /**//**/var framestate = jom.div('debug-title', null, 'Frame State:');
    /**//**/var fstate = jom.div('debug-title', 'debug-state', 'Running');
    //br
    /**//**/var frameskip = jom.div('debug-title', null, 'Frame Skip-able:');
    /**//**/var fskip = jom.div('debug-title', 'skip-state', 'true');

    tl.append([scenes, frameid, gobut, restart]);
    pbh.append([prev, play, pause, replay, next]);

    adb.append([playbacks, "<br>", pbh, "<br>", timeline, "<br>", tl, "<br>", framestate, fstate, "<br>", frameskip, fskip]);
    sceneframe.append(["Scene", red, "Frame", blue]);

    kvndebugger.append([sceneframe, ado, "&nbsp;", edit, "<br>", adb]);

    if (characterLogging) {
        kvndebugger.append(["<br>", charLogger]);
    }
    if (backgroundLogging) {
        kvndebugger.append(["<br>", bgLogger]);
    }


    var kvnConsole = jom.div(null, 'errorscreen');
    $("#kvn").append(canvas).promise().done(function () {
        setBacklog(window.gkvnW, window.gkvnH);
        if (paceIntegration) {
            $('#pace-integration-div').html("");
            (function () {
                var AjaxMonitor, Bar, DocumentMonitor, ElementMonitor, ElementTracker, EventLagMonitor, Evented, Events, NoTargetError, Pace, RequestIntercept, SOURCE_KEYS, Scaler, SocketRequestTracker, XHRRequestTracker, animation, avgAmplitude, bar, cancelAnimation, cancelAnimationFrame, defaultOptions, extend, extendNative, getFromDOM, getIntercept, handlePushState, ignoreStack, init, now, options, requestAnimationFrame, result, runAnimation, scalers, shouldIgnoreURL, shouldTrack, source, sources, uniScaler, _WebSocket, _XDomainRequest, _XMLHttpRequest, _i, _intercept, _len, _pushState, _ref, _ref1, _replaceState,
                        __slice = [].slice,
                        __hasProp = {}.hasOwnProperty,
                        __extends = function (child, parent) {
                            for (var key in parent) {
                                if (__hasProp.call(parent, key))
                                    child[key] = parent[key];
                            }
                            function ctor() {
                                this.constructor = child;
                            }
                            ctor.prototype = parent.prototype;
                            child.prototype = new ctor();
                            child.__super__ = parent.prototype;
                            return child;
                        },
                        __indexOf = [].indexOf || function (item) {
                    for (var i = 0, l = this.length; i < l; i++) {
                        if (i in this && this[i] === item)
                            return i;
                    }
                    return -1;
                };

                defaultOptions = {
                    catchupTime: 100,
                    initialRate: .03,
                    minTime: 250,
                    ghostTime: 100,
                    maxProgressPerFrame: 20,
                    easeFactor: 1.25,
                    startOnPageLoad: true,
                    restartOnPushState: true,
                    restartOnRequestAfter: 500,
                    target: '#pace-integration-div',
                    elements: {
                        checkInterval: 100,
                        selectors: ['body']
                    },
                    eventLag: {
                        minSamples: 10,
                        sampleCount: 3,
                        lagThreshold: 3
                    },
                    ajax: {
                        trackMethods: ['GET'],
                        trackWebSockets: true,
                        ignoreURLs: []
                    }
                };

                now = function () {
                    var _ref;
                    return (_ref = typeof performance !== "undefined" && performance !== null ? typeof performance.now === "function" ? performance.now() : void 0 : void 0) != null ? _ref : +(new Date);
                };

                requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

                cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

                if (requestAnimationFrame == null) {
                    requestAnimationFrame = function (fn) {
                        return setTimeout(fn, 50);
                    };
                    cancelAnimationFrame = function (id) {
                        return clearTimeout(id);
                    };
                }

                runAnimation = function (fn) {
                    var last, tick;
                    last = now();
                    tick = function () {
                        var diff;
                        diff = now() - last;
                        if (diff >= 33) {
                            last = now();
                            return fn(diff, function () {
                                return requestAnimationFrame(tick);
                            });
                        } else {
                            return setTimeout(tick, 33 - diff);
                        }
                    };
                    return tick();
                };

                result = function () {
                    var args, key, obj;
                    obj = arguments[0], key = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
                    if (typeof obj[key] === 'function') {
                        return obj[key].apply(obj, args);
                    } else {
                        return obj[key];
                    }
                };

                extend = function () {
                    var key, out, source, sources, val, _i, _len;
                    out = arguments[0], sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
                    for (_i = 0, _len = sources.length; _i < _len; _i++) {
                        source = sources[_i];
                        if (source) {
                            for (key in source) {
                                if (!__hasProp.call(source, key))
                                    continue;
                                val = source[key];
                                if ((out[key] != null) && typeof out[key] === 'object' && (val != null) && typeof val === 'object') {
                                    extend(out[key], val);
                                } else {
                                    out[key] = val;
                                }
                            }
                        }
                    }
                    return out;
                };

                avgAmplitude = function (arr) {
                    var count, sum, v, _i, _len;
                    sum = count = 0;
                    for (_i = 0, _len = arr.length; _i < _len; _i++) {
                        v = arr[_i];
                        sum += Math.abs(v);
                        count++;
                    }
                    return sum / count;
                };

                getFromDOM = function (key, json) {
                    var data, e, el;
                    if (key == null) {
                        key = 'options';
                    }
                    if (json == null) {
                        json = true;
                    }
                    el = document.querySelector("[data-pace-" + key + "]");
                    if (!el) {
                        return;
                    }
                    data = el.getAttribute("data-pace-" + key);
                    if (!json) {
                        return data;
                    }
                    try {
                        return JSON.parse(data);
                    } catch (_error) {
                        e = _error;
                        return typeof console !== "undefined" && console !== null ? console.error("Error parsing inline pace options", e) : void 0;
                    }
                };

                Evented = (function () {
                    function Evented() {}

                    Evented.prototype.on = function (event, handler, ctx, once) {
                        var _base;
                        if (once == null) {
                            once = false;
                        }
                        if (this.bindings == null) {
                            this.bindings = {};
                        }
                        if ((_base = this.bindings)[event] == null) {
                            _base[event] = [];
                        }
                        return this.bindings[event].push({
                            handler: handler,
                            ctx: ctx,
                            once: once
                        });
                    };

                    Evented.prototype.once = function (event, handler, ctx) {
                        return this.on(event, handler, ctx, true);
                    };

                    Evented.prototype.off = function (event, handler) {
                        var i, _ref, _results;
                        if (((_ref = this.bindings) != null ? _ref[event] : void 0) == null) {
                            return;
                        }
                        if (handler == null) {
                            return delete this.bindings[event];
                        } else {
                            i = 0;
                            _results = [];
                            while (i < this.bindings[event].length) {
                                if (this.bindings[event][i].handler === handler) {
                                    _results.push(this.bindings[event].splice(i, 1));
                                } else {
                                    _results.push(i++);
                                }
                            }
                            return _results;
                        }
                    };

                    Evented.prototype.trigger = function () {
                        var args, ctx, event, handler, i, once, _ref, _ref1, _results;
                        event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
                        if ((_ref = this.bindings) != null ? _ref[event] : void 0) {
                            i = 0;
                            _results = [];
                            while (i < this.bindings[event].length) {
                                _ref1 = this.bindings[event][i], handler = _ref1.handler, ctx = _ref1.ctx, once = _ref1.once;
                                handler.apply(ctx != null ? ctx : this, args);
                                if (once) {
                                    _results.push(this.bindings[event].splice(i, 1));
                                } else {
                                    _results.push(i++);
                                }
                            }
                            return _results;
                        }
                    };

                    return Evented;

                })();

                Pace = window.Pace || {};

                window.Pace = Pace;

                extend(Pace, Evented.prototype);

                options = Pace.options = extend({}, defaultOptions, window.paceOptions, getFromDOM());

                _ref = ['ajax', 'document', 'eventLag', 'elements'];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    source = _ref[_i];
                    if (options[source] === true) {
                        options[source] = defaultOptions[source];
                    }
                }

                NoTargetError = (function (_super) {
                    __extends(NoTargetError, _super);

                    function NoTargetError() {
                        _ref1 = NoTargetError.__super__.constructor.apply(this, arguments);
                        return _ref1;
                    }

                    return NoTargetError;

                })(Error);

                Bar = (function () {
                    function Bar() {
                        this.progress = 0;
                    }

                    Bar.prototype.getElement = function () {
                        var targetElement;
                        if (typeof $(".pace.pace-active")[0] === "undefined") {
                            if (this.el == null) {
                                targetElement = document.querySelector(options.target);
                                if (!targetElement) {
                                    throw new NoTargetError;
                                }
                                this.el = document.createElement('div');
                                this.el.className = "pace pace-active";
                                document.body.className = document.body.className.replace(/pace-done/g, '');
                                document.body.className += ' pace-running';
                                this.el.innerHTML = '<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>';
                                if (targetElement.firstChild != null) {
                                    targetElement.insertBefore(this.el, targetElement.firstChild);
                                } else {
                                    targetElement.appendChild(this.el);
                                }
                            }
                            return this.el;
                        } else {
                            return $(".pace.pace-active")[0];
                        }
                    };

                    Bar.prototype.finish = function () {
                        var el;
                        el = this.getElement();
                        el.className = el.className.replace('pace-active', '');
                        el.className += ' pace-inactive';
                        document.body.className = document.body.className.replace('pace-running', '');
                        return document.body.className += ' pace-done';
                    };

                    Bar.prototype.update = function (prog) {
                        this.progress = prog;
                        return this.render();
                    };

                    Bar.prototype.destroy = function () {
                        try {
                            this.getElement().parentNode.removeChild(this.getElement());
                        } catch (_error) {
                            NoTargetError = _error;
                        }
                        return this.el = void 0;
                    };

                    Bar.prototype.render = function () {
                        var el, key, progressStr, transform, _j, _len1, _ref2;
                        if (document.querySelector(options.target) == null) {
                            return false;
                        }
                        el = this.getElement();
                        transform = "translate3d(" + this.progress + "%, 0, 0)";
                        _ref2 = ['webkitTransform', 'msTransform', 'transform'];
                        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
                            key = _ref2[_j];
                            el.children[0].style[key] = transform;
                        }
                        if (!this.lastRenderedProgress || this.lastRenderedProgress | 0 !== this.progress | 0) {
                            el.children[0].setAttribute('data-progress-text', "" + (this.progress | 0) + "%");
                            if (this.progress >= 100) {
                                progressStr = '99';
                            } else {
                                progressStr = this.progress < 10 ? "0" : "";
                                progressStr += this.progress | 0;
                            }
                            el.children[0].setAttribute('data-progress', "" + progressStr);
                            $(".pace.pace-active")[0]
                        }
                        return this.lastRenderedProgress = this.progress;
                    };

                    Bar.prototype.done = function () {
                        return this.progress >= 100;
                    };

                    return Bar;

                })();

                Events = (function () {
                    function Events() {
                        this.bindings = {};
                    }

                    Events.prototype.trigger = function (name, val) {
                        var binding, _j, _len1, _ref2, _results;
                        if (this.bindings[name] != null) {
                            _ref2 = this.bindings[name];
                            _results = [];
                            for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
                                binding = _ref2[_j];
                                _results.push(binding.call(this, val));
                            }
                            return _results;
                        }
                    };

                    Events.prototype.on = function (name, fn) {
                        var _base;
                        if ((_base = this.bindings)[name] == null) {
                            _base[name] = [];
                        }
                        return this.bindings[name].push(fn);
                    };

                    return Events;

                })();

                _XMLHttpRequest = window.XMLHttpRequest;

                _XDomainRequest = window.XDomainRequest;

                _WebSocket = window.WebSocket;

                extendNative = function (to, from) {
                    var e, key, _results;
                    _results = [];
                    for (key in from.prototype) {
                        try {
                            if ((to[key] == null) && typeof from[key] !== 'function') {
                                if (typeof Object.defineProperty === 'function') {
                                    _results.push(Object.defineProperty(to, key, {
                                        get: function () {
                                            return from.prototype[key];
                                        },
                                        configurable: true,
                                        enumerable: true
                                    }));
                                } else {
                                    _results.push(to[key] = from.prototype[key]);
                                }
                            } else {
                                _results.push(void 0);
                            }
                        } catch (_error) {
                            e = _error;
                        }
                    }
                    return _results;
                };

                ignoreStack = [];

                Pace.ignore = function () {
                    var args, fn, ret;
                    fn = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
                    ignoreStack.unshift('ignore');
                    ret = fn.apply(null, args);
                    ignoreStack.shift();
                    return ret;
                };

                Pace.track = function () {
                    var args, fn, ret;
                    fn = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
                    ignoreStack.unshift('track');
                    ret = fn.apply(null, args);
                    ignoreStack.shift();
                    return ret;
                };

                shouldTrack = function (method) {
                    var _ref2;
                    if (method == null) {
                        method = 'GET';
                    }
                    if (ignoreStack[0] === 'track') {
                        return 'force';
                    }
                    if (!ignoreStack.length && options.ajax) {
                        if (method === 'socket' && options.ajax.trackWebSockets) {
                            return true;
                        } else if (_ref2 = method.toUpperCase(), __indexOf.call(options.ajax.trackMethods, _ref2) >= 0) {
                            return true;
                        }
                    }
                    return false;
                };

                RequestIntercept = (function (_super) {
                    __extends(RequestIntercept, _super);

                    function RequestIntercept() {
                        var monitorXHR,
                                _this = this;
                        RequestIntercept.__super__.constructor.apply(this, arguments);
                        monitorXHR = function (req) {
                            var _open;
                            _open = req.open;
                            return req.open = function (type, url, async) {
                                if (shouldTrack(type)) {
                                    _this.trigger('request', {
                                        type: type,
                                        url: url,
                                        request: req
                                    });
                                }
                                return _open.apply(req, arguments);
                            };
                        };
                        window.XMLHttpRequest = function (flags) {
                            var req;
                            req = new _XMLHttpRequest(flags);
                            monitorXHR(req);
                            return req;
                        };
                        try {
                            extendNative(window.XMLHttpRequest, _XMLHttpRequest);
                        } catch (_error) {
                        }
                        if (_XDomainRequest != null) {
                            window.XDomainRequest = function () {
                                var req;
                                req = new _XDomainRequest;
                                monitorXHR(req);
                                return req;
                            };
                            try {
                                extendNative(window.XDomainRequest, _XDomainRequest);
                            } catch (_error) {
                            }
                        }
                        if ((_WebSocket != null) && options.ajax.trackWebSockets) {
                            window.WebSocket = function (url, protocols) {
                                var req;
                                if (protocols != null) {
                                    req = new _WebSocket(url, protocols);
                                } else {
                                    req = new _WebSocket(url);
                                }
                                if (shouldTrack('socket')) {
                                    _this.trigger('request', {
                                        type: 'socket',
                                        url: url,
                                        protocols: protocols,
                                        request: req
                                    });
                                }
                                return req;
                            };
                            try {
                                extendNative(window.WebSocket, _WebSocket);
                            } catch (_error) {
                            }
                        }
                    }

                    return RequestIntercept;

                })(Events);

                _intercept = null;

                getIntercept = function () {
                    if (_intercept == null) {
                        _intercept = new RequestIntercept;
                    }
                    return _intercept;
                };

                shouldIgnoreURL = function (url) {
                    var pattern, _j, _len1, _ref2;
                    _ref2 = options.ajax.ignoreURLs;
                    for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
                        pattern = _ref2[_j];
                        if (typeof pattern === 'string') {
                            if (url.indexOf(pattern) !== -1) {
                                return true;
                            }
                        } else {
                            if (pattern.test(url)) {
                                return true;
                            }
                        }
                    }
                    return false;
                };

                getIntercept().on('request', function (_arg) {
                    var after, args, request, type, url;
                    type = _arg.type, request = _arg.request, url = _arg.url;
                    if (shouldIgnoreURL(url)) {
                        return;
                    }
                    if (!Pace.running && (options.restartOnRequestAfter !== false || shouldTrack(type) === 'force')) {
                        args = arguments;
                        after = options.restartOnRequestAfter || 0;
                        if (typeof after === 'boolean') {
                            after = 0;
                        }
                        return setTimeout(function () {
                            var stillActive, _j, _len1, _ref2, _ref3, _results;
                            if (type === 'socket') {
                                stillActive = request.readyState < 2;
                            } else {
                                stillActive = (0 < (_ref2 = request.readyState) && _ref2 < 4);
                            }
                            if (stillActive) {
                                Pace.restart();
                                _ref3 = Pace.sources;
                                _results = [];
                                for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
                                    source = _ref3[_j];
                                    if (source instanceof AjaxMonitor) {
                                        source.watch.apply(source, args);
                                        break;
                                    } else {
                                        _results.push(void 0);
                                    }
                                }
                                return _results;
                            }
                        }, after);
                    }
                });

                AjaxMonitor = (function () {
                    function AjaxMonitor() {
                        var _this = this;
                        this.elements = [];
                        getIntercept().on('request', function () {
                            return _this.watch.apply(_this, arguments);
                        });
                    }

                    AjaxMonitor.prototype.watch = function (_arg) {
                        var request, tracker, type, url;
                        type = _arg.type, request = _arg.request, url = _arg.url;
                        if (shouldIgnoreURL(url)) {
                            return;
                        }
                        if (type === 'socket') {
                            tracker = new SocketRequestTracker(request);
                        } else {
                            tracker = new XHRRequestTracker(request);
                        }
                        return this.elements.push(tracker);
                    };

                    return AjaxMonitor;

                })();

                XHRRequestTracker = (function () {
                    function XHRRequestTracker(request) {
                        var event, size, _j, _len1, _onreadystatechange, _ref2,
                                _this = this;
                        this.progress = 0;
                        if (window.ProgressEvent != null) {
                            size = null;
                            request.addEventListener('progress', function (evt) {
                                if (evt.lengthComputable) {
                                    return _this.progress = 100 * evt.loaded / evt.total;
                                } else {
                                    return _this.progress = _this.progress + (100 - _this.progress) / 2;
                                }
                            }, false);
                            _ref2 = ['load', 'abort', 'timeout', 'error'];
                            for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
                                event = _ref2[_j];
                                request.addEventListener(event, function () {
                                    return _this.progress = 100;
                                }, false);
                            }
                        } else {
                            _onreadystatechange = request.onreadystatechange;
                            request.onreadystatechange = function () {
                                var _ref3;
                                if ((_ref3 = request.readyState) === 0 || _ref3 === 4) {
                                    _this.progress = 100;
                                } else if (request.readyState === 3) {
                                    _this.progress = 50;
                                }
                                return typeof _onreadystatechange === "function" ? _onreadystatechange.apply(null, arguments) : void 0;
                            };
                        }
                    }

                    return XHRRequestTracker;

                })();

                SocketRequestTracker = (function () {
                    function SocketRequestTracker(request) {
                        var event, _j, _len1, _ref2,
                                _this = this;
                        this.progress = 0;
                        _ref2 = ['error', 'open'];
                        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
                            event = _ref2[_j];
                            request.addEventListener(event, function () {
                                return _this.progress = 100;
                            }, false);
                        }
                    }

                    return SocketRequestTracker;

                })();

                ElementMonitor = (function () {
                    function ElementMonitor(options) {
                        var selector, _j, _len1, _ref2;
                        if (options == null) {
                            options = {};
                        }
                        this.elements = [];
                        if (options.selectors == null) {
                            options.selectors = [];
                        }
                        _ref2 = options.selectors;
                        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
                            selector = _ref2[_j];
                            this.elements.push(new ElementTracker(selector));
                        }
                    }

                    return ElementMonitor;

                })();

                ElementTracker = (function () {
                    function ElementTracker(selector) {
                        this.selector = selector;
                        this.progress = 0;
                        this.check();
                    }

                    ElementTracker.prototype.check = function () {
                        var _this = this;
                        if (document.querySelector(this.selector)) {
                            return this.done();
                        } else {
                            return setTimeout((function () {
                                return _this.check();
                            }), options.elements.checkInterval);
                        }
                    };

                    ElementTracker.prototype.done = function () {
                        return this.progress = 100;
                    };

                    return ElementTracker;

                })();

                DocumentMonitor = (function () {
                    DocumentMonitor.prototype.states = {
                        loading: 0,
                        interactive: 50,
                        complete: 100
                    };

                    function DocumentMonitor() {
                        var _onreadystatechange, _ref2,
                                _this = this;
                        this.progress = (_ref2 = this.states[document.readyState]) != null ? _ref2 : 100;
                        _onreadystatechange = document.onreadystatechange;
                        document.onreadystatechange = function () {
                            if (_this.states[document.readyState] != null) {
                                _this.progress = _this.states[document.readyState];
                            }
                            return typeof _onreadystatechange === "function" ? _onreadystatechange.apply(null, arguments) : void 0;
                        };
                    }

                    return DocumentMonitor;

                })();

                EventLagMonitor = (function () {
                    function EventLagMonitor() {
                        var avg, interval, last, points, samples,
                                _this = this;
                        this.progress = 0;
                        avg = 0;
                        samples = [];
                        points = 0;
                        last = now();
                        interval = setInterval(function () {
                            var diff;
                            diff = now() - last - 50;
                            last = now();
                            samples.push(diff);
                            if (samples.length > options.eventLag.sampleCount) {
                                samples.shift();
                            }
                            avg = avgAmplitude(samples);
                            if (++points >= options.eventLag.minSamples && avg < options.eventLag.lagThreshold) {
                                _this.progress = 100;
                                return clearInterval(interval);
                            } else {
                                return _this.progress = 100 * (3 / (avg + 3));
                            }
                        }, 50);
                    }

                    return EventLagMonitor;

                })();

                Scaler = (function () {
                    function Scaler(source) {
                        this.source = source;
                        this.last = this.sinceLastUpdate = 0;
                        this.rate = options.initialRate;
                        this.catchup = 0;
                        this.progress = this.lastProgress = 0;
                        if (this.source != null) {
                            this.progress = result(this.source, 'progress');
                        }
                    }

                    Scaler.prototype.tick = function (frameTime, val) {
                        var scaling;
                        if (val == null) {
                            val = result(this.source, 'progress');
                        }
                        if (val >= 100) {
                            this.done = true;
                        }
                        if (val === this.last) {
                            this.sinceLastUpdate += frameTime;
                        } else {
                            if (this.sinceLastUpdate) {
                                this.rate = (val - this.last) / this.sinceLastUpdate;
                            }
                            this.catchup = (val - this.progress) / options.catchupTime;
                            this.sinceLastUpdate = 0;
                            this.last = val;
                        }
                        if (val > this.progress) {
                            this.progress += this.catchup * frameTime;
                        }
                        scaling = 1 - Math.pow(this.progress / 100, options.easeFactor);
                        this.progress += scaling * this.rate * frameTime;
                        this.progress = Math.min(this.lastProgress + options.maxProgressPerFrame, this.progress);
                        this.progress = Math.max(0, this.progress);
                        this.progress = Math.min(100, this.progress);
                        this.lastProgress = this.progress;
                        return this.progress;
                    };

                    return Scaler;

                })();

                sources = null;

                scalers = null;

                bar = null;

                uniScaler = null;

                animation = null;

                cancelAnimation = null;

                Pace.running = false;

                handlePushState = function () {
                    if (options.restartOnPushState) {
                        return Pace.restart();
                    }
                };

                if (window.history.pushState != null) {
                    _pushState = window.history.pushState;
                    window.history.pushState = function () {
                        handlePushState();
                        return _pushState.apply(window.history, arguments);
                    };
                }

                if (window.history.replaceState != null) {
                    _replaceState = window.history.replaceState;
                    window.history.replaceState = function () {
                        handlePushState();
                        return _replaceState.apply(window.history, arguments);
                    };
                }

                SOURCE_KEYS = {
                    ajax: AjaxMonitor,
                    elements: ElementMonitor,
                    document: DocumentMonitor,
                    eventLag: EventLagMonitor
                };

                (init = function () {
                    var type, _j, _k, _len1, _len2, _ref2, _ref3, _ref4;
                    Pace.sources = sources = [];
                    _ref2 = ['ajax', 'elements', 'document', 'eventLag'];
                    for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
                        type = _ref2[_j];
                        if (options[type] !== false) {
                            sources.push(new SOURCE_KEYS[type](options[type]));
                        }
                    }
                    _ref4 = (_ref3 = options.extraSources) != null ? _ref3 : [];
                    for (_k = 0, _len2 = _ref4.length; _k < _len2; _k++) {
                        source = _ref4[_k];
                        sources.push(new source(options));
                    }
                    Pace.bar = bar = new Bar;
                    scalers = [];
                    return uniScaler = new Scaler;
                })();

                Pace.stop = function () {
                    Pace.trigger('stop');
                    Pace.running = false;
                    bar.destroy();
                    cancelAnimation = true;
                    if (animation != null) {
                        if (typeof cancelAnimationFrame === "function") {
                            cancelAnimationFrame(animation);
                        }
                        animation = null;
                    }
                    return init();
                };

                Pace.restart = function () {
                    Pace.trigger('restart');
                    Pace.stop();
                    return Pace.start();
                };

                Pace.go = function () {
                    var start;
                    Pace.running = true;
                    bar.render();
                    start = now();
                    cancelAnimation = false;
                    return animation = runAnimation(function (frameTime, enqueueNextFrame) {
                        var avg, count, done, element, elements, i, j, remaining, scaler, scalerList, sum, _j, _k, _len1, _len2, _ref2;
                        remaining = 100 - bar.progress;
                        count = sum = 0;
                        done = true;
                        for (i = _j = 0, _len1 = sources.length; _j < _len1; i = ++_j) {
                            source = sources[i];
                            scalerList = scalers[i] != null ? scalers[i] : scalers[i] = [];
                            elements = (_ref2 = source.elements) != null ? _ref2 : [source];
                            for (j = _k = 0, _len2 = elements.length; _k < _len2; j = ++_k) {
                                element = elements[j];
                                scaler = scalerList[j] != null ? scalerList[j] : scalerList[j] = new Scaler(element);
                                done &= scaler.done;
                                if (scaler.done) {
                                    continue;
                                }
                                count++;
                                sum += scaler.tick(frameTime);
                            }
                        }
                        avg = sum / count;
                        bar.update(uniScaler.tick(frameTime, avg));
                        if (bar.done() || done || cancelAnimation) {
                            bar.update(100);
                            Pace.trigger('done');
                            return setTimeout(function () {
                                bar.finish();
                                Pace.running = false;
                                return Pace.trigger('hide');
                            }, Math.max(options.ghostTime, Math.max(options.minTime - (now() - start), 0)));
                        } else {
                            return enqueueNextFrame();
                        }
                    });
                };

                Pace.start = function (_options) {
                    extend(options, _options);
                    Pace.running = true;
                    try {
                        bar.render();
                    } catch (_error) {
                        NoTargetError = _error;
                    }
                    if (!document.querySelector('.pace')) {
                        return setTimeout(Pace.start, 50);
                    } else {
                        Pace.trigger('start');
                        return Pace.go();
                    }
                };

                if (typeof define === 'function' && define.amd) {
                    define(['pace'], function () {
                        return Pace;
                    });
                } else if (typeof exports === 'object') {
                    module.exports = Pace;
                } else {
                    if (options.startOnPageLoad) {
                        Pace.start();
                    }
                }

            }).call(this);
            Pace.on("done", function () {
                setTimeout(function () {
                    window.paceDone = true;
                }, 50);
            });
        } else {
            window.paceDone = true;
        }
    });
    if (debugMode) {
        $("#kvn").append(kvndebugger);
    }
    if (useKirinneeConsole) {
        $("#kvn").append(kvnConsole);
    }

    for (var lo = 0; lo < scripts.length; lo++) {
        dynamicallyLoadScript(dir + "scripts/" + scripts[lo]);
    }
};

var scriptGroup8 = function () {

    $(document).ready(function () {
        var ci = setInterval(function () {
            if (document.getElementById("canvas") !== null) {
                clearInterval(ci);
                $("html").append('<div class="alert"><div class="alert-box"><div class="alert-title"> </div> <div class="alert-text"></div><div class="alert-button"><button id="ok-button">OK</button></div></div></div>');

            }

        }, 10);
    });

    if (builderVar !== null && typeof builderVar !== "undefined") {
        if (builderVar === true) {
            window.sid = sessionStorage.getItem("sceneid");
            window.frameVar = parseInt(sessionStorage.getItem("frame"));
            var hex = sessionStorage.getItem("preview");
            $('<script>').attr('type', 'text/javascript').text(hex).appendTo('head');
        }
    }

    if (!enableSound) {
        VN.setVolume(0);
        BGM.setVolume(0);
        SFX.setVolume(0);
    }

    if (typeof initVar === "undefined" || initVar === null) {
        dynamicallyLoadScript(dir + "scripts/init.js");

    } else {
        dynamicallyLoadScript(dir + initVar);
    }
};

var scriptGroup9 = function () {

    dynamicallyLoadScript(dir + "backend/initialize.js");

};




$(document).ready(function () {
    checkScript(scriptGroup1, function () {
        checkScript(scriptGroup2, function () {
            checkScript(scriptGroup3, function () {
                checkScript(scriptGroup4, function () {
                    checkScript(scriptGroup5, function () {
                        checkScript(scriptGroup6, function () {
                            checkScript(scriptGroup7, function () {
                                checkScript(scriptGroup8, function () {
                                    checkScript(scriptGroup9, function () {
                                        //console.log(performance.now());
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
})
function checkScript(scripts, callback) {

    scripts();
    var cs = setInterval(function () {
        if (isAllScriptLoaded()) {
            callback();
            clearInterval(cs);
        }
    }, 100);
}

if (window.mobilecheck() && !isiOS) {
    if (hasFullScreenOption && alertForFullScreen)
        alert("Enter full screen for a better experience! Click the button on the top-right corner to enter fullscreen!");
}