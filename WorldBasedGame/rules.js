class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

var bathroomMoney = false;
var oldManMoney = false;
var doorOpen = false;
var gotStick = false;
var gotKey = false;

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        
        if(locationData.visitedBathroom && !bathroomMoney)
        {
            this.engine.gotoScene(BathroomStall);
        }

        if(locationData.visitOldMan && !oldManMoney)
        {
            this.engine.gotoScene(OldManGame);
        }

        if(locationData.Paying && bathroomMoney && oldManMoney)
        {
            this.engine.gotoScene(leaveRestaurant);
        }

        if(locationData.getStick && !gotStick)
        {
            this.engine.gotoScene(stickGotten);
        }

        if(locationData.bushEvent && !gotKey && gotStick)
        {
            this.engine.gotoScene(KeyInBush);
        }

        if(locationData.doorLock && gotKey)
        {
            this.engine.gotoScene(FrontKey);
        }

        if(locationData.Choices) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class BathroomStall extends Scene {
    create() {
        this.engine.addChoice("Pick up $5 bill", {action: "money"})
    }

    handleChoice(choice) {
        if(choice.action == "money")
        {   
            bathroomMoney = true;
            this.engine.show("You see a $5 bill on the floor! You quickly pick it up before anyone enters the bathroom.<br><br>")
            this.engine.addChoice("Go back", {action: "back"})
        }
        else if(choice.action == "back")
        {
            this.engine.show("&gt; Go back");
            this.engine.gotoScene(Location, "Restaurant")
        }
        else if(choice)
        {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        }
    }
}

class OldManGame extends Scene {
    create() {
        this.engine.addChoice("Talk to the Old Man", {action: "man"})
    }

    handleChoice(choice) {
        if(choice.action == "man")
        {
            this.engine.show("You talk to the Old Man and he asks you to play a game with him and he'll give you cash if you win!<br>He puts his left hand behind his back and asks you: How many fingers am I holding up?<br>You notice that his right hand is holding four fingers up.<br><br>")
            this.engine.addChoice("One finger", {action: "wrong"})
            this.engine.addChoice("Two fingers", {action: "wrong"})
            this.engine.addChoice("Three fingers", {action: "wrong"})
            this.engine.addChoice("Four fingers", {action: "right"})
            this.engine.addChoice("Five fingers", {action: "wrong"})
        }
        else if(choice.action == "wrong")
        {
            this.engine.show("Unfortunately, you are wrong and the Old Man laughs at you. He tells you to ask again later and he'll let you try again<br><br>")
            this.engine.addChoice("Go back", {action: "back"})
        }
        else if(choice.action == "right")
        {
            oldManMoney = true;
            this.engine.show("He is shocked, but smiles at you and hands you $5. You got it correct and you gained $5!<br><br>")
            this.engine.addChoice("Go back", {action: "back"})
        }
        else if(choice.action == "back")
        {
            this.engine.show("&gt; Go back");
            this.engine.gotoScene(Location, "Restaurant")
        }
        else if(choice)
        {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        }
    }
}

class leaveRestaurant extends Scene {
    create() {
        this.engine.addChoice("Pay the bill", {action: "pay"})
    }

    handleChoice(choice) {
        if(choice.action == "pay")
        {
            this.engine.gotoScene(Location, "On The Road")
        }
        else if(choice)
        {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        }
    }
}

class stickGotten extends Scene {
    create() {
        this.engine.addChoice("Pick up stick", {action: "stick"})
    }

    handleChoice(choice) {
        if(choice.action == "stick")
        {
            gotStick = true;
            this.engine.show("You find a cool-looking stick on the ground. You pick it up and take it with you.<br><br>")
            this.engine.addChoice("Go back", {action: "back"})
        }
        else if(choice.action == "back")
        {
            this.engine.show("&gt; Go back");
            this.engine.gotoScene(Location, "Front Door");
        }
        else if(choice)
        {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        }
    }
}

class KeyInBush extends Scene {
    create() {
        this.engine.addChoice("Use the stick", {action: "key"})
    }

    handleChoice(choice) {
        if(choice.action == "key")
        {
            gotKey = true;
            this.engine.show("You use the stick you got earlier to reach for the key. It works! You manage to get the key!<br><br>")
            this.engine.addChoice("Go back", {action: "back"})
        }
        else if(choice.action == "back")
        {
            this.engine.show("&gt; Go back");
            this.engine.gotoScene(Location, "Front Door");
        }
        else if(choice)
        {
            this.engine.show("&gt; Front Door");
            this.engine.gotoScene(Location, choice.Target);
        }
    }
}

class FrontKey extends Scene {
    create() {
        this.engine.re
        this.engine.addChoice("Use the key", {action: "open"})
    }

    handleChoice(choice) {
        if(choice.action == "open")
        {
            this.engine.show("You open the door with the key to find out why you needed to come home so urgently. You close the door, and right as you do, the lights turn on.<br><br>SURPRISE!!!<br><br>Everyone shouts. All of these people are the people who messaged you to come home. It's your birthday today.<br><br>")
            this.engine.addChoice("Happy Birthday", {action: "done"})
        }
        else if(choice.action == "done")
        {   
            this.engine.show("<br>")
            this.engine.gotoScene(End);
        }
        else
        {
            this.engine.show("You just need to open the door now!")
            this.engine.gotoScene(FrontKey);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');