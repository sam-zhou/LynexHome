import { Deserializable } from "./deserializable.model";

export class Switch extends Deserializable{
    id: string;
    name: string;
    x: number;
    y: number;
    order: number;
    type: number;
    siteId: string;
    iconId: number;
    iconName: string;
    iconUrl: string;
    status: boolean;
    live: boolean;
    isBusy: boolean;
    hasSchedule: boolean;
    chipId: string;
}



export enum SwitchType {
    Unknown = 0,
    Normal = 1,
    PowerMonitoring = 2,
    TempHumMonitoring = 3,
    SafeValtage = 4
}


export class Icon {
    id: number;
    bigImage: string;
    smallImage: string;
}