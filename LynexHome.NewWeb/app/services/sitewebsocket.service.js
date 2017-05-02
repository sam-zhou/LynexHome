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
var websocket_service_1 = require("./websocket.service");
require("rxjs/add/operator/map");
var CHAT_URL = 'ws://home.mylynex.com.au/api/site/websocket?siteId=';
var SiteWebSocketService = (function () {
    function SiteWebSocketService(webSocketService) {
        this.webSocketService = webSocketService;
    }
    SiteWebSocketService.prototype.create = function (siteId) {
        this.messages = (this.webSocketService)
            .connect(CHAT_URL + siteId)
            .map(function (response) {
            var data = JSON.parse(response.data);
            console.log(response.data);
            return {
                requestType: data.requestType,
                liveSwitches: data.liveSwitches,
            };
        });
    };
    return SiteWebSocketService;
}());
SiteWebSocketService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [websocket_service_1.WebSocketService])
], SiteWebSocketService);
exports.SiteWebSocketService = SiteWebSocketService;
//# sourceMappingURL=sitewebsocket.service.js.map