"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Components_1 = require("./Components");
/*
Labyrinth keeps track of all the elements of the game, and updates them as game goes on.
*/
class Labyrinth {
    /*
    constructs all the areas and builds labyrinth
    */
    constructor() {
        let rooms = require('../rooms.json');
        let index = 0;
        let cur;
        rooms.forEach((room) => {
            let t = new Components_1.Trap(room.trap, room.trapkey);
            let area = new Components_1.Area(room.name, room.description, room.items, t, undefined, undefined);
            if (index === 0) {
                this.start = area;
                cur = area;
            }
            else {
                cur.setNext(area);
                area.setPrevious(cur);
            }
            index++;
            cur = area;
            this.exit = area;
        });
        this.size = index + 1;
        this.player = new Components_1.Person(this.start);
        this.monster = new Components_1.Monster(this.exit);
        this.inventory = new Components_1.Inventory();
    }
    /*
    prints out the description of Area where player starts
    */
    enterLabyrinth() {
        this.start.printDescription();
    }
    /*
    if player is currently under attack of monster, he cannot leave the room, however, if person is safe
    he can go back and to the next room if the path to the next room is open. If person finds a monster in room he
    entered, he gets attacked by the monster
    */
    makeMove(direction) {
        if (this.monsterAttack()) {
            return true;
        }
        else if (direction.toLowerCase().trim() == "back") {
            this.player.moveBack();
            this.getCurrent().printDescription();
        }
        else if (this.getCurrent().hasTrap()) {
            this.getCurrent().printTrapDescription();
        }
        else {
            this.moveForward();
            if (this.isWin()) {
                return false;
            }
        }
        return true;
    }
    /*
    item is taken from the Area and saved to the invenotry. If monster entered the room - it attacks
    */
    getItem(item) {
        this.monster.move();
        if (this.getCurrent().isthereItem(item)) {
            this.inventory.add(item);
            this.getCurrent().remove(item);
            console.log("you got item - " + item);
        }
        else {
            console.log("No such item found");
        }
        this.monsterAttack();
        return true;
    }
    /*
    prints out the inventory with all the items that it currently has
    */
    getInventory() {
        this.inventory.print();
        this.monster.move();
        this.monsterAttack();
        return true;
    }
    /*
    player can only use item that is currently in inventory
    if the monster is attacking, player gets only one chance to fight him by using item, if it is the wrong item,
    player looses the game. If not, then monster dies and player can move on.
    else it checks if current item can pass the trap and if so player can move on, else - try again.
    */
    useItem(item) {
        if (this.isMonsterAttacking()) {
            return this.useAgainstMonster(item);
        }
        else {
            this.monster.move();
            if (!this.inventory.contains(item)) {
                console.log("You don't have this item");
                return true;
            }
            let area = this.getCurrent();
            if (!area.hasTrap()) {
                console.log("you dont need to use item");
                return true;
            }
            if (area.passTrap(item)) {
                console.log("Now you can continue to the next room");
                this.inventory.remove(item);
            }
            else {
                console.log("use other item!");
            }
            return true;
        }
    }
    /*
    prints out description of the current room player is at
    */
    getDescription() {
        this.getCurrent().printDescription();
        return true;
    }
    /*
   returns Area where player is currently at
   */
    getCurrent() {
        return this.player.getCurArea();
    }
    /*
   returns true if player won the game
   */
    isWin() {
        if (this.getCurrent() === this.exit && this.inventory.contains("treasure")) {
            console.log("You have Won!");
            return true;
        }
        if (this.getCurrent() === this.exit) {
            console.log("You cannot leave without treasure!");
        }
        return false;
    }
    /*
   move forward if possible, if there is a monster, player is attacked
   */
    moveForward() {
        this.player.move();
        this.getCurrent().printDescription();
        if (!this.isMonsterAttacking()) {
            this.monster.move();
        }
        this.monsterAttack();
    }
    /*
    return true if monster can attack player, for that it has to be in the same room and currenlty still alive.
    */
    isMonsterAttacking() {
        return (this.getCurrent() === this.monster.getCurArea() && this.monster.isAlive());
    }
    /*
    if monster can attack, it attaks the player
    */
    monsterAttack() {
        if (this.isMonsterAttacking()) {
            this.monster.attack();
        }
    }
    /*
    If monster is attacking, the item used is used against Monster
    */
    useAgainstMonster(item) {
        if (this.inventory.contains(item) && this.monster.fight(item)) {
            this.monster.die();
            this.inventory.remove(item);
            return true;
        }
        this.player.die();
        return false;
    }
}
exports.Labyrinth = Labyrinth;
//# sourceMappingURL=labyrinth.js.map