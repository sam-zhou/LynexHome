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
}