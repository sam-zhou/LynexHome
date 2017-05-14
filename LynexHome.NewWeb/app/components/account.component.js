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
var user_service_1 = require("../services/user.service");
var forms_1 = require("@angular/forms");
var AccountComponent = (function () {
    function AccountComponent(userService, formBuilder) {
        this.userService = userService;
        this.formBuilder = formBuilder;
        this.user = null;
        this.isBusy = true;
        this.isMenuSelected = false;
        this.selectedForm = "";
    }
    AccountComponent.prototype.goToForm = function (formName) {
        this.isMenuSelected = true;
        this.selectedForm = formName;
    };
    AccountComponent.prototype.initialUser = function () {
        this.generalForm = this.formBuilder.group({
            'email': [this.user.email, [
                    forms_1.Validators.required,
                    forms_1.Validators.maxLength(20),
                ]
            ],
        });
        this.advancedForm = this.formBuilder.group({
            'phone': [this.user.phone, [
                    forms_1.Validators.required,
                    forms_1.Validators.maxLength(20),
                ]
            ],
        });
        this.privacyForm = this.formBuilder.group({
            'phone': [this.user.phone, [
                    forms_1.Validators.required,
                    forms_1.Validators.maxLength(20),
                ]
            ],
        });
        this.passwordForm = this.formBuilder.group({
            'oldPassword': ["", [
                    forms_1.Validators.required,
                ]
            ],
            'password': ["", [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(6),
                    forms_1.Validators.maxLength(20),
                    this.complexity
                ]
            ],
            'confirmPassword': ["", [
                    forms_1.Validators.required,
                    forms_1.Validators.maxLength(20),
                    this.equal
                ]
            ],
        });
        this.selectedForm = "general";
        this.isBusy = false;
    };
    AccountComponent.prototype.equal = function (control) {
        if (control && control.parent) {
            if (control.value && control.parent.get("password").value) {
                if (control.value !== control.parent.get("password").value) {
                    return {
                        equal: true
                    };
                }
            }
        }
        return null;
    };
    AccountComponent.prototype.complexity = function (control) {
        if (control && control.parent) {
            if (control.value) {
                if (control.value.match(new RegExp('[A-Z]')) && control.value.match(new RegExp('[a-z]')) && control.value.match(new RegExp('[0-9]'))) {
                    return null;
                }
            }
        }
        return {
            complexity: true
        };
    };
    AccountComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUser().then(function (response) {
            _this.user = response;
            _this.initialUser();
        });
    };
    return AccountComponent;
}());
AccountComponent = __decorate([
    core_1.Component({
        selector: 'account',
        templateUrl: 'views/account.component.html',
        styleUrls: ['css/account.component.css'],
        moduleId: module.id
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, forms_1.FormBuilder])
], AccountComponent);
exports.AccountComponent = AccountComponent;
//# sourceMappingURL=account.component.js.map