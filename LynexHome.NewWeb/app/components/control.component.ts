import { Component, OnInit } from '@angular/core';
import { SwitchService } from '../services/switch.service';
import { Observable } from 'rxjs/Observable';
import { Switch } from '../models/switch.model';


@Component({
    selector: 'control',
    templateUrl: 'views/control.component.html',
    styleUrls: [ 'css/control.component.css'],
    moduleId: module.id
})
export class ControlComponent implements OnInit {
    switches: Switch[]; 

    constructor(private switchService: SwitchService) {
        
    }


    ngOnInit(): void {
        this.switchService.getSwitches("5735824c-93cc-4016-b6b3-26f7947bb58e").then(response => {
            this.switches = response;
        });
    }
}
