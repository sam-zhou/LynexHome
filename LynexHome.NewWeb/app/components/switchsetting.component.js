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
var forms_1 = require("@angular/forms");
var SwitchSettingComponent = (function () {
    function SwitchSettingComponent(switchService, formBuilder) {
        this.switchService = switchService;
        this.formBuilder = formBuilder;
        this.isBusy = false;
        this.isDirty = false;
        this.icons = [];
        this.close = new core_1.EventEmitter();
        this.formErrors = {
            'name': '',
            'type': '',
            'iconId': '',
            'chipId': ''
        };
        this.validationMessages = {
            'name': {
                'required': 'Name is required.',
                'maxlength': 'Name cannot be more than 20 characters long.',
            },
            'chipId': {
                'required': 'ChipId is required.',
                'minlength': 'ChipId must be at least 10 characters long.',
                'maxlength': 'ChipId cannot be more than 12 characters long.',
            }
        };
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
            this.ngOnInit();
            this.isBusy = false;
            this.isDirty = false;
        },
        enumerable: true,
        configurable: true
    });
    SwitchSettingComponent.prototype.setIcon = function (iconId) {
        this.switchSettingForm.patchValue({
            iconId: iconId
        });
    };
    SwitchSettingComponent.prototype.buildForm = function () {
        var _this = this;
        this.switchSettingForm = this.formBuilder.group({
            'name': [this.selectedSwitch.name, [
                    forms_1.Validators.required,
                    forms_1.Validators.maxLength(20),
                ]
            ],
            'type': [this.selectedSwitch.type],
            'iconId': [this.selectedSwitch.iconId],
            'chipId': [this.selectedSwitch.chipId, [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(10),
                    forms_1.Validators.maxLength(12),
                ]],
        });
        this.switchSettingForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged(); // (re)set validation messages now
    };
    SwitchSettingComponent.prototype.onValueChanged = function (data) {
        if (!this.switchSettingForm) {
            return;
        }
        var form = this.switchSettingForm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    SwitchSettingComponent.prototype.ngOnInit = function () {
        if (this.selectedSwitch) {
            this.buildForm();
        }
    };
    SwitchSettingComponent.prototype.closeDialog = function () {
        this.close.emit('closed');
    };
    SwitchSettingComponent.prototype.save = function () {
        var _this = this;
        this.isBusy = true;
        this.selectedSwitch.name = this.switchSettingForm.controls["name"].value;
        this.selectedSwitch.type = this.switchSettingForm.controls["type"].value;
        this.selectedSwitch.iconId = this.switchSettingForm.controls["iconId"].value;
        this.selectedSwitch.chipId = this.switchSettingForm.controls["chipId"].value;
        this.switchService.updateSwitch(this.selectedSwitch).then(function (result) {
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
    __metadata("design:paramtypes", [switch_service_1.SwitchService, forms_1.FormBuilder])
], SwitchSettingComponent);
exports.SwitchSettingComponent = SwitchSettingComponent;
//# sourceMappingURL=switchsetting.component.js.map