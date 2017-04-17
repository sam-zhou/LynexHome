using System.Threading;
using Microsoft.Web.WebSockets;

namespace LynexHome.Api.WebScokets
{
    public class WsHandler: WebSocketHandler
    {
        private readonly string _siteId;

        public WsHandler(string siteId)
        {
            _siteId = siteId;
            ConnectedChatClients = new WebSocketCollection();

            var timer = new Timer(DoWork, null, 5000, 1000);
        }

        private void DoWork(object state)
        {
            Send("haha1");
            //ConnectedChatClients.Broadcast("haha");
        }

        public static WebSocketCollection ConnectedChatClients;

        public override void OnOpen()
        {
            base.OnOpen();
            ConnectedChatClients.Add(this);
            Send(_siteId);
        }

        public override void OnClose()
        {
            ConnectedChatClients.Remove(this);
            base.OnClose();
        }
        public override void OnMessage(string message)
        {
            ConnectedChatClients.Broadcast(_siteId + " : " + message );
            base.OnMessage(message);
        }

    }
}
