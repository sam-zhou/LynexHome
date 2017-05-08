import { Component, Directive, OnInit, Input } from '@angular/core';
import { ScheduleComponent } from './schedule.component';
import { SwitchService } from '../services/switch.service';
import { SiteService } from '../services/site.service';
import { Switch } from '../models/switch.model';
import { Site } from '../models/site.model';
import { WebSocketMessage, WebSocketMessageType } from '../models/websocketmessage.model';
import { WebSocketService, WebSocketSendMode, WebSocketConfig } from '../services/websocket.service';
import { Subject } from 'rxjs/Rx';


const CHAT_URL = 'wss://home.lynex.com.au/api/site/websocket?siteId=';

@Component({
    selector: 'control',
    templateUrl: 'views/control.component.html',
    styleUrls: [ 'css/control.component.css'],
    moduleId: module.id
})
export class ControlComponent implements OnInit {
    switches: Switch[] = []; 

    sites: Site[] = [];

    selectedSite: Site = null;

    selectedSwitch: Switch = null;

    @Input() selectedSetting: Switch = null;

    disableOrder = false;

    private webSocketService: WebSocketService = null;
    isBusy: boolean = true;

    constructor(private switchService: SwitchService, private siteService: SiteService) {
        
    }


    changeStatus(theSwitch: Switch): void{
        if (!theSwitch.isBusy && theSwitch.live) {
            theSwitch.isBusy = true;
            let updatingSwitch = Object.assign({}, theSwitch);
            updatingSwitch.status = !updatingSwitch.status;
            let message = new WebSocketMessage();
            message.Message = updatingSwitch;
            message.Type = WebSocketMessageType.WebSwitchStatusUpdate;
            message.ClientId = this.webSocketService.clientId;
            this.webSocketService.sendDirect(JSON.stringify(message));
        }
    };

    sort(theSwitch: Switch, index: number): void {
        if (!theSwitch.isBusy) {
            theSwitch.isBusy = true;

            this.switchService.updateOrder(theSwitch.id, index, this.selectedSite.id, this.webSocketService.clientId).then(response => {
                if (response.success) {
                    theSwitch.isBusy = false;
                    for (let i = 0; i < this.switches.length; i++) {
                        this.switches[i].order = i;
                    }
                }
            });

            //let message = new WebSocketMessage();
            //message.Message = {
            //    id: theSwitch.id,
            //    order: index,
            //    clientId = this.webSocketService.clientId
            //};
            //message.ClientId = this.webSocketService.clientId;
            //for (let i = 0; i < this.switches.length; i++) {
            //    this.switches[i].order = i;
            //}

            //message.Type = WebSocketMessageType.WebSwitchOrderUpdate;
            //this.webSocketService.sendDirect(JSON.stringify(message));
        }
    }

    private handlerMessage(msg: MessageEvent): void {
        let message = JSON.parse(msg.data);
        console.log(msg.data);

        let webSocketMessage = new WebSocketMessage(message);

        console.log("message received:", webSocketMessage);

        switch (webSocketMessage.Type) {
            case WebSocketMessageType.WebSwitchStatusUpdate:
                for (let i = 0; i < this.switches.length; i++) {
                    if (this.switches[i].id === webSocketMessage.Message.id) {
                        this.switches[i].isBusy = false;
                        this.switches[i].status = webSocketMessage.Message.status;
                        break;
                    }
                }
                break;
            case WebSocketMessageType.PiSwitchStatusUpdate:
                for (let i = 0; i < this.switches.length; i++) {
                    if (this.switches[i].id === webSocketMessage.Message.Id) {
                        this.switches[i].status = webSocketMessage.Message.Status;
                        break;
                    }
                }
                break;
            case WebSocketMessageType.WebSwitchLiveUpdate:
                for (let i = 0; i < this.switches.length; i++) {

                    for (let j = 0; j < webSocketMessage.Message.length; j++) {
                        if (this.switches[i].id === webSocketMessage.Message[j].id) {
                            this.switches[i].status = webSocketMessage.Message[j].status;
                            this.switches[i].live = webSocketMessage.Message[j].live;
                            break;
                        }
                    }
                }
                break;
            case WebSocketMessageType.WebSwitchOrderUpdate:
                if (this.webSocketService.clientId !== webSocketMessage.ClientId) {
                    this.disableOrder = true;
                }
                else {
                    for (let i = 0; i < this.switches.length; i++) {
                        if (this.switches[i].id === webSocketMessage.Message.id) {
                            this.switches[i].isBusy = false;
                            break;
                        }
                    }
                }

                break;
            case WebSocketMessageType.PiLiveSwitches:
                for (let i = 0; i < this.switches.length; i++) {
                    this.switches[i].live = false;
                    for (let j = 0; j < webSocketMessage.Message.length; j++) {
                        if (this.switches[i].id === webSocketMessage.Message[j].Id) {
                            this.switches[i].live = webSocketMessage.Message[j].Live;
                            break;
                        }
                    }
                }
                break;
            case WebSocketMessageType.PiSwitchLiveUpdate:
                for (let i = 0; i < this.switches.length; i++) {
                    if (this.switches[i].id === webSocketMessage.Message.SwitchId) {
                        this.switches[i].live = webSocketMessage.Message.Live;
                        break;
                    }
                }
                break;
        }
    }

