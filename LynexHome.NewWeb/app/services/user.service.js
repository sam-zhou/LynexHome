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
var api_service_1 = require("./api.service");
require("rxjs/add/operator/map");
var user_model_1 = require("../models/user.model");
var UserService = (function () {
    function UserService(apiService) {
        this.apiService = apiService;
        this.user = null;
    }
    UserService.prototype.getUserFromServer = function () {
        var _this = this;
        var promise = this.apiService.getData("Authentication", "GetUser");
        return promise.then(function (response) {
            if (response && response.success) {
                _this.user = new user_model_1.User(response.results);
                console.log(_this.user);
                _this.apiService.resolve(_this.user);
            }
            else {
                _this.apiService.reject(null);
            }
            return _this.user;
        });
    };
    UserService.prototype.getUser = function () {
        if (this.user !== null && this.user.id) {
            return this.apiService.resolve(this.user);
        }
        ;
        return this.getUserFromServer();
    };
    ;
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [api_service_1.ApiService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map