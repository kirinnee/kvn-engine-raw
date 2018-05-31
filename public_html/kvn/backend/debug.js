/**
 * By~ K~i~r~i~n~n~e~e
 */
var pause = false;

function initDebugger() {
    if (debugMode) {

        //update states
        setInterval(function () {
            var d = $("#debug-state");
            var e = $("#skip-state");

            if (activeStage === null || typeof activeStage === "undefined" || currentScene === null || typeof currentScene === "undefined") {
                d.css("color", "#ff6666");
                d.html("No scenes or stages!");

                e.css("color", "#ff6666");
                e.html("No scenes or stages!");
            } else {
                if (window.pause) {
                    d.css("color", "#b20000");
                    d.html("Paused");
                } else {
                    if (currentScene.hasCurrentFrameEnded()) {
                        d.css("color", "#5ef9ff");
                        d.html("Ended");
                    } else {
                        d.css("color", "#5eff7b");
                        d.html("Running");
                    }
                }

                if (currentScene.getCurrentFrame().checkIfSkippable()) {
                    e.css("color", "#42f4b0");
                    e.html("true");
                } else {
                    e.css("color", "#f44141");
                    e.html("false");
                }
            }
        }, 10);

        $("#debugger").css("display", "inline-block").promise().done(function () {
            if (!hideAdvanceDebug) {
                $("#advance-debug").css("display", "inline-block");
            }

            var sF = localStorage.getItem("sFrame");
            var sFF = parseInt(localStorage.getItem("sFrameFrame"));


            for (var i = 0; i < sceneIDArray.length; i++) {
                var same = sF === sceneIDArray[i];
                var x = same ? " selected" : "";
                var option = "<option value='" + sceneIDArray[i] + "'" + x + ">" + sceneIDArray[i] + "</option>";
                $("#bd-scene-select").append(option);
            }

            if (typeof sFF === "number" && sFF !== null) {
                if (sFF >= 0) {
                    $("#frame-number-debug").val(sFF);
                }
            }
            ;
        });

        for (var key in characters) {
            var c = characters[key];
            if (c !== null && typeof c !== "undefined") {
                var option = "<option value='" + c.id + "'>" + c.id + "</option>";
                $("#char-logging").append(option);
            }
        }
    }
}


$(document).on("click", "#s-c-l", function () {
    var v = $("#char-logging").val();
    var c = characters[v];
    if (c !== null && typeof c !== "undefined") {
        c.startLogging();
    }

});

//playengine Hooks
$(document).on('click', '#play', function () {
    if (debugMode) {
        $("#pause").removeClass("debug-selected");
        $(this).addClass("debug-selected");
        playEngine();
    }
});

$(document).keyup(function (e) {
    //pause/play
    if (debugMode) {
        if (e.which === 118) {
            if (window.pause) {
                $("#pause").removeClass("debug-selected");
                $("#play").addClass("debug-selected");
                playEngine();
            } else {
                $("#play").removeClass("debug-selected");
                $("#pause").addClass("debug-selected");
                pauseEngine();
            }
        }
    }
});

$(document).on('click', '#pause', function () {
    if (debugMode) {
        $("#play").removeClass("debug-selected");
        $(this).addClass("debug-selected");
        pauseEngine();
    }
});

$(document).on('click', '#next', function () {
    if (debugMode)
        debugNext();
});

$(document).on('click', '#prev', function () {
    if (debugMode)
        debugPrev();
});

$(document).on('click', '#replay', function () {
    if (debugMode)
        debugReplayFrame();
});

$(document).on('click', "#restart-current-scene", function () {
    if (debugMode)
        restartScene();
});

function debugNext() {
    if (currentScene !== null) {
        currentScene.forceNextFrame();
    }
}

function debugPrev() {
    if (currentScene !== null) {
        currentScene.prevFrame();
    }
}

function debugReplayFrame() {
    if (currentScene !== null) {
        currentScene.restartFrame();
    }
}

function restartScene() {
    if (currentScene !== null) {
        currentScene.restart();
    }
}



$(document).on('click', '#go-scene-debug', function () {
    if (debugMode) {
        var s = $("#bd-scene-select").val();
        var f = parseInt($("#frame-number-debug").val());
        if (debugGoSceneEvadeError) {
            $("#canvas").css("display", "block");
            $("#errorscreen").css("display", "none");
        }
        if (typeof f === "number" && f !== null && f >= 0) {
            if (scenes[s] !== null && typeof scenes[s] !== "undefined") {
                playScene(s, f);
                localStorage.setItem("sFrame", s);
                localStorage.setItem("sFrameFrame", f);
            }
        }
    }
});


