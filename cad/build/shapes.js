"use strict";
/****
This module contains class declarations for different Shapes, which can be
shared between the components following OOP design principles.
****/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents an abstract Shape that can be drawn
 */
var DrawableShape = /** @class */ (function () {
    function DrawableShape() {
        this.color = '';
    }
    /**
     * Assigns the values of the given object to this shape
     * @param props An object of values to assign, where each key is the property name
     */
    DrawableShape.prototype.updateProperties = function (props) {
        $.extend(this, props); //use jQuery for easy application
    };
    return DrawableShape;
}());
exports.DrawableShape = DrawableShape;
/**
 * Represets a rectangle
 */
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    //cx,cy parameters are the CENTER of the rectangle
    function Rectangle(cx, cy, width, height) {
        var _this = _super.call(this) || this;
        _this.width = width;
        _this.height = height;
        _this.x = cx - width / 2; //calculate upper corner
        _this.y = cy - height / 2;
        _this.color = "red"; //default color
        return _this;
    }
    Rectangle.prototype.contains = function (x, y) {
        return (x >= this.x && x <= this.x + this.width &&
            y >= this.y && y <= this.y + this.height);
    };
    Rectangle.prototype.setPosition = function (x, y) {
        //snap to middle
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;
    };
    Rectangle.prototype.draw = function (brush) {
        brush.fillStyle = this.color;
        brush.fillRect(this.x, this.y, this.width, this.height);
    };
    return Rectangle;
}(DrawableShape));
exports.Rectangle = Rectangle;
/**
 * Represents a circle
 */
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(cx, cy, radius) {
        var _this = _super.call(this) || this;
        _this.cx = cx;
        _this.cy = cy;
        _this.radius = radius;
        _this.color = "blue"; //default color
        return _this;
    }
    Circle.prototype.contains = function (x, y) {
        return Math.sqrt((this.cx - x) * (this.cx - x) + (this.cy - y) * (this.cy - y)) <= this.radius;
    };
    Circle.prototype.setPosition = function (x, y) {
        this.cx = x;
        this.cy = y;
    };
    Circle.prototype.draw = function (brush) {
        brush.fillStyle = this.color;
        brush.beginPath();
        brush.arc(this.cx, this.cy, this.radius, 0, 2 * Math.PI);
        brush.fill();
    };
    return Circle;
}(DrawableShape));
exports.Circle = Circle;
/**
 * Represents a triangle
 */
var Triangle = /** @class */ (function (_super) {
    __extends(Triangle, _super);
    //each pair of coordinates is a corner of the triangle
    function Triangle(x1, y1, x2, y2, x3, y3) {
        var _this = _super.call(this) || this;
        _this.x1 = x1;
        _this.y1 = y1;
        _this.x2 = x2;
        _this.y2 = y2;
        _this.x3 = x3;
        _this.y3 = y3;
        _this.color = "green"; //default color
        return _this;
    }
    //calculate centroid of triangle
    Triangle.prototype.center = function () {
        return [(this.x1 + this.x2 + this.x3) / 3, (this.y1 + this.y2 + this.y3) / 3];
    };
    //return area of arbitrary triangle (for calculating containment)
    Triangle.area = function (x1, y1, x2, y2, x3, y3) {
        return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0);
    };
    Triangle.prototype.contains = function (x, y) {
        //calculate containment via Barycentric coordinates
        var A = Triangle.area(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
        var A1 = Triangle.area(x, y, this.x2, this.y2, this.x3, this.y3);
        var A2 = Triangle.area(this.x1, this.y1, x, y, this.x3, this.y3);
        var A3 = Triangle.area(this.x1, this.y1, this.x2, this.y2, x, y);
        return (Math.abs(A - (A1 + A2 + A3)) === 0);
    };
    Triangle.prototype.setPosition = function (newX, newY) {
        //calculate displacement
        var center = this.center();
        var dx = newX - center[0];
        var dy = newY - center[1];
        //move by displacement
        this.x1 += dx;
        this.x2 += dx;
        this.x3 += dx;
        this.y1 += dy;
        this.y2 += dy;
        this.y3 += dy;
    };
    Triangle.prototype.draw = function (brush) {
        brush.fillStyle = this.color;
        brush.beginPath();
        brush.moveTo(this.x1, this.y1);
        brush.lineTo(this.x2, this.y2);
        brush.lineTo(this.x3, this.y3);
        brush.closePath();
        brush.fill();
    };
    return Triangle;
}(DrawableShape));
exports.Triangle = Triangle;
var Factory = /** @class */ (function () {
    function Factory() {
        this.STANDARD_constant = 30;
    }
    Factory.prototype.construct = function () {
    };
    Factory.prototype.createTriangle = function (x, y) {
        var num = this.STANDARD_constant;
        var shape = new Triangle(x, y, x - num, y - num, x + num, y - num);
        return shape;
    };
    Factory.prototype.createCircle = function (x, y) {
        var shape = new Circle(x, y, this.STANDARD_constant);
        return shape;
    };
    Factory.prototype.createRectangle = function (x, y) {
        var shape = new Rectangle(x, y, this.STANDARD_constant * 2, this.STANDARD_constant);
        return shape;
    };
    return Factory;
}());
exports.Factory = Factory;
//# sourceMappingURL=shapes.js.map