    getSiteName(): string {
        if (this.selectedSite) {
            var suffix = this.selectedSite.isDefault ? "(Default)" : "";
            return this.selectedSite.name + suffix;
        }
        return "Please Select";
    }

    selectSite(site: Site): void {
        this.isBusy = true;
        this.selectedSite = site;
        this.loadSelectedSite();
    }

    setDefault(): void {
        if (this.selectedSite) {
            this.isBusy = true;
            this.siteService.setDefault(this.selectedSite.id).then(response => {
                if (response.success) {
                    for (let i = 0; i < this.sites.length; i++) {
                        if (this.sites[i].id === this.selectedSite.id) {
                            this.sites[i].isDefault = true;
                        } else {
                            this.sites[i].isDefault = false;
                        }
                    }
                }

                this.isBusy = false;
            });
        }
    }

    switchSchedule(event: Event, theSwitch: Switch): void {
        event.stopPropagation();
        this.selectedSwitch = theSwitch;
    }

    onCloseSchedule(event: Event): void {
        this.selectedSwitch = null;
    }

    
    onCloseSetting(event: Event): void {

        if (event.toString() == "saved") {
            this.isBusy = true;
            this.loadSelectedSite();
        }
        

        this.selectedSetting = null;
    }

    switchSetting(event: Event, theSwitch: Switch): void {
        event.stopPropagation();
        this.selectedSetting = theSwitch;
    }

    private loadSelectedSite(): void {
        if (this.webSocketService) {
             this.webSocketService.close();
        }

        if (this.selectedSite && this.selectedSite !== null) {
            this.switchService.getSwitches(this.selectedSite.id)
                .then(switches => {
                    this.switches = switches;
                    console.log("get switches:",this.switches);
                    this.webSocketService = new WebSocketService(CHAT_URL + this.selectedSite.id, null, {
                        initialTimeout: 500,
                        maxTimeout: 300000,
                        reconnectIfNotNormalClose: true,
                        clientId: Math.random().toString(36)
                    });

                    // set received message callback
                    this.webSocketService.onMessage(
                        (msg: MessageEvent) => {
                            this.handlerMessage(msg);
                        },
                        { autoApply: false }
                    );

                    this.webSocketService.setSendMode(WebSocketSendMode.Direct);

                    let message = new WebSocketMessage();
                    message.Type = WebSocketMessageType.WebSiteEnquire;
                    message.ClientId = this.webSocketService.clientId;
                    this.webSocketService.sendDirect(JSON.stringify(message));

                    this.isBusy = false;
                });
        }
    }


    ngOnInit(): void {
        let self = this;


        this.siteService.getSites().then(sites => {
            this.sites = sites;
            console.log(sites);
            for (let i = 0; i < this.sites.length; i++) {
                if (this.sites[i].isDefault) {
                    this.selectedSite = this.sites[i];

                    this.loadSelectedSite();
                    break;
                }
            }
        });

        
    }

}
