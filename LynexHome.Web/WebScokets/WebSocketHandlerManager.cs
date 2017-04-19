using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Web.WebSockets;

namespace LynexHome.Web.WebScokets
{
    public class WebSocketSessionCollection
    {
        private Dictionary<string, WebSocketSessionManager> _webSocketSessionManagers;

        public Dictionary<string, WebSocketSessionManager> WebSocketSessionManagers
        {
            get
            {
                if (_webSocketSessionManagers == null)
                {
                    _webSocketSessionManagers = new Dictionary<string, WebSocketSessionManager>();
                }
                return _webSocketSessionManagers;
            }
        }



        public WebSocketSessionManager GetWebSocketSessionManager(string siteId)
        {
            if (WebSocketSessionManagers.ContainsKey(siteId))
            {
                return WebSocketSessionManagers[siteId];
            }

            var webSocketSessionManager = new WebSocketSessionManager(siteId);
            WebSocketSessionManagers.Add(siteId, webSocketSessionManager);
            return webSocketSessionManager;
        }


    }
}
