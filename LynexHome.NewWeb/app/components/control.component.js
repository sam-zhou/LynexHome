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
var websocketmessage_model_1 = require("../models/websocketmessage.model");
var websocket_service_1 = require("../services/websocket.service");
var CHAT_URL = 'ws://home.mylynex.com.au/api/site/websocket?siteId=';
var ControlComponent = (function () {
    function ControlComponent(switchService) {
        this.switchService = switchService;
        this.webSocketService = null;
        this.isBusy = true;
    }
    ;
    ControlComponent.prototype.changeStatus = function (theSwitch) {
        theSwitch.isBusy = true;
        var updatingSwitch = Object.assign({}, theSwitch);
        updatingSwitch.status = !updatingSwitch.status;
        var message = new websocketmessage_model_1.WebSocketMessage();
        message.Message = updatingSwitch;
        message.Type = websocketmessage_model_1.WebSocketMessageType.WebSwitchStatusUpdate;
        this.webSocketService.sendDirect(JSON.stringify(message));
    };
    ;
    ControlComponent.prototype.HandlerMessage = function (msg) {
        var message = JSON.parse(msg.data);
        console.log(msg.data);
        var webSocketMessage = new websocketmessage_model_1.WebSocketMessage(message);
        console.log("message received:", webSocketMessage);
        switch (webSocketMessage.Type) {
            case websocketmessage_model_1.WebSocketMessageType.WebSwitchStatusUpdate:
                for (var i = 0; i < this.switches.length; i++) {
                    if (this.switches[i].id == webSocketMessage.Message.id) {
                        this.switches[i].isBusy = false;
                        this.switches[i].status = webSocketMessage.Message.status;
                    }
                }
                break;
            case websocketmessage_model_1.WebSocketMessageType.WebSwitchLiveUpdate:
                for (var i = 0; i < this.switches.length; i++) {
                    for (var j = 0; j < webSocketMessage.Message.length; j++) {
                        if (this.switches[i].id == webSocketMessage.Message[j].id) {
                            this.switches[i].status = webSocketMessage.Message[j].status;
                            this.switches[i].live = webSocketMessage.Message[j].live;
                            break;
                        }
                    }
                }
        }
    };
    ControlComponent.prototype.ngOnInit = function () {
        var _this = this;
        var self = this;
        this.switchService.getSwitches("5735824c-93cc-4016-b6b3-26f7947bb58e")
            .then(function (switches) {
            _this.switches = switches;
            console.log(switches);
            _this.isBusy = false;
        });
        this.webSocketService = new websocket_service_1.WebSocketService(CHAT_URL + "5735824c-93cc-4016-b6b3-26f7947bb58e", null, {
            initialTimeout: 500,
            maxTimeout: 300000,
            reconnectIfNotNormalClose: true,
        });
        // set received message callback
        this.webSocketService.onMessage(function (msg) {
            _this.HandlerMessage(msg);
        }, { autoApply: false });
        this.webSocketService.setSendMode(websocket_service_1.WebSocketSendMode.Direct);
    };
    return ControlComponent;
}());
ControlComponent = __decorate([
    core_1.Component({
        selector: 'control',
        templateUrl: 'views/control.component.html',
        styleUrls: ['css/control.component.css'],
        moduleId: module.id
    }),
    __metadata("design:paramtypes", [switch_service_1.SwitchService])
], ControlComponent);
exports.ControlComponent = ControlComponent;
//# sourceMappingURL=control.component.js.map