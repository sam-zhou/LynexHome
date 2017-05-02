import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import 'rxjs/add/operator/map';

import { Switch } from '../models/switch.model';
import { QuerySiteModel } from '../apimodels/querysitemodel.apimodels';

@Injectable()
export class SwitchService {
    constructor(private apiService: ApiService) {
        
    }

    getSwitches(siteId: string): Promise<Switch[]> {
        var siteQueryModel = new QuerySiteModel();
        siteQueryModel.SiteId = siteId;

        var promise = this.apiService.postData("switch", "get", siteQueryModel)
            .then(response => response.results as Switch[]);
        return promise;
    };
}