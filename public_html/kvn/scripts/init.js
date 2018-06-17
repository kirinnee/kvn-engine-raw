var playName = "Marcus";

function soundLoadPhase() {
  //load/create sounds here		window.boriolsis_townM = new GameSound(VN, "Boriolsis_Town.mp3, true");		window.boriolsis_forestM = new GameSound(VN, "Boriolsis_Forest.mp3, true");		window.boriolsis_valleyM = new GameSound(VN, "Boriolsis_Valley.mp3, true");		window.boys_roomM = new GameSound(VN, "Boys_Room.mp3, true");
  window.brostikaM = new GameSound(VN, "Brostika.mp3", true);
  window.dark_alleyM = new GameSound(VN, "Dark_Alley.mp3", true);
  window.edge_of_boriolsisM = new GameSound(VN, "Edge_of__Boriolsis.mp3", true);
  window.erithvenM = new GameSound(VN, "Erithven.mp3", true);
  window.erithven_apothecaryM = new GameSound(VN, "Erithven_Apothecary.mp3", true);
  window.malidretM = new GameSound(VN, "malidret.mp3", true);
  window.revelation_revolutionM = new GameSound(VN, "Revelation_Revolution.mp3", true);
  window.deathM = new GameSound(VN, "Royal_Death.mp3", true);
  window.solemn_strengthM = new GameSound(VN, "erithven.mp3", true);
  window.sophies_roomM = new GameSound(VN, "Sohpies_Room.mp3", true);
  window.titleM = new GameSound(VN, "The_Princess__Saviour.mp3", true);
  window.valley_of_kusuriM = new GameSound(VN, "Valley_of_Kusuri.mp3", true);
  window.stabM = new GameSound(VN, "stab.mp3", false);
  window.xperrorM = new GameSound(VN, "error.mp3", false);
}


function publicStaticVoidMain(id) {

  if (id === 0) {
    //the first scene to be played here
    //playScene(scene,frame);
    playScene("brostika_constable_2", 20);
  }

}
//====================CHARACTER INIT HERE============
//creating a new character - id, name, image, width, height, xoffset, yoffset, vertical align, horizontal align

/*===============================================
			COMMON CHARACTERS
===============================================*/
//HEIGHT ON SCREEN TBC
var sophie = new Character("sophie", "Sophie", "sophie.png", 61.2, 61.2 * 1.4, -35, 59, 50, 50).addSprite("smile", "sophie/smile.png")
  .addSprite("angry", "sophie/angry.png")
  .addSprite("angry_speak", "sophie/angry_speak.png")
  .addSprite("cry", "sophie/cry.png")
  .addSprite("cry_speak", "sophie/cry_speak.png")
  .addSprite("embarassed", "sophie/embarassed.png")
  .addSprite("embarassed_speak", "sophie/embarassed_speak.png")
  .addSprite("exclaim_speak", "sophie/exclaim_speak.png")
  .addSprite("joy", "sophie/joy.png")
  .addSprite("joy_speak", "sophie/joy_speak.png")
  .addSprite("pout", "sophie/pout.png")
  .addSprite("proud", "sophie/proud.png")
  .addSprite("proud_speak", "sophie/proud_speak.png")
  .addSprite("sad", "sophie/sad.png")
  .addSprite("sad_speak", "sophie/sad_speak.png")
  .addSprite("scared", "sophie/scared.png")
  .addSprite("scared_speak", "sophie/scared_speak.png")
  .addSprite("shocked", "sophie/shocked.png")
  .addSprite("shocked_speak", "sophie/shocked_speak.png")
  .addSprite("shy", "sophie/shy.png")
  .addSprite("shy_speak", "sophie/shy_speak.png")
  .addSprite("sulk", "sophie/sulk.png")
  .addSprite("tear", "sophie/tear.png")
  .addSprite("tear_speak", "sophie/tear_speak.png")
  .addSprite("terrified", "sophie/terrified.png")
  .addSprite("terrified_speak", "sophie/terrified.png")
  .setDefaultSkippable(true) //make all animation skippable unless othewise stated. if this is not called, the default skippable's default is false
  .setDefaultAnimateInterpolation(swing) //make all animation swing instead of linearly animate
  .complete(); //complete the construction of the character

