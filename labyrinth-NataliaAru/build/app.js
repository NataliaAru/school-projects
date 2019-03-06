"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = require("./Parser");
const labyrinth_1 = require("./labyrinth");
/*
Game class communicates the input commands with the labyrinth,
and starts the game.
*/
class Game {
    constructor() {
        this.labyrinth = new labyrinth_1.Labyrinth();
        this.parser = new Parser_1.CommandParser((cmd, arg) => this.handleInput(cmd, arg));
    }
    /*
    takes in command, processes it and returns whether it should prompt for new
    input
    */
    handleInput(cmd, arg) {
        let argument = arg.toLowerCase().trim();
        let an = true;
        if (cmd === "GO") {
            an = this.handleGo(argument);
        }
        if (cmd === "INVENTORY") {
            an = this.handleInventory();
        }
        if (cmd === "TAKE") {
            an = this.handleTake(argument);
        }
        if (cmd === "USE") {
            an = this.handleUse(argument);
        }
        if (cmd === "LOOK") {
            an = this.handleLook();
        }
        if (cmd === "QUIT") {
            an = false;
        }
        if (an) {
            console.log("what do you want to do?");
        }
        return an;
    }
    /*
    show the description of the current room
    */
    handleLook() {
        return this.labyrinth.getDescription();
    }
    /*
    show the inventory with all the items that are currently there
    */
    handleInventory() {
        return this.labyrinth.getInventory();
    }
    /*
    if possible, take the item from the Area to keep
    */
    handleTake(item) {
        return this.labyrinth.getItem(item);
    }
    /*
    If player is allowed to use the item, use it. Each item unless specified can be used once
    */
    handleUse(item) {
        return this.labyrinth.useItem(item);
    }
    /*
    go where player wants to go. Current choices are back and forward to next
    */
    handleGo(argument) {
        return this.labyrinth.makeMove(argument);
    }
    /*
    print out the description of the starting point of the game,
    and asks for the first move
    */
    start() {
        this.labyrinth.enterLabyrinth();
        console.log("what do you want to do?");
        this.parser.start();
    }
}
/*
the main function that starts the game
*/
function main() {
    let game = new Game();
    game.start();
}
main();
//# sourceMappingURL=app.js.map