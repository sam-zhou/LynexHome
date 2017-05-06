"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var DialogComponent = (function () {
    function DialogComponent() {
        this._header = null;
        this._content = null;
        this.close = new core_1.EventEmitter();
    }
    Object.defineProperty(DialogComponent.prototype, "header", {
        set: function (value) {
            this._header = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DialogComponent.prototype, "currentSwitch", {
        get: function () {
            return this._header;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DialogComponent.prototype, "content", {
        get: function () {
            return this._content;
        },
        set: function (value) {
            this._content = value;
        },
        enumerable: true,
        configurable: true
    });
    DialogComponent.prototype.closeDialog = function () {
        this.close.emit('closed');
    };
    return DialogComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DialogComponent.prototype, "close", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], DialogComponent.prototype, "header", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], DialogComponent.prototype, "content", null);
DialogComponent = __decorate([
    core_1.Component({
        selector: 'dialog',
        templateUrl: 'views/dialog.component.html',
        styleUrls: ['css/dialog.component.css'],
        moduleId: module.id
    })
], DialogComponent);
exports.DialogComponent = DialogComponent;
//# sourceMappingURL=dialog.component.js.map