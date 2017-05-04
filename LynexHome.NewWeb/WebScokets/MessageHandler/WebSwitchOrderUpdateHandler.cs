using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LynexHome.ApiModel.WebScoket;
using LynexHome.Core;
using LynexHome.Core.Model;
using System.Data.Entity;
using LynexHome.Repository;

namespace LynexHome.NewWeb.WebScokets.MessageHandler
{
    public class WebSwitchOrderUpdateHandler : WebSocketMessageHandler
    {
        private string _userId;
        public WebSwitchOrderUpdateHandler(string siteId, string userId) : base(siteId)
        {
            _userId = userId;
        }

        public override WebSocketMessage ProcessMessage(WebSocketMessage model)
        {
            var updatingModel = model.Message;

            using (var dbContext = new LynexDbContext())
            {
                var switchRepository = new SwtichRepository(dbContext);

                switchRepository.UpdateOrder(_userId, updatingModel.id.ToString(), (int)updatingModel.order);
            }
            model.BroadcastType = WebSocketBroadcastType.All;
            return model;
        }
    }
}