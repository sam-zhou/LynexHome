﻿import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import 'rxjs/add/operator/map';

import { Switch } from '../models/switch.model';
import { QuerySiteModel } from '../apimodels/querysitemodel.apimodels';

@Injectable()
export class SwitchService {
    switches: Switch[] = [];

    constructor(private apiService: ApiService) {
        
    }

    getSwitches(siteId: string): Promise<Switch[]> {
        var siteQueryModel = new QuerySiteModel();
        siteQueryModel.SiteId = siteId;

        var promise = this.apiService.postData("switch", "get", siteQueryModel)
            .then(response => response.results as Switch[]);
        return promise;
    };

    updateStatus(switchId: string, status: boolean): Promise<boolean> {
        var updateStatus = {
            SwitchId: switchId,
            Status: status
        };
        return this.apiService.postData("switch", "updateStatus", updateStatus).then(response => response.results);
    };
}