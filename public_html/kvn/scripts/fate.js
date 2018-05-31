
//creating a new character - id, name, image, width, height, xoffset, yoffset, vertical align, horizontal align

var king = new Character("king", "King", "king.png", 50.6, 69.8, 35.9, 15.7, 1, 1)
        .setDefaultSkippable(true)
        .setDefaultAnimateInterpolation("swing")
        .setFontSize("1.5vw")
        .complete();

var queen = new Character("queen", "Queen", "queen.png", 30.0, 62.6, 25.9, 20.5, 1, 1)
        .setDefaultSkippable(true)
        .setDefaultAnimateInterpolation("swing")
        .setFontSize("1.5vw")
        .complete();

var sophie1 = new Character("sophie1", "Sophie", "sophie/def.png", 40, 113, -35, 58.5, 1, 1)
        .addSprite("angry1", "sophie/angry1.png")
        .addSprite("angry0", "sophie/angry0.png")
        .addSprite("overjoy", "sophie/overjoy.png")
        .addSprite("pout", "sophie/pout.png")
        .addSprite("proud", "sophie/proud.png")
        .addSprite("sad", "sophie/sad.png")
        .addSprite("scared", "sophie/scared.png")
        .addSprite("shocked", "sophie/shocked.png")
        .addSprite("shy", "sophie/shy.png")
        .addSprite("tear", "sophie/tear.png")
        .addSprite("smile", "sophie/smile.png")
        .addSprite("cry", "sophie/cry.png")
        .setDefaultSkippable(true) //make all animation skippable unless othewise stated. if this is not called, the default skippable's default is false
        .setDefaultAnimateInterpolation("swing") //make all animation swing instead of linearly animate
        .complete(); //complete the construction of the character

var village = new Character("village", "Village", "boriolsis.jpg", 133.3, 75, 0, 0, 0, 0)
        .setDefaultSkippable(true) //make all animation skippable unless othewise stated. if this is not called, the default skippable's default is false
        .setDefaultAnimateInterpolation("swing") //make all animation swing instead of linearly animate
        .complete();

var rchar = new Character("waiter","Waiter","null.png",1,1,0,0,0,0).complete();

