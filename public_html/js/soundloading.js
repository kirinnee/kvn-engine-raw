
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