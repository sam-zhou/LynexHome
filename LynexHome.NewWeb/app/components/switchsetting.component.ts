import { Component, Input, Output, EventEmitter, OnInit  } from '@angular/core';
import { SwitchService } from '../services/switch.service';
import { Switch, Icon } from '../models/switch.model';

@Component({
    selector: 'switchsetting',
    templateUrl: 'views/switchsetting.component.html',
    styleUrls: [ 'css/switchsetting.component.css'],
    moduleId: module.id
})
export class SwitchSettingComponent implements OnInit {
    private selectedSwitch: Switch;

    updatingSwitch: Switch;

    isBusy: boolean = false;

    readonly icons: Icon[] = [];

    @Output() close: EventEmitter<string> = new EventEmitter<string>();

    @Input()
    set currentSwitch(theSwitch: Switch) {
        this.selectedSwitch = theSwitch;
        if (theSwitch == null) {
            this.updatingSwitch = null;
        }
        else {
            this.updatingSwitch = Object.assign({}, this.selectedSwitch);
        }
        this.isBusy = false;
        this.ngOnInit();
    }

    get currentSwitch(): Switch {
        return this.selectedSwitch;
    }

    constructor(private switchService: SwitchService) {
        for (let i = 1; i <= 40; i++) {
            let icon = new Icon();
            icon.id = i;
            icon.bigImage = "/Images/Icons/64x64/" + i + ".png";
            icon.smallImage = "/Images/Icons/32x32/" + i + ".png";

            this.icons.push(icon);
        }
    }

    ngOnInit(): void {
        
    }

    closeDialog(): void {
        this.close.emit('closed');
    }

    save(): void {
        this.isBusy = true;

        this.switchService.updateSwitch(this.updatingSwitch).then(result => {
            this.updatingSwitch = result;
            this.currentSwitch = result;
            this.close.emit('saved');
        });

        

    }
}
