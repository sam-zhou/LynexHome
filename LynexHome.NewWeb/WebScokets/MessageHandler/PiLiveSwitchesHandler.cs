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
    public class PiLiveSwitchesHandler : WebSocketMessageHandler
    {

        public PiLiveSwitchesHandler(string siteId) : base(siteId)
        {
        }

        public override WebSocketMessage ProcessMessage(WebSocketMessage model)
        {
            if (model.Message != null)
            {
                

                using (var dbContext = new LynexDbContext())
                {
                    foreach (var switchModel in model.Message)
                    {
                        var @switch = dbContext.Set<Switch>().Find(switchModel.Id.ToString());
                        if (@switch != null)
                        {
                            @switch.Live = (bool)switchModel.Live;
                            dbContext.Entry(@switch).State = EntityState.Modified;
                            dbContext.Set<Switch>().Attach(@switch);
                            dbContext.Entry(@switch).Property("Live").IsModified = true;
                            model.BroadcastType = WebSocketBroadcastType.Web;
                        }

                    }

                    dbContext.SaveChanges();
                    model.BroadcastType = WebSocketBroadcastType.Web;
                }
            }
            else
            {
                model.Type = WebSocketMessageType.Error;
                model.Message = "Live switches is null";
                model.BroadcastType = WebSocketBroadcastType.Pi;
            }

            return model;
        }
    }
}
