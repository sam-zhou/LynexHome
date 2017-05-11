import { Component, Directive, OnInit, Input } from '@angular/core';
import { ScheduleComponent } from './schedule.component';
import { SwitchService } from '../services/switch.service';
import { SiteService } from '../services/site.service';
import { Switch } from '../models/switch.model';
import { Site } from '../models/site.model';
import { WebSocketMessage, WebSocketMessageType } from '../models/websocketmessage.model';
import { WebSocketService, WebSocketSendMode, WebSocketConfig } from '../services/websocket.service';
import { Subject } from 'rxjs/Rx';

@Component({
    selector: 'sitemanager',
    templateUrl: 'views/sitemanager.component.html',
    styleUrls: [ 'css/sitemanager.component.css'],
    moduleId: module.id
})
export class SiteManagerComponent implements OnInit {
    sites: Site[] = [];

    isBusy: boolean = true;

    selectedSite: Site = null;

    constructor(private switchService: SwitchService, private siteService: SiteService) {
        
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

    loadSelectedSite(): void {
        this.isBusy = false;
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
