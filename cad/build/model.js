"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The CAD drawing model currently being created
 */
var Model = /** @class */ (function () {
    function Model() {
        this.shapes = [];
    }
    Model.prototype.getShapes = function () {
        return this.shapes;
    };
    Model.prototype.getShapeAt = function (x, y) {
        for (var _i = 0, _a = this.shapes; _i < _a.length; _i++) {
            var shape = _a[_i];
            if (shape.contains(x, y)) {
                return shape;
            }
        }
        return null; //return last shape
    };
    //TODO: Add more methods...
    Model.prototype.addShape = function (shape) {
        this.shapes.push(shape);
    };
    Model.prototype.removeShape = function (shape) {
        var index = this.shapes.indexOf(shape);
        this.shapes.splice(index, 1);
    };
    Model.prototype.moveShape = function (shape, x, y) {
        shape.setPosition(x, y);
    };
    Model.prototype.update = function (shapes) {
        this.shapes = shapes;
    };
    return Model;
}());
exports.Model = Model;
//# sourceMappingURL=model.js.map