export class WebSocketMessage {
    message: any;
    type: WebSocketMessageType;

    constructor(message: any, type: WebSocketMessageType) {
        this.message = message;
        this.type = type;
    }
}

export enum WebSocketMessageType {
    WebSwitchStatusUpdate = 200,
    WebSwitchLiveUpdate = 201,
    WebSiteEnquire = 202,
}