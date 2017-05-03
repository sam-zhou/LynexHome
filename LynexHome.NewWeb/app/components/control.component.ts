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
        //this.switchService.updateStatus(theSwitch.id, !theSwitch.status).then(response => {
        //    theSwitch.status = response;
        //    theSwitch.isBusy = false;
        //});

        let updatingSwitch = Object.assign({}, theSwitch);
        updatingSwitch.status = !updatingSwitch.status;
        let message = new WebSocketMessage(updatingSwitch, WebSocketMessageType.WebSwitchStatusUpdate);
        this.webSocketService.sendDirect(JSON.stringify(message));
    };


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
                console.log("received message: ", msg.data);
            },
            { autoApply: false }
        );

        this.webSocketService.setSendMode(WebSocketSendMode.Direct);
    }
}
