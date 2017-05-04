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
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
var WebSocketService = WebSocketService_1 = (function () {
    function WebSocketService(url, protocols, config, binaryType) {
        this.url = url;
        this.protocols = protocols;
        this.config = config;
        this.binaryType = binaryType;
        this.reconnectAttempts = 0;
        this.sendQueue = [];
        this.onOpenCallbacks = [];
        this.onMessageCallbacks = [];
        this.onErrorCallbacks = [];
        this.onCloseCallbacks = [];
        this.readyStateConstants = {
            'CONNECTING': 0,
            'OPEN': 1,
            'CLOSING': 2,
            'CLOSED': 3,
            'RECONNECT_ABORTED': 4
        };
        this.normalCloseCode = 1000;
        this.reconnectableStatusCodes = [4000];
        this.sendMode = WebSocketSendMode.Observable;
        var match = new RegExp('wss?:\/\/').test(url);
        if (!match) {
            throw new Error('Invalid url provided');
        }
        this.config = config || { initialTimeout: 500, maxTimeout: 300000, reconnectIfNotNormalClose: false, clientId: Math.random().toString(36) };
        this.clientId = this.config.clientId;
        this.binaryType = binaryType || "blob";
        this.dataStream = new Subject_1.Subject();
        this.connect(true);
    }
    WebSocketService.prototype.connect = function (force) {
        var _this = this;
        if (force === void 0) { force = false; }
        // console.log("WebSocket connecting...");
        var self = this;
        if (force || !this.socket || this.socket.readyState !== this.readyStateConstants.OPEN) {
            self.socket = this.protocols ? new WebSocket(this.url, this.protocols) : new WebSocket(this.url);
            self.socket.binaryType = self.binaryType.toString();
            self.socket.onopen = function (ev) {
                // console.log('onOpen: ', ev);
                _this.onOpenHandler(ev);
            };
            self.socket.onmessage = function (ev) {
                // console.log('onNext: ', ev.data);
                self.onMessageHandler(ev);
                _this.dataStream.next(ev);
            };
            this.socket.onclose = function (ev) {
                // console.log('onClose ', ev);
                self.onCloseHandler(ev);
            };
            this.socket.onerror = function (ev) {
                // console.log('onError ', ev);
                self.onErrorHandler(ev);
                _this.dataStream.error(ev);
            };
        }
    };
    /**
     * Run in Block Mode
     * Return true when can send and false in socket closed
     * @param data
     * @returns {boolean}
     */
    WebSocketService.prototype.sendDirect = function (data, binary) {
        var self = this;
        if (this.getReadyState() !== this.readyStateConstants.OPEN
            && this.getReadyState() !== this.readyStateConstants.CONNECTING) {
            this.connect();
        }
        self.sendQueue.push({ message: data, binary: binary });
        if (self.socket.readyState === self.readyStateConstants.OPEN) {
            self.fireQueue();
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Return Promise
     * When can Send will resolve Promise
     * When Socket closed will reject Promise
     * @param data
     * @returns {Promise<any>}
     */
    WebSocketService.prototype.sendPromise = function (data, binary) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.sendDirect(data, binary)) {
                return resolve();
            }
            else {
                return reject(Error('Socket connection has been closed'));
            }
        });
    };
    /**
     * Return cold Observable
     * When can Send will complete observer
     * When Socket closed will error observer
     * @param data
     * @returns {Observable<any>}
     */
    WebSocketService.prototype.sendObservable = function (data, binary) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            if (_this.sendDirect(data, binary)) {
                return observer.complete();
            }
            else {
                return observer.error('Socket connection has been closed');
            }
        });
    };
    /**
     * Set send(data) function return mode
     * @param mode
     */
    WebSocketService.prototype.setSendMode = function (mode) {
        this.sendMode = mode;
    };
    /**
     * Use {mode} mode to send {data} data
     * If no specify, Default SendMode is Observable mode
     * @param data
     * @param mode
     * @param binary
     * @returns {any}
     */
    WebSocketService.prototype.send = function (data, mode, binary) {
        switch (typeof mode !== "undefined" ? mode : this.sendMode) {
            case WebSocketSendMode.Direct:
                return this.sendDirect(data, binary);
            case WebSocketSendMode.Promise:
                return this.sendPromise(data, binary);
            case WebSocketSendMode.Observable:
                return this.sendObservable(data, binary);
            default:
                throw Error("WebSocketSendMode Error.");
        }
    };
    WebSocketService.prototype.getDataStream = function () {
        return this.dataStream;
    };
    WebSocketService.prototype.onOpenHandler = function (event) {
        this.reconnectAttempts = 0;
        this.notifyOpenCallbacks(event);
        this.fireQueue();
    };
    WebSocketService.prototype.notifyOpenCallbacks = function (event) {
        for (var i = 0; i < this.onOpenCallbacks.length; i++) {
            this.onOpenCallbacks[i].call(this, event);
        }
    };
    WebSocketService.prototype.fireQueue = function () {
        // console.log("fireQueue()");
        while (this.sendQueue.length && this.socket.readyState === this.readyStateConstants.OPEN) {
            var data = this.sendQueue.shift();
            // console.log("fireQueue: ", data);
            if (data.binary) {
                this.socket.send(data.message);
            }
            else {
                this.socket.send(WebSocketService_1.Helpers.isString(data.message) ? data.message : JSON.stringify(data.message));
            }
        }
    };
    WebSocketService.prototype.notifyCloseCallbacks = function (event) {
        for (var i = 0; i < this.onCloseCallbacks.length; i++) {
            this.onCloseCallbacks[i].call(this, event);
        }
    };
    WebSocketService.prototype.notifyErrorCallbacks = function (event) {
        for (var i = 0; i < this.onErrorCallbacks.length; i++) {
            this.onErrorCallbacks[i].call(this, event);
        }
    };
    WebSocketService.prototype.onOpen = function (cb) {
        this.onOpenCallbacks.push(cb);
        return this;
    };
    ;
    WebSocketService.prototype.onClose = function (cb) {
        this.onCloseCallbacks.push(cb);
        return this;
    };
    WebSocketService.prototype.onError = function (cb) {
        this.onErrorCallbacks.push(cb);
        return this;
    };
    ;
    WebSocketService.prototype.onMessage = function (callback, options) {
        if (!WebSocketService_1.Helpers.isFunction(callback)) {
            throw new Error('Callback must be a function');
        }
        this.onMessageCallbacks.push({
            fn: callback,
            pattern: options ? options.filter : undefined,
            autoApply: options ? options.autoApply : true
        });
        return this;
    };
    WebSocketService.prototype.onMessageHandler = function (message) {
        var self = this;
        var currentCallback;
        for (var i = 0; i < self.onMessageCallbacks.length; i++) {
            currentCallback = self.onMessageCallbacks[i];
            currentCallback.fn.apply(self, [message]);
        }
    };
    ;
    WebSocketService.prototype.onCloseHandler = function (event) {
        this.notifyCloseCallbacks(event);
        if ((this.config.reconnectIfNotNormalClose && event.code !== this.normalCloseCode)
            || this.reconnectableStatusCodes.indexOf(event.code) > -1) {
            this.reconnect();
        }
        else {
            this.sendQueue = [];
            this.dataStream.complete();
        }
    };
    ;
    WebSocketService.prototype.onErrorHandler = function (event) {
        this.notifyErrorCallbacks(event);
    };
    ;
    WebSocketService.prototype.reconnect = function () {
        var _this = this;
        this.close(true);
        var backoffDelay = this.getBackoffDelay(++this.reconnectAttempts);
        // let backoffDelaySeconds = backoffDelay / 1000;
        // console.log('Reconnecting in ' + backoffDelaySeconds + ' seconds');
        setTimeout(function () { return _this.connect(); }, backoffDelay);
        return this;
    };
    WebSocketService.prototype.close = function (force) {
        if (force === void 0) { force = false; }
        if (force || !this.socket.bufferedAmount) {
            this.socket.close(this.normalCloseCode);
        }
        return this;
    };
    ;
    // Exponential Backoff Formula by Prof. Douglas Thain
    // http://dthain.blogspot.co.uk/2009/02/exponential-backoff-in-distributed.html
    WebSocketService.prototype.getBackoffDelay = function (attempt) {
        var R = Math.random() + 1;
        var T = this.config.initialTimeout;
        var F = 2;
        var N = attempt;
        var M = this.config.maxTimeout;
        return Math.floor(Math.min(R * T * Math.pow(F, N), M));
    };
    ;
    WebSocketService.prototype.setInternalState = function (state) {
        if (Math.floor(state) !== state || state < 0 || state > 4) {
            throw new Error('state must be an integer between 0 and 4, got: ' + state);
        }
        this.internalConnectionState = state;
    };
    /**
     * Could be -1 if not initzialized yet
     * @returns {number}
     */
    WebSocketService.prototype.getReadyState = function () {
        if (this.socket == null) {
            return -1;
        }
        return this.internalConnectionState || this.socket.readyState;
    };
    return WebSocketService;
}());
WebSocketService.Helpers = (function () {
    function class_1() {
    }
    class_1.isPresent = function (obj) {
        return obj !== undefined && obj !== null;
    };
    class_1.isString = function (obj) {
        return typeof obj === 'string';
    };
    class_1.isArray = function (obj) {
        return Array.isArray(obj);
    };
    class_1.isFunction = function (obj) {
        return typeof obj === 'function';
    };
    return class_1;
}());
WebSocketService = WebSocketService_1 = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [String, Array, Object, String])
], WebSocketService);
exports.WebSocketService = WebSocketService;
var WebSocketSendMode;
(function (WebSocketSendMode) {
    WebSocketSendMode[WebSocketSendMode["Direct"] = 0] = "Direct";
    WebSocketSendMode[WebSocketSendMode["Promise"] = 1] = "Promise";
    WebSocketSendMode[WebSocketSendMode["Observable"] = 2] = "Observable";
})(WebSocketSendMode = exports.WebSocketSendMode || (exports.WebSocketSendMode = {}));
var WebSocketService_1;
//# sourceMappingURL=websocket.service.js.map