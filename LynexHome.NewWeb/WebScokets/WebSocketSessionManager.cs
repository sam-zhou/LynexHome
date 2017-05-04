using System.Linq;
using Microsoft.Web.WebSockets;

namespace LynexHome.NewWeb.WebScokets
{
    public class WebSocketSessionManager
    {
        private readonly string _siteId;
        private WebSocketCollection _piCollection;

        private WebSocketCollection _clientCollection;

        public WebSocketCollection PiCollection
        {
            get
            {
                if (_piCollection == null)
                {
                    _piCollection = new WebSocketCollection();
                }
                return _piCollection;
            }
        }

        public WebSocketCollection ClientCollection
        {
            get
            {
                if (_clientCollection == null)
                {
                    _clientCollection = new WebSocketCollection();
                }
                return _clientCollection;
            }
        }

        public string SiteId
        {
            get { return _siteId; }
        }

        public WebSocketSessionManager(string siteId)
        {
            _siteId = siteId;
        }

        public void SendToWeb(string message)
        {
            ClientCollection.Broadcast(message);
        }

        public void SendToPi(string message)
        {
            PiCollection.Broadcast(message);
        }

        public void Broadcast(string message)
        {
            ClientCollection.Broadcast(message);
            PiCollection.Broadcast(message);
        }

        public void Add(LynexWebSocketHandler webSocketHandler)
        {
            if (webSocketHandler is PiWebSocketHandler)
            {
                if (PiCollection.Any())
                {
                    var tempCollection = PiCollection.ToList();
                    foreach (var socketHandler in tempCollection)
                    {
                        socketHandler.Close();
                    }
                    PiCollection.Clear();
                }
                PiCollection.Add(webSocketHandler);
            }
            else if(webSocketHandler is ClientWebSocketHandler)
            {
                ClientCollection.Add(webSocketHandler);
            }
        }

        public void Remove(LynexWebSocketHandler webSocketHandler)
        {
            if (webSocketHandler is PiWebSocketHandler)
            {
                PiCollection.Remove(webSocketHandler);
            }
            else if (webSocketHandler is ClientWebSocketHandler)
            {
                ClientCollection.Remove(webSocketHandler);
            }
        }
    }
}