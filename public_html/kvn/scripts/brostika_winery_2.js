let wineryscene = new Scene("brostika_winery", [
  new Frame(function() { //frame 0
    brostika.bringCharacter(charles);
    brostika.bringCharacter(sophie);
    brostika.bringCharacter(yusie);

    charles.preMove(-80);
    sophie.preMove(-50);

    brostika.display(0, 1, 0, function() {
      brostika.setAnchorX(0);
      brostika.setAnchorY(0);
      brostika.setWidth(150);

      brostika.changeBackground("winery", 1, 800);
    });
  })

  , new Frame(function() { //frame 1
    sophie.setTextColor("white");
    charles.setTextColor("white");
    yusie.setTextColor("white");
    sophie.changeSprite("def", function() { //changes the sprite of sophie
      sophie.appear(0, function() {
        charles.appear(0);
        slime.appear(0);
        slime2.appear(0);
        sophie.move(32, 0, 1000, null, easeOut);
        sophie.wait(700, function() {
          sophie.rotateClockwise(23, 300);
        })
      });
      /*
      charles.appear(00, function() {
        charles.wait(200, function() {
          charles.move(null, null, 1000, null, easeOut);
        });
      });*/
    });
  })

  , new Frame(function() { //frame 2
    sophie.rotateClockwise(null, 200);
  }), new Frame(function() {
    brostika.pan(-30, 0, 500, null, swing);
    sophie.move(-20, 0, 500);
    charles.move(-20, 0, 500);
    slime.move(-30, 0, 500);
    slime2.move(-30, 0, 500);
    sophie.changeItalic(true);
    sophie.setFontSize("1.2vw");
    charles.changeItalic(true);
    charles.setFontSize("1.2vw");
    //pan to show both sophie, charles and two slimes in the same scree. sophie and charles immediately hide while the slimes flip and patrol away
  })

  , new Frame(function() {
    brostika.pan(30, 0, 500, null, swing);
    sophie.move(null, 0, 500);
    charles.move(null, 0, 500);
    preSpeak(sophie, function() {
      sophie.speak("Phew...", function() {
        sophie.wait(400, function() {
          sophie.contSpeaking("That was close!");
        }, false);
      });
    });
  })

  , new Frame(function() {
    sophie.scale(null, null, 200, function() {
      preSpeak(charles, function() {
        charles.speak("We should keep our eyes peeled for the slimes", function() {
          charles.wait(400, function() {
            charles.contSpeaking("The security here seems to be really tight");
          }, false);
        });
      });
    });
  })

  , new Frame(function() {
    slime.disappear(10);
    slime2.disappear(10);
    charles.scale(null, null, 200, function() {
      preSpeak(sophie, function() {
        sophie.speak("The slimes finally left.", function() {
          sophie.wait(200, function() {
            sophie.contSpeaking("It's our chance to find Mr Broski!");
          }, false);
        });
      });
    });
  })

  , new Frame(function() {
    brostika.pan(-40, 0, 500, function() {
      sophie.move(-30, 0, 500);
      charles.move(-30, 0, 500);
      brostika.pan(30, 0, 500, function() {
        brostika.pan(-20, 0, 100, function() {
          sophie.speak("Isn't that Mr Broski in the shed?");
        }, swing);
      }, swing);
    }, swing);
  })

  , new Frame(function() {
    brostika.setAnchorX(80);
    brostika.setAnchorY(50);
    brostika.scaleBackground(2, 2, 500, function() {
      broski.appear(1000);
    }, swing, false);
  })

  , new Frame(function() {
    sophie.move(30, 0, 500);
    charles.move(30, 0, 500, function() {
      sophie.speak("Are you Mr Broski?");
    });
  })
  , new Frame(function() {
    sophie.scale(null, null, 200, function() {
      preSpeak(broski, function() {
        broski.speak("Yes.", function() {
          broski.wait(200, function() {
            broski.contSpeaking("What do you want from me?");
          }, false);
        });
      });
    });
  })

  , new Frame(function() {
    broski.scale(null, null, 200, function() {
      preSpeak(charles, function() {
        charles.speak("We're here to save you Mr Broski", function() {
          charles.wait(200, function() {
            charles.contSpeaking("We will help you get back the winery after bringing you back to the constable");
          }, false);
        });
      });
    });
  })

  , new Frame(function() {
    charles.scale(null, null, 200, function() {
      preSpeak(broski, function() {
        broski.speak("If that's the case, I think we should get moving now while the slimes are away.");
      });
    });
  })

  , new Frame(function() {
    broski.scale(null, null, 200, function() {
      preSpeak(charles, function() {
        charles.speak("You're right.", function() {
          charles.wait(200, function() {
            charles.contSpeaking("Let me untie you.");
          }, false);
        });
      });
    });
  })

  , new Frame(function() {
    charles.move(30, 0, 200, function() {
      charles.triggered(601, function() {
        charles.wait(500, function() {
          charles.move(-30, 0, 200);
        }, false);

      }, false, null, 150);
    });
  })

  , new Frame(function(){
    charles.scale(null,null,200,function(){
      preSpeak(sophie,function(){
        sophie.speak("Let's leave!");
      });
    });
  })
]);