$(document).on('click', '#ado', function () {
    var vis = $("#advance-debug").css("display") !== "none";
    if (vis) {
        $("#advance-debug").css("display", "none");
    } else {
        $("#advance-debug").css("display", "inline-block");
    }

});


$(document).on('click', ".char-logger", function () {
    if (debugMode && characterLogging) {
        $(this).draggable({
            classes: {
                "ui-draggable": "highlight"
            }
        });
        $(this).resizable();
        $(this).css("position", "absolute");
    }
});

$(document).on('click', 'body', function (evt) {
    if (debugMode && characterLogging) {
        $(".char-logger").each(function () {
            if (!$(evt.target).is($(this))) {
                try {
                    $(this).resizable("destroy");
                    $(this).draggable("destroy");
                } catch (e) {
                }
            }
        });
    }

});

function download(data, filename, type) {
    if (debugMode && characterLogging) {
        var file = new Blob([data], {type: type});
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var a = document.createElement("a"),
                    url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }
}

$(document).on("click", ".char-logger .char-log-export", function () {

    if (debugMode && characterLogging) {
        var charID = $(this).attr('char');
        if (characters[charID] !== null && typeof characters[charID] !== "undefined") {
            var id = "#kvn-char-logger-for-" + charID;
            var data = $(id).html();
            download(data, charID + "htm", "html");
        }
    }

});

$(document).on("click", ".char-logger .char-log-close", function () {
    if (debugMode && characterLogging) {
        var charID = $(this).attr('char');
        if (characters[charID] !== null && typeof characters[charID] !== "undefined") {
            var char = characters[charID];
            if ($(this).siblings(".char-log-editting").html().trim() === "edit") {
                char.stopLogging();
            }
        }
    }
});

$(document).on("click", ".char-log-editting", function () {
    if (debugMode && characterLogging) {
        var charID = $(this).attr('char');
        if (characters[charID] !== null && typeof characters[charID] !== "undefined") {
            if (!characters[charID].isAnimating()) {
                var isEdit = $(this).html().trim() === "edit";
                if (isEdit) {
                    pauseEngine();
                    $(this).html("done");
                    cutDownLayers();
                    $("#debugger").css("display", "none");
                    $("#" + charID).draggable({
                        classes: {
                            "ui-draggable": "highlight"
                        }
                    });
                    $("#" + charID).resizable();

                    var id = "#kvn-char-logger-for-" + charID;
                    $(id).children(".table").children("table").children("tbody").children("tr").children(".old").each(function () {
                        if ($(this).children("input").length) {
                            $(this).children("input").css("display", "none");
                            $(this).children(".act").css("display", "block");

                        }
                        $(this).children(".act").css("text-align", "right");
                    });

                    $(".character").css("display", "none");
                    $("#" + charID).css("display", "block");
                } else {
                    $(this).html("edit");
                    bringBackLayers();
                    $("#debugger").css("display", "inline-block");
                    $("#" + charID).resizable("destroy");
                    $("#" + charID).draggable("destroy");
                    var id = "#kvn-char-logger-for-" + charID;
                    $(id).children(".table").children("table").children("tbody").children("tr").children(".old").each(function () {
                        if ($(this).children("input").length) {
                            $(this).children("input").css("display", "block");
                            $(this).children(".act").css("display", "none");
                        }
                        $(this).children(".act").css("text-align", "left");
                    });
                    $(".character").css("display", "block");

                    //Massive Math Machine!
                    var hvw = $("body").width();
                    var onePx = 100 / hvw;

                    var cha = characters[charID];

                    var left = parseInt($("#" + charID).css("left")) * onePx;
                    var top = parseInt($("#" + charID).css("top")) * onePx;
                    var width = parseInt($("#" + charID).css("width")) * onePx;
                    var height = parseInt($("#" + charID).css("height")) * onePx;

                    var xScale = cha.xscale;

                    //find w
                    var w = width / xScale;

                    //find h
                    var h = height / xScale;

                    //finding X
                    var xAlign = cha.xAlign;
                    var aX = cha.anchorX;

                    var x = left + (aX * width) / (100 * xScale) - xAlign;

                    //finding y
                    var aY = cha.anchorY;
                    var yAlign = cha.yAlign;
                    var yScale = cha.yscale;
                    var hm = heightMultiplier;
                    var vnW = vnScreenWidth;

                    var y = top / yScale + (aY * h - yAlign * hm * vnW) / (100 * yScale);

                    //set the character
                    cha.x = x;
                    cha.y = y;
                    cha.w = w;
                    cha.h = h;
                    cha.animate(0);

                    playEngine();
                }
            }
        }
    }

});


