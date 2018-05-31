var chelsea = new Character("chelsea", "Chelsea", "chelsea/def.png", 50.6, 50.6, 30.9, 15.3, 1, 1)
        .addSprite("smile", "chelsea/smile.png")
        .setDefaultSkippable(true)
        .setDefaultAnimateInterpolation(swing)
        .setFontSize("1.5vw")
        .complete();


var frames = [

    new Frame(function () {
        //adding characters to the stage, does not mean they are visible unless u preset them to be
        brostika.bringCharacter(charles);
        brostika.bringCharacter(sophie);
        brostika.bringCharacter(chelsea);

        charles.preMove(20, 0);
        chelsea.preMove(40, 0);
        sophie.preMove(-35, 0);
        //fades in the background over a time span of 500ms
        brostika.display(1, 1, 1000, function () {
            //after the above animation is done, display text
            //parameters are: text, promise, name (if there is a speaker), centered, fontsize, fontcolor, bold, italic
            //parameters are: text, time, promise, name (if there is a speaker), centered, fontsize, fontcolor, bold, italic, skip
            brostika.displayText("--Village of Brostika--", 400, null, null, true, "2.5vw", null, false, false, false); //font size should be in vw, normal text is 1.5vw
        });

    })

            , // marks the next part of the array, the comma i mean
    new Frame(function () {
        sophie.changeSprite("smile", function () { //changes the sprite of sophie
            sophie.appear(500);
            charles.appear(500);
            chelsea.appear(0);
            chelsea.changeName("???");
            chelsea.bringToFront(function () {
                chelsea.speak("Welcome to Brostika, young ones!");
            });
        });
        sophie.move(45,0,5000,function(){
            sophie.triggered(5000);
        },stepped);
            
    })

            ,
    new Frame(function () {


        chelsea.speak("Come, give our locally-produced Brostikine wine a try!", function () {
            chelsea.appear(0, function () {
                chelsea.move(-40, 0, 250);
            });
            charles.move(-20, 0, 250);

        });
    })
            ,
    new Frame(function () {
        charles.bringToFront(function () { // brings sophie to the front
            charles.scale(1.05, 1.05, 200, function () {
                charles.speak("And who might you be? Isn’t it a bit unusual to be drinking wine in the middle of the day?");
            });

        });
    })
            ,
    new Frame(function () {
        brostika.changeOverlay(0.55); //ons the stage overlay 
        sophie.bringAboveOverlay(function () {
            charles.bringAboveOverlay(function () {
                sophie.bringToFront(function () {
                    sophie.changeSprite("angry0", function () {
                        //para: new anchor, animation time, promise, swing, adjust	, skippable
                        //agjust refers to whether the game should readjust her to her current position (changing anchor will move her).
                        //sophie.changeAnchorX(1, 0, null, null, true);//sets the horizontal anchor to middle so she will expand <^>
                        //sophie.changeAnchorY(2, 0, null, null, true);//sets the vertical anchor to bottom so she will expand <^>
                        charles.scale(1 / 1.05, 1 / 1.05, 200, function () {
                            sophie.scale(1.05, 1.05, 200, function () {
                                sophie.setItalic(); //makes sophie's text italic
                                sophie.setTextColor("blue"); //makes sophie's text blue;
                                sophie.setFontSize("1.2vw"); //makes her text smaller, default is 1.5vw;
                                sophie.speak("Don’t be so mean to her! She’s offering us stuff out of goodwill!");
                            });
                        });

                    });
                }); // brings sophie to the front

            }); // brings charles above overlay

        }); //brings sophie above overlay

    })
            ,
    new Frame(function () {
        sophie.changeSprite("angry1", function () {
            sophie.scale(1 / 1.05, 1 / 1.05, 200, function () {
                //charles.changeAnchorX(1, 0, null, null, true);
                //charles.changeAnchorY(2, 0, null, null, true);
                charles.bringToFront(function () {
                    charles.scale(1.05, 1.05, 200, function () {
                        charles.setItalic();
                        charles.setFontSize("1.2vw"); //makes his text smaller, default is 1.5vw;
                        charles.speak("What the fuck did you just fucking say about me, you little bitch?");
                    });
                });
            });
        });

    })
            ,
    new Frame(function () {
        charles.speak("I’ll have you know I graduated top of my class in the Navy Seals, ", function () {
            sophie.changeSprite("shocked", function () {
                charles.contSpeaking("and I’ve been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills.");
            })
        });
    })
            ,
    new Frame(function () {
        charles.speak("I am trained in gorilla warfare and I’m the top sniper in the entire US armed forces.");
    }),
    new Frame(function () {
        sophie.changeSprite("sad", function () {
            charles.speak("You are nothing to me but just another target");
        });
    }),
    new Frame(function () {
        charles.speak("I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words.", function () {
            sophie.changeSprite("scared");
        });

    }),
    new Frame(function () {
        charles.speak("You think you can get away with saying that shit to me over the Internet?");
    }),
    new Frame(function () {
        charles.speak("Think again, fucker.");
    }),
    new Frame(function () {
        charles.speak("As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot.", function () {
            sophie.changeSprite("tear");
        });
    }),
    new Frame(function () {
        charles.speak("The storm that wipes out the pathetic little thing you call your life.");
    }),
    new Frame(function () {
        charles.speak("I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that’s just with my bare hands.");
    }),
    new Frame(function () {
        charles.speak("Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit.", function () {
            sophie.changeSprite("cry");
        });
    }),
    new Frame(function () {
        charles.speak(" If only you could have known what unholy retribution your little “clever” comment was about to bring down upon you, maybe you would have held your fucking tongue.");
    }),
    new Frame(function () {
        charles.speak("But you couldn’t, you didn’t, and now you’re paying the price, you goddamn idiot");
    }),
    new Frame(function () {
        charles.speak("I will shit fury all over you and you will drown in it");
    }),
    new Frame(function () {//frame 19
        charles.speak("You’re fucking dead, kiddo");
    }),
    new Frame(function () {
        charles.scale(null, null, 200, function () {
            sophie.bringToFront(function () {
                sophie.scale(1.05, 1.05, 200, function () {
                    sophie.speak("I..");
                });
            });
        });
    }),
    new Frame(function () {
        sophie.wait(500, function () {
            sophie.contSpeaking(" I..");
        });
    })
            ,

    new Frame(function () {
        sophie.changeSprite("shy", function () {
            sophie.speak("I sexually Identify as an Attack Helicopter");
        });
    }),
    new Frame(function () {
        sophie.changeSprite("smile", function () {
            sophie.speak("Ever since I was a girl I dreamed of soaring over the oilfields dropping hot sticky loads on disgusting foreigners");
        });
    }),
    new Frame(function () {
        sophie.speak("People say to me that a person being a helicopter is Impossible and I’m fucking retarded but I don’t care, I’m beautiful", function () {
            sophie.changeSprite("proud");
        });
    }),
    new Frame(function () {
        sophie.speak("I’m having a plastic surgeon install rotary blades, 30 mm cannons and AMG-114 Hellfire missiles on my body");
    }),
    new Frame(function () {
        sophie.changeSprite("smile", function () {
            sophie.speak("From now on I want you guys to call me 'Apache' and respect my right to kill from above and kill needlessly");
            sophie.changeName("Apache");
        });
    }),
    new Frame(function () {
        sophie.changeSprite("angry0", function () {
            sophie.speak("If you can’t accept me you’re a heliphobe and need to check your vehicle privilege");
        });
    }),
    new Frame(function () {
        sophie.changeSprite("overjoy", function () {
            sophie.speak("Thank you for being so understanding!");
        });
    }),
    new Frame(function () {
        sophie.scale(null, null, 200, function () {
            brostika.changeOverlay(0, "black", 0, function () {
                sophie.bringBelowOverlay();
                charles.bringBelowOverlay();
            });
        });
    }),
    new Frame(function () {
        chelsea.changeName();
        chelsea.speak("What the fuck did I just hear...?");
    }),
    new Frame(function () {

        chelsea.speak("I bet the two of you thought it was funny");
    }),
    new Frame(function () {
        chelsea.speak("But if you ever watched Rick and Morty, you would know those joke are too low class!");
    }),
    new Frame(function () {
        chelsea.speak("To be fair, you have to have a very high IQ to understand Rick and Morty");
    }),
    new Frame(function () {
        chelsea.speak("The humour is extremely subtle, and without a solid grasp of theoretical physics most of the jokes will go over a typical viewer’s head");
    }),
    new Frame(function () {
        chelsea.speak("There’s also Rick’s nihilistic outlook, which is deftly woven into his characterisation- his personal philosophy draws heavily from Narodnaya Volya literature, for instance");
    }),
    new Frame(function () {
        chelsea.speak("The fans understand this stuff; they have the intellectual capacity to truly appreciate the depths of these jokes, to realise that they’re not just funny- they say something deep about LIFE");
    }),
    new Frame(function () {
        chelsea.speak("As a consequence people who dislike Rick & Morty truly ARE idiots- of course they wouldn’t appreciate, for instance, the humour in Rick’s existential catchphrase “Wubba Lubba Dub Dub,”");
    }),
    new Frame(function () {
        chelsea.speak("which itself is a cryptic reference to Turgenev’s Russian epic Fathers and Sons");
    }),
    new Frame(function () {
        chelsea.speak("I’m smirking right now just imagining one of those addlepated simpletons scratching their heads in confusion as Dan Harmon’s genius wit unfolds itself on their television screens");
    }),
    new Frame(function () {
        chelsea.speak("What fools.. how I pity them");
    }),
    new Frame(function () {
        chelsea.speak("And yes, by the way, i DO have a Rick & Morty tattoo");
    }),
    new Frame(function () {
        chelsea.speak(" And no, you cannot see it. It’s for the mans’ eyes only- and even then they have to demonstrate that they’re within 5 IQ points of my own beforehand");
    }),
    new Frame(function () {
        chelsea.speak("Nothin personnel kid");
    })

];

var scene = new Scene("copypasta", frames, function () {
    alert("Thank you for watching copypasta");
});
