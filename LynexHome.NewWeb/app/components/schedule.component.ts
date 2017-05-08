import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { SwitchService } from '../services/switch.service';
import { Switch } from '../models/switch.model';
import { Schedule, ScheduleFrequency } from '../models/schedule.model';
import swal from 'sweetalert2';


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

    constructor(private switchService: SwitchService) {
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

    private init(): void {
        this.switchService.getSchedules(this.selectedSwitch.id).then(response => {
            this.schedules = response;
            console.log(this.schedules);
        });
    }

    selectSchedule(schedule: Schedule): void {
        this.selectedSchedule = Object.assign({}, schedule);
        console.log(this.selectedSchedule);
    }

    closeDialog(): void {
        this.selectedSchedule = null;
        this.schedules = null;
        this.close.emit('closed');
    }

    addNew(): void {
        this.selectedSchedule = new Schedule();
        this.selectedSchedule.switchId = this.currentSwitch.id;
    }

    save(theSchedule: Schedule): void {

        this.isBusy = true;

        this.switchService.updateSchedule(theSchedule, this.selectedSwitch.siteId).then(response => {
            if (theSchedule.id === 0 || theSchedule.id === undefined) {
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

    delete(theSchedule: Schedule): void {
        swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this schedule!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(() => {
                console.log("delete", theSchedule);
                if (theSchedule.id !== 0 && theSchedule.id !== undefined) {
                    this.isBusy = true;
                    this.switchService.deleteSchedule(theSchedule).then(response => {

                        for (let i = 0; i < this.schedules.length; i++) {
                            if (this.schedules[i].id === theSchedule.id) {
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

    getDay(schedule: Schedule): string {

        switch (schedule.frequency) {
            case ScheduleFrequency.Once:
                return "Once";
            case ScheduleFrequency.Daily:
                return "Everyday";
            case ScheduleFrequency.Workdays:
                return "Workdays";
            case ScheduleFrequency.Weekends:
                return "Weekends";
            case ScheduleFrequency.Weekly:
                let output = "";
                if (schedule.monday) {
                    output += ",Mon";
                }
                if (schedule.tuesday) {
                    output += ",Tue";
                }
                if (schedule.wednesday) {
                    output += ",Wed";
                }
                if (schedule.thursday) {
                    output += ",Thu";
                }
                if (schedule.friday) {
                    output += ",Fri";
                }
                if (schedule.saturday) {
                    output += ",Sat";
                }
                if (schedule.sunday) {
                    output += ",Sun";
                }
                return output.substring(1);
        }
        return "Unknown";
    }
}
