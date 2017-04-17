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

namespace LynexHome.Web.WebScokets
{
    public class WsHandler : WebSocketHandler
    {
        private static readonly Dictionary<string, WebSocketCollection> Collections = new Dictionary<string, WebSocketCollection>();

        public static WebSocketCollection GetWebSocketCollectionBySiteId(string siteId)
        {
            if (Collections.ContainsKey(siteId))
            {
                return Collections[siteId];
            }

            return null;
        }

        private  WebSocketCollection ChatClients
        {
            get
            {
                var clients = GetWebSocketCollectionBySiteId(SiteId);

                if (clients == null)
                {
                    clients = new WebSocketCollection();
                    Collections.Add(SiteId, clients);
                }
                
                return clients;
            }
        }
        

        private readonly string _siteId;

        private readonly string _clientSessionId;

        public string SiteId
        {
            get { return _siteId; }
        }

        public string ClientSessionId
        {
            get { return _clientSessionId; }
        }

        public WsHandler(string siteId)
        {
            _siteId = siteId;

            _clientSessionId = Guid.NewGuid().ToString("N");
        }

        public override void OnOpen()
        {
            ChatClients.Add(this);
        }

        public override void OnClose()
        {
            ChatClients.Remove(this);
        }

        public override void OnMessage(string message)
        {
            

            var model = JsonConvert.DeserializeObject<SwitchUpdatedModel>(message);

            using (var dbContext = new LynexDbContext())
            {
                var cryptoService = new CryptoService();

                var site = dbContext.Set<Site>().Find(model.SiteId);


                if (site != null)
                {
                    var decryptedSerialNumber = cryptoService.Decrypt(model.EncryptedSerialNumber, site.Secret);

                    if (decryptedSerialNumber == site.SerialNumber)
                    {
                        var items =
                            dbContext.Set<SwitchEvent>()
                                .Where(q => q.SiteId == site.Id && q.Switch.ChipId == model.ChipId && q.Status == model.Status).ToList();

                        dbContext.Set<SwitchEvent>().RemoveRange(items);
                        dbContext.SaveChanges();
                    }
                    else
                    {
                        
                    }
                }

                
            }
        }
    }
}
