import { Command, CommandParser } from './Parser';
import { Labyrinth } from './labyrinth';
/*
Game class communicates the input commands with the labyrinth,
and starts the game. 
*/
class Game {

  private parser: CommandParser; //input parser for commands
  private labyrinth: Labyrinth;

  constructor() {
    this.labyrinth = new Labyrinth();
    this.parser = new CommandParser(
      (cmd: Command, arg: string) => this.handleInput(cmd, arg)
    );
  }

  /*
  takes in command, processes it and returns whether it should prompt for new
  input
  */
  private handleInput(cmd: Command, arg: string): boolean {
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
  private handleLook(): boolean {
    return this.labyrinth.getDescription();
  }
  /*
  show the inventory with all the items that are currently there
  */
  private handleInventory(): boolean {
    return this.labyrinth.getInventory();
  }
  /*
  if possible, take the item from the Area to keep
  */
  private handleTake(item: String): boolean {
    return this.labyrinth.getItem(item);
  }
  /*
  If player is allowed to use the item, use it. Each item unless specified can be used once
  */
  private handleUse(item: String): boolean {
    return this.labyrinth.useItem(item);
  }
  /*
  go where player wants to go. Current choices are back and forward to next
  */
  private handleGo(argument: String): boolean {
    return this.labyrinth.makeMove(argument);
  }
  /*
  print out the description of the starting point of the game,
  and asks for the first move
  */
  public start() {
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