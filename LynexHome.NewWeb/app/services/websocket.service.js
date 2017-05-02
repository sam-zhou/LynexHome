"use strict";
var Observable_1 = require("rxjs/Observable");
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
core_1.Injectable();
var WebSocketService = (function () {
    function WebSocketService() {
    }
    WebSocketService.prototype.connect = function (url) {
        if (!this.subject) {
            this.subject = this.create(url);
        }
        return this.subject;
    };
    WebSocketService.prototype.create = function (url) {
        var ws = new WebSocket(url);
        var observable = Observable_1.Observable.create(function (obs) {
            ws.onmessage = obs.next.bind(obs);
            ws.onerror = obs.error.bind(obs);
            ws.onclose = obs.complete.bind(obs);
            return ws.close.bind(ws);
        });
        var observer = {
            next: function (data) {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(data));
                }
            },
        };
        return Subject_1.Subject.create(observer, observable);
    };
    return WebSocketService;
}());
exports.WebSocketService = WebSocketService;
//# sourceMappingURL=websocket.service.js.map