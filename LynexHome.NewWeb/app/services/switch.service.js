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
var querysitemodel_apimodels_1 = require("../apimodels/querysitemodel.apimodels");
var SwitchService = (function () {
    function SwitchService(apiService) {
        this.apiService = apiService;
        this.switches = [];
    }
    SwitchService.prototype.getSwitches = function (siteId) {
        var _this = this;
        var siteQueryModel = new querysitemodel_apimodels_1.QuerySiteModel();
        siteQueryModel.SiteId = siteId;
        var promise = this.apiService.postData("switch", "get", siteQueryModel)
            .then(function (response) {
            var results = response.results;
            _this.switches = results;
            return results;
        });
        return promise;
    };
    ;
    SwitchService.prototype.updateStatus = function (switchId, status) {
        var updateStatus = {
            SwitchId: switchId,
            Status: status
        };
        return this.apiService.postData("switch", "updateStatus", updateStatus).then(function (response) { return response.results; });
    };
    ;
    return SwitchService;
}());
SwitchService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [api_service_1.ApiService])
], SwitchService);
exports.SwitchService = SwitchService;
//# sourceMappingURL=switch.service.js.map