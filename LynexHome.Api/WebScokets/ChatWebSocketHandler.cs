using Microsoft.Web.WebSockets;

namespace LynexHome.Api.WebScokets
{
    public class RaspberryPiWebSocketHandler : WebSocketHandler
    {
        private static readonly WebSocketCollection _chatClients = new WebSocketCollection();
        private string _username;

        public RaspberryPiWebSocketHandler(string username)
        {
            _username = username;
        }

        public override void OnOpen()
        {
            _chatClients.Add(this);
        }

        public override void OnMessage(string message)
        {
            _chatClients.Broadcast(_username + ": " + message);
        }
    }
}
