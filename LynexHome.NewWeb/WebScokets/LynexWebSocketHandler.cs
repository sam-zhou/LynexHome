using System;
using Microsoft.Web.WebSockets;

namespace LynexHome.NewWeb.WebScokets
{
    public abstract class LynexWebSocketHandler : WebSocketHandler
    {
        private static readonly WebSocketSessionCollection WebSocketSessionCollection = new WebSocketSessionCollection();

        public WebSocketSessionManager WebSocketSession
        {
            get { return GetWebSocketSession(SiteId); }
        }

        public bool IsAuthenticated { get; protected set; }

        public static WebSocketSessionManager GetWebSocketSession(string siteId)
        {
            return WebSocketSessionCollection.GetWebSocketSessionManager(siteId);
        }
        

        private readonly string _siteId;
        private readonly bool _isRaspberryPi;
        private readonly string _clientSessionId;

        public string SiteId
        {
            get { return _siteId; }
        }

        public string ClientSessionId
        {
            get { return _clientSessionId; }
        }

        public bool IsRaspberryPi
        {
            get { return _isRaspberryPi; }
        }

        protected LynexWebSocketHandler(string siteId, bool isRaspberryPi = true)
        {
            _siteId = siteId;
            _isRaspberryPi = isRaspberryPi;
            _clientSessionId = Guid.NewGuid().ToString("N");
        }

        public override void OnOpen()
        {
            WebSocketSession.Add(this);
        }

        public override void OnClose()
        {
            WebSocketSession.Remove(this);
        }

    }
}
