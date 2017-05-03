import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebSocketService, WebSocketSendMode, WebSocketConfig } from './websocket.service';
import 'rxjs/add/operator/map';

import { Switch } from '../models/switch.model';
import { QuerySiteModel } from '../apimodels/querysitemodel.apimodels';

const CHAT_URL = 'ws://home.mylynex.com.au/api/site/websocket?siteId=';

export interface Message {
    type: string;
    typeName: string;
    message: any;
}

@Injectable()
export class SiteWebSocketService {

    private webSocketService: WebSocketService = null;

    private onMessageCallbacks: Array<any> = [];

    constructor(siteId: string) {
        let self = this;

        this.webSocketService = new WebSocketService(CHAT_URL + siteId, null,  {
            initialTimeout: 500,
            maxTimeout: 300000,
            reconnectIfNotNormalClose: true,
        });

        // set received message callback
        this.webSocketService.onMessage(
            (msg: MessageEvent) => {
                self.onMessageHandler(msg);
            },
            { autoApply: false }
        );

        // set received message stream
        this.webSocketService.getDataStream().subscribe(
            (msg) => {
                
                console.log("next", msg.data);
            },
            (msg) => {
                console.log("error", msg);
            },
            () => {
                console.log("complete");
            }
        );

        this.webSocketService.setSendMode(WebSocketSendMode.Direct);

    }

    onMessage(callback: any) {
        if (typeof callback !== 'function') {
            throw new Error('Callback must be a function');
        }

        this.onMessageCallbacks.push(callback);
        return this;
    }


    onMessageHandler(message: MessageEvent) {
        let self = this;
        let currentCallback;

        for (let i = 0; i < self.onMessageCallbacks.length; i++) {
            currentCallback = self.onMessageCallbacks[i];
            currentCallback.fn.apply(self, message.data);
        }


        console.log("onMessage ", message.data);
    };
}