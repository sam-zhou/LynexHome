"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ApiService = (function () {
    function ApiService() {
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
                        if (paramValues != "") {
                            paramValues += "&";
                        }
                        //quote strings
                        if (typeof (p.value) == 'string')
                            p.value = '"' + p.value + '"';
                        paramValues += p.name + "=" + p.value;
                    }
                }
            }
            if (paramValues != "") {
                paramValues = "?" + paramValues;
            }
        }
        else {
            paramValues = param.toString(); // single value
        }
        return paramValues;
    };
    return ApiService;
}());
ApiService = __decorate([
    core_1.Injectable()
], ApiService);
exports.ApiService = ApiService;
//# sourceMappingURL=api.service.js.map