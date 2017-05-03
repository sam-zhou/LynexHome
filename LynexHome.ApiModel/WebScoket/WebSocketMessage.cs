namespace LynexHome.ApiModel.WebScoket
{
    public class WebSocketMessage
    {
        public dynamic Message { get; set; }

        public string TypeName {
            get {
                return TypeName.ToString().ToLower();
            }
        }

        public WebSocketMessageType Type { get; set; }

        public WebSocketMessage(WebSocketMessageType type) {
            Type = type;
        }
    }
}
