"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewText = /** @class */ (function () {
    function ViewText(model, control) {
        var _this = this;
        this.model = model;
        this.control = control;
        this.textArea = $('.form-control');
        this.update = $('#text-view button')[0];
        this.update.addEventListener("click", function (e) { _this.handleClick(e); });
    }
    ViewText.prototype.handleClick = function (event) {
        //get text from the text area
        //change it to list of shapes
        var text = "" + this.textArea.val;
        var parts = text.split(',');
        var shapes = [];
        for (var part in parts) {
            shapes.push(JSON.parse(part));
        }
        this.control.update(shapes);
    };
    ViewText.prototype.display = function () {
        var shapes = this.model.getShapes();
        this.textArea.attr('rows', shapes.length);
        var text = "";
        // &#13;&#10;
        for (var shape in shapes) {
            var obj = JSON.stringify(shape);
            text = text + obj + ",";
        }
        this.textArea.val(text);
    };
    return ViewText;
}());
exports.ViewText = ViewText;
//# sourceMappingURL=view-text.js.map