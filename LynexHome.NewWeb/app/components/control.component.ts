import { Component, OnInit } from '@angular/core';
import { SwitchService } from '../services/switch.service';
import { Switch } from '../models/switch.model';
import { WebSocketMessage, WebSocketMessageType } from '../models/websocketmessage.model';
import { WebSocketService, WebSocketSendMode, WebSocketConfig } from '../services/websocket.service';
import { Subject } from 'rxjs/Rx'

const CHAT_URL = 'ws://home.mylynex.com.au/api/site/websocket?siteId=';

@Component({
    selector: 'control',
    templateUrl: 'views/control.component.html',
    styleUrls: [ 'css/control.component.css'],
    moduleId: module.id
})
export class ControlComponent implements OnInit {
    switches: Switch[]; 

    private webSocketService: WebSocketService = null;
    isBusy: boolean = true;

    constructor(private switchService: SwitchService) {
        
    };


    changeStatus(theSwitch: Switch): void{
        theSwitch.isBusy = true;
        

        let updatingSwitch = Object.assign({}, theSwitch);
        updatingSwitch.status = !updatingSwitch.status;
        let message = new WebSocketMessage();
        message.Message = updatingSwitch;
        message.Type = WebSocketMessageType.WebSwitchStatusUpdate

        this.webSocketService.sendDirect(JSON.stringify(message));
    };

    private HandlerMessage(msg: MessageEvent): void {
        let message = JSON.parse(msg.data);
        console.log(msg.data);

        let webSocketMessage = new WebSocketMessage(message);

        console.log("message received:", webSocketMessage);

        switch (webSocketMessage.Type) {
            case WebSocketMessageType.WebSwitchStatusUpdate:
                for (let i = 0; i < this.switches.length; i++) {
                    if (this.switches[i].id == webSocketMessage.Message.id) {
                        this.switches[i].isBusy = false;
                        this.switches[i].status = webSocketMessage.Message.status;
                    }
                }
                break;
            case WebSocketMessageType.WebSwitchLiveUpdate:
                for (let i = 0; i < this.switches.length; i++) {

                    for (let j = 0; j < webSocketMessage.Message.length; j++) {
                        if (this.switches[i].id == webSocketMessage.Message[j].id) {
                            this.switches[i].status = webSocketMessage.Message[j].status;
                            this.switches[i].live = webSocketMessage.Message[j].live;
                            break;
                        }
                    }
                }
        }
    }

    ngOnInit(): void {
        let self = this;

        this.switchService.getSwitches("5735824c-93cc-4016-b6b3-26f7947bb58e")
            .then(switches => {
                this.switches = switches;
                console.log(switches);
                this.isBusy = false;
            });

        this.webSocketService = new WebSocketService(CHAT_URL + "5735824c-93cc-4016-b6b3-26f7947bb58e", null, {
            initialTimeout: 500,
            maxTimeout: 300000,
            reconnectIfNotNormalClose: true,
        });


        // set received message callback
        this.webSocketService.onMessage(
            (msg: MessageEvent) => {
                this.HandlerMessage(msg);
            },
            { autoApply: false }
        );

        this.webSocketService.setSendMode(WebSocketSendMode.Direct);
    }

}
