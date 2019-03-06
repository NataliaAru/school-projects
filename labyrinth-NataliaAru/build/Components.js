"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Area is a place in the game, that player can interact with. It may  have items that player can take
and trap that player has to overcome to move on to the next level
*/
class Area {
    constructor(name, description, items, trap, prev, next) {
        this.name = name;
        this.description = description;
        this.items = items;
        this.trap = trap;
        this.prev = prev;
        this.next = next;
    }
    /*
    connect Area to the previous room in the Labyrinth
    */
    setPrevious(prev) {
        this.prev = prev;
    }
    /*
    connect Area to the next room in the Labyrinth
    */
    setNext(next) {
        this.next = next;
    }
    /*
    prints description of the trap that is located in the Area
    */
    printTrapDescription() {
        this.trap.print();
    }
    /*
    prints the description of Area with all the items that are located there and trap that person has to pass;
    */
    printDescription() {
        console.log(this.name);
        console.log(this.description);
        console.log("In this room there " + this.itemsString());
        if (!this.trap.isPassed()) {
            this.trap.print();
        }
    }
    /*
    returns Area that comes before the current one
    */
    getPrevious() {
        return this.prev;
    }
    /*
    returns Area that comes after the current one
    */
    getNext() {
        return this.next;
    }
    /*
    retuns true if there is area that comes before current one
    */
    hasPrevious() {
        if (typeof this.prev === 'undefined') {
            return false;
        }
        return true;
    }
    /*
    retuns true if there is area that comes after current one
    */
    hasNext() {
        if (typeof this.next === 'undefined') {
            return false;
        }
        return true;
    }
    /*
    returns true if there is a trap in the room and player has not yet passed it
    */
    hasTrap() {
        return !this.trap.isPassed();
    }
    /*
    use the item given to pass the trap, return true if it was successful
    */
    passTrap(item) {
        if (!this.trap.isPassed()) {
            return this.trap.pass(item);
        }
        return true;
    }
    /*
    returns true if the item given is located in the room
    */
    isthereItem(item) {
        return this.items.indexOf(item) >= 0;
    }
    /*
    remove given item from the room
    */
    remove(item) {
        let index = this.items.indexOf(item, 0);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }
    /*
    write the list of items in the room as a string
    */
    itemsString() {
        let items = "";
        if (this.items.length == 0) {
            items += " are no items.";
        }
        else {
            if (this.items.length == 1) {
                items += "is ";
            }
            else {
                items += "are ";
            }
            for (let i = 0; i < this.items.length - 1; i++) {
                items += this.items[i] + ", ";
            }
            items += this.items[this.items.length - 1] + ".";
        }
        return items;
    }
}
exports.Area = Area;
/*
Trap is challenge that player has to pass when moving from room to room.
It has decritption for what the challenge is for Area and is assigned a key that is needed to pass it.
*/
class Trap {
    constructor(description, itemtopass) {
        this.description = description;
        this.itemtopass = itemtopass;
        this.passed = false; //when created, trap is not not yet passed by player
        if (this.description === "NONE") {
            this.passed = true;
        }
    }
    /*
    checks if item provided is the item needed and if it is so,
    changes trap state to passed and returns true.
    */
    pass(item) {
        if (item.toLowerCase === this.itemtopass.toLowerCase) {
            this.passed = true;
            return true;
        }
        return false;
    }
    /*
    return true if trap was already passed
    */
    isPassed() {
        return this.passed;
    }
    /*
    prints ONLY the description of the trap
    */
    print() {
        console.log(this.description);
    }
}
exports.Trap = Trap;
/*
Creature is live organism in the Labyrinth that can move from Area to Area and can die
*/
class Creature {
    constructor(cur) {
        this.cur = cur;
    }
    move() {
        if (this.cur.hasNext()) {
            this.cur = this.cur.getNext();
        }
        else {
            console.log("you cannot go there!");
        }
    }
    die() {
        console.log("Creature died");
    }
}
exports.Creature = Creature;
/*
The enemy in the game. Unlike player it starts at the other end and comes to the player. It can
attack player, and can be defeated with a weapon
*/
class Monster extends Creature {
    constructor(cur) {
        super(cur);
        this.weapon = "sword";
        this.isalive = true;
    }
    /*
    move one room at a time
    */
    move() {
        if (this.cur.getPrevious()) {
            this.cur = this.cur.getPrevious();
        }
    }
    /*
    attack the player
    */
    attack() {
        console.log("Monster is in the same room as you are. It walks up to you, and now you an only survive if you fight it.");
    }
    /*
    tell the player that monster died
    */
    die() {
        console.log("Monster died");
    }
    /*
    return the room where Monster currently is
    */
    getCurArea() {
        return this.cur;
    }
    /*
    returns true if the monster still alive and not yet defeated
    */
    isAlive() {
        return this.isalive;
    }
    /*
    returns true if the given item can defeat the monster
    */
    fight(item) {
        if (item === this.weapon) {
            this.isalive = false;
            return true;
        }
        return false;
    }
}
exports.Monster = Monster;
/*
Person is the main hero of the game that player controls. He can move forward and back, however he can still die.
*/
class Person extends Creature {
    constructor(cur) { super(cur); }
    /*
    move forward to the next room
    */
    move() {
        super.move();
    }
    /*
   move back to the previous room
   */
    moveBack() {
        if (this.cur.hasPrevious()) {
            this.cur = this.cur.getPrevious();
        }
        else {
            console.log("you cannot go back!");
        }
    }
    /*
    return the Area where player is currently at
    */
    getCurArea() {
        return this.cur;
    }
    /*
    Tell the player that he died and lost the game
    */
    die() {
        console.log("You died. Game over!");
    }
}
exports.Person = Person;
/*
Keeps track of all the items that can be used from the inventory
*/
class Inventory {
    constructor() {
        this.items = [];
    }
    /*
    prints list of all items in the inventory
    */
    print() {
        let list = "Currently in your bag there are " + this.items.length + " items: ";
        if (this.items.length > 0) {
            for (let i = 0; i < this.items.length - 1; i++) {
                list += list[i] + ", ";
            }
            list += this.items[this.items.length - 1] + ".";
        }
        console.log(list);
        ;
    }
    /*
    removes item from the inventory once, if it already exists
    */
    remove(item) {
        let index = this.items.indexOf(item, 0);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }
    /*
    adds item once to the inventory
    */
    add(item) {
        this.items.push(item);
    }
    /*
    returns true if threre is such item in the inventory
    */
    contains(item) {
        return (this.items.indexOf(item, 0) > -1);
    }
}
exports.Inventory = Inventory;
//# sourceMappingURL=Components.js.map