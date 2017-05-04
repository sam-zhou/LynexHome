using LynexHome.ApiModel.WebScoket;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LynexHome.NewWeb.WebScokets.MessageHandler
{
    public class MessageHandlerFactory
    {
        public static IWebSocketMessageHandler GetMessageHandler(WebSocketMessageType type, string siteId) {
            switch (type) {
                case WebSocketMessageType.WebSwitchStatusUpdate:
                    return new WebSwitchUpdateHandler(siteId);

                case WebSocketMessageType.PiAuthentication:

                    break;
                case WebSocketMessageType.PiSiteStatus:

                    break;

                case WebSocketMessageType.PiSwitchStatusUpdate:

                    break;
            }

            return null;
        }
    }
}