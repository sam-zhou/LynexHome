"use strict";
var WebSocketMessage = (function () {
    function WebSocketMessage(json) {
        if (json) {
            this.Message = json.Message;
            this.Type = json.Type;
            this.BroadcastType = json.BroadcastType;
            this.ClientId = json.ClientId;
        }
    }
    return WebSocketMessage;
}());
exports.WebSocketMessage = WebSocketMessage;
var WebSocketBroadcastType;
(function (WebSocketBroadcastType) {
    WebSocketBroadcastType[WebSocketBroadcastType["None"] = 0] = "None";
    WebSocketBroadcastType[WebSocketBroadcastType["All"] = 1] = "All";
    WebSocketBroadcastType[WebSocketBroadcastType["Pi"] = 2] = "Pi";
    WebSocketBroadcastType[WebSocketBroadcastType["Web"] = 3] = "Web";
})(WebSocketBroadcastType = exports.WebSocketBroadcastType || (exports.WebSocketBroadcastType = {}));
var WebSocketMessageType;
(function (WebSocketMessageType) {
    WebSocketMessageType[WebSocketMessageType["Unknown"] = 0] = "Unknown";
    WebSocketMessageType[WebSocketMessageType["PiAuthentication"] = 100] = "PiAuthentication";
    WebSocketMessageType[WebSocketMessageType["PiSiteStatus"] = 101] = "PiSiteStatus";
    WebSocketMessageType[WebSocketMessageType["PiSwitchStatusUpdate"] = 102] = "PiSwitchStatusUpdate";
    WebSocketMessageType[WebSocketMessageType["PiLiveSwitches"] = 103] = "PiLiveSwitches";
    WebSocketMessageType[WebSocketMessageType["PiSwitchLiveUpdate"] = 104] = "PiSwitchLiveUpdate";
    WebSocketMessageType[WebSocketMessageType["WebSwitchStatusUpdate"] = 200] = "WebSwitchStatusUpdate";
    WebSocketMessageType[WebSocketMessageType["WebSwitchLiveUpdate"] = 201] = "WebSwitchLiveUpdate";
    WebSocketMessageType[WebSocketMessageType["WebSiteEnquire"] = 202] = "WebSiteEnquire";
    WebSocketMessageType[WebSocketMessageType["WebSwitchOrderUpdate"] = 203] = "WebSwitchOrderUpdate";
    WebSocketMessageType[WebSocketMessageType["WebSwitchTimerUpdate"] = 204] = "WebSwitchTimerUpdate";
    WebSocketMessageType[WebSocketMessageType["WebSwitchSettingUpdate"] = 205] = "WebSwitchSettingUpdate";
    WebSocketMessageType[WebSocketMessageType["Error"] = 400] = "Error";
})(WebSocketMessageType = exports.WebSocketMessageType || (exports.WebSocketMessageType = {}));
//# sourceMappingURL=websocketmessage.model.js.map