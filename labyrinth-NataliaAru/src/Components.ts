
/*
Area is a place in the game, that player can interact with. It may  have items that player can take 
and trap that player has to overcome to move on to the next level
*/
export class Area {
    constructor(private name: String, private description: String,
        private items: String[], private trap: Trap, private prev?: Area, private next?: Area) { }
    /*
    connect Area to the previous room in the Labyrinth
    */
    public setPrevious(prev: Area) :void {
        this.prev = prev;
    }
    /*
    connect Area to the next room in the Labyrinth
    */
    public setNext(next: Area) :void{
        this.next = next;
    }
    /*
    prints description of the trap that is located in the Area
    */
    public printTrapDescription() :void{
        this.trap.print();
    }
    /*
    prints the description of Area with all the items that are located there and trap that person has to pass;
    */
    public printDescription() :void{
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
    public getPrevious(): any {
        return this.prev;
    }
    /*
    returns Area that comes after the current one
    */
    public getNext(): any {
        return this.next;
    }
    /*
    retuns true if there is area that comes before current one
    */
    public hasPrevious(): boolean {
        if (typeof this.prev === 'undefined') {
            return false;
        }
        return true;
    }
    /*
    retuns true if there is area that comes after current one
    */
    public hasNext(): boolean {
        if (typeof this.next === 'undefined') {
            return false;
        }
        return true;
    }
    /*
    returns true if there is a trap in the room and player has not yet passed it
    */
    public hasTrap(): boolean {
        return !this.trap.isPassed();
    }
    /*
    use the item given to pass the trap, return true if it was successful 
    */
    public passTrap(item: String): boolean {
        if (!this.trap.isPassed()) {
            return this.trap.pass(item);
        }
        return true;
    }
    /*
    returns true if the item given is located in the room
    */
    public isthereItem(item: String) :boolean{
        return this.items.indexOf(item) >= 0;
    }
    /*
    remove given item from the room
    */
    public remove(item: String) {
        let index = this.items.indexOf(item, 0);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }
    /*
    write the list of items in the room as a string
    */
    private itemsString(): String {
        let items = "";
        if (this.items.length == 0) {
            items += " are no items."
        } else {
            if (this.items.length == 1) {
                items += "is ";
            } else {
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
/*
Trap is challenge that player has to pass when moving from room to room.
It has decritption for what the challenge is for Area and is assigned a key that is needed to pass it.
*/
export class Trap {
    private passed: boolean = false; //when created, trap is not not yet passed by player
    constructor(private description: String, private itemtopass: String) {
        if (this.description === "NONE") {
            this.passed = true;
        }
    }
    /*
    checks if item provided is the item needed and if it is so, 
    changes trap state to passed and returns true.
    */
    public pass(item: String): boolean {
        if (item.toLowerCase === this.itemtopass.toLowerCase) {
            this.passed = true;
            return true;
        }
        return false;
    }
    /*
    return true if trap was already passed
    */
    public isPassed(): boolean {
        return this.passed;
    }
    /*
    prints ONLY the description of the trap
    */
    public print(): void {
        console.log(this.description);
    }
}
/*
Creature is live organism in the Labyrinth that can move from Area to Area and can die 
*/
export class Creature{
    constructor(protected cur: Area) { }
    public move(){
        if (this.cur.hasNext()) {
            this.cur = this.cur.getNext();
        } else {
            console.log("you cannot go there!");
        }
    }
    public die(){
           console.log("Creature died"); 
    }
}
/*
The enemy in the game. Unlike player it starts at the other end and comes to the player. It can 
attack player, and can be defeated with a weapon
*/
export class Monster extends Creature {
    private weapon: String = "sword";
    private isalive: boolean = true;
    constructor(cur: Area) {super(cur)}
    /*
    move one room at a time
    */
    public move() {
        if (this.cur.getPrevious()) {
            this.cur = this.cur.getPrevious();
        }
    }
    /*
    attack the player
    */
    public attack(): void {
        console.log("Monster is in the same room as you are. It walks up to you, and now you an only survive if you fight it.");
    }
    /*
    tell the player that monster died 
    */
    public die() :void{
        console.log("Monster died");
    }
    /*
    return the room where Monster currently is 
    */
    public getCurArea():Area {
        return this.cur;
    }
    /*
    returns true if the monster still alive and not yet defeated
    */
    public isAlive(): boolean {
        return this.isalive;
    }
    /*
    returns true if the given item can defeat the monster
    */
    public fight(item: String): boolean {
        if (item === this.weapon) {
            this.isalive = false;
            return true;
        }
        return false;
    }
}
/*
Person is the main hero of the game that player controls. He can move forward and back, however he can still die.
*/
export class Person extends Creature{
    constructor(cur: Area) {super(cur)}
    /*
    move forward to the next room 
    */
    public move() {
        super.move();
    }
     /*
    move back to the previous room 
    */
    public moveBack() {
        if (this.cur.hasPrevious()) {
            this.cur = this.cur.getPrevious();
        } else {
            console.log("you cannot go back!");
        }
    }
    /*
    return the Area where player is currently at
    */
    public getCurArea() {
        return this.cur;
    }
    /*
    Tell the player that he died and lost the game
    */
    public die() {
        console.log("You died. Game over!");
    }
}

/*
Keeps track of all the items that can be used from the inventory
*/
export class Inventory {
    private items: String[]; 
    constructor() {
        this.items = [];
    }
    /*
    prints list of all items in the inventory 
    */
    public print() {
        let list: String = "Currently in your bag there are " + this.items.length + " items: ";
        if (this.items.length > 0) {
            for (let i = 0; i < this.items.length - 1; i++) {
                list += list[i] + ", ";
            }
            list += this.items[this.items.length - 1] + ".";
        }
        console.log(list);;
    }
    /*
    removes item from the inventory once, if it already exists
    */
    public remove(item: String) :void{
        let index = this.items.indexOf(item, 0);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }
    /*
    adds item once to the inventory 
    */
    public add(item: String) :void{
        this.items.push(item);
    }
    /*
    returns true if threre is such item in the inventory
    */
    public contains(item: String): boolean {
        return (this.items.indexOf(item, 0) > -1);
    }
}