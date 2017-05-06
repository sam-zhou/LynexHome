export class Schedule {
    id: number;
    frequency: ScheduleFrequency;
    name: string;
    active: boolean;
    startTime: string;
    length: number;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
    switchId: string;
    sTime: ScheduleTime = new ScheduleTime();
    eTime: ScheduleTime = new ScheduleTime();
}

export class ScheduleTime {
    hour: number = 0;
    minute: number = 0;
}


export enum ScheduleFrequency {
    Once = 1,
    Daily = 2,
    Workdays = 3,
    Weekends = 4,
    Weekly = 10,
    Monthly = 20,
    Quaterly = 25,
    Yearly = 30
}