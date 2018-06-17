function preSpeak(sp, callback) {
    sp.scale(1.05, 1.05, 200, function () {
        sp.bringToFront(function () {
            if (typeof callback === "function") {
                callback();
            }
        });
    });
}

function changeSpeak(pre, crr, callback) {
    pre.scale(null, null, 200, function () {
        preSpeak(crr, callback);
    });
}

let policescene2 = new Scene("brostika_constable_2",
        [
            new Frame(function () { //frame 0
                brostika.bringCharacter(charles);
                brostika.bringCharacter(sophie);
                brostika.bringCharacter(yusie);
                brostika.bringCharacter(broski);

                charles.preMove(-50);
                sophie.preMove(-50);
                broski.preMove(-100);
                broski.setHorizontalFlip(true);

                brostika.display(0, 1, 0, function () {
                    brostika.changeBackground("police", 1, 800);

                });

            })

                    , new Frame(function () { //frame 1
                        sophie.setTextColor("white");
                        charles.setTextColor("white");
                        yusie.setTextColor("white");
                        broski.setTextColor("white");
                        yusie.changeName("Guard");
                        yusie.setFontSize("1.7vw");
                        sophie.changeSprite("def", function () { //changes the sprite of sophie

                            yusie.appear(500, function () {
                                sophie.appear(00, function () {
                                    sophie.move(null, null, 1000, null, easeOut);
                                });
                                charles.appear(00, function () {
                                    charles.wait(200, function () {
                                        charles.move(null, null, 1000, null, easeOut);
                                    });
                                });
                                broski.appear(0, function () {
                                    broski.wait(400, function () {
                                        broski.move(70, 0, 1000, null, easeOut);
                                    })
                                });
                            });
                        });
                    })

                    , new Frame(function () { //frame 2
                        preSpeak(broski, function () {
                            broski.speak("Yusie, thank you for dispatching this group of helpful people to free me.", function () {
                                yusie.changeName("Yusie");
                                broski.wait(200, function () {
                                    broski.contSpeaking("If not for them, I would still be tied up in the old shed next to my winery.");
                                }, false);
                            });
                        });
                    }), new Frame(function () { //frame 3
                broski.scale(null, null, 200, function () {
                    preSpeak(yusie, function () {
                        yusie.speak("Actually...", function () {
                            yusie.wait(400, function () {
                                yusie.contSpeaking("I didn't trust them when they reported the incident to me.", function () {
                                    yusie.wait(200, function () {
                                        yusie.contSpeaking("I merely told them to get you to inform me about the situation of your winery in person.")
                                    }, false);
                                });
                            }, false);
                        });
                    });
                });
            }), new Frame(function () { //frame 4
                yusie.speak("I am so sorry, -", function () {
                    yusie.wait(300, function () {
                        yusie.speak("What are your names again?")
                    }, false);
                })
            }), new Frame(function () { //frame 5
                yusie.scale(null, null, 200, function () {
                    preSpeak(sophie, function () {
                        sophie.speak("I am Sophie and they are Charles and " + playName, function () {
                            sophie.wait(200, function () {
                                sophie.contSpeaking("And don't worry about what happened earlier.", function () {
                                    sophie.wait(200, function () {
                                        sophie.contSpeaking("You were merely doing your job.");
                                    }, false);
                                })
                            }, false);
                        });
                    })
                });
            }), new Frame(function () { // frame 6
                sophie.scale(null, null, 200, function () {
                    preSpeak(broski, function () {
                        broski.speak("Yusie, now that we've confirmed the matter, you should take your men to arrest the Revolutionists.");
                    })
                })
            }), new Frame(function () { //frame 7
                broski.scale(null, null, 200, function () {
                    preSpeak(yusie, function () {
                        yusie.speak("Of course!", function () {
                            yusie.wait(200, function () {
                                yusie.contSpeaking("I will round up my man now.");
                            }, false);
                        });
                    });
                });
            }), new Frame(function () { //frame 8

                yusie.scale(null, null, 200, function () {
                    preSpeak(sophie, function () {
                        sophie.speak("Yusie, let us assist you in fighting the Revolutionists!");
                    });
                });
            }), new Frame(function () { //frame 9
                sophie.scale(null, null, 200, function () {
                    preSpeak(yusie, function () {
                        yusie.speak("Assist me? ", function () {
                            yusie.wait(200, function () {
                                yusie.contSpeaking("I doubt that any of you will be of much help.");
                            }, false);
                        });
                    });
                });
            }), new Frame(function () { //frame 10
                yusie.scale(null, null, 200, function () {
                    preSpeak(charles, function () {
                        charles.speak("Let's hope you don't mix up the good and bad guys again...");
                    });
                });
            })

                    , new Frame(function () { //frame 11
                        charles.scale(null, null, 200, function () {
                            preSpeak(yusie, function () {
                                yusie.speak("Excuse you?!");
                            });
                        });
                    })

                    , new Frame(function () { //frame 12
                        yusie.scale(null, null, 200, function () {
                            preSpeak(charles, function () {
                                charles.speak("...", null, 600, false);
                            });
                        });
                    })

                    , new Frame(function () { //frame 13
                        charles.scale(null, null, 200, function () {
                            preSpeak(yusie, function () {
                                yusie.speak("Just wait here while I show you how it's done.");
                            });
                        });
                    })

                    , new Frame(function () { //frame 14
                        yusie.scale(null, null, 200, function () {
                            yusie.flipHorizontally(function () {
                                yusie.move(50, 0, 500);
                            }, 200);
                        });
                    })

                    , new Frame(function () { //frame 15
                        broski.move(20, 0, 500, function () {
                            broski.flipHorizontally(function () {
                                preSpeak(broski, function () {
                                    broski.speak("Thank you for saving me once again!");
                                });
                            }, 200);
                        });
                    })

                    , new Frame(function () { //frame 16
                        broski.scale(null, null, 200, function () {
                            preSpeak(charles, function () {
                                charles.speak("No problem. If you would excuse us now, we have to-", function () {
                                    charles.wait(200, function () {
                                        charles.scale(null, null, 200, function () {
                                            preSpeak(broski, function () {
                                                broski.speak("I believe I haven't introduced myself yet.")
                                            });
                                        })
                                    }, false);
                                });
                            });
                        })
                    })

                    , new Frame(function () { //frame 17
                    })

                    , new Frame(function () { //frame 18
                        broski.speak("I'm Mr Broski, the 16th generation head of the Brostikine Winery family.")
                    })

                    , new Frame(function () { //frame 19
                        broski.speak("Our family has a long history, making wine for Brostika for many centuries.")
                    })

                    , new Frame(function () { //frame 20
                        broski.speak("Last year, we sold, erm... ", function () {
                            broski.wait(200, function () {
                                broski.scale(null, null, 200, function () {
                                    preSpeak(charles, function () {
                                        charles.speak("Mr Broski, we should really make our-", function () {
                                            charles.wait(200, function () {
                                                charles.scale(null, null, 200, function () {
                                                    preSpeak(broski, function () {
                                                        broski.speak("Ah yes, seventy thousand barrels! We sold seventy thousand barrels of wine last year!");
                                                    });
                                                });
                                            }, false);
                                        })
                                    })
                                })
                            }, false);
                        })
                    }), new Frame(function () { //frame 21
                sophie.cycle(function () {
                    sophie.disappear(150, function () {
                        sophie.changeSprite("def", function () {
                            sophie.wait(600, function () {
                                sophie.appear(150, function () {
                                    sophie.wait(600, function () {
                                        sophie.disappear(150, function () {
                                            sophie.rotateClockwise(5, 600, function () {
                                                sophie.appear(150, function () {
                                                    sophie.wait(600, function () {
                                                        sophie.disappear(150, function () {
                                                            sophie.rotateAntiClockwise(10, 600, function () {
                                                                sophie.appear(150, function () {
                                                                    sophie.wait(600, function () {
                                                                        sophie.disappear(150, function () {
                                                                            sophie.changeSprite("def", function () {
                                                                                sophie.rotateClockwise(null, 600, function () {
                                                                                    sophie.appear(150, function () {
                                                                                        sophie.wait(600, function () {
                                                                                            sophie.endOfCycle();
                                                                                        }, false);
                                                                                    });
                                                                                });
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });

                    });

                });

                charles.cycle(function () {
                    charles.disappear(150, function () {
                        charles.changeSprite("def", function () {
                            charles.wait(600, function () {
                                charles.appear(150, function () {
                                    charles.wait(600, function () {
                                        charles.disappear(150, function () {
                                            charles.flipHorizontally();
                                            charles.move(10, 0, 0, function () {
                                                charles.appear(150, function () {
                                                    charles.wait(600, function () {
                                                        charles.disappear(150, function () {
                                                            charles.flipHorizontally();
                                                            charles.changeSprite("def");
                                                            charles.move(-10, 0, 0, function () {
                                                                charles.appear(150, function () {
                                                                    charles.wait(600, function () {
                                                                        charles.disappear(150, function () {
                                                                            charles.changeSprite("def", function () {
                                                                                charles.appear(150, function () {
                                                                                    charles.wait(600, function () {
                                                                                        charles.endOfCycle();
                                                                                    }, false);
                                                                                });
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });

                });

                function broskiTalk(text, time, callback) {
                    return function () {
                        broski.speak(text, function () {
                            broski.wait(200, function () {
                                if (typeof callback === "function") {
                                    callback();
                                }
                            }, false);
                        }, null, false);
                    }
                }
                brostika.textbox.speed = 1 / 2.5;
                broski.speak("That was the best record we ever had in the history of our winery!",
                        broskiTalk("I can still remember how my father used to question if I could actually outdo him.", 850,
                                broskiTalk("I was so proud of what we have achieved last year.", 650,
                                        broskiTalk("It was not easy, honestly.", 400,
                                                broskiTalk("While my lineage had the ability to significantly speed up the speed of fermentation of the wine, it was not quite enough to distinguish our wine from others.", 1400,
                                                        broskiTalk("Because this is not only about the quality of the product.", 650,
                                                                broskiTalk("It is also about the marketing.", 400,
                                                                        broskiTalk("You must have known by now that our wine has been rebranded by many other manufacturers outside of Brostika as their own product.", 900,
                                                                                broskiTalk("This used to impede our sales tremendously since a long time back.", 450,
                                                                                        broskiTalk("However, I was able to employ certain tactics to safeguard our brand.", 450,
                                                                                                broskiTalk("Though there is still plenty of room for improvement, I must say I have done an incredible job when it comes to increaisng sales.", 800,
                                                                                                        broskiTalk("But this increase in sales have also gotten unwanted attention.", 550,
                                                                                                                broskiTalk("The M Revolutionists, wanting to take advantage of the newly increased popularity of our product, began to infiltrate our winery with its men before wresting the winery from my hands.", 1100,
                                                                                                                        broskiTalk("My beloved baby, the winery, was stolen from me right under my nose.", 450,
                                                                                                                                broskiTalk("Their conspiracy is really frightening but the method which they have chosen to take is even worse.", 700,
                                                                                                                                        broskiTalk("It is undoubtedly clever but definitely immoral -", 400)
                                                                                                                                        )
                                                                                                                                )
                                                                                                                        )
                                                                                                                )
                                                                                                        )
                                                                                                )
                                                                                        )
                                                                                )
                                                                        )
                                                                )
                                                        )
                                                )
                                        )
                                ), 600, false);
            })

                    , new Frame(function () { //frame 22
                        brostika.textbox.speed = 1;
                        sophie.stopCycle(100, function () {});

                        charles.stopCycle(200, function () {
                            charles.setFontSize("1.2vw");
                            charles.changeItalic(true);
                            broski.scale(null, null, 200, function () {
                                brostika.changeOverlay(0.55, "#000", 0, function () {
                                    charles.bringAboveOverlay();
                                    sophie.bringAboveOverlay();
                                    charles.move(10, 0, 200);
                                    charles.flipHorizontally(function () {
                                        preSpeak(charles, function () {
                                            charles.speak("Sophie...");
                                        });
                                    }, 200);
                                });
                            });
                        });
                    })

                    , new Frame(function () { //frame 23
                        charles.speak("Sophie...");
                    })

                    , new Frame(function () { //frame 24
                        charles.speak("Sophie!", function () {
                            sophie.wait(100, function () {
                                sophie.move(5, 0, 100, function () {
                                    sophie.move(-5, 0, 100, function () {
                                        sophie.changeSprite("def");
                                    });
                                }, linear, false);
                            }, false);
                        });
                    })

                    , new Frame(function () {
                        charles.speak("We should find a way to leave soon.", function () {
                            charles.wait(200, function () {
                                charles.contSpeaking("We shouldn't waste any more time here.")
                            }, false);
                        });
                    })

                    , new Frame(function () {
                        sophie.setFontSize("1.2vw");
                        sophie.changeItalic(true);
                        charles.scale(null, null, 200, function () {
                            preSpeak(sophie, function () {
                                sophie.speak("Where is Yusie?", function () {
                                    sophie.wait(200, function () {
                                        sophie.contSpeaking("Are they back yet?");
                                    });
                                });
                            });
                        });
                    })

                    , new Frame(function () {
                        sophie.scale(null, null, 200, function () {
                            preSpeak(charles, function () {})
                            charles.speak("No...", function () {
                                charles.wait(200, function () {
                                    charles.contSpeaking("But that's beside the point -");
                                }, false)
                            });
                        });
                    })

                    , new Frame(function () {
                        charles.scale(null, null, 200, function () {
                            preSpeak(sophie, function () {})
                            sophie.speak("Doesn't that mean that they've been gone for a really long time?", function () {
                                sophie.wait(200, function () {
                                    sophie.contSpeaking("I'm starting to get really worried for them...", null, null, false);
                                }, false);
                            });
                        });
                    })

                    , new Frame(function () {
                        sophie.scale(null, null, 200, function () {
                            preSpeak(charles, function () {})
                            charles.speak("I'm sure that the guards will manage fine on their own", function () {
                                charles.wait(200, function () {
                                    charles.contSpeaking("We should focus on getting to Malidret as soon as possible");
                                }, false);
                            });
                        });
                    })

                    , new Frame(function () {
                        charles.scale(null, null, 200, function () {
                            preSpeak(sophie, function () {})
                            sophie.speak("But you promised to help me...", function () {
                                sophie.wait(200, function () {
                                    sophie.contSpeaking("We need to make sure that Brostika is safe before we leave");
                                }, false);
                            });
                        });
                    })

                    , new Frame(function () {
                        sophie.scale(null, null, 200, function () {
                            preSpeak(charles, function () {})
                            charles.speak("...", null, 600, false);
                        });
                    })

                    , new Frame(function () {
                        charles.speak("Alright, ", function () {
                            charles.wait(500, function () {
                                charles.contSpeaking("alright");
                            }, false);
                        });
                    })

                    , new Frame(function () {
                        //charles.flipHorizontally(null, 200);
                        charles.move(null, 0, 200, function () {
                            brostika.changeOverlay(0, null, null, function () {
                                changeSpeak(charles, sophie, function () {
                                    sophie.speak("Mr Broski!", function () {
                                        sophie.wait(200, function () {
                                            sophie.contSpeaking("Don't you think Yusie and the rest has been gone for too long?");
                                        });
                                    });
                                });
                            });
                        });
                    })

                    , new Frame(function () {
                        changeSpeak(sophie, broski, function () {
                            broski.speak("Huh?", function () {
                                broski.wait(200, function () {
                                    broski.contSpeaking("Yusie?");
                                });
                            })
                        });
                    })

                    , new Frame(function () {
                        broski.speak("Now that you mention it...");
                    })

                    , new Frame(function () {
                        broski.contSpeaking("They have been gone for far too long.");
                    })

                    , new Frame(function () {
                        broski.speak("They should have been return by now.", function () {
                            broski.wait(200, function () {
                                broski.contSpeaking("Perhaps something happened to them?");
                            }, false)
                        })
                    })

                    , new Frame(function () {
                        broski.speak("I sure hope not, I need my winery to be safe");
                    })

                    , new Frame(function () {
                        changeSpeak(broski, sophie, function () {
                            sophie.speak("Let us go take a look!");
                        })
                    })

                    , new Frame(function () {
                        brostika.closeTextBox(function () {
                            sophie.disappear(500, function () {

                            });
                            charles.disappear(500);
                            broski.disappear(500, function () {
                                charles.move(-70, 0, 0);
                                sophie.move(-50, 0, 0);
                            });
                            brostika.setOpacity(0);
                            brostika.animate(800, function () {
                                brostika.setAnchorX(0);
                                brostika.scaleBackground(1.5, 1, 0, function () {
                                    brostika.changeBackground("winery", 0, 0, function () {
                                        brostika.setOpacity(1);
                                        brostika.animate(800);
                                    });
                                });
                            });
                        });
                    })

                    , new Frame(function () {
                        yusie.setDefaultAnimateInterpolation(easeOut);
                        slime2.setDefaultAnimateInterpolation(easeOut);
                        slime.setDefaultAnimateInterpolation(easeOut);
                        brostika.bringCharacter(slime, function () {
                            brostika.bringCharacter(slime2, function () {
                                yusie.move(-20, 0, 0, function () {
                                    slime.move(20)
                                    slime2.move(20);
                                    slime.appear();
                                    slime2.appear();
                                    yusie.appear(0, function () {
                                        yusie.move(-50, 0, 800);
                                        slime.move(-50, 0, 800);
                                        slime2.move(-50, 0, 800);
                                        brostika.pan(-50, 0, 805, function () {
                                            slime2.setDefaultAnimateInterpolation(swing);
                                            slime.setDefaultAnimateInterpolation(swing);
                                            slime.cycle(function () {
                                                slime.wait(250, function () {
                                                    slime.move(-8, 0, 200, function () {
                                                        slime.move(8, 0, 200, function () {
                                                            yusie.scale(1.05, 1.05, 100, function () {
                                                                yusie.scale(null, null, 100, function () {
                                                                    slime.endOfCycle();
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                            slime2.cycle(function () {
                                                slime2.wait(300, function () {
                                                    slime2.move(-5, 0, 200, function () {
                                                        slime2.move(5, 0, 200, function () {
                                                            slime2.endOfCycle();
                                                        });
                                                    });
                                                })
                                            })
                                        });
                                    });
                                })
                            })
                        })

                        broski.wait(2000, function () {
                            sophie.move(-30, 0, null);
                            charles.setHorizontalFlip(null);
                            charles.move(-30, 0, null, function () {
                                sophie.appear(0, function () {
                                    sophie.scale();
                                });
                                charles.appear();
                            });
                            slime2.stopCycle(300, function () {
                                yusie.move(50, 0, 400, null, swing);
                                slime.move(70, 0, 400);
                                slime2.move(70, 0, 800);
                                sophie.wait(100, function () {
                                    sophie.wait(100, function () {
                                        sophie.move(null, null, 750);
                                    }, false)
                                    charles.move(null, null, 850, null, swing);
                                }, false);
                                brostika.pan(50, 0, 1000, function () {

                                });
                            });
                            slime.stopCycle(300, function () {});
                        }, false);

                    })
                    , new Frame(function () {
                        preSpeak(sophie, function () {
                            sophie.speak("Hurry! Let's go help her!");
                        })
                    })


        ]);
