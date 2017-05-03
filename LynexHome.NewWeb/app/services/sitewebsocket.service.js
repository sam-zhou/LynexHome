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
    function SiteWebSocketService(siteId) {
        this.webSocketService = null;
        this.onMessageCallbacks = [];
        var self = this;
        this.webSocketService = new websocket_service_1.WebSocketService(CHAT_URL + siteId, null, {
            initialTimeout: 500,
            maxTimeout: 300000,
            reconnectIfNotNormalClose: true,
        });
        // set received message callback
        this.webSocketService.onMessage(function (msg) {
            self.onMessageHandler(msg);
        }, { autoApply: false });
        // set received message stream
        this.webSocketService.getDataStream().subscribe(function (msg) {
            console.log("next", msg.data);
        }, function (msg) {
            console.log("error", msg);
        }, function () {
            console.log("complete");
        });
        this.webSocketService.setSendMode(websocket_service_1.WebSocketSendMode.Direct);
    }
    SiteWebSocketService.prototype.onMessage = function (callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback must be a function');
        }
        this.onMessageCallbacks.push(callback);
        return this;
    };
    SiteWebSocketService.prototype.onMessageHandler = function (message) {
        var self = this;
        var currentCallback;
        for (var i = 0; i < self.onMessageCallbacks.length; i++) {
            currentCallback = self.onMessageCallbacks[i];
            currentCallback.fn.apply(self, message.data);
        }
        console.log("onMessage ", message.data);
    };
    ;
    return SiteWebSocketService;
}());
SiteWebSocketService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [String])
], SiteWebSocketService);
exports.SiteWebSocketService = SiteWebSocketService;
//# sourceMappingURL=sitewebsocket.service.js.map