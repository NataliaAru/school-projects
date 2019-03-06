import { Factory, DrawableShape as Shape, Circle, Rectangle, Triangle, DrawableShape } from './shapes';
import{Display} from './view-canvas';
/**
 * The CAD drawing model currently being created
 */
export class Model {
  private shapes: Shape[] = [];
  private views:Display[] = [];
  private factory: Factory;
  constructor() {
    this.factory = new Factory();
   }
   
  getShapes(): Shape[] {
    return this.shapes;
  }

  getShapeAt(x: number, y: number): Shape | null {
    for (let shape of this.shapes) {
      if (shape.contains(x, y)) {
        return shape;
      }
    }
    return null; //return last shape
  }
  addView(view:Display){
    this.views.push(view);
  }
  //TODO: Add more methods...
  createShape(x: number, y: number, type: string) {
    let shape;
    if (type == 'circle') {
        shape = this.factory.createCircle(x, y);
    } else if (type == 'triangle') {
        shape = this.factory.createTriangle(x, y);
    } else {
        shape = this.factory.createRectangle(x, y);
    }
    this.addShape(shape);
}
  addShape(shape: DrawableShape): void {
    this.shapes.push(shape);
    this.updateAllViews();
  }
  removeShape(shape: Shape): void {
    let index = this.shapes.indexOf(shape);
    this.shapes.splice(index, 1);
    this.updateAllViews();
  }
  moveShape(shape: Shape, x: number, y: number): void {
    shape.setPosition(x, y);
    this.updateAllViews();
  }
  updateShapes(info:string[]){
    for(let i = 0; i < this.shapes.length; i++){

      let obj = JSON.parse(info[i]);
      this.shapes[i].updateProperties(obj);
    }
    this.updateAllViews();
  }
  updateAllViews(){
    for(let i = 0; i<this.views.length; i++){
    this.views[i].display();
    }
  }
}
