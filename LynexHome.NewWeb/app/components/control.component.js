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
var switch_model_1 = require("../models/switch.model");
var websocketmessage_model_1 = require("../models/websocketmessage.model");
var websocket_service_1 = require("../services/websocket.service");
var CHAT_URL = 'wss://home.lynex.com.au/api/site/websocket?siteId=';
var ControlComponent = (function () {
    function ControlComponent(switchService, siteService) {
        this.switchService = switchService;
        this.siteService = siteService;
        this.switches = [];
        this.sites = [];
        this.selectedSite = null;
        this.selectedSwitch = null;
        this.selectedSetting = null;
        this.disableOrder = false;
        this.webSocketService = null;
        this.isBusy = true;
    }
    ControlComponent.prototype.changeStatus = function (theSwitch) {
        if (!theSwitch.isBusy && theSwitch.live) {
            theSwitch.isBusy = true;
            var updatingSwitch = Object.assign({}, theSwitch);
            updatingSwitch.status = !updatingSwitch.status;
            var message = new websocketmessage_model_1.WebSocketMessage();
            message.Message = updatingSwitch;
            message.Type = websocketmessage_model_1.WebSocketMessageType.WebSwitchStatusUpdate;
            message.ClientId = this.webSocketService.clientId;
            this.webSocketService.sendDirect(JSON.stringify(message));
        }
    };
    ;
    ControlComponent.prototype.sort = function (theSwitch, index) {
        var _this = this;
        if (!theSwitch.isBusy) {
            theSwitch.isBusy = true;
            this.switchService.updateOrder(theSwitch.id, index, this.selectedSite.id, this.webSocketService.clientId).then(function (response) {
                if (response.success) {
                    theSwitch.isBusy = false;
                    for (var i = 0; i < _this.switches.length; i++) {
                        _this.switches[i].order = i;
                    }
                }
            });
        }
    };
    ControlComponent.prototype.handlerMessage = function (msg) {
        var message = JSON.parse(msg.data);
        console.log(msg.data);
        var webSocketMessage = new websocketmessage_model_1.WebSocketMessage(message);
        console.log("message received:", webSocketMessage);
        switch (webSocketMessage.Type) {
            case websocketmessage_model_1.WebSocketMessageType.WebSwitchStatusUpdate:
                for (var i = 0; i < this.switches.length; i++) {
                    if (this.switches[i].id === webSocketMessage.Message.id) {
                        this.switches[i].isBusy = false;
                        this.switches[i].status = webSocketMessage.Message.status;
                        break;
                    }
                }
                break;
            case websocketmessage_model_1.WebSocketMessageType.PiSwitchStatusUpdate:
                for (var i = 0; i < this.switches.length; i++) {
                    if (this.switches[i].id === webSocketMessage.Message.Id) {
                        this.switches[i].status = webSocketMessage.Message.Status;
                        break;
                    }
                }
                break;
            case websocketmessage_model_1.WebSocketMessageType.WebSwitchLiveUpdate:
                for (var i = 0; i < this.switches.length; i++) {
                    for (var j = 0; j < webSocketMessage.Message.length; j++) {
                        if (this.switches[i].id === webSocketMessage.Message[j].id) {
                            this.switches[i].status = webSocketMessage.Message[j].status;
                            this.switches[i].live = webSocketMessage.Message[j].live;
                            break;
                        }
                    }
                }
                break;
            case websocketmessage_model_1.WebSocketMessageType.WebSwitchOrderUpdate:
                if (this.webSocketService.clientId !== webSocketMessage.ClientId) {
                    this.disableOrder = true;
                }
                else {
                    for (var i = 0; i < this.switches.length; i++) {
                        if (this.switches[i].id === webSocketMessage.Message.id) {
                            this.switches[i].isBusy = false;
                            break;
                        }
                    }
                }
                break;
            case websocketmessage_model_1.WebSocketMessageType.PiLiveSwitches:
                for (var i = 0; i < this.switches.length; i++) {
                    this.switches[i].live = false;
                    for (var j = 0; j < webSocketMessage.Message.length; j++) {
                        if (this.switches[i].id === webSocketMessage.Message[j].Id) {
                            this.switches[i].live = webSocketMessage.Message[j].Live;
                            break;
                        }
                    }
                }
                break;
            case websocketmessage_model_1.WebSocketMessageType.PiSwitchLiveUpdate:
                for (var i = 0; i < this.switches.length; i++) {
                    if (this.switches[i].id === webSocketMessage.Message.SwitchId) {
                        this.switches[i].live = webSocketMessage.Message.Live;
                        break;
                    }
                }
                break;
        }
    };
    ControlComponent.prototype.getSiteName = function () {
        if (this.selectedSite) {
            var suffix = this.selectedSite.isDefault ? "(Default)" : "";
            return this.selectedSite.name + suffix;
        }
        return "Please Select";
    };
    ControlComponent.prototype.selectSite = function (site) {
        this.isBusy = true;
        this.selectedSite = site;
        this.loadSelectedSite();
    };
    ControlComponent.prototype.setDefault = function () {
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
    ControlComponent.prototype.switchSchedule = function (event, theSwitch) {
        event.stopPropagation();
        this.selectedSwitch = theSwitch;
    };
    ControlComponent.prototype.onCloseSchedule = function (event) {
        this.selectedSwitch = null;
    };
    ControlComponent.prototype.onCloseSetting = function (event) {
        if (event.toString() == "saved") {
            this.isBusy = true;
            this.loadSelectedSite();
        }
        this.selectedSetting = null;
    };
    ControlComponent.prototype.switchSetting = function (event, theSwitch) {
        event.stopPropagation();
        this.selectedSetting = theSwitch;
    };
    ControlComponent.prototype.loadSelectedSite = function () {
        var _this = this;
        if (this.webSocketService) {
            this.webSocketService.close();
        }
        if (this.selectedSite && this.selectedSite !== null) {
            this.switchService.getSwitches(this.selectedSite.id)
                .then(function (switches) {
                _this.switches = switches;
                console.log("get switches:", _this.switches);
                _this.webSocketService = new websocket_service_1.WebSocketService(CHAT_URL + _this.selectedSite.id, null, {
                    initialTimeout: 500,
                    maxTimeout: 300000,
                    reconnectIfNotNormalClose: true,
                    clientId: Math.random().toString(36)
                });
                // set received message callback
                _this.webSocketService.onMessage(function (msg) {
                    _this.handlerMessage(msg);
                }, { autoApply: false });
                _this.webSocketService.setSendMode(websocket_service_1.WebSocketSendMode.Direct);
                var message = new websocketmessage_model_1.WebSocketMessage();
                message.Type = websocketmessage_model_1.WebSocketMessageType.WebSiteEnquire;
                message.ClientId = _this.webSocketService.clientId;
                _this.webSocketService.sendDirect(JSON.stringify(message));
                _this.isBusy = false;
            });
        }
    };
    ControlComponent.prototype.ngOnInit = function () {
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
    return ControlComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", switch_model_1.Switch)
], ControlComponent.prototype, "selectedSetting", void 0);
ControlComponent = __decorate([
    core_1.Component({
        selector: 'control',
        templateUrl: 'views/control.component.html',
        styleUrls: ['css/control.component.css'],
        moduleId: module.id
    }),
    __metadata("design:paramtypes", [switch_service_1.SwitchService, site_service_1.SiteService])
], ControlComponent);
exports.ControlComponent = ControlComponent;
//# sourceMappingURL=control.component.js.map