import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebSocketService } from './websocket.service';
import 'rxjs/add/operator/map';

import { Switch } from '../models/switch.model';
import { QuerySiteModel } from '../apimodels/querysitemodel.apimodels';

const CHAT_URL = 'ws://home.mylynex.com.au/api/site/websocket?siteId=';

export interface Message {
    requestType: string;
    liveSwitches: any;
}

@Injectable()
export class SiteWebSocketService {
    public messages: Subject<Message>;

    constructor(private webSocketService: WebSocketService) {

        
    }


    create(siteId: string): void {
        this.messages = <Subject<Message>>(this.webSocketService)
            .connect(CHAT_URL + siteId)
            .map((response: MessageEvent): Message => {
                let data = JSON.parse(response.data);
                console.log(response.data);
                return {
                    requestType: data.requestType,
                    liveSwitches: data.liveSwitches,
                }
            });
    }
}