//HEIGHT ON SCREEN TBC
var charles = new Character("charles", "Charles", "charles.png", 68, 68 * 1.4, -15, 55, 50, 50)
  .setHorizontalFlip(true)
  .addSprite("angry_speak", "charles/angry_speak.png")
  .addSprite("upset", "charles/upset.png")
  .addSprite("annoyed_speak", "charles/annoyed_speak.png")
  .addSprite("proud", "charles/proud.png")
  .addSprite("smile", "charles/smile.png")
  .addSprite("shadow", "charles/shadow.png")
  .addSprite("blood", "charles/blood.png")
  .complete();



/*===============================================
			BROSTIKA INIT(NEED UPDATE)
===============================================*/
//Brostika First Scene (HEIGHT ON SCREEN TBC)
var chelsea = new Character("chelsea", "Chelsea", "Chelsea.png", 68, 95.2, 30.9, 65, 50, 50)
  .addSprite("smile", "v_brostika/chelsea/smile.png")
  .addSprite("surprised_speak", "v_brostika/chelsea/surprised_speak.png")
  .addSprite("joy", "v_brostika/chelsea/joy.png")
  .setDefaultSkippable(true)
  .setDefaultAnimateInterpolation(swing)
  .setFontSize("1.5vw")
  .complete();
//Brostika Alley Scene (Tristan is unique in that his default face is sad_speak, not smile_speak)
var tristan = new Character("tristan", "Tristan", "tristan.png", 60, 60 * 1.4, 60.2, 36, 10, 10)
  .addSprite("bleed", "v_brostika/tristan/bleed.png")
  .addSprite("pain", "v_brostika/tristan/pain.png")
  .addSprite("pain_speak", "v_brostika/tristan/pain_speak.png")
  .addSprite("worried", "v_brostika/tristan/worried.png")
  .setDefaultSkippable(true)
  .setDefaultAnimateInterpolation(swing)
  .complete();

//Brostika
var yusie = new Character("yusie", "Yusie", "yusie.png", 60, 60 * 1.4, 30, 55, 50, 50)
  .setDefaultSkippable(true)
  .setDefaultAnimateInterpolation(swing)
  .complete();

var broski = new Character("broski", "Mr Broski", "broski.png", 55, 55 * 1.4, 30, 55, 50, 50)
  .setDefaultSkippable(true)
  .setDefaultAnimateInterpolation(swing)
  .complete();

var healingMagicCG = new Character("healingmagic", "CG 1", "cg1.jpg", 100, 56.25, 0, 0, 50, 50)
  .setDefaultSkippable(true)
  .setDefaultAnimateInterpolation(swing)
  .complete();

var slime = new Character("slime", "slime", "slime.png", 25, 25, 60, 0, 50, 50)
  .setDefaultSkippable(true)
  .setDefaultAnimateInterpolation(swing)
  .complete();

var slime2 = new Character("slime2", "slime2", "slime.png", 28, 28, 70, 20, 50, 50)
  .setDefaultSkippable(true)
  .setDefaultAnimateInterpolation(swing)
  .complete();

/*===============================================
			ERITHVEN INIT(NEED UPDATE)
===============================================*/
//Erithven House Scenes (Child is special in that his default face is ill_speak, not smile_speak)
var sickchild = new Character("sickchild", "Sick Child", "v_erithven/child/ill_speak.png", 32.4, 45.36, 5, 39, 0, 100)
  .addSprite("cough", "v_erithven/child/cough.png")
  .addSprite("smile_speak", "v_erithven/child/smile_speak.png")
  .addSprite("sad", "v_erithven/child/sad.png")
  .addSprite("joy_speak", "v_erithven/child/joy_speak.png")
  .setDefaultSkippable(true)
  .setDefaultAnimateInterpolation(swing)
  .complete();

