

function soundLoadPhase() {
    //load/create sounds here
    window.town = new GameSound(VN, "town.mp3", true);
    window.stab = new GameSound(VN, "stab.mp3", false);
    window.xperror = new GameSound(VN, "erro.mp3", false);
    window.title = new GameSound(VN, "title.mp3", false);

}


function publicStaticVoidMain(id) {
    if (id === 0) {
        //the first scene to be played here
        //playScene(scene,frame);
        playScene("copypasta",0);
    }

}


//recommended to load construct reusable characters here
var smol_sophie = new Character("sophiesmol","Sophie","/sophie_small.png",48,65,0,46,50,50).complete();

var sophie = new Character("sophie", "Sophie", "/sophie/def.png", 20, 56.5, 0, 0, 50, 50)
        .addSprite("angry1", "/sophie/angry1.png")
        .addSprite("angry0", "/sophie/angry0.png")
        .addSprite("overjoy", "/sophie/overjoy.png")
        .addSprite("pout", "/sophie/pout.png")
        .addSprite("proud", "/sophie/proud.png")
        .addSprite("sad", "/sophie/sad.png")
        .addSprite("scared", "/sophie/scared.png")
        .addSprite("shocked", "sophie/shocked.png")
        .addSprite("shy", "sophie/shy.png")
        .addSprite("tear", "sophie/tear.png")
        .addSprite("smile", "sophie/smile.png")
        .addSprite("cry", "sophie/cry.png")
        .setDefaultSkippable(true) //make all animation skippable unless othewise stated. if this is not called, the default skippable's default is false
        .setDefaultAnimateInterpolation(swing) //make all animation swing instead of linearly animate
        .setCustomDirectory("https://sophie.hime.moe/kvn/images/char/")
        .complete(); //complete the construction of the character

var charles = new Character("charles", "Charles", "charles.png", 63.3, 103.3, -10.8, 50, 1, 1)
        .setDefaultSkippable(true)
        .setDefaultAnimateInterpolation(swing)
        .complete();

//Stage inits

var brostika = new Stage("brostika", "brostika.jpg")
        .setCustomDirectory("https://test.hime.moe/images/bkgd/")
        .complete(); //creating a stage

var boriolsis = new Stage("boriolsis", "boriolsis.jpg")
        .complete(); //creating a stage