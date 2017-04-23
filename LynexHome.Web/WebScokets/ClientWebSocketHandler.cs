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
using LynexHome.Web.WebScokets.MessageHandler;
using Microsoft.Ajax.Utilities;
using Microsoft.Web.WebSockets;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace LynexHome.Web.WebScokets
{
    public sealed class ClientWebSocketHandler : LynexWebSocketHandler
    {
        public ClientWebSocketHandler(string siteId)
            : base(siteId, false)
        {
            
        }

        public override void OnMessage(string message)
        {
            var switchUpdatedModel = JsonConvert.DeserializeObject<SwitchUpdatedModel>(message);

            

        }

    }
}
