import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { SwitchService } from '../services/switch.service';
import { Switch } from '../models/switch.model';
import { Schedule, ScheduleFrequency } from '../models/schedule.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { greaterThan } from '../extension/validators';


@Component({
    selector: 'schedule',
    templateUrl: 'views/schedule.component.html',
    styleUrls: [ 'css/schedule.component.css'],
    moduleId: module.id
})
export class ScheduleComponent {

    private selectedSwitch: Switch = null;

    selectedSchedule: Schedule = null;

    schedules: Schedule[] = null;

    isBusy: boolean = false;

    scheduleForm: FormGroup;

    constructor(private switchService: SwitchService, private formBuilder: FormBuilder) {
    }

    @Output() close: EventEmitter<string> = new EventEmitter<string>();

    @Input()
    set currentSwitch(theSwitch: Switch) {
        this.selectedSwitch = theSwitch;
        if (this.selectedSwitch != null) {
            this.init();
        }
    }

    get currentSwitch(): Switch {
        return this.selectedSwitch;
    }

    buildForm(): void {
        this.scheduleForm = this.formBuilder.group({
            'name': [this.selectedSchedule.name, [
                Validators.required,
                Validators.maxLength(20),
            ]
            ],
            'sTime': [this.selectedSchedule.sTime, [
                Validators.required
            ]],
            'eTime': [this.selectedSchedule.eTime, [
                Validators.required
            ]],
            'monday': [this.selectedSchedule.monday],
            'tuesday': [this.selectedSchedule.tuesday],
            'wednesday': [this.selectedSchedule.wednesday],
            'thursday': [this.selectedSchedule.thursday],
            'friday': [this.selectedSchedule.friday],
            'saturday': [this.selectedSchedule.saturday],
            'sunday': [this.selectedSchedule.sunday],
        }, { Validator: greaterThan("sTime","eTime")});

        //this.scheduleForm.valueChanges
        //    .subscribe(data => this.onValueChanged(data));

        //this.onValueChanged(); // (re)set validation messages now
        //console.log(this.selectedSchedule);
    }



    onValueChanged(data?: any) {
        if (!this.scheduleForm) { return; }
        const form = this.scheduleForm;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';

            if (field == "form") {
                if (!form.valid) {
                    const messages = this.validationMessages[field];
                    for (const key in form.errors) {
                        this.formErrors[field] += messages[key] + ' ';
                    }
                }
            } else {
                const control = form.get(field);

                if (control && control.dirty && !control.valid) {
                    const messages = this.validationMessages[field];
                    for (const key in control.errors) {
                        this.formErrors[field] += messages[key] + ' ';
                    }
                }
            }
        }

