'use strict';

class SoundType {
    constructor(id,array) {
        this.id = id;
        this.volume = 1;
        this.gs = array;
        soundTypeArr.push(this);
    }
    
    getSoundRegistered(){
        return this.gs;
    }
    
    registerSounds(){
        for(var i =0; i<this.gs.length; i++){
            this.gs[i].register();
        }
    }
    
    getVolume(){
        return this.volume;
    }
    
    applyNewVolume(){
        for(var i =0; i<this.gs.length; i++){
            this.gs[i].applyVolume();
        }
    }
    
    setVolume(newVol){
        var v = Math.min(Math.max(0,newVol),1);
        this.volume = newVol;
        this.applyNewVolume();
    }
    
    changeVolume(relative){
        var v = this.volume + relative;
        v = Math.min(Math.max(0,v),1);
        this.volume = v;
        this.applyNewVolume();
    }
    
}
