using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LynexHome.Web.WebScokets
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
