"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var control_component_1 = require("../components/control.component");
var routes = [
    { path: '', redirectTo: '/control', pathMatch: 'full' },
    { path: 'control', component: control_component_1.ControlComponent }
];
var LynexRoutingModule = (function () {
    function LynexRoutingModule() {
    }
    return LynexRoutingModule;
}());
LynexRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], LynexRoutingModule);
exports.LynexRoutingModule = LynexRoutingModule;
//# sourceMappingURL=lynex.routing.module.js.map