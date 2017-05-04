using LynexHome.ApiModel.WebScoket;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LynexHome.NewWeb.WebScokets.MessageHandler
{
    public class MessageHandlerFactory
    {
        public static IWebSocketMessageHandler GetMessageHandler(WebSocketMessageType type, string siteId, string userId) {
            switch (type) {
                case WebSocketMessageType.WebSwitchStatusUpdate:
                    return new WebSwitchStatusUpdateHandler(siteId);

                case WebSocketMessageType.WebSwitchOrderUpdate:
                    return new WebSwitchOrderUpdateHandler(siteId, userId);

                case WebSocketMessageType.WebSiteEnquire:
                    return new WebSiteEnquireHandler(siteId);

                case WebSocketMessageType.PiSiteStatus:

                    break;

                case WebSocketMessageType.PiSwitchStatusUpdate:

                    break;
            }

            return null;
        }
    }
}