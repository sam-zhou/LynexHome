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
var SiteService = (function () {
    function SiteService(apiService) {
        this.apiService = apiService;
        this.sites = [];
    }
    SiteService.prototype.getSites = function () {
        var _this = this;
        return this.apiService.getData("site", "get")
            .then(function (response) {
            var results = response.results;
            _this.sites = results;
            return results;
        });
    };
    ;
    SiteService.prototype.setDefault = function (siteId) {
        return this.apiService.postData("site", "SetAsDefault", { SiteId: siteId });
    };
    SiteService.prototype.updateSite = function (site) {
        return this.apiService.postData("site", "updateSite", site).then(function (response) { return response.results; });
    };
    return SiteService;
}());
SiteService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [api_service_1.ApiService])
], SiteService);
exports.SiteService = SiteService;
//# sourceMappingURL=site.service.js.map