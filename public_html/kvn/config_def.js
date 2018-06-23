
//Please enter how large you want the screen width relative to the full screen width (85 = 85%)
var vnScreenWidth = 100;
//the ratio of the vn Width to the vn Height. If you want your VN to have a 16:9 ratio, then put 16:9
var vnScreenRatio = "16:9";
//hide overflow
var hideOverflow = true;

//The links to all your script in
var scripts = ["demo.js"];

var displaySpriteName = false;

//allow for fullscreen
var hasFullScreenOption = true;
//alert for mobile users to use full screen
var alertForFullScreen = false;

//enforces lanscape mode
var enforceLandscape = true;
//text speedhe higher, the fast, between 0 and 1 would be slower
var textSpeed = 0.75;

//completion marker, please use HTML accepted imputs (hex, ideally)
var completionMarkerRunningColor = "#ff6666";
var completionMarkerCompleteColor = "#6bffa1";

//debug mode
var debugMode = true;
//catches native error
var catchNativeError = false;
//generates a fake error on console, for stack tracing
var generateBrowserConsoleStacktrace = true;
//Only has effect if 'generateBrowserConsoleStacktrace' is true. Generates red error with the full freaking stacktrace
var verboseError = false;
//user my console :>>
var useKirinneeConsole = true;
//hide advance debug by default
var hideAdvanceDebug = true;
//advance debug "go" scene function escape error log. Note: this may be screwy as all hell
var debugGoSceneEvadeError = true;

//background and character logging
var backgroundLogging = false;
var characterLogging = true;

var enableSound = true;

//embbed mode
var embbedMode = false;
//ratios still apply, whether to set to 100% 100% for the most parent div for the KVN application
var cssWidth = false;
var embbedFSWidth = 100; //in view width
var embbedScrollTrigger = false;

var paceIntegration = true;

var useResponsiveImages = false;
var responsiveImageDefKey = "def";
var responsiveImageDefSize = 2000;
//100 = 2000px
var responsiveImage = {"def":100};

var devEnv = true;
