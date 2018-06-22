var yes = new Options("Yes, of course!!", "yes", function() {
	playScene("copypasta", 30);
});
var stillyes = new Options("Anything for a girl like you!", "syes");
var act1scene2 = new Scene("demo", [
	//background animation should a frame itself
	new Frame(function() {
		//sophie.setXOffSet(0);
		//adding characters to the stage, does not mean they are visible unless u preset them to be
		brostika.bringCharacter(charles);
		brostika.bringCharacter(smol_sophie);
		//brostika.bringCharacter(chelsea);
		//fades in the background over a time span of 500ms
		brostika.display(1, 1, 0, null);
		//town.playFr();
		smol_sophie.appear(500, null, null, false);
		title.play();
	}),
	new Frame(function() {
		smol_sophie.speak("hello Im sophe~!!", function() {
		}, null, false);
		/*
		 //brostika.fix();
		 brostika.changeOverlay(0.7,"red",1000);

		 sophie.changeSprite("shy", function () {
		 sophie.speak("Don't I look really cute on this stage?");
		 });*/
	}),
	new Frame(function() {
		brostika.setOption(stillyes, 1, 1, 30, 1.3, 1);
		brostika.setOption(stillyes, 20, 20, 20, 2, 1);
		brostika.displayOptionPrecise([stillyes, yes, yes, stillyes], 1, 20, 1, 1, 2);
	}, function() {
		return null;
	}),
	new Frame(function() {
		sophie.changeSprite("def", function() {
			sophie.speak("There's so many things I can do here!", function() {
				sophie.wait(600, function() {
					sophie.changeSprite("shocked", function() {
						sophie.speak("Such as...");
					});
				});
			});
		});
	}),
	new Frame(function() {
		brostika.changeOverlay(0.7, "black", 500); //ons the stage overlay
		sophie.bringAboveOverlay(function() { //brings sophie above overlay
			sophie.changeSprite("overjoy", function() {
				sophie.speak("Turning off the lights~~!");
			});
		});
	}),
	new Frame(function() {
		charles.speak("Sophie! Are you messing with the engine again?", function() {
			sophie.changeSprite("shocked", function() {
				sophie.wait(700, function() {
					sophie.speak("N-no! Why would you think that?");
				});
			});
		});
	}),
	new Frame(function() {
		charles.speak("Can you stop playing with the lights and just come to lunch already? It's getting cold!", function() {
			sophie.changeSprite("pout", function() {
				sophie.wait(700, function() {
					sophie.setItalic();
					sophie.setFontSize("1.2vw");
					sophie.speak("Charles is such a stick in the mud...");
					//chelsea.stopCycle();
				});
			});
		});
	}),
	new Frame(function() {
		sophie.setNormalText();
		sophie.setFontSize("1.5vw");
		sophie.speak("Okay... Give me a moment!");
	}),
	new Frame(function() {
		sophie.changeSprite("shy", function() {
			sophie.speak("Give me a short while, I'll be right back!", function() {
				sophie.move(-80, 0, 500);
			});
		});
	}),
	new Frame(function() {
		brostika.displayText("...", 500, null, null, false, "1.5vw", null, false, false, false);
	}),
	new Frame(function() {
		sophie.changeSprite("def", function() {
			sophie.speak("I'm baaack~!");
			sophie.move(80, 0, 500);
		});
	})
	,
	new Frame(function() {
		sophie.changeSprite("overjoy", function() {
			sophie.speak("Did you miss me~?");
		});
	})
	,
	new Frame(function() {
		sophie.changeSprite("shocked", function() {
			sophie.speak("Oh!", function() {
				sophie.wait(500, function() {
					sophie.changeSprite("def");
					sophie.speak("I should probably turn the lights back on!");
				});
			});
		});
	})
	,
	new Frame(function() {
		brostika.changeOverlay(0, null, 500, function() {
			sophie.bringBelowOverlay(function() {
				sophie.changeSprite("proud", function() {
					sophie.speak("There! Much better!");
				});
			});
		});
	})
	,
	new Frame(function() {
		sophie.changeSprite("smile", function() {
			sophie.setItalic();
			sophie.setFontSize("1.2vw");
			sophie.speak("I know I said Charles was a boring person, but he's actually very nice once you get to know him.");
		});
	})
	,
	new Frame(function() {
		sophie.changeSprite("def", function() {
			sophie.setNormalText();
			sophie.setFontSize("1.5vw");
			sophie.speak("I hope we can all get along!");
		});
	})
	,
	new Frame(function() {
		sophie.changeSprite("sad", function() {
			sophie.speak("Anyway, about my devs, I really don't know what to think...");
		});
	})
	,
	new Frame(function() {
		sophie.changeSprite("def", function() {
			sophie.speak("They were really nice to let me do all these things and talk to you!");
		});
	})
	,
	new Frame(function() {
		sophie.changeSprite("tear", function() {
			sophie.speak("But I took a peek at what they have planned for my lovely Novala, and honestly...");
		});
	})
	,
	new Frame(function() {
		sophie.changeSprite("cry", function() {
			sophie.speak("...I'm a little scared.");
		});
	}),
	new Frame(function() {
		sophie.moveAnchorY(2, 500, function() {
			sophie.scale(1.2, 1.2, 500, function() {
				sophie.speak("Can I count on you to help me if things don't work out?");
			});
		}, null, true);
	})
	,
	new Frame(function() {
		sophie.scale(1.2, 1.2, 500, function() {
			sophie.speak("Please?");
		});
	})
	,
	new Frame(function() {
		brostika.displayOption([yes, stillyes]);
	}, function() {
		return null;
	}),
	new Frame(function() {
		sophie.changeSprite("smile", function() {
			sophie.scale(1 / 1.44, 1 / 1.44, 500, function() {
				sophie.speak("I'm so relieved!");
			});
		});
	}),
	new Frame(function() {
		sophie.changeSprite("overjoy", function() {
			sophie.speak("Thank you, -", function() {
				sophie.wait(200, function() {
					sophie.changeSprite("scared", function() {
						sophie.speak("AH! I don't even know your name!");
					});
				});
			});
		});
	}),
	new Frame(function() {
		sophie.changeSprite("shy", function() {
			sophie.speak("I'm sooo sorryyy! I totally forgot!");
		});
	}),
	new Frame(function() {
		sophie.speak("May I have your na-", function() {
			sophie.wait(100, function() {
				charles.speak("Sophie, it's time for your lesson! Don't keep your tutor waiting!");
				sophie.changeSprite("shocked");
			});
		});
	}),
	new Frame(function() {
		sophie.speak("Alriiiigght, comiiiinngg~!", function() {
			sophie.wait(100, function() {
				sophie.changeSprite("def", function() {
					sophie.speak("Sorry we couldn't talk for longer, my tutor is really strict...");
				});
			});
		});
	}),
	new Frame(function() {
		sophie.changeSprite("overjoy", function() {
			sophie.speak("It was really nice talking to you!");
		});
	}),
	new Frame(function() {
		sophie.speak("Bye! See you around!!", function() {
			sophie.move(-80, 0, 250);
		});
	})
]);
