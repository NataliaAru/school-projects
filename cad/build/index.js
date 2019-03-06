"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("bootstrap"); //bootstrap.js for button toggling
var model_1 = require("./model");
var view_canvas_1 = require("./view-canvas");
var Controls_1 = require("./Controls");
var model = new model_1.Model();
var controlCan = new Controls_1.ControlCanvas(model);
var canvasView = new view_canvas_1.View(model, controlCan);
//TODO: more views and controllers here... 
//# sourceMappingURL=index.js.map