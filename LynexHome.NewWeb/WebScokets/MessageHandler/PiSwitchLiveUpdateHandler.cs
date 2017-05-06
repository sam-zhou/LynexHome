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
    public class PiSwitchLiveUpdateHandler : WebSocketMessageHandler
    {

        public PiSwitchLiveUpdateHandler(string siteId) : base(siteId)
        {

        }

        public override WebSocketMessage ProcessMessage(WebSocketMessage model)
        {
            if (model.Message.SwitchId != null)
            {
                using (var dbContext = new LynexDbContext())
                {
                    var @switch = dbContext.Set<Switch>().Find(model.Message.SwitchId.ToString());

                    if (@switch != null)
                    {
                        @switch.Live = (bool) model.Message.Live;
                        dbContext.Entry(@switch).State = EntityState.Modified;
                        dbContext.Set<Switch>().Attach(@switch);
                        dbContext.Entry(@switch).Property("Live").IsModified = true;
                        dbContext.SaveChanges();

                        model.BroadcastType = WebSocketBroadcastType.Web;

                    }
                    else
                    {
                        model.Type = WebSocketMessageType.Error;
                        model.Message = "Can not find Switch Id " + model.Message.SwitchId;
                        model.BroadcastType = WebSocketBroadcastType.Pi;
                    }

                    
                }
            }
            else
            {
                model.Type = WebSocketMessageType.Error;
                model.Message = "Switch id cannot be null";
                model.BroadcastType = WebSocketBroadcastType.Pi;
            }


            

            return model;
        }

    }
}
