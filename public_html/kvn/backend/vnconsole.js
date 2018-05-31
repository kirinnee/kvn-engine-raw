"use strict";
var fullerror = "VN Custom Console by kirinnee <br>";
function displayError(a) {
    fullerror += "<br><b>" + a + "</b>",
            fullerror += "<br><br> Stack trace: <br>",
            fullerror += getStack() + "<br>",
            window.dError();
}
function displayRealError(a, b) {
    for (var c = b.stack + "", d = c.split(")"), f = "", g = 0; g < d.length; g++)
        -1 < g && (f += d[g] + ") <br>");
    fullerror += "<br><b>" + a + "</b>",
            fullerror += "<br><br> Stack trace: <br>",
            fullerror += f + "<br>",
            window.dError();
}
function dError() {
    if (useKirinneeConsole){
        if (document.getElementById("canvas").style.display = "none",
                document.getElementById("errorscreen").innerHTML = fullerror,
                document.getElementById("errorscreen").style.display = "block",
                document.getElementById("errorscreen").style.zIndex = "5000000",
                generateBrowserConsoleStacktrace) {
            if (!verboseError) {
                try {
                    throw new Error("KVN Custom Stacktrace");
                } catch (a) {
                    console.log(a);
                }
            } else {
                throw new Error("KVN Verbose Error");
            }
        }
    }
}
function getStack() {
    try {
        throw new Error;
    } catch (f) {
        for (var a = f.stack + "", b = a.split(")"), c = "", d = 0; d < b.length; d++)
            1 < d && (c += b[d] + ") <br>");
        return c;
    }
}
