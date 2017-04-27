using System.Collections.Generic;

namespace LynexHome.NewWeb.WebScokets
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
