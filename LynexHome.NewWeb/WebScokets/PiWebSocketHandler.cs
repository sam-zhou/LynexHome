using LynexHome.ApiModel;
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
            Send(JsonConvert.SerializeObject(new WebSocketResultViewModel
            {
                StatusCode = 100,
                Message = "Welcome Pi"
            }));
            base.OnOpen();
        }

        public override void OnMessage(string message)
        {

            if (!IsAuthenticated)
            {
                var handler = new AuthenticationHandler(SiteId);
                var result = handler.ProcessMessage(message);
                IsAuthenticated = handler.IsAuthenticated;
                Send(result);
            }
            else 
            {
                var authen = JsonConvert.DeserializeObject<PiRequestModel>(message);
                switch (authen.RequestType)
                {
                    case "siteStatus":
                        var siteStatusHandler =  new SiteStatusHandler(SiteId);
                        var siteStatusResult = siteStatusHandler.ProcessMessage(message);
                        Send(siteStatusResult);
                        break;
                    case "switchUpdate":
                        var switchUpdateHandler = new SwitchUpdateHandler(SiteId);
                        var result = switchUpdateHandler.ProcessMessage(message);
                        WebSocketSession.SendToWeb(result);
                        break;
                    case "liveSwtiches":
                        WebSocketSession.SendToWeb(message);
                        break;
                }
            }



        }


    }
}
