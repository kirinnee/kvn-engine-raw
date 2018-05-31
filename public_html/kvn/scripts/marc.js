var kawaiichan = new Character("kawaii", "Kawaii Chan", "grill.jpg",2,1).complete();
var room = new Stage("room", "bg.jpg").complete();
var frames= [
    new Frame(function() {
        room.bringCharacter(kawaiichan);
        room.display(1,1,1000, function(){
            kawaiichan.speak("Hello! Welcome Home");
        });
    })
];

var scene = new Scene("fuck",frames);