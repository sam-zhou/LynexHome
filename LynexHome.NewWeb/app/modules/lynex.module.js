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
var ng2_dnd_1 = require("ng2-dnd");
var lynex_routing_module_1 = require("./lynex.routing.module");
var angular2_moment_1 = require("angular2-moment");
var lynex_component_1 = require("../components/lynex.component");
var dialog_component_1 = require("../components/dialog.component");
var navigation_component_1 = require("../components/navigation.component");
var login_component_1 = require("../components/login.component");
var footer_component_1 = require("../components/footer.component");
var control_component_1 = require("../components/control.component");
var schedule_component_1 = require("../components/schedule.component");
var switchsetting_component_1 = require("../components/switchsetting.component");
var sitemanager_component_1 = require("../components/sitemanager.component");
var account_component_1 = require("../components/account.component");
var api_service_1 = require("../services/api.service");
var switch_service_1 = require("../services/switch.service");
var site_service_1 = require("../services/site.service");
var user_service_1 = require("../services/user.service");
var settings_service_1 = require("../services/settings.service");
var LynexModule = (function () {
    function LynexModule() {
    }
    return LynexModule;
}());
LynexModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, ng_bootstrap_1.NgbModule.forRoot(), http_1.HttpModule, forms_1.FormsModule, lynex_routing_module_1.LynexRoutingModule, ng2_dnd_1.DndModule.forRoot(), angular2_moment_1.MomentModule, forms_1.ReactiveFormsModule],
        declarations: [lynex_component_1.LynexComponent, dialog_component_1.DialogComponent, navigation_component_1.NavigationComponent, login_component_1.LoginComponent, footer_component_1.FooterComponent, control_component_1.ControlComponent, schedule_component_1.ScheduleComponent, switchsetting_component_1.SwitchSettingComponent, sitemanager_component_1.SiteManagerComponent, account_component_1.AccountComponent],
        providers: [user_service_1.UserService, api_service_1.ApiService, switch_service_1.SwitchService, , site_service_1.SiteService, settings_service_1.SettingsService, forms_1.FormBuilder],
        bootstrap: [lynex_component_1.LynexComponent]
    })
], LynexModule);
exports.LynexModule = LynexModule;
//# sourceMappingURL=lynex.module.js.map