//Erithven House Scenes (Mother is special in that her default face is worry_speak, not smile_speak)
var erithven_mother = new Character("erithven_mother", "Mother", "v_erithven/mother/worry_speak.png", 60, 84, 0, 30, 0, 100)
  .addSprite("angry_speak", "v_erithven/mother/angry_speak.png")
  .addSprite("cry_speak", "v_erithven/mother/cry_speak.png")
  .addSprite("smile_speak", "v_erithven/mother/smile_speak.png")
  .addSprite("smile", "v_erithven/mother/smile.png")
  .setDefaultSkippable(true)
  .setDefaultAnimateInterpolation(swing)
  .complete();

//Apothecary Scenes
var guy_staff = new Character("guy_staff", "Staff A", "v_erithven/apothecary_guy/smile_speak.png", 68, 95.2, 8, 18, 0, 100)
  .addSprite("annoyed_speak", "v_erithven/apothecary_guy/annoyed_speak.png")
  .addSprite("sheepish", "v_erithven/apothecary_guy/sheepish.png")
  .setDefaultSkippable(true)
  .setDefaultAnimateInterpolation(swing)
  .complete();

var girl_staff = new Character("girl_staff", "Staff B", "v_erithven/apothecary_girl/smile_speak.png", 68, 95.2, 25, 20, 0, 100)
  .addSprite("annoyed_speak", "v_erithven/apothecary_girl/annoyed_speak.png")
  .addSprite("sheepish", "v_erithven/apothecary_girl/blush_speak.png")
  .setDefaultSkippable(true)
  .setDefaultAnimateInterpolation(swing)
  .complete();

/*===============================================
			BORIOLSIS INIT(NEED UPDATE)
===============================================*/

//Ruskoff Fighting Scene in Boriolsis
var ruskoff = new Character("ruskoff", "Ruskoff", "v_boriolsis/ruskoff/arrogant.png", 68, 95.2, 8, 12, 0, 100)
  .addSprite("angry", "v_boriolsis/ruskoff/angry.png")
  .addSprite("angry_speak", "v_boriolsis/ruskoff/angry_speak.png")
  .addSprite("pain_speak", "v_boriolsis/ruskoff/pain_speak.png")
  .addSprite("smile_speak", "v_boriolsis/ruskoff/smile_speak.png")
  .setDefaultSkippable(true)
  .setDefaultAnimateInterpolation(swing)
  .complete();
var minion = new Character("minion", "Minion", "v_boriolsis/ruskoff/arrogant.png", 68, 95.2, -20, 15, 0, 100)
  .addSprite("angry", "v_boriolsis/ruskoff/angry.png")
  .addSprite("angry_speak", "v_boriolsis/ruskoff/angry_speak.png")
  .addSprite("pain_speak", "v_boriolsis/ruskoff/pain_speak.png")
  .addSprite("smile_speak", "v_boriolsis/ruskoff/smile_speak.png")
  .setDefaultSkippable(true)
  .setDefaultAnimateInterpolation(swing)
  .complete();
var minion1 = new Character("minion1", "Minion", "v_boriolsis/ruskoff/arrogant.png", 68, 95.2, -40, 18, 0, 100)
  .addSprite("angry", "v_boriolsis/ruskoff/angry.png")
  .addSprite("angry_speak", "v_boriolsis/ruskoff/angry_speak.png")
  .addSprite("pain_speak", "v_boriolsis/ruskoff/pain_speak.png")
  .addSprite("smile_speak", "v_boriolsis/ruskoff/smile_speak.png")
  .setDefaultSkippable(true)
  .setDefaultAnimateInterpolation(swing)
  .complete();
var minion2 = new Character("minion2", "Minion", "v_boriolsis/ruskoff/arrogant.png", 68, 95.2, 8, 12, 0, 100)
  .addSprite("angry", "v_boriolsis/ruskoff/angry.png")
  .addSprite("angry_speak", "v_boriolsis/ruskoff/angry_speak.png")
  .addSprite("pain_speak", "v_boriolsis/ruskoff/pain_speak.png")
  .addSprite("smile_speak", "v_boriolsis/ruskoff/smile_speak.png")
  .setDefaultSkippable(true)
  .setDefaultAnimateInterpolation(swing)
  .complete();
//Boriolsis Town Scene
var alchemist = new Character("alchemist", "Alchemist", "v_boriolsis/alchemist/worry.png", 68, 95.2, 15, 25, 0, 100)
  .addSprite("confident", "v_boriolsis/alchemist/confident.png")
  .addSprite("cry", "v_boriolsis/alchemist/cry.png")
  .addSprite("smile", "v_boriolsis/alchemist/smile.png")
  .addSprite("thankful", "v_boriolsis/alchemist/thankful.png")
  .setDefaultSkippable(true)
  .setDefaultAnimateInterpolation(swing)
  .complete();
var daughter = new Character("daughter", "Daughter", "v_boriolsis/alchemist_daughter/cry.png", 42.075, 58.905, 10, 50, 0, 100)
  .addSprite("relieved", "v_boriolsis/alchemist_daughter/relieved.png")
  .addSprite("smile", "v_boriolsis/alchemist_daughter/smile.png")
  .setDefaultSkippable(true)
  .setDefaultAnimateInterpolation(swing)
  .complete();
var chief = new Character("chief", "Chief", "v_boriolsis/chief/smile.png", 68, 95.2, 12, 22, 0, 100)
  .addSprite("serious", "v_boriolsis/chief/serious.png")
  .addSprite("wise", "v_boriolsis/chief/wise.png")
  .addSprite("worried", "v_boriolsis/chief/worried.png")
  .setDefaultSkippable(true)
  .setDefaultAnimateInterpolation(swing)
  .complete();
var deadsophie = new Character("deadsophie", "deadSophie", "sophie/dead_sophie.png", 68, 95.2, 12, 65, 50, 50)
  .setDefaultSkippable(true)
  .setDefaultAnimateInterpolation(swing)
  .complete();
var slane = new Character("slane", "Slane", "v_boriolsis/slane/slysmile.png", 68, 95.2, 12, 15, 0, 100)
  .addSprite("smile", "v_boriolsis/slane/smile.png")
  .addSprite("angry", "v_boriolsis/slane/angry.png")
  .addSprite("laugh", "v_boriolsis/slane/laugh.png")
  .setDefaultSkippable(true)
  .setDefaultAnimateInterpolation(swing)
  .complete();
var wizard = new Character("wizard", "Wizard", "v_boriolsis/wizard/polite.png", 68, 95.2, 10, 8, 0, 100)
  .addSprite("serious", "v_boriolsis/wizard/serious.png")
  .addSprite("angry", "v_boriolsis/wizard/angry.png")
  .addSprite("annoyed", "v_boriolsis/wizard/annoyed.png")
  .addSprite("awkward", "v_boriolsis/wizard/awkward.png")
  .setDefaultSkippable(true)
  .setDefaultAnimateInterpolation(swing)
  .complete();
//Murder Scene (King is special in that his default face is smile, not smile_speak)
var king = new Character("king", "King", "v_boriolsis/king/smile.png", 68, 95.2, 35.9, 15.7, 50, 50)
  .addSprite("bleed", "v_boriolsis/king/bleed.png")
  .addSprite("despair_speak", "v_boriolsis/king/despair_speak.png")
  .addSprite("joy", "v_boriolsis/king/joy.png")
  .addSprite("shocked_speak", "v_boriolsis/king/shocked_speak")
  .setDefaultSkippable(true)
  .setDefaultAnimateInterpolation(swing)
  .setFontSize("1.5vw")
  .complete();
