using System.Collections.Concurrent;

namespace LynexHome.Api.WebScokets
{
    public class WebSocketHandlerManager
    {
        private ConcurrentDictionary<string, WsHandler> _wsHandlers;

        public ConcurrentDictionary<string, WsHandler> WsHandlers
        {
            get
            {
                if (_wsHandlers == null)
                {
                    _wsHandlers = new ConcurrentDictionary<string, WsHandler>();
                }
                return _wsHandlers;
            }
        }

        public WsHandler GetHandler(string siteId)
        {
            if (WsHandlers.ContainsKey(siteId))
            {
                return WsHandlers[siteId];
            }

            var wsHandler = new WsHandler(siteId);
            WsHandlers.TryAdd(siteId, wsHandler);
            return wsHandler;
        }
    }
}
