import { DrawableShape } from './shapes';
import { Model } from './model';
import { ControlText } from './Controls'
import {Display} from './view-canvas';
export class ViewText implements Display{
    private textArea = $('.form-control');
    private update = $('#text-view button')[0] as HTMLButtonElement;
    constructor(private model: Model, private control: ControlText) {
        this.update.addEventListener("click",(e) => { this.handleClick(e) });
    }
    handleClick(event:MouseEvent){
        //get text from the text area
        //change it to list of shapes
        let text  = $.trim($("textarea").val()+"");
        let parts = text.split(";");
        this.control.update(parts);
    }
    display(){
        let shapes: DrawableShape[] = this.model.getShapes();
        this.textArea.attr('rows', shapes.length);
        let text = "";
       // &#13;&#10;
       for(let i = 0; i<shapes.length; i++){
        let obj = JSON.stringify(shapes[i]);
        text = text + obj + ";";
       }
       this.textArea.val(text);
    }
}