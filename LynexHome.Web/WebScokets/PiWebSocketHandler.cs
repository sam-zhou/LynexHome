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
    public sealed class PiWebSocketHandler : LynexWebSocketHandler
    {
        public PiWebSocketHandler(string siteId):base(siteId, true)
        {
            
        }

        public override void OnMessage(string message)
        {
            var switchUpdatedModel = JsonConvert.DeserializeObject<SwitchUpdatedModel>(message);

            if (switchUpdatedModel.ChipId != null)
            {
                ProcessSwitchUpdate(switchUpdatedModel);
            }
            else
            {
                var siteStatusModel = JsonConvert.DeserializeObject<SiteStatusModel>(message);

                if (siteStatusModel.Switches != null && siteStatusModel.Switches.Any())
                {
                    ProcessSiteStatus(siteStatusModel);
                }
            }

        }

        private void ProcessSiteStatus(SiteStatusModel model)
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
                        WebSocketSession.SendToClients(JsonConvert.SerializeObject(model.Switches));
                    }
                }
            }            
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
