import { Deserializable } from "./deserializable.model";

export class Schedule {
    id: number;
    frequency: number;
    active: boolean;
    startTime: string;
}