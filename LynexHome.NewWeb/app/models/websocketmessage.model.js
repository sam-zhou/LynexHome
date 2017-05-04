"use strict";
var WebSocketMessage = (function () {
    function WebSocketMessage(json) {
        if (json) {
            this.Message = json.Message;
            this.Type = json.Type;
            this.BroadcastType = json.BroadcastType;
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
    WebSocketMessageType[WebSocketMessageType["WebSwitchStatusUpdate"] = 200] = "WebSwitchStatusUpdate";
    WebSocketMessageType[WebSocketMessageType["WebSwitchLiveUpdate"] = 201] = "WebSwitchLiveUpdate";
    WebSocketMessageType[WebSocketMessageType["WebSiteEnquire"] = 202] = "WebSiteEnquire";
})(WebSocketMessageType = exports.WebSocketMessageType || (exports.WebSocketMessageType = {}));
//# sourceMappingURL=websocketmessage.model.js.map