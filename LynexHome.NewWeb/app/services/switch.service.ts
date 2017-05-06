import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import 'rxjs/add/operator/map';

import { Switch } from '../models/switch.model';
import { Schedule } from '../models/schedule.model';
import { QuerySiteModel } from '../apimodels/querysitemodel.apimodels';

@Injectable()
export class SwitchService {
    switches: Switch[] = [];



    constructor(private apiService: ApiService) {
        
    }

    getSwitches(siteId: string): Promise<Switch[]> {
        let siteQueryModel = new QuerySiteModel();
        siteQueryModel.SiteId = siteId;

        let promise = this.apiService.postData("switch", "get", siteQueryModel)
            .then(response => {
                var results = response.results as Switch[];
                this.switches = results;
                return results;
            });
        return promise;
    };

    updateStatus(switchId: string, status: boolean): Promise<boolean> {
        let updateStatus = {
            SwitchId: switchId,
            Status: status
        };
        return this.apiService.postData("switch", "updateStatus", updateStatus).then(response => response.results);
    };


    updateOrder(switchId: string, order: number, siteId?: string, clientWebSocketId?: string): Promise<any> {

        let updateOrder = {
            SwitchId: switchId,
            Order: order,
            ClientWebSocketId: clientWebSocketId,
            SiteId: siteId
        };

        return this.apiService.postData("switch", "updateOrder", updateOrder);
    }


    getSchedules(switchId: string): Promise<Schedule[]> {
        let scheduleEnquire = {
            SwitchId: switchId
        }
        return this.apiService.postData("switch", "getSchedules", scheduleEnquire).then(response => response.results);
    }

    updateSchedule(schedule: Schedule): Promise<Schedule> {
        let scheduleModel = {
            Id: schedule.id,
            Name: schedule.name,
            StartTime: schedule.startTime,
            Length: schedule.length,
            Monday: schedule.monday,
            Tuesday: schedule.tuesday,
            Wednesday: schedule.wednesday,
            Thursday: schedule.thursday,
            Friday: schedule.friday,
            Saturday: schedule.saturday,
            Sunday: schedule.sunday,
            Frequency: schedule.frequency,
            SwitchId: schedule.switchId,
            STime: {
                Hour: schedule.sTime.hour,
                Minute: schedule.sTime.minute
            },
            ETime: {
                Hour: schedule.eTime.hour,
                Minute: schedule.eTime.minute
            }
        }
        return this.apiService.postData("switch", "updateSchedule", scheduleModel).then(response => response.results);
    }

    deleteSchedule(schedule: Schedule): Promise<any> {
        let scheduleModel = {
            Id: schedule.id,
            Name: schedule.name,
            StartTime: schedule.startTime,
            Length: schedule.length,
            Monday: schedule.monday,
            Tuesday: schedule.tuesday,
            Wednesday: schedule.wednesday,
            Thursday: schedule.thursday,
            Friday: schedule.friday,
            Saturday: schedule.saturday,
            Sunday: schedule.sunday,
            Frequency: schedule.frequency,
            SwitchId: schedule.switchId
        }
        return this.apiService.postData("switch", "deleteSchedule", scheduleModel).then(response => response.results);
    }
}