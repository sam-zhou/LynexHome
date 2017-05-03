"use strict";
var WebSocketMessage = (function () {
    function WebSocketMessage(message, type) {
        this.message = message;
        this.type = type;
    }
    return WebSocketMessage;
}());
exports.WebSocketMessage = WebSocketMessage;
var WebSocketMessageType;
(function (WebSocketMessageType) {
    WebSocketMessageType[WebSocketMessageType["WebSwitchStatusUpdate"] = 200] = "WebSwitchStatusUpdate";
    WebSocketMessageType[WebSocketMessageType["WebSwitchLiveUpdate"] = 201] = "WebSwitchLiveUpdate";
    WebSocketMessageType[WebSocketMessageType["WebSiteEnquire"] = 202] = "WebSiteEnquire";
})(WebSocketMessageType = exports.WebSocketMessageType || (exports.WebSocketMessageType = {}));
//# sourceMappingURL=websocketmessage.model.js.map