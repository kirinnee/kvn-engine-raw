let brostikaEnd = new Scene("brostika_end",
        [new Frame(function () {
                brostika.bringCharacter(sophie);
                brostika.bringCharacter(charles);
                brostika.bringCharacter(yusie);
                brostika.bringCharacter(broski);
                brostika.bringCharacter(yusieHelpedCG);
                sophie.setTextColor('white');
                charles.setTextColor('white');
                yusie.setTextColor('white');
                broski.setTextColor('white');
                brostika.display(0, null, 100, function () {
                    yusieHelpedCG.bringAboveOverlay();
                    yusieHelpedCG.bringToFront();
                    yusieHelpedCG.appear(1000, function () {
                        brostika.changeOverlay(1, 'black');
                    }, easeOut);
                });
            })
                    , new Frame(function () {
                        yusie.speak('T-thank you...', null, 1000);
                        brostika.changeBackground('winery', 1, 2, function () {
                            yusie.appear();
                            sophie.appear();
                            charles.appear();
                        });
                    })
                    , new Frame(function () {
                        brostika.closeTextBox(function () {
                            yusie.wait(500, function () {
                                yusieHelpedCG.disappear(1000, function () {
                                    brostika.changeOverlay(0, null, 1000);
                                });
                            });
                        });
                    })
                    , new Frame(function () {
                        yusie.preSpeak(function () {
                            yusie.speak('I guess you are quite good at combat');
                        });
                    })
                    , new Frame(function () {
                        yusie.speak('But it\'s n', function () {
                            yusie.wait(300, function () {
                                yusie.contSpeaking('-n', function () {
                                    yusie.wait(300, function () {
                                        yusie.contSpeaking('-not like I needed your help anyways.');
                                    });
                                });
                            });
                        });
                    })
                    , new Frame(function () {
                        yusie.contSpeaking('I could have done it by myself');
                    })
                    , new Frame(function () {
                        yusie.speak('I just needed a little more time');
                    })
                    , new Frame(function () {
                        brostika.changeOverlay(0.55, null, null, function () {
                            charles.bringAboveOverlay();
                            charles.preSpeak(function () {
                                charles.setItalic();
                                charles.setFontSize('1.2vw');
                                charles.speak('Yeah... sure', function () {
                                    charles.wait(200, function () {
                                        charles.endSpeak();
                                        brostika.changeOverlay(0);
                                    });
                                });
                            });
                        });
                    })
                    , new Frame(function () {
                        brostika.setOpacity(0);
                        brostika.animate(500);
                        sophie.disappear(500);
                        charles.disappear(500);
                        yusie.move(-25);
                        yusie.disappear(500,function(){
                            yusie.flipHorizontally(function () {
                            brostika.changeBackground('police', 1, 500, function () {
                                brostika.wait(500, function () {
                                    sophie.appear(500);
                                    charles.appear(500);
                                    
                                    yusie.bringToFront();
                                });
                            });
                        }, 0);
                        });
                        //
                        
                        brostika.closeTextBox();
                    })
                    , new Frame(function () {
                        broski.move(5);
                        broski.appear();
                        charles.setNormalText();
                        charles.setFontSize('1.7vw');
                        broski.preSpeak(function () {
                            broski.speak('You\'ve returned, my friends!', function () {
                                broski.wait(300, function () {
                                    broski.contSpeaking('Thank you for recovering my beloved Brostikine for me!');
                                });
                            });
                        });
                    })
                    , new Frame(function () {
                        broski.speak('It’s a pity that I’ve lost Tristan because of this incident!', function () {
                            broski.wait(200, function () {
                                broski.contSpeaking('Tristan was a very capable staff, and he will be sorely missed.');
                            });
                        });
                    })
                    , new Frame(function () {
                        broski.speak('But it’s okay, as long as I’m still around, Brostikine will remain as the best-', function () {
                            sophie.preSpeak(function () {
                                sophie.speak('Erm it\'s okay, Mr Broski!', function () {
                                    sophie.wait(200, function () {
                                        sophie.contSpeaking('We have heard enough of your stories and understand your passion...');
                                    });
                                });
                            });
                        });
                    })
                    , new Frame(function () {
                        charles.preSpeak(function () {
                            charles.speak('That\'s right', function () {
                                charles.wait(200, function () {
                                    charles.contSpeaking('It\'s getting a little late');
                                });
                            });
                        });
                    })
                    , new Frame(function () {
                        charles.speak('We should start heading to Erithven soon!');
                    })
                    , new Frame(function () {
                        yusie.preSpeak(function () {
                            yusie.speak('Oh', function () {
                                yusie.wait(300, function () {
                                    yusie.move(10);
                                    //yusie.flipHorizontally(null, 200);
                                    yusie.contSpeaking(', you\'re heading to Erithven?');
                                });
                            });
                        });
                    })
                    , new Frame(function () {
                        sophie.preSpeak(function () {
                            sophie.speak('Yup!', function () {
                                sophie.wait(200, function () {
                                    sophie.contSpeaking('We\'ll be making out way through Erithven before heading to Boriolsis');
                                });
                            });
                        });
                    })
                    , new Frame(function () {
                        yusie.preSpeak(function () {
                            yusie.speak('In that case, could you assist our Guard team to deliver this stabilizer to a lady in Erithven?', function () {
                                yusie.wait(200);
                            });
                        });
                    })
                    , new Frame(function () {
                        yusie.speak('It\'s a medication of sorts which helps to prevent a condition from worsening before the actual treatment begins');
                    })
                    , new Frame(function () {
                        charles.preSpeak(function () {
                            charles.speak('Who made this stabilizer?', function () {
                                charles.wait(200, function () {
                                    charles.contSpeaking('And who is it for?', function () {
                                        charles.wait(200, function () {
                                            charles.speak('I don\'t want to go around running errands for causes which are unknown to me');
                                        });
                                    });
                                });
                            });
                        });
                    })
                    , new Frame(function () {
                        yusie.preSpeak(function () {
                            yusie.speak('Excuse you?', function () {
                                yusie.wait(200, function () {
                                    yusie.speak('What is there to doubt about the Guards?');
                                });
                            });
                        });
                    })
                    , new Frame(function () {
                        yusie.speak('I am the Second-in-Command of the Brostikan Guards!', function () {
                            yusie.wait(200, function () {
                                yusie.contSpeaking('What is there to doubt about my words?');
                            });
                        });
                    })
                    , new Frame(function () {
                        sophie.preSpeak(function () {
                            sophie.speak('Err...', function () {
                                sophie.wait(400, function () {
                                    sophie.contSpeaking('I\'m sure Charles is not questioning you...', function () {
                                        sophie.wait(200, function () {
                                            sophie.contSpeaking('He just likes to understand what\'s going on...');
                                        });
                                    });
                                });
                            });
                        });
                    })
                    , new Frame(function () {
                        yusie.preSpeak(function () {
                            yusie.speak('Hmphh!', function () {
                                yusie.wait(400);
                            });
                        });
                    })
                    , new Frame(function () {
                        charles.preSpeak(function () {
                            charles.speak('Sophie, since Yusie seems unwilling to divulge any of this information with us', function () {
                                charles.wait(200, function () {
                                    charles.contSpeaking(', we should make our way-', function () {
                                        yusie.setFontSize('2vw');
                                        yusie.changeBold(true);
                                        yusie.preSpeak(function () {
                                            yusie.speak('HEYYY!', function () {
                                                yusie.setFontSize('1.7vw');
                                                yusie.setNormalText();
                                                yusie.wait(200, function () {
                                                    yusie.contSpeaking('Hold up a little, alright?');
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    })
                    , new Frame(function () {
                        yusie.speak('The stabilizer is made by a sage who specializes in morphicology', function () {
                            yusie.wait(200, function () {
                                yusie.contSpeaking('It is meant for a kid in Erithven who has developed an extremely rare illness...');
                            });
                        });
                    })
                    , new Frame(function () {
                        yusie.speak('Apparently, the disease is so deadly that it could potentially wipe out the entire village if it broke free from the kid.', function () {
                            yusie.wait(200, function () {
                                yusie.speak('This news was not shared with the rest of Erithven in order to prevent the spread of mass hysteria');
                            });
                        });
                    })
                    , new Frame(function () {
                        yusie.speak('The sage in Brostika was called upon to concoct an elixir to cure the kid.', function () {
                            yusie.wait(200, function () {
                                yusie.contSpeaking('However, he is still wrapping up on the concoction of the elixir.', function () {
                                    yusie.wait(200);
                                });
                            });
                        });
                    })
                    , new Frame(function () {
                        yusie.speak('That\'s why we need you to deliver the stablizer to get a bit more time for him. He should be done really soon.');
                    })
                    , new Frame(function () {
                        sophie.preSpeak(function () {
                            sophie.speak('Suree!', function () {
                                sophie.wait(200, function () {
                                    sophie.contSpeaking('I\'m sure we can help yo-', function () {
                                        charles.preSpeak(function () {
                                            charles.speak('But how\'re supposed to know which house the lady lives in?', function () {
                                                charles.wait(200, function () {
                                                    charles.contSpeaking('It\'s our first time going to Erithven after all');
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    })
                    , new Frame(function () {
                        yusie.preSpeak(function () {
                            yusie.speak('...', function () {
                                yusie.wait(300, function () {
                                    yusie.contSpeaking('Hmm...', function () {
                                        yusie.wait(300);
                                    });
                                });
                            });
                        });
                    })
                    , new Frame(function () {
                        yusie.speak('I-I haven\'t really figured that out...', function () {
                            yusie.wait(200, function () {
                                yusie.contSpeaking('I guess I\'ll still have to follow you and lead the way...');
                            });
                        });
                    })
                    , new Frame(function () {
                        charles.preSpeak(function () {
                            charles.speak('In that case, let\'s make haste');
                        });
                    })
        ]);