using LynexHome.ApiModel.WebScoket;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LynexHome.NewWeb.WebScokets.MessageHandler
{
    public interface IWebSocketMessageHandler {
        WebSocketMessage ProcessMessage(WebSocketMessage model); 
    }

    public abstract class WebSocketMessageHandler: IWebSocketMessageHandler
    {
        protected string SiteId { get; private set; }

        protected WebSocketMessageHandler(string siteId)
        {
            SiteId = siteId;
        }


        public abstract WebSocketMessage ProcessMessage(WebSocketMessage model);
    }
}