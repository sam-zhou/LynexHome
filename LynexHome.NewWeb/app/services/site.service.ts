import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ApiResponse } from '../models/apiresponse.model';
import 'rxjs/add/operator/map';

import { Site } from '../models/site.model';
import { QuerySiteModel } from '../apimodels/querysitemodel.apimodels';

@Injectable()
export class SiteService {
    sites: Site[] = [];


    constructor(private apiService: ApiService) {
        
    }

    getSites(): Promise<Site[]> {

        var promise = this.apiService.getData("site", "get")
            .then(response => {
                var results = response.results as Site[];
                this.sites = results;

                

                return results;
            });
        return promise;
    };

    setDefault(siteId: string): Promise<ApiResponse> {
        var promise = this.apiService.postData("site", "SetAsDefault", { SiteId: siteId })
        return promise;
    }
}