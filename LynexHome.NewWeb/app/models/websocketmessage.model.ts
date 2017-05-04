import { Deserializable } from "./deserializable.model";

export class WebSocketMessage{
    Message: any;
    Type: WebSocketMessageType;
    BroadcastType: WebSocketBroadcastType;
    ClientId: string;

    constructor(json?: any) {
        if (json) {
            this.Message = json.Message;
            this.Type = json.Type;
            this.BroadcastType = json.BroadcastType;
            this.ClientId = json.ClientId;
        }
    }
}

export enum WebSocketBroadcastType {
    None = 0,
    All = 1,
    Pi = 2,
    Web = 3,
}

export enum WebSocketMessageType {
    WebSwitchStatusUpdate = 200,
    WebSwitchLiveUpdate = 201,
    WebSiteEnquire = 202,
    WebSwitchOrderUpdate = 203,
    WebSwitchTimerUpdate = 204,
    WebSwitchSettingUpdate = 205
}