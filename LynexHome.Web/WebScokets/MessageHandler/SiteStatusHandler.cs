using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lynex.Extension;
using LynexHome.ApiModel;
using LynexHome.Core;
using LynexHome.Core.Model;
using LynexHome.Service;
using LynexHome.ViewModel;
using Newtonsoft.Json;

namespace LynexHome.Web.WebScokets.MessageHandler
{
    public class SiteStatusHandler : MessageHandler<SiteStatusModel>
    {
        public SiteStatusHandler(string siteId) : base(siteId)
        {
        }
        protected override string ProcessMessage(SiteStatusModel model)
        {
            var result = new WebSocketResultViewModel();
            using (var dbContext = new LynexDbContext())
            {
                var site = dbContext.Set<Site>().Find(SiteId);

                if (site != null)
                {
                    result.StatusCode = 200;
                    result.Message = "Success";
                    var switches = new List<SimplifiedSwitchModel>();
                    foreach (var @switch in site.Switches)
                    {
                        switches.Add(new SimplifiedSwitchModel(@switch));
                    }
                    result.Result = switches;
                }
                else
                {
                    result.StatusCode = 500;
                    result.Message = "Site does not exist";
                }
            }


            return JsonConvert.SerializeObject(result);
        }

        
    }
}
