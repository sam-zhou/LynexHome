"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var forms_1 = require("@angular/forms");
var lynex_routing_module_1 = require("./lynex.routing.module");
var lynex_component_1 = require("../components/lynex.component");
var navigation_component_1 = require("../components/navigation.component");
var login_component_1 = require("../components/login.component");
var footer_component_1 = require("../components/footer.component");
var control_component_1 = require("../components/control.component");
var api_service_1 = require("../services/api.service");
var switch_service_1 = require("../services/switch.service");
var user_service_1 = require("../services/user.service");
var websocket_service_1 = require("../services/websocket.service");
var sitewebsocket_service_1 = require("../services/sitewebsocket.service");
var LynexModule = (function () {
    function LynexModule() {
    }
    return LynexModule;
}());
LynexModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, ng_bootstrap_1.NgbModule.forRoot(), http_1.HttpModule, forms_1.FormsModule, lynex_routing_module_1.LynexRoutingModule],
        declarations: [lynex_component_1.LynexComponent, navigation_component_1.NavigationComponent, login_component_1.LoginComponent, footer_component_1.FooterComponent, control_component_1.ControlComponent],
        providers: [api_service_1.ApiService, switch_service_1.SwitchService, user_service_1.UserService, websocket_service_1.WebSocketService, sitewebsocket_service_1.SiteWebSocketService],
        bootstrap: [lynex_component_1.LynexComponent]
    })
], LynexModule);
exports.LynexModule = LynexModule;
//# sourceMappingURL=lynex.module.js.map