using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.WebSockets;
using LynexHome.ApiModel;
using LynexHome.Core;
using LynexHome.Core.Model;
using LynexHome.Service;
using LynexHome.ViewModel;
using Microsoft.Ajax.Utilities;
using Microsoft.Web.WebSockets;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace LynexHome.Web.WebScokets
{
    public abstract class LynexWebSocketHandler : WebSocketHandler
    {
        private static readonly WebSocketSessionCollection WebSocketSessionCollection = new WebSocketSessionCollection();

        public WebSocketSessionManager WebSocketSession
        {
            get { return GetWebSocketSession(SiteId); }
        }

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
