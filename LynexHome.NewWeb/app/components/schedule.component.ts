import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { SwitchService } from '../services/switch.service';
import { Switch } from '../models/switch.model';
import { Schedule, ScheduleFrequency } from '../models/schedule.model';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
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
                Validators.required,
                this.greaterThan
            ]],
            'monday': [this.selectedSchedule.monday],
            'tuesday': [this.selectedSchedule.tuesday],
            'wednesday': [this.selectedSchedule.wednesday],
            'thursday': [this.selectedSchedule.thursday],
            'friday': [this.selectedSchedule.friday],
            'saturday': [this.selectedSchedule.saturday],
            'sunday': [this.selectedSchedule.sunday],
        });

        //this.scheduleForm.valueChanges
        //    .subscribe(data => this.onValueChanged(data));

        //this.onValueChanged(); // (re)set validation messages now
        //console.log(this.selectedSchedule);
    }

    greaterThan(control: AbstractControl): ValidationErrors | null{

        if (control && control.parent) {
            if (control.value && control.parent.get("sTime").value) {
                let sH = control.parent.get("sTime").value.hour;
                let sM = control.parent.get("sTime").value.minute;
                let eH = control.value.hour;
                let eM = control.value.minute;

                if (eH < sH || (eH == sH && eM <= sM)) {
                    return {
                        greaterThan: true
                    }
                }

            }
        }


        return null;

    }

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
        if (this.scheduleForm.valid) {
            this.isBusy = true;

            this.selectedSchedule.name = this.scheduleForm.get("name").value;
            this.selectedSchedule.sTime = this.scheduleForm.get("sTime").value;
            this.selectedSchedule.eTime = this.scheduleForm.get("eTime").value;
            this.selectedSchedule.monday = this.scheduleForm.get("monday").value;
            this.selectedSchedule.tuesday = this.scheduleForm.get("tuesday").value;
            this.selectedSchedule.wednesday = this.scheduleForm.get("wednesday").value;
            this.selectedSchedule.thursday = this.scheduleForm.get("thursday").value;
            this.selectedSchedule.friday = this.scheduleForm.get("friday").value;
            this.selectedSchedule.saturday = this.scheduleForm.get("saturday").value;
            this.selectedSchedule.sunday = this.scheduleForm.get("sunday").value;


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

    private getDayFromBoolean(monday: boolean, tuesday: boolean, wednesday: boolean, thursday: boolean, friday: boolean, saturday: boolean, sunday: boolean): string {

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


    getDayFromSchedule(schedule: Schedule): string {

        return this.getDayFromBoolean(schedule.monday, schedule.tuesday, schedule.wednesday, schedule.thursday, schedule.friday, schedule.saturday, schedule.sunday);
    }


    getDayFromForm(): string {
        if (this.scheduleForm && this.scheduleForm !== null && this.scheduleForm.controls) {
            
            let monday = this.scheduleForm.controls["monday"].value;
            let tuesday = this.scheduleForm.controls["tuesday"].value;
            let wednesday = this.scheduleForm.controls["wednesday"].value;
            let thursday = this.scheduleForm.controls["thursday"].value;
            let friday = this.scheduleForm.controls["friday"].value;
            let saturday = this.scheduleForm.controls["saturday"].value;
            let sunday = this.scheduleForm.controls["sunday"].value;

            return this.getDayFromBoolean(monday, tuesday, wednesday, thursday, friday, saturday, sunday);
        }
        
        return "";
    }
}