//Murder Scene (Queen is special in that her default face is smile, not smile_speak)
var queen = new Character("queen", "Queen", "v_boriolsis/queen/smile.png", 68, 95.2, 25.9, 20.5, 50, 50)
  .addSprite("bleed", "v_boriolsis/queen/bleed.png")
  .addSprite("despair_speak", "v_boriolsis/queen/despair_speak.png")
  .addSprite("joy_speak", "v_boriolsis/queen/joy_speak.png")
  .addSprite("shocked_speak", "v_boriolsis/queen/shocked_speak")
  .setDefaultSkippable(true)
  .setDefaultAnimateInterpolation(swing)
  .setFontSize("1.5vw")
  .complete();

//Murder Scene (this is a panning background)
var village = new Character("village", "Village", "boriolsis.jpg", 133.3, 75, 0, 0, 0, 0)
  .setDefaultSkippable(true) //make all animation skippable unless othewise stated. if this is not called, the default skippable's default is false
  .setDefaultAnimateInterpolation(swing) //make all animation swing instead of linearly animate
  .complete();
/*===============================================
    MALIDRET INIT(NEED UPDATE)
===============================================*/

//Traveller in Malidret
var patrick = new Character("patrick", "Patrick", "v_malidret/patrick/pain.png", 60, 84, 15, 28, 0, 100)
  .addSprite("tired", "v_malidret/patrick/tired.png")
  .addSprite("smile", "v_malidret/patrick/smile.png")
  .addSprite("tiredsmile", "v_malidret/patrick/tiredsmile.png")
  .addSprite("excited", "v_malidret/patrick/excited.png")
  .setDefaultSkippable(true)
  .setDefaultAnimateInterpolation(swing)
  .complete();
var minion3 = new Character("minion3", "Minion", "v_boriolsis/ruskoff/arrogant.png", 68, 95.2, -6, 12, 0, 100)
  .addSprite("angry", "v_boriolsis/ruskoff/angry.png")
  .addSprite("angry_speak", "v_boriolsis/ruskoff/angry_speak.png")
  .addSprite("pain_speak", "v_boriolsis/ruskoff/pain_speak.png")
  .addSprite("smile_speak", "v_boriolsis/ruskoff/smile_speak.png")
  .setDefaultSkippable(true)
  .setDefaultAnimateInterpolation(swing)
  .complete();

//====================STAGE INIT HERE============
var brostika = new Stage("brostika", "brostika_outside.jpg")
  .addBackground("alley", "alley.png")
  .addBackground("police", "police.png")
  .addBackground("winery", "winery.png")
  .setDefaultAnimateInterpolation(swing)
  .complete(); //creating a stage

var boriolsis = new Stage("boriolsis", "boriolsis.jpg")
  .addBackground("boriolsis_southforest", "boriolsis_sforest.png")
  .addBackground("boriolsis_chouse", "boriolsis_chouse.jpg")
  .addBackground("boriolsis_path", "boriolsis_path.jpg")
  .addBackground("boriolsis_valley", "boriolsis_valley.jpg")
  .complete(); //creating a stage

var erithven = new Stage("erithven", "erithven.jpg")
  .addBackground("erithven_house", "erithven_house.png")
  .addBackground("erithven_apothecary", "erithven_apothecary.png")
  .addBackground("erithven_valley", "erithven_valley.png")
  .complete(); //creating a stage

var malidret = new Stage("malidret", "malidret.png")
  .addBackground("malidret_corner", "malidret_corner.png")
  .addBackground("malidret_bakery", "malidret_bakery.jpg")
  .addBackground("malidret_rent", "malidret_rent.jpg")
  .addBackground("malidret_deadroom", "malidret_deadroom.jpg")
  .complete(); //creating a stage
