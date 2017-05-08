import { Injectable, Inject } from '@angular/core';
import { WebConfig } from '../models/webconfig.model';


@Injectable()
export class SettingsService {
    // We can easily inject the API config using the DI value created when
    //  the application was bootstrapped
    //
    constructor(
        @Inject("web.config") private webConfig: WebConfig
    ) {
        console.log("Injected config:", this.webConfig);
    }
}