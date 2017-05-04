using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LynexHome.ApiModel.WebScoket;
using LynexHome.Core;
using LynexHome.Core.Model;
using System.Data.Entity;

namespace LynexHome.NewWeb.WebScokets.MessageHandler
{
    public class WebSwitchStatusUpdateHandler : WebSocketMessageHandler
    {
        public WebSwitchStatusUpdateHandler(string siteId) : base(siteId)
        {
        }

        public override WebSocketMessage ProcessMessage(WebSocketMessage model)
        {
            var updatingSwitch = model.Message;

            using (var dbcontext = new LynexDbContext())
            {
                var @switch = dbcontext.Set<Switch>().Find(updatingSwitch.id.ToString());

                if (@switch != null)
                {
                    @switch.Status = (bool)updatingSwitch.status;

                    dbcontext.Entry(@switch).State = EntityState.Modified;
                    dbcontext.Set<Switch>().Attach(@switch);
                    dbcontext.Entry(@switch).Property("Status").IsModified = true;
                    dbcontext.SaveChanges();
                    model.BroadcastType = WebSocketBroadcastType.All;
                }
            }

            return model;
        }
    }
}