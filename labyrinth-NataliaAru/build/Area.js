"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Area {
    constructor(name, description, items, trap, prev, next) {
        this.name = name;
        this.description = description;
        this.items = items;
        this.trap = trap;
        this.prev = prev;
        this.next = next;
    }
    setPrevious(prev) {
        this.prev = prev;
    }
    setNext(next) {
        this.next = next;
    }
    printTrapDescription() {
        this.trap.print();
    }
    printDescription() {
        console.log(this.name);
        console.log(this.description);
        console.log("In this room there " + this.itemsString());
        if (!this.trap.isPassed()) {
            this.trap.print();
        }
    }
    getPrevious() {
        return this.prev;
    }
    getNext() {
        return this.next;
    }
    hasPrevious() {
        if (typeof this.prev === 'undefined') {
            return false;
        }
        return true;
    }
    hasNext() {
        if (typeof this.next === 'undefined') {
            return false;
        }
        return true;
    }
    hasTrap() {
        return this.trap.isPassed();
    }
    passTrap(item) {
        if (!this.trap.isPassed()) {
            return this.trap.pass(item);
        }
        return true;
    }
    isthereItem(item) {
        return this.items.indexOf(item) >= 0;
    }
    remove(item) {
        let index = this.items.indexOf(item, 0);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }
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
It has decritption what it is for Area it is at and is assigned a key that is needed to pass it.
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
    return true is trap was already passed
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
class Creature {
    constructor(cur) {
        this.cur = cur;
    }
    move() {
        if (this.cur.hasNext()) {
            console.log("there is one");
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
class Monster extends Creature {
    constructor(cur) {
        super(cur);
        this.key = "sword";
        this.isalive = true;
    }
    move() {
        if (this.cur.getPrevious()) {
            this.cur = this.cur.getPrevious();
        }
    }
    attack() {
        console.log("Monster is in the same room as you are. It walks up to you, and now you an only survive if you fight it.");
    }
    die() {
        console.log("Monster died");
    }
    getCurArea() {
        return this.cur;
    }
    isAlive() {
        return this.isalive;
    }
    fight(item) {
        if (item === this.key) {
            this.isalive = false;
            return true;
        }
        return false;
    }
}
exports.Monster = Monster;
class Person extends Creature {
    constructor(cur) { super(cur); }
    move() {
        super.move();
    }
    moveBack() {
        if (this.cur.hasPrevious()) {
            this.cur = this.cur.getPrevious();
        }
        else {
            console.log("you cannot go back!");
        }
    }
    getCurArea() {
        return this.cur;
    }
    die() {
        console.log("You lost. Game over!");
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
    prints list of the all items in the inventory
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
//# sourceMappingURL=Area.js.map