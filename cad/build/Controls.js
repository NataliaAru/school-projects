"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shapes_1 = require("./shapes");
var ControlCanvas = /** @class */ (function () {
    function ControlCanvas(model) {
        this.model = model;
        this.factory = new shapes_1.Factory();
    }
    ControlCanvas.prototype.move = function (shape, changex, changey) {
        this.model.moveShape(shape, changex, changey);
    };
    ControlCanvas.prototype.delete = function (x, y) {
        var shape = this.model.getShapeAt(x, y);
        if (shape) {
            this.model.removeShape(shape);
        }
    };
    ControlCanvas.prototype.create = function (x, y, type) {
        var shape;
        if (type == 'rectangle') {
            shape = this.factory.createRectangle(x, y);
        }
        if (type == 'triangle') {
            shape = this.factory.createTriangle(x, y);
        }
        else {
            shape = this.factory.createCircle(x, y);
        }
        this.model.addShape(shape);
    };
    return ControlCanvas;
}());
exports.ControlCanvas = ControlCanvas;
var ControlText = /** @class */ (function () {
    function ControlText(model) {
        this.model = model;
    }
    ControlText.prototype.update = function (shapes) {
        this.model.update(shapes);
    };
    return ControlText;
}());
exports.ControlText = ControlText;
//# sourceMappingURL=Controls.js.map