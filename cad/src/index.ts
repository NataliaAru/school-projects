import 'bootstrap'; //bootstrap.js for button toggling

import {Model} from './model';
import {View as CanvasView} from './view-canvas';
import {ControlCanvas, ControlText } from './Controls'
import {ViewText} from './view-text';

let model = new Model();
let controlCan = new ControlCanvas(model);
let canvasView = new CanvasView(model, controlCan);
let controlText = new ControlText(model);
let textView = new ViewText(model, controlText);
model.addView(canvasView);
model.addView(textView);
//TODO: more views and controllers here...