        if (!form.valid) {


        }
    }

    formErrors = {
        name: '',
        form:'',
        sTime: '',
        eTime: ''
    };

    validationMessages = {
        'name': {
            'required': 'Schedule title is required.',
            'maxlength': 'Schedule title cannot be more than 30 characters long.',
        },
        'sTime': {
            'required': 'You\'ll need to set up a start time',
        },
        'eTime': {
            'required': 'You\'ll need to set up an end time',
            
        },
        'form': {
            'notGreateThan': 'End time must greater than start time',
        }
    };

    toggleRepeat(date: string) {
     
        let oringal: boolean = this.scheduleForm.controls[date].value
        this.scheduleForm.controls[date].setValue(!oringal);
    }

    private init(): void {
        this.switchService.getSchedules(this.selectedSwitch.id).then(response => {
            this.schedules = response;
            
        });
    }

    selectSchedule(schedule: Schedule): void {
        this.selectedSchedule = Object.assign({}, schedule);
        this.buildForm();
    }

    closeDialog(): void {
        this.selectedSchedule = null;
        this.schedules = null;
        this.close.emit('closed');
    }

    addNew(): void {
        this.selectedSchedule = new Schedule();
        this.selectedSchedule.switchId = this.currentSwitch.id;
        this.buildForm();
    }

    save(): void {

        this.isBusy = true;

        this.selectedSchedule.name = this.scheduleForm.controls["name"].value;
        this.selectedSchedule.sTime = (this.scheduleForm.controls["time"] as FormGroup).controls["sTime"].value;
        this.selectedSchedule.eTime = (this.scheduleForm.controls["time"] as FormGroup).controls["eTime"].value;
        this.selectedSchedule.monday = this.scheduleForm.controls["monday"].value;
        this.selectedSchedule.tuesday = this.scheduleForm.controls["tuesday"].value;
        this.selectedSchedule.wednesday = this.scheduleForm.controls["wednesday"].value;
        this.selectedSchedule.thursday = this.scheduleForm.controls["thursday"].value;
        this.selectedSchedule.friday = this.scheduleForm.controls["friday"].value;
        this.selectedSchedule.saturday = this.scheduleForm.controls["saturday"].value;
        this.selectedSchedule.sunday = this.scheduleForm.controls["sunday"].value;


        this.switchService.updateSchedule(this.selectedSchedule, this.selectedSwitch.siteId).then(response => {
            if (this.selectedSchedule.id === 0 || this.selectedSchedule.id === undefined) {
                this.schedules.push(response);
                
            } else {
                for (let i = 0; i < this.schedules.length; i++) {
                    if (this.schedules[i].id === response.id) {
                        this.schedules[i] = response;
                        break;
                    }
                }
            }
            this.isBusy = false;
        });
    }

    delete(): void {
        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this schedule!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(() => {
            console.log("delete", this.selectedSchedule);
            if (this.selectedSchedule.id !== 0 && this.selectedSchedule.id !== undefined) {
                    this.isBusy = true;
                    this.switchService.deleteSchedule(this.selectedSchedule).then(response => {

                        for (let i = 0; i < this.schedules.length; i++) {
                            if (this.schedules[i].id === this.selectedSchedule.id) {
                                this.schedules.splice(i, 1);
                                this.isBusy = false;
                                break;
                            }
                        }
                    });
                } 
                

                this.selectedSchedule = null;
            },
            dismiss => {
                //// dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                //if (dismiss === 'cancel' || dismiss === 'close') {
                //    this.closeDialog();
                //}
            });
    }

    private getNumberTimeString(input: number): string {
        if (input < 10 && input >=0) {
            return "0" + input;
        }
        else if (input > 10) {
            return input.toString();
        }
        return "00";
    }

    updateSwitchActive(schedule: Schedule, event: Event) {
        if (!schedule.isBusy) {
            schedule.isBusy = true;
            this.switchService.updateScheduleActive(schedule.id, schedule.switchId, this.selectedSwitch.siteId, !schedule.active).then(response => {
                for (let i = 0; i < this.schedules.length; i++) {
                    if (this.schedules[i].id === response.id) {
                        this.schedules[i] = response;
                        schedule.isBusy = false;
                        break;
                    }
                }
            });
        }
        event.stopPropagation();
    }

    getTime(schedule: Schedule): string {

        return this.getNumberTimeString(schedule.sTime.hour) + ":" + this.getNumberTimeString(schedule.sTime.minute) + " - " + this.getNumberTimeString(schedule.eTime.hour) + ":" + this.getNumberTimeString(schedule.eTime.minute);
    }

    getDay(): string {
        if (this.scheduleForm && this.scheduleForm !== null && this.scheduleForm.controls) {
            
            let monday = this.scheduleForm.controls["monday"].value;
            let tuesday = this.scheduleForm.controls["tuesday"].value;
            let wednesday = this.scheduleForm.controls["wednesday"].value;
            let thursday = this.scheduleForm.controls["thursday"].value;
            let friday = this.scheduleForm.controls["friday"].value;
            let saturday = this.scheduleForm.controls["saturday"].value;
            let sunday = this.scheduleForm.controls["sunday"].value;

            if (!monday && !tuesday && !wednesday && !thursday && !friday && !saturday && !sunday) {
                return "Once";
            }

            if (monday && tuesday && wednesday && thursday && friday && saturday && sunday) {
                return "Everyday";
            }

            if (monday && tuesday && wednesday && thursday && friday && !saturday && !sunday) {
                return "Weekdays";
            }

            if (!monday && !tuesday && !wednesday && !thursday && !friday && saturday && sunday) {
                return "Weekends";
            }

            return "Weekly";
        }
        
        return "";
        
    }
}