//creating an array of frame
var frames = [
    //background animation should a frame itself
    new Frame(function () {
        //adding characters to the stage, does not mean they are visible unless u preset them to be
        window.a = performance.now();
        town.play();
        boriolsis.bringCharacter(village);
        boriolsis.bringCharacter(charles);
        boriolsis.bringCharacter(sophie1);
        boriolsis.bringCharacter(king);
        boriolsis.bringCharacter(queen);
        boriolsis.bringCharacter(tristan);
        boriolsis.bringCharacter(rchar);
        tristan.preMove(-100);
        charles.preMove(-30, 0);
        sophie1.preMove(20, 0);
        king.preMove(40, 0);
        queen.preMove(40, 0);
        //fades in the background over a time span of 500ms
        boriolsis.display(def, def, 1, function () {
            //after the above animation is done, display text
            //parameters are: text, promise, name (if there is a speaker), centered, fontsize, fontcolor, bold, italic
            //parameters are: text, time, promise, name (if there is a speaker), centered, fontsize, fontcolor, bold, italic, skip
            village.appear(500, function () {
                boriolsis.displayText("--Village of Boriolsis--", 400, null, null, true, "2.5vw", null, false, false, false); //font size should be in vw, normal text is 1.5vw
            }, false, false);
        });
    })

            , // marks the next part of the array, the comma i mean
    new Frame(function () {
        tristan.flipHorizontally();
        sophie1.changeSprite("smile"); //changes the sprite of sophie1
        sophie1.appear(500);
        charles.appear(500);
        charles.bringToFront();
        charles.scale(1.05, 1.05, 200);
        charles.speak("Why did we come back to Boriolsis?");
    })

            ,
    new Frame(function () {
        charles.speak("Ever since that news report about Sophie being spotted here, security has tightened!");
    })
            ,
    new Frame(function () {
        charles.speak("Should we really be risking discovery by coming back?");
    })
            ,
    new Frame(function () {
        charles.scale(1 / 1.05, 1 / 1.05, 200, function () {
            sophie1.bringToFront();
            sophie1.changeSprite("def", function () {
                sophie1.scale(1.05, 1.05, 200, function () {
                    sophie1.speak("I think...", function () {
                        sophie1.wait(300, function () {
                            sophie1.contSpeaking("my parents might try to find us in Boriolsis because of the news.");
                        });
                    });
                });
            });
        });
    })
            ,
    new Frame(function () {
        sophie1.changeSprite("shocked", function () {
            sophie1.speak("Ah!");
            king.appear(0);
            queen.appear(0);
        });
    })
            ,
    new Frame(function () {
        village.move(-30, 0, 500, function () {
            village.notifyWaiter(sophie1);
        });
        charles.move(-50, 0, 500, function () {
            charles.changeSprite("shadow", function () {
                charles.glitch();
                charles.notifyWaiter(sophie1);
            });
        });
        king.move(-40, 0, 500, function () {
            king.notifyWaiter(sophie1);
        });
        queen.move(-40, 0, 500, function () {
            queen.notifyWaiter(sophie1);
        });
        sophie1.move(-20, 0, 500, function () {
            sophie1.waitFor(village, function () {
                sophie1.waitFor(charles, function () {
                    sophie1.waitFor(king, function () {
                        sophie1.waitFor(queen, function () {
                            sophie1.speak("Mother! Father!");
                        });
                    });
                });
            });
        });
    })
            ,
    new Frame(function () {
        town.stop();
        var tElapse = performance.now() - window.a;
        town.playFromFor(tElapse / 1000, 0.3, true);
        rchar.scale(1.5,1.5,2400, function () {
            rchar.notifyWaiter(village);
            console.log("called");
        },false);
        village.waitFor(rchar, function () {
            console.log("called2");
            town.stop();
            xperror.play();
            alert("Exception in MAIN thread: CONCURRENT_MODIFICATION_EXCEPTION \n \n Charles.novala cannot be modified by multiple threads: \n at Thread_GAME \n at PlayScene(boriolsis) \n \n at Thread_SERVER \n at server.character.EditError(Unknown Source) \n at server.character.MonitorChar(Unknown Source) \n \n Charles.novala will be reloaded to fix corruption.");
            //xperror.stop();
            village.invert(1, 0, function () {
                village.notifyWaiter(charles);
            }, true, false);
            sophie1.invert(1, 0, function () {
                sophie1.notifyWaiter(charles);
            }, true, false);
            king.invert(1, 0, function () {
                king.notifyWaiter(charles);
            }, true, false);
            queen.invert(1, 0, function () {
                queen.notifyWaiter(charles);
            }, true, false);
            charles.waitFor(village, function () {
                charles.waitFor(sophie1, function () {
                    charles.waitFor(king, function () {
                        charles.waitFor(queen, function () {
                            charles.wait(1200, function () {
                                charles.move(90, 0, 200, function () {
                                    boriolsis.changeOverlay(1, "#FF0000", 100, function () {
                                        stab.play();
                                        boriolsis.wait(100, function () {
                                            boriolsis.changeOverlay(0, "#FF0000", 100, function () {
                                                queen.speak("Ugh...", function () {
                                                    queen.move(0, 20, 400, function () {
                                                        queen.wait(1200, function () {
                                                            xperror.play();
                                                            var r = Math.ceil(Math.random() * 2000);
                                                            alert("Charles.novala has been successfully reloaded! \n\n Total Time elapsed:" + r + "ms");
                                                            charles.changeSprite("blood", function () {
                                                                charles.invert(1, 0, function () {
                                                                    xperror.play();
                                                                    alert("Resuming 'Thread_GAME'. \n \n Restoring frozen assets... \n Repairing corrupt frames... \n Thread_GAME restored successfully.");
                                                                    fates.play();
                                                                    charles.wait(400, function () {

                                                                        charles.invert(0, 0, function () {
                                                                            charles.notifyWaiter(queen);
                                                                        });
                                                                        village.invert(0, 0, function () {
                                                                            village.notifyWaiter(queen);
                                                                        }, true, false);
                                                                        sophie1.invert(0, 0, function () {
                                                                            sophie1.changeSprite("scared", function () {
                                                                                sophie1.notifyWaiter(queen);
                                                                            });
                                                                        }, true, false);
                                                                        king.invert(0, 0, function () {
                                                                            king.notifyWaiter(queen);
                                                                        }, true, false);
                                                                        queen.invert(0, 0, function () {
                                                                            queen.waitFor(sophie1, function () {
                                                                                queen.waitFor(king, function () {
                                                                                    queen.waitFor(village, function () {
                                                                                        queen.waitFor(charles, function () {
                                                                                            sophie1.scale(1 / 1.05, 1 / 1.05, 200, function () {
                                                                                                queen.scale(1.05, 1.05, 200, function () {
                                                                                                    queen.speak("Charles...", function () {
                                                                                                        queen.wait(400, function () {
                                                                                                            queen.contSpeaking("why?", function () {
                                                                                                                queen.wait(600, function () {
                                                                                                                    queen.move(0, 80, 400, function () {
                                                                                                                        boriolsis.earthquake(100);
                                                                                                                    }, true, false);
                                                                                                                });
                                                                                                            }, 400, false);
                                                                                                        });
                                                                                                    }, 400, false);
                                                                                                }, true, false);
                                                                                            }, true, false);
                                                                                        });
                                                                                    });
                                                                                });
                                                                            });
                                                                        }, true, false);
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    }, true, false);
                                                }, 300, false);
                                            }, true, false);
                                        });
                                    }, true, false);
                                }, true, false);
                            });
                        });
                    });
                });
            });
        });
    })


            ,
    new Frame(function () {
        king.scale(1.05, 1.05, 200, function () {
            king.speak("Charles! How dare you!", function () {
                king.wait(600, function () {
                    king.speak("Do you know you're committing trea-", function () {
                        stab.play();
                        boriolsis.changeOverlay(1, "#FF0000", 100, function () {
                            boriolsis.wait(100, function () {
                                boriolsis.changeOverlay(0, "#FF0000", 100, function () {
                                    king.speak("Ugh!", function () {
                                        king.move(0, 20, 400);
                                    });
                                }, true, false);
                            });
                        }, true, false);
                    });
                });
            });
        });
    })
            ,
    new Frame(function () {
        king.speak("You traitor! (uses caroufle)", function () {
            alert("ERROR 503: SERVICE UNAVAILABLE \n \n Unable to access Charles.novala, file is currently modified by Thread_SERVER. Wait until Thread_SERVER releases the file before trying again.");
            king.wait(400, function () {
                king.speak("No...", function () {
                    king.wait(600, function () {
                        king.speak("Im...Impossible!", function () {
                            king.wait(600, function () {
                                stab.play();
                                boriolsis.changeOverlay(1, "#FF0000", 100, function () {
                                    boriolsis.wait(100, function () {
                                        boriolsis.changeOverlay(0, "#FF0000", 100, function () {
                                            king.speak("Ugh!", function () {
                                                king.move(0, 80, 400, function () {
                                                    boriolsis.earthquake(100);
                                                });
                                            });
                                        }, true, false);
                                    });
                                }, true, false);
                            });
                        }, 400);
                    });
                }, 300);
            });
        });
    })
            ,
    new Frame(function () {
        //Ideally a CG of charles with an insane smile
        charles.move(20, 0, 400, function () {
            charles.flipHorizontally();
            charles.scale(1.05, 1.05, 200, function () {
                charles.setFontSize("1.8vw");
                charles.speak("(sprite change to insane smile) HAHAHAHAHA, ", function () {
                    charles.wait(400, function () {
                        charles.contSpeaking("I can't believe it was so easy!", null, 1000);
                    });
                });
            });
        });
    })
            ,
    new Frame(function () {
        charles.speak("I've finally done it!", null, 1000);
    })
            ,
    new Frame(function () {
        charles.scale(1 / 1.05, 1 / 1.05, 200, function () {
            sophie1.bringToFront();
            sophie1.scale(1.05, 1.05, 200, function () {
                sophie1.speak("Charles...", function () {
                    sophie1.move(-2, 0, 400, function () {
                        sophie1.contSpeaking("what have you done?", null, 500);
                    });
                });
            });
        });
    })
            ,
    new Frame(function () {
        sophie1.scale(1 / 1.05, 1 / 1.05, 200, function () {
            charles.bringToFront();
            charles.scale(1.05, 1.05, 200, function () {
                charles.setFontSize("1.2vw");
                charles.speak("Oh I'm sorry,", function () {
                    charles.move(-2, 0, 200, function () {
                        charles.wait(400, function () {
                            charles.setFontSize("2.1vw");
                            charles.speak("DID I SCARE YOU, MY DEAR SOPHIE?");
                        });
                    });
                });
            });
        });
    })
            ,
    new Frame(function () {
        charles.scale(1 / 1.05, 1 / 1.05, 200, function () {
            sophie1.bringToFront();
            sophie1.scale(1.05, 1.05, 200, function () {
                sophie1.speak("I...", function () {
                    sophie1.move(-2, 0, 400, function () {
                        sophie1.contSpeaking("I trusted you! How could you kill them?", null, 500);
                    });
                });
            });
        });
    })
            ,
    new Frame(function () {
        sophie1.scale(1 / 1.05, 1 / 1.05, 200, function () {
            charles.bringToFront();
            charles.scale(1.05, 1.05, 200, function () {
                charles.setFontSize("1.5vw");
                charles.speak("If only the world worked simply on trust.", function () {
                    charles.move(-2, 0, 200, function () {
                        charles.wait(300, function () {
                            charles.speak("Have you any idea how much I have endured");
                        });
                    });
                });
            });
        });
    })
            ,
    new Frame(function () {
        charles.move(-3, 0, 200, function () {
            charles.setFontSize("1.8vw");
            charles.speak("ALL");
        });
    })
            ,
    new Frame(function () {
        charles.move(-3, 0, 200, function () {
            charles.setFontSize("2.1vw");
            charles.speak("THESE");
        });
    })
            ,
    new Frame(function () {
        charles.move(-3, 0, 200, function () {
            charles.setFontSize("2.4vw");
            charles.speak("YEARS?");
        });
    })
            ,
    new Frame(function () {
        charles.flipHorizontally();
        charles.setFontSize("1.5vw");
        charles.wait(400, function () {
            charles.speak("No, ", function () {
                charles.wait(400, function () {
                    charles.contSpeaking("of course you couldn't.");
                });
            });
        });
    })
            ,
    new Frame(function () {
        charles.move(3, 0, 200, function () {
            charles.speak("You've had EVERYTHING, ", function () {
                charles.wait(300, function () {
                    charles.move(3, 0, 200, function () {
                        charles.contSpeaking("all ", function () {
                            charles.wait(300, function () {
                                charles.contSpeaking("your ", function () {
                                    charles.wait(300, function () {
                                        charles.contSpeaking("life.");
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    })
            ,
    new Frame(function () {
        charles.move(3, 0, 200, function () {
            charles.speak("Happily living, ", function () {
                charles.wait(400, function () {
                    charles.contSpeaking("blissfully unaware of the crimes your parents committed!");
                });
            });
        });
    })
            ,
    new Frame(function () {
        charles.flipHorizontally();
        charles.wait(200, function () {
            charles.setFontSize("2.4vw");
            charles.speak("THEY KILLED MY FAMILY!");
        });
    })
            ,
    new Frame(function () {
        charles.move(-3, 0, 200, function () {
            charles.speak("SIMPLY BECAUSE MY FATHER SPOKE OUT AGAINST THEM!");
        });
    })
            ,
    new Frame(function () {
        charles.scale(1 / 1.05, 1 / 1.05, 200, function () {
            sophie1.bringToFront();
            sophie1.scale(1.05, 1.05, 200, function () {
                sophie1.speak("My parents did no such thing, Charles! (uses caroufle)", function () {
                    sophie1.wait(800, function () {
                        alert("PSA:THIS IS SUPPOSED TO BE A FULL CAROFLE \n CHARLES \n His family was sentenced to death by the Novalan Royalty when he was a small boy. Escaped death through a miracle. Has been plotting revenge against the royal family for 15 years.");
                        sophie1.speak("No, ", function () {
                            sophie1.wait(600, function () {
                                sophie1.contSpeaking("impossible!");
                            });
                        }, 150);
                    });
                }, 400);
            });
        });
    })
            ,
    new Frame(function () {
        sophie1.scale(1 / 1.05, 1 / 1.05, 200, function () {
            charles.bringToFront();
            charles.scale(1.05, 1.05, 200, function () {
                charles.setFontSize("1.5vw");
                charles.speak("The old fools...", function () {
                    charles.move(-2, 0, 200, function () {
                        charles.wait(400, function () {
                            charles.speak("It was...", function () {
                                charles.wait(400, function () {
                                    charles.contSpeaking("surprisingly liberating", function () {
                                        charles.wait(100, function () {
                                            charles.contSpeaking(" to watch the life drain from their body.", null, 800);
                                        });
                                    }, 1500);
                                });
                            }, 400);
                        });
                    });
                });
            });
        });
    })
            ,
    new Frame(function () {
        charles.scale(1 / 1.05, 1 / 1.05, 200, function () {
            sophie1.bringToFront();
            sophie1.scale(1.05, 1.05, 200, function () {
                sophie1.speak("Who...", function () {
                    sophie1.wait(400, function () {
                        sophie1.speak("Who are you?", null, 500);
                    });
                });
            });
        });
    })
            ,
    new Frame(function () {
        sophie1.speak("Your carofle doesn't match up...", function () {
            sophie1.wait(400, function () {
                sophie1.speak("Th- The Charles I know would never do something like that!", null, 500);
            });
        });
    })
            ,
    new Frame(function () {
        sophie1.scale(1 / 1.05, 1 / 1.05, 200, function () {
            charles.bringToFront();
            charles.scale(1.05, 1.05, 200, function () {
                charles.speak("Let's just say you never knew the real Charles.", function () {
                    charles.move(-2, 0, 200, function () {
                        charles.wait(400, function () {
                            charles.speak("It's been fun, princess, ", function () {
                                charles.wait(400, function () {
                                    charles.speak("but I believe it is time for you to join your parents.", null, 1500);
                                });
                            }, 600);
                        });
                    });
                });
            });
        });
    })
            ,
    new Frame(function () {
        charles.speak("You were a good girl...");
        tristan.appear(0);
        tristan.bringToFront();
    })
            ,
    new Frame(function () {
        charles.speak("It's such a shame that you were born to them", function () {
            charles.wait(200, function () {
                charles.move(-20, 0, 200, function () {
                    charles.notifyWaiter(tristan);
                });
                //THWACK SOUND
                tristan.move(40, 0, 200, function () {
                    tristan.waitFor(charles, function () {
                        tristan.speak("KILL THE ABDUCTOR!");
                        charles.move(40, 0, 200, function () {
                            charles.notifyWaiter(tristan);
                        });
                        tristan.move(40, 0, 200, function () {
                            tristan.waitFor(charles, function () {
                                boriolsis.earthquake(100);
                            });
                        });
                    });
                });
            });
        });
    })
//37 frames
];
//parameters: scene id, frames, callback after scene completes
var fate = new Scene("fate", frames, function () {
    alert("Transition to combat scene");
});



