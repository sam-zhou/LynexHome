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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
var ApiService = (function () {
    function ApiService(http) {
        this.http = http;
    }
    ApiService.prototype.getParamValues = function (param) {
        if (!param)
            return null;
        var paramValues = "";
        if (Array.isArray(param)) {
            // we will look for name and value properties
            for (var i = 0; i < param.length; i++) {
                var p = param[i];
                if (p) {
                    if (p.name !== undefined && p.value !== undefined) {
                        if (paramValues !== "") {
                            paramValues += "&";
                        }
                        //quote strings
                        if (typeof (p.value) === 'string')
                            p.value = '"' + p.value + '"';
                        paramValues += p.name + "=" + p.value;
                    }
                }
            }
            if (paramValues !== "") {
                paramValues = "?" + paramValues;
            }
        }
        else {
            paramValues = param.toString(); // single value
        }
        return paramValues;
    };
    ;
    ApiService.prototype.reject = function (object) {
        return Promise.reject(object);
    };
    ApiService.prototype.resolve = function (object) {
        return Promise.resolve(object);
    };
    ;
    ApiService.prototype.postData = function (controller, action, data) {
        return this.http.post('/api/' + controller + '/' + action + '/', data)
            .map(function (response) { return response.json(); })
            .toPromise()
            .catch(this.handleError);
    };
    ;
    ApiService.prototype.getData = function (controller, action, data) {
        var url = null;
        if (data) {
            url = '/api/' + controller + '/' + action + '/' + this.getParamValues(data);
        }
        else {
            url = '/api/' + controller + '/' + action + '/';
        }
        return this.http.get(url)
            .map(function (response) { return response.json(); })
            .toPromise()
            .catch(this.handleError);
        ;
    };
    ;
    ApiService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return ApiService;
}());
ApiService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ApiService);
exports.ApiService = ApiService;
//# sourceMappingURL=api.service.js.map