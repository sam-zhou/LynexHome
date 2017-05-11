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
var site_service_1 = require("../services/site.service");
var SiteManagerComponent = (function () {
    function SiteManagerComponent(switchService, siteService) {
        this.switchService = switchService;
        this.siteService = siteService;
        this.sites = [];
        this.isBusy = true;
        this.selectedSite = null;
    }
    SiteManagerComponent.prototype.getSiteName = function () {
        if (this.selectedSite) {
            var suffix = this.selectedSite.isDefault ? "(Default)" : "";
            return this.selectedSite.name + suffix;
        }
        return "Please Select";
    };
    SiteManagerComponent.prototype.selectSite = function (site) {
        this.isBusy = true;
        this.selectedSite = site;
        this.loadSelectedSite();
    };
    SiteManagerComponent.prototype.loadSelectedSite = function () {
        this.isBusy = false;
    };
    SiteManagerComponent.prototype.setDefault = function () {
        var _this = this;
        if (this.selectedSite) {
            this.isBusy = true;
            this.siteService.setDefault(this.selectedSite.id).then(function (response) {
                if (response.success) {
                    for (var i = 0; i < _this.sites.length; i++) {
                        if (_this.sites[i].id === _this.selectedSite.id) {
                            _this.sites[i].isDefault = true;
                        }
                        else {
                            _this.sites[i].isDefault = false;
                        }
                    }
                }
                _this.isBusy = false;
            });
        }
    };
    SiteManagerComponent.prototype.ngOnInit = function () {
        var _this = this;
        var self = this;
        this.siteService.getSites().then(function (sites) {
            _this.sites = sites;
            console.log(sites);
            for (var i = 0; i < _this.sites.length; i++) {
                if (_this.sites[i].isDefault) {
                    _this.selectedSite = _this.sites[i];
                    _this.loadSelectedSite();
                    break;
                }
            }
        });
    };
    return SiteManagerComponent;
}());
SiteManagerComponent = __decorate([
    core_1.Component({
        selector: 'sitemanager',
        templateUrl: 'views/sitemanager.component.html',
        styleUrls: ['css/sitemanager.component.css'],
        moduleId: module.id
    }),
    __metadata("design:paramtypes", [switch_service_1.SwitchService, site_service_1.SiteService])
], SiteManagerComponent);
exports.SiteManagerComponent = SiteManagerComponent;
//# sourceMappingURL=sitemanager.component.js.map