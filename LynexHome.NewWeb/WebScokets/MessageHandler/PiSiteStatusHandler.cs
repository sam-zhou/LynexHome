using System.Collections.Generic;
using System.Linq;
using LynexHome.ApiModel;
using LynexHome.ApiModel.WebScoket;
using LynexHome.Core;
using LynexHome.Core.Model;
using LynexHome.ViewModel;
using Newtonsoft.Json;

namespace LynexHome.NewWeb.WebScokets.MessageHandler
{
    public class PiSiteStatusHandler : WebSocketMessageHandler
    {
        public PiSiteStatusHandler(string siteId) : base(siteId)
        {

        }

        public override WebSocketMessage ProcessMessage(WebSocketMessage model)
        {
            using (var dbContext = new LynexDbContext())
            {
                var site = dbContext.Set<Site>().Find(SiteId);

                if (site != null)
                {
                    var switches = new List<SimplifiedSwitchModel>();
                    foreach (var @switch in site.Switches.OrderBy(q => q.Order))
                    {
                        var switchModel = new SimplifiedSwitchModel(@switch);
                        foreach (var schedule in @switch.Schedules)
                        {
                            switchModel.ScheduleViewModels.Add(new ScheduleViewModel(schedule));
                        }

                        switches.Add(switchModel);
                    }
                    model.Message = switches;
                    model.BroadcastType = WebSocketBroadcastType.All;
                }
                else
                {
                    model.Type = WebSocketMessageType.Error;
                    model.Message = "Site does not exist";
                    model.BroadcastType = WebSocketBroadcastType.Pi;
                }
            }
            
            return model;
        }
    }
}
