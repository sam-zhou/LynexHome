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
    public class WebSiteEnquireHandler : WebSocketMessageHandler
    {
        public WebSiteEnquireHandler(string siteId) : base(siteId)
        {
        }

        public override WebSocketMessage ProcessMessage(WebSocketMessage model)
        {
            model.BroadcastType = WebSocketBroadcastType.Pi;
            return model;
        }
    }
}