using LynexHome.ApiModel;
using LynexHome.ApiModel.WebScoket;
using LynexHome.Core;
using LynexHome.Core.Model;
using LynexHome.NewWeb.WebScokets.MessageHandler;
using Newtonsoft.Json;
using System.Data.Entity;

namespace LynexHome.NewWeb.WebScokets
{
    public sealed class ClientWebSocketHandler : LynexWebSocketHandler
    {
        public ClientWebSocketHandler(string siteId)
            : base(siteId, false)
        {
            
        }

        public override void OnMessage(string message)
        {
            var websocketMessage = JsonConvert.DeserializeObject<WebSocketMessage>(message);

            if (websocketMessage != null) {

                var webSwitchMessageHandler = MessageHandlerFactory.GetMessageHandler(websocketMessage.Type, SiteId);
                var result = webSwitchMessageHandler.ProcessMessage(websocketMessage);


                if (result != null) {
                    switch (result.BroadcaseType) {
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
