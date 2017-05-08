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
var switch_service_1 = require("../services/switch.service");
var switch_model_1 = require("../models/switch.model");
var SwitchSettingComponent = (function () {
    function SwitchSettingComponent(switchService) {
        this.switchService = switchService;
        this.isBusy = false;
        this.icons = [];
        this.close = new core_1.EventEmitter();
        for (var i = 1; i <= 40; i++) {
            var icon = new switch_model_1.Icon();
            icon.id = i;
            icon.bigImage = "/Images/Icons/64x64/" + i + ".png";
            icon.smallImage = "/Images/Icons/32x32/" + i + ".png";
            this.icons.push(icon);
        }
    }
    Object.defineProperty(SwitchSettingComponent.prototype, "currentSwitch", {
        get: function () {
            return this.selectedSwitch;
        },
        set: function (theSwitch) {
            this.selectedSwitch = theSwitch;
            if (theSwitch == null) {
                this.updatingSwitch = null;
            }
            else {
                this.updatingSwitch = Object.assign({}, this.selectedSwitch);
            }
            this.isBusy = false;
            this.ngOnInit();
        },
        enumerable: true,
        configurable: true
    });
    SwitchSettingComponent.prototype.ngOnInit = function () {
    };
    SwitchSettingComponent.prototype.closeDialog = function () {
        this.close.emit('closed');
    };
    SwitchSettingComponent.prototype.save = function () {
        var _this = this;
        this.isBusy = true;
        this.switchService.updateSwitch(this.updatingSwitch).then(function (result) {
            _this.updatingSwitch = result;
            _this.currentSwitch = result;
            _this.close.emit('saved');
        });
    };
    return SwitchSettingComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], SwitchSettingComponent.prototype, "close", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", switch_model_1.Switch),
    __metadata("design:paramtypes", [switch_model_1.Switch])
], SwitchSettingComponent.prototype, "currentSwitch", null);
SwitchSettingComponent = __decorate([
    core_1.Component({
        selector: 'switchsetting',
        templateUrl: 'views/switchsetting.component.html',
        styleUrls: ['css/switchsetting.component.css'],
        moduleId: module.id
    }),
    __metadata("design:paramtypes", [switch_service_1.SwitchService])
], SwitchSettingComponent);
exports.SwitchSettingComponent = SwitchSettingComponent;
//# sourceMappingURL=switchsetting.component.js.map