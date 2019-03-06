import { DrawableShape } from './shapes';
import { Model } from './model';
import { ControlCanvas } from './Controls'

/**
 * A class to represent the View. Contains control buttons and an HTML5 canvas.
 */
export interface Display{
  display():void;
}
export class View implements Display {
  //constants for easy access
  readonly canvas = $('#graphics-view canvas')[0] as HTMLCanvasElement;
  readonly brush = this.canvas.getContext('2d') as CanvasRenderingContext2D;

  private selected: DrawableShape | null = null; //selected state is handled by View
  private action: string; //what action we are doing (handled by View)

  constructor(private model: Model, private control: ControlCanvas) {
    //event listeners (DOM for readability/speed)
    this.canvas.addEventListener('mousedown', (e) => { this.handleMouseDown(e) });
    this.canvas.addEventListener('mouseup', (e) => { this.handleMouseUp(e) });
    this.canvas.addEventListener('mousemove', (e) => { this.handleMove(e) });

    let optionButtons = $("#graphics-view input:radio");
    this.action = optionButtons.val() as string; //current (initial) selection
    optionButtons.change((e) => { this.action = $(e.target).val() as string; }); //update action

    //responsive canvas
    $(window).resize(() => { this.resizeCanvas() }); //call function on window resize
    this.resizeCanvas(); //initial sizing
  }


  display() {
    //erase canvas
    this.brush.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let shapes: DrawableShape[] = this.model.getShapes();

    //draw all the shapes!
    for (let shape of shapes) {
      shape.draw(this.brush);
    }
  }

  handleMouseDown(event: MouseEvent) {
    let x = event.offsetX;
    let y = event.offsetY;

    if (this.action === 'move') {
      this.selected = this.model.getShapeAt(x, y);
    }
    else if (this.action === 'delete') {
      this.control.delete(x, y);
    }
    else { //a creation method
      this.control.create(x, y, this.action);
    }
  }

  handleMouseUp(event: MouseEvent) {
    this.selected = null;
  }

  handleMove(event: MouseEvent) {
    let x = event.offsetX;
    let y = event.offsetY;
    if (this.selected) {
      this.control.move(this.selected, x, y);
    }
  }

  //make Canvas responsive (adapted from http://ameijer.nl/2011/08/resizable-html5-canvas/)
  resizeCanvas() {
    const ratio = 1; //4/3;
    let canvasElem = $(this.canvas);
    canvasElem.attr('width', canvasElem.parent().width() as number);
    canvasElem.attr('height', ratio * (canvasElem.width() as number));
    this.display();
  }
}
