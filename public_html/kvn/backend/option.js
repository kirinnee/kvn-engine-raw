'use strict';

class Options {
    constructor(text, id, callback,password) {
        if(password!=="sophiebestgrill"){
            if (!window.contains.call(window.optionIDArray, id)) {
                window.optionIDArray.push(id);
                window.optionList[id] = callback;
            }else{
                displayError("Illegal Argument Exception: ID for option <i>"+text+"</i> and id </i>"+id+"</i> has already been used.");
            }
            this.text = text;
            this.id = id;
            this.callback = callback;
        }
    }
    
    getText(){
        return this.text;
    }
    
    getID(){
        return this.id;
    }
    
    executeCallback(){
        if(typeof this.callback==="function"){
            return this.callback();
        }else{
            return false;
        }
    }
    
}