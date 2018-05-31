
var soundTypeArr = new Array();

var soundCheckArray = new Array();

var VNsound = new Array();
var BGMsound = new Array();
var SFXsound = new Array();

var VN = new SoundType("VN",VNsound);
var BGM = new SoundType("BGM",BGMsound);
var SFX = new SoundType("SFX",SFXsound);

var soundRegistered = false;


function completeSoundLoad(){
    VN.registerSounds();
    BGM.registerSounds();
    SFX.registerSounds();
    soundRegistered = true;
}

function isAllSoundLoaded(){
    var ret = true;
    for(var i=0;i<soundCheckArray.length;i++){
        if(!soundCheckArray[i]){
            ret = false;
        }
    }
    return ret;
}

function pauseAllSound(){
    for(var key in soundTypeArr){
        var st = soundTypeArr[key];
        for(var i =0; i<st.gs.length; i++){
            if(st.gs[i].isPlaying){
               st.gs[i].pause(); 
            }
        }
    }
}

function playAllSound(){
     for(var key in soundTypeArr){
       var st = soundTypeArr[key];
        for(var i =0; i<st.gs.length; i++){
            if(st.gs[i].isPaused){
               st.gs[i].play(); 
            }
        }
    }
}

