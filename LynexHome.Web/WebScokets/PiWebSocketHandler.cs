using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.WebSockets;
using LynexHome.ApiModel;
using LynexHome.Core;
using LynexHome.Core.Model;
using LynexHome.Service;
using LynexHome.ViewModel;
using LynexHome.Web.WebScokets.MessageHandler;
using Microsoft.Ajax.Utilities;
using Microsoft.Web.WebSockets;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace LynexHome.Web.WebScokets
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
                        WebSocketSession.SendToClients(JsonConvert.SerializeObject(siteStatusResult));
                        break;
                    case "switchUpdate":
                        var switchUpdateHandler = new SwitchUpdateHandler(SiteId);
                        switchUpdateHandler.ProcessMessage(message);
                        break;
                }
            }



        }


    }
}
