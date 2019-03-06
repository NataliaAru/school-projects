import { DrawableShape} from './shapes';
import { Model } from './model';
export class ControlCanvas{
    constructor(private model: Model) {
        
    }
    move(shape: DrawableShape, changex: number, changey: number) {
        this.model.moveShape(shape, changex, changey);
    }
    delete(x: number, y: number) {
        let shape = this.model.getShapeAt(x, y);
        if (shape) {
            this.model.removeShape(shape);
        }
    }
    create(x: number, y: number, type: string) {
        this.model.createShape(x,y,type);
    }
}
export class ControlText{
    constructor(private model: Model) {}
    update(shapes:string[]){
        this.model.updateShapes(shapes);
    }
}
