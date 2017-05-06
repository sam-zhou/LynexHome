using System;
using Lynex.Extension;
using LynexHome.ApiModel;
using LynexHome.ApiModel.WebScoket;
using LynexHome.Core;
using LynexHome.Core.Model;
using LynexHome.ViewModel;
using Newtonsoft.Json;

namespace LynexHome.NewWeb.WebScokets.MessageHandler
{
    public class AuthenticationHandler: WebSocketMessageHandler
    {
        public bool IsAuthenticated { get; private set; }
        public AuthenticationHandler(string siteId) : base(siteId)
        {
        }

        public override WebSocketMessage ProcessMessage(WebSocketMessage model)
        {
            if (model.Message.SiteId == null || model.Message.AuthType == null || model.Message.RequestType == null || model.Message.Rnd == null)
            {
                model.Type = WebSocketMessageType.Error;
                model.Message = "Invalid Request";
            }
            else if (model.Message.RequestType.ToString() != "auth")
            {
                model.Type = WebSocketMessageType.Error;
                model.Message = "Not authenticated yet";
            }
            else
            {
                using (var dbContext = new LynexDbContext())
                {
                    string siteId = model.Message.SiteId.ToString();
                    var site = dbContext.Set<Site>().Find(siteId);
                    if (site != null)
                    {
                        string queryStr = "authType=" + model.Message.AuthType + "&requestType=" + model.Message.RequestType + "&rnd=" + model.Message.Rnd + "&siteId=" + model.Message.SiteId + "&key=" + site.Secret;
                        if (model.Message.AuthType.ToString() == "md5")
                        {
                            var calculatedMd5 = queryStr.GetMD5();
                            if (string.Equals(model.Message.Code.ToString(), calculatedMd5, StringComparison.CurrentCultureIgnoreCase))
                            {
                                IsAuthenticated = true;
                                model.Type = WebSocketMessageType.PiAuthentication;
                                model.Message = "Success";
                            }
                            else
                            {
                                model.Type = WebSocketMessageType.Error;
                                model.Message = "Authentication Failed";
                            }
                        }
                        else
                        {
                            model.Type = WebSocketMessageType.Error;
                            model.Message = "Unsupported authentication";
                        }
                    }
                    else
                    {
                        model.Type = WebSocketMessageType.Error;
                        model.Message = "Site does not exist";
                    }

                }
            }



            return model;
        }

    }
}
