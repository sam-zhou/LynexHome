﻿namespace LynexHome.ApiModel.WebScoket
{
    public class WebSocketMessage
    {
        public dynamic Message { get; set; }

        public WebSocketMessageType Type { get; set; }

        public WebSocketBroadcastType BroadcastType { get; set; }

        public string ClientId { get; set; }

        public WebSocketMessage(WebSocketMessageType type) {
            Type = type;
        }                                                               
    }
}
