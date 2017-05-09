import { Component, Input, Output, EventEmitter, OnInit  } from '@angular/core';
import { SwitchService } from '../services/switch.service';
import { Switch, Icon } from '../models/switch.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
    selector: 'switchsetting',
    templateUrl: 'views/switchsetting.component.html',
    styleUrls: [ 'css/switchsetting.component.css'],
    moduleId: module.id
})
export class SwitchSettingComponent implements OnInit {
    private selectedSwitch: Switch;

    isBusy: boolean = false;

    isDirty: boolean = false;

    switchSettingForm: FormGroup;

    readonly icons: Icon[] = [];

    @Output() close: EventEmitter<string> = new EventEmitter<string>();

    @Input()
    set currentSwitch(theSwitch: Switch) {
        this.selectedSwitch = theSwitch;
        this.ngOnInit();
        this.isBusy = false;
        this.isDirty = false;
        
    }

    get currentSwitch(): Switch {
        return this.selectedSwitch;
    }

    constructor(private switchService: SwitchService, private formBuilder: FormBuilder) {
        for (let i = 1; i <= 40; i++) {
            let icon = new Icon();
            icon.id = i;
            icon.bigImage = "/Images/Icons/64x64/" + i + ".png";
            icon.smallImage = "/Images/Icons/32x32/" + i + ".png";

            this.icons.push(icon);
        }
    }

    setIcon(iconId: number) {
        this.switchSettingForm.patchValue({
            iconId: iconId
        });
    }

    buildForm(): void {
        this.switchSettingForm = this.formBuilder.group({
            'name': [this.selectedSwitch.name, [
                Validators.required,
                Validators.maxLength(20),
            ]
            ],
            'type': [this.selectedSwitch.type],
            'iconId': [this.selectedSwitch.iconId],
            'chipId': [this.selectedSwitch.chipId, [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(12),
            ]],
        });

        this.switchSettingForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now
    }

    onValueChanged(data?: any) {
        if (!this.switchSettingForm) { return; }
        const form = this.switchSettingForm;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    formErrors = {
        'name': '',
        'type': '',
        'iconId': '',
        'chipId': ''
    };

    validationMessages = {
        'name': {
            'required': 'Name is required.',
            'maxlength': 'Name cannot be more than 20 characters long.',
        },
        'chipId': {
            'required': 'ChipId is required.',
            'minlength': 'ChipId must be at least 10 characters long.',
            'maxlength': 'ChipId cannot be more than 12 characters long.',
        }
    };

    ngOnInit(): void {
        if (this.selectedSwitch) {
            this.buildForm();
        }
        
    }

    closeDialog(): void {
        this.close.emit('closed');
    }

    save(): void {
        this.isBusy = true;
        this.selectedSwitch.name = this.switchSettingForm.controls["name"].value;
        this.selectedSwitch.type = this.switchSettingForm.controls["type"].value;
        this.selectedSwitch.iconId = this.switchSettingForm.controls["iconId"].value;
        this.selectedSwitch.chipId = this.switchSettingForm.controls["chipId"].value;


        this.switchService.updateSwitch(this.selectedSwitch).then(result => {
            this.currentSwitch = result;
            this.close.emit('saved');
        });
    }
}
