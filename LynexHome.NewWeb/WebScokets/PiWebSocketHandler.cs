using LynexHome.ApiModel;
using LynexHome.ApiModel.WebScoket;
using LynexHome.NewWeb.WebScokets.MessageHandler;
using LynexHome.ViewModel;
using Newtonsoft.Json;

namespace LynexHome.NewWeb.WebScokets
{
    public sealed class PiWebSocketHandler : LynexWebSocketHandler
    {
        public PiWebSocketHandler(string siteId):base(siteId, true)
        {
            
        }

        public override void OnOpen()
        {
            Send(JsonConvert.SerializeObject(new WebSocketMessage(WebSocketMessageType.Unknown)
            {
                Message = "Welcome Pi"
            }));
            base.OnOpen();
        }

        public override void OnMessage(string message)
        {

            var webSocketMessage = JsonConvert.DeserializeObject<WebSocketMessage>(message);

            if (webSocketMessage != null)
            {

                if (!IsAuthenticated)
                {
                    var handler = new AuthenticationHandler(SiteId);
                    var result = handler.ProcessMessage(webSocketMessage);
                    IsAuthenticated = handler.IsAuthenticated;
                    Send(JsonConvert.SerializeObject(result));
                }
                else
                {
                    var webSwitchMessageHandler = MessageHandlerFactory.GetMessageHandler(webSocketMessage.Type, SiteId);
                    var result = webSwitchMessageHandler.ProcessMessage(webSocketMessage);


                    if (result != null)
                    {
                        switch (result.BroadcastType)
                        {
                            case WebSocketBroadcastType.Pi:
                                WebSocketSession.SendToPi(JsonConvert.SerializeObject(result));
                                break;

                            case WebSocketBroadcastType.Web:
                                WebSocketSession.SendToWeb(JsonConvert.SerializeObject(result));
                                break;

                            case WebSocketBroadcastType.All:
                                WebSocketSession.Broadcast(JsonConvert.SerializeObject(result));
                                break;
                        }
                    }
                }




            }



        }


    }
}
