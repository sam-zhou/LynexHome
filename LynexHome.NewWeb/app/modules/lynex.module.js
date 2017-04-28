"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var lynex_component_1 = require("..//components/lynex.component");
var navigation_component_1 = require("..//components/navigation.component");
var login_component_1 = require("..//components/login.component");
var footer_component_1 = require("..//components/footer.component");
var LynexModule = (function () {
    function LynexModule() {
    }
    return LynexModule;
}());
LynexModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule],
        declarations: [lynex_component_1.LynexComponent, navigation_component_1.NavigationComponent, login_component_1.LoginComponent, footer_component_1.FooterComponent],
        bootstrap: [lynex_component_1.LynexComponent, navigation_component_1.NavigationComponent, login_component_1.LoginComponent, footer_component_1.FooterComponent]
    })
], LynexModule);
exports.LynexModule = LynexModule;
//# sourceMappingURL=lynex.module.js.map