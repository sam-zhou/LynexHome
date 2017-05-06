using System.Data.Entity;
using System.Linq;
using LynexHome.ApiModel;
using LynexHome.ApiModel.WebScoket;
using LynexHome.Core;
using LynexHome.Core.Model;
using LynexHome.ViewModel;
using Newtonsoft.Json;

namespace LynexHome.NewWeb.WebScokets.MessageHandler
{
    public class PiSwitchUpdateHandler : WebSocketMessageHandler
    {

        public PiSwitchUpdateHandler(string siteId) : base(siteId)
        {
        }

        public override WebSocketMessage ProcessMessage(WebSocketMessage model)
        {
            if (model.Message.ChipId != null)
            {
                using (var dbContext = new LynexDbContext())
                {
                    var site = dbContext.Set<Site>().Find(SiteId);

                    if (site != null)
                    {
                        var status = (bool)model.Message.Status;
                        string chipId = model.Message.ChipId.ToString();

                        var items =
                            dbContext.Set<SwitchEvent>()
                                .Where(
                                    q =>
                                        q.SiteId == site.Id && q.Switch.ChipId == chipId &&
                                        q.Status == status).ToList();

                        dbContext.Set<SwitchEvent>().RemoveRange(items);

                        var @switch = dbContext
                            .Set<Switch>().FirstOrDefault(q => q.ChipId == chipId && q.SiteId == site.Id);

                        if (@switch != null)
                        {
                            @switch.Status = status;
                            dbContext.Entry(@switch).State = EntityState.Modified;
                            dbContext.Set<Switch>().Attach(@switch);

                            dbContext.Entry(@switch).Property("Status").IsModified = true;
                            model.Message = new SimplifiedSwitchModel(@switch);
                            model.BroadcastType = WebSocketBroadcastType.All;
                            dbContext.SaveChanges();
                        }
                        else
                        {
                            model.Type = WebSocketMessageType.Error;
                            model.BroadcastType = WebSocketBroadcastType.Pi;
                            model.Message = "Switch does not exist";
                        }
                        
                    }
                    else
                    {
                        model.Type = WebSocketMessageType.Error;
                        model.BroadcastType = WebSocketBroadcastType.Pi;
                        model.Message = "Site does not exist";
                    }
                }
            }
            else
            {
                model.Type = WebSocketMessageType.Error;
                model.BroadcastType = WebSocketBroadcastType.Pi;
                model.Message = "Invalid Request";
            }


            return model;
        }

    }
}
