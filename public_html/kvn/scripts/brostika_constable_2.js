

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

                brostika.display(1, 1, 0, function () {
                    
                    sophie.speak('fuckery fuckery fuckery fuckery fuckery fuckery fuckery',function(){
                        sophie.wait(200,function(){
                           sophie.contSpeaking('yeah! yeah! yeah! yeah! yeah! yeah! yeah! yeah! yeah! yeah! yeah! yeah!',
                            null,null,null,true,true
                            ); 
                        });
                    });
                });

            })
        ]);
