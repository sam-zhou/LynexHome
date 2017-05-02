import { Component, OnInit } from '@angular/core';
import { SwitchService } from '../services/switch.service';
import { Switch } from '../models/switch.model';
import { SiteWebSocketService, Message } from '../services/sitewebsocket.service';
import { Subject } from 'rxjs/Rx'

@Component({
    selector: 'control',
    templateUrl: 'views/control.component.html',
    styleUrls: [ 'css/control.component.css'],
    moduleId: module.id
})
export class ControlComponent implements OnInit {
    switches: Switch[]; 
    private messages: Message[] = new Array();

    isBusy: boolean = true;

    constructor(private switchService: SwitchService, private siteWebSocketService: SiteWebSocketService) {
        
    };


    changeStatus(theSwitch: Switch): void{
        theSwitch.isBusy = true;
        this.switchService.updateStatus(theSwitch.id, !theSwitch.status).then(response => {
            theSwitch.status = response;
            theSwitch.isBusy = false;
        });
    };


    ngOnInit(): void {
        this.switchService.getSwitches("5735824c-93cc-4016-b6b3-26f7947bb58e")
            .then(switches => {
                this.switches = switches;
                console.log(switches);
                this.isBusy = false;
            });
        this.siteWebSocketService.create("5735824c-93cc-4016-b6b3-26f7947bb58e");
        this.siteWebSocketService.messages.subscribe(msg => {
            this.messages.push(msg);
            console.log(msg);
        });
        //this.websocketService.connect("ws://home.mylynex.com.au/site/websocket").
    }
}
