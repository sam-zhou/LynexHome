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
        return  this.apiService.getData("site", "get")
            .then(response => {
                var results = response.results as Site[];
                this.sites = results;

                

                return results;
            });
    };

    setDefault(siteId: string): Promise<ApiResponse> {
        return this.apiService.postData("site", "SetAsDefault", { SiteId: siteId });
    }

    updateSite(site: any): Promise<Site> {
        return this.apiService.postData("site", "updateSite", site).then(response => response.results);
    }
}