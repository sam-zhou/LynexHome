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
var site_service_1 = require("../services/site.service");
var forms_1 = require("@angular/forms");
var SiteManagerComponent = (function () {
    function SiteManagerComponent(siteService, formBuilder) {
        this.siteService = siteService;
        this.formBuilder = formBuilder;
        this.sites = [];
        this.isBusy = true;
        this.selectedSite = null;
        this.isMenuSelected = false;
    }
    SiteManagerComponent.prototype.save = function () {
        var _this = this;
        this.isBusy = true;
        var siteModel = {
            Name: this.siteForm.get("name").value,
            Address: this.siteForm.get("address").value,
            Suburb: this.siteForm.get("suburb").value,
            State: this.siteForm.get("state").value,
            Postcode: this.siteForm.get("postcode").value,
            Country: this.siteForm.get("country").value
        };
        this.siteService.updateSite(siteModel).then(function (results) {
            _this.isBusy = true;
        });
    };
    SiteManagerComponent.prototype.selectSite = function (site) {
        this.isBusy = true;
        this.selectedSite = site;
        this.loadSelectedSite();
        this.isMenuSelected = true;
    };
    SiteManagerComponent.prototype.loadSelectedSite = function () {
        this.siteForm = this.formBuilder.group({
            'name': [this.selectedSite.name, [
                    forms_1.Validators.required,
                    forms_1.Validators.maxLength(20),
                ]
            ],
            'address': [this.selectedSite.address, [
                    forms_1.Validators.required,
                    forms_1.Validators.maxLength(50),
                ]
            ],
            'suburb': [this.selectedSite.suburb, [
                    forms_1.Validators.required,
                    forms_1.Validators.maxLength(20),
                ]
            ],
            'state': [this.selectedSite.state, [
                    forms_1.Validators.required,
                    forms_1.Validators.maxLength(20),
                ]
            ],
            'postcode': [this.selectedSite.postcode, [
                    forms_1.Validators.required,
                    forms_1.Validators.maxLength(4),
                ]
            ],
            'country': [this.selectedSite.country, [
                    forms_1.Validators.required,
                    forms_1.Validators.maxLength(20),
                ]
            ],
        });
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
    __metadata("design:paramtypes", [site_service_1.SiteService, forms_1.FormBuilder])
], SiteManagerComponent);
exports.SiteManagerComponent = SiteManagerComponent;
//# sourceMappingURL=sitemanager.component.js.map