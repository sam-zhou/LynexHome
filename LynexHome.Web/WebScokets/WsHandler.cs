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

        public WsHandler(string siteId, bool isRaspberryPi = true)
        {
            _siteId = siteId;
            _isRaspberryPi = isRaspberryPi;
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

            dynamic model = JObject.Parse(message);

            var dictionary = (IDictionary<string, object>) model;

            if (dictionary.ContainsKey("EncryptedSerialNumber") && dictionary.ContainsKey("SiteId"))
            {
                if (dictionary.ContainsKey("ChipId") && dictionary.ContainsKey("Status"))
                {
                    ProcessSwitchUpdate(model);
                }
                else if (dictionary.ContainsKey("Switches"))
                {
                    ProcessSiteStatus(model);
                }
            }
            
        }

        private void ProcessSiteStatus(SiteStatusModel model)
        {

            foreach (var chatClient in ChatClients)
            {
                if (chatClient is WsHandler)
                {
                    var wsHandler = (WsHandler) chatClient;

                    if (!wsHandler.IsRaspberryPi)
                    {
                        wsHandler.Send(JsonConvert.SerializeObject(model.Switches));
                    }
                }
                
            }
            //using (var dbContext =new LynexDbContext())
            //{
            //    var cryptoService = new CryptoService();

            //    var site = dbContext.Set<Site>().Find(model.SiteId);

            //    if (site != null)
            //    {
            //        var decryptedSerialNumber = cryptoService.Decrypt(model.EncryptedSerialNumber, site.Secret);

            //        if (decryptedSerialNumber == site.SerialNumber)
            //        {
            //            foreach (dynamic @switch in model.Switches)
            //            {

            //            }
            //        }
            //    }
            //}
            
        }

        private void ProcessSwitchUpdate(SwitchUpdatedModel model)
        {
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
                }
            }
        }
    }
}