$(document).on("change", ".kvn-edit", function () {
    var index = $(this).parent('td').parent('tr').attr('stat');
    var char = $(this).attr('char');

    var v = charFilter[index]($(this).val());

    if (v !== null) {
        var c = getCharacterByID(char);
        if (c !== null && typeof c !== "undefined" && currentScene !== null &&
                typeof currentScene !== "undefined" && activeStage !== null) {
            c[index] = v;
            activeStage.applyCharacterCSS(c);
            //c.animate(0);
        }
    }
});


$(document).on('click', '.char-logger .title', function () {

    if (debugMode && characterLogging) {
        var parent = $(this).parent("div");
        var tag = $(this).attr('tag');
        var ele = $(this);

        parent.children('.table').each(function () {
            if ($(this).attr('tag') === tag) {
                var hide = $(this).css("display") === "none";
                if (hide) {
                    $(this).slideDown(300);
                    ele.html(ele.html().replace("+", "-"));
                } else {

                    $(this).slideUp(300);
                    ele.html(ele.html().replace("-", "+"));
                }
            }
        });
    }

});

$(document).on('click', "#toggle-debug-edit", function () {
    if (debugMode && characterLogging) {
        var editmode = $(this).html().trim() === "done";
        if (editmode) {

            $(this).html("edit");
            $("#debugger").resizable("destroy");
            $("#debugger").draggable("destroy");
        } else {
            $(this).html("done");
            $("#debugger").draggable({
                classes: {
                    "ui-draggable": "highlight"
                }
            });
            $("#debugger").resizable();
        }
    }

});


$(document).on('click', "#c-bg", function () {
    var file = $("#bgchange")[0].files[0];
    var reader = new FileReader();
        
    
    reader.onloadend = function () {
        console.log("fuk");
        
        if (activeStage !== null && typeof activeStage !== "undefined") {
            activeStage.instantChangeBG(reader.result);
        }
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

function isNum(x) {
    if (typeof x !== "number") {
        return false;
    }
    return true;
}

function isPositiveNum(x) {
    if (typeof x !== "number") {
        return false;
    }
    if (x < 0) {
        return false;
    }
    return true;
}

function isNZPositiveNum(x) {
    if (typeof x !== "number") {
        return false;
    }
    if (x <= 0) {
        return false;
    }
    return true;
}




var charFilter = {
    x: function (x) {
        x = parseFloat(x);
        if (!isNum)
            return null;
        return x;
    },
    y: function (x) {
        x = parseFloat(x);
        if (!isNum)
            return null;
        return x;
    },
    w: function (x) {
        x = parseFloat(x);
        if (!isNZPositiveNum(x))
            return null;
        return x;
    },
    h: function (x) {
        x = parseFloat(x);
        if (!isNZPositiveNum(x))
            return null;
        return x;
    },
    xAlign: function (x) {
        x = parseFloat(x);
        if (!isNum(x))
            return null;
        return x;
    },
    yAlign: function (x) {
        x = parseFloat(x);
        if (!isNum(x))
            return null;
        return x;
    },
    anchorX: function (x) {
        x = parseFloat(x);
        if (!isNum(x))
            return null;
        return x;
    },
    anchorY: function (x) {
        x = parseFloat(x);
        if (!isNum(x))
            return null;
        return x;
    },
    vblur: function (x) {
        x = parseFloat(x);
        if (!isPositiveNum(x))
            return null;
        return x;
    }, opacity: function (x) {
        x = parseFloat(x);
        if (!isNum(x))
            return null;
        return Math.max(Math.min(1, x), 0);
    },
    vgrayscale: function (x) {
        x = parseFloat(x);
        if (!isNum(x))
            return null;
        return Math.max(Math.min(1, x), 0);
    },
    vinvert: function (x) {
        x = parseFloat(x);
        if (!isNum(x))
            return null;
        return Math.max(Math.min(1, x), 0);
    },
    vsepia: function (x) {
        x = parseFloat(x);
        if (!isNum(x))
            return null;
        return Math.max(Math.min(1, x), 0);
    },
    vbrightness: function (x) {
        x = parseFloat(x);
        if (!isPositiveNum(x))
            return null;
        return x;
    },
    vcontrast: function (x) {
        x = parseFloat(x);
        if (!isPositiveNum(x))
            return null;
        return x;
    },
    vsaturation: function (x) {
        x = parseFloat(x);
        if (!isPositiveNum(x))
            return null;
        return x;
    },
    vhue: function (x) {
        x = parseFloat(x);
        if (!isNum(x))
            return null;
        return x;
    },
    vrotate: function (x) {
        x = parseFloat(x);
        if (!isNum(x))
            return null;
        return x;
    },
    vskewx: function (x) {
        x = parseFloat(x);
        if (!isNum(x))
            return null;
        return x;
    },
    vskewy: function (x) {
        x = parseFloat(x);
        if (!isNum(x))
            return null;
        return x;
    }

};