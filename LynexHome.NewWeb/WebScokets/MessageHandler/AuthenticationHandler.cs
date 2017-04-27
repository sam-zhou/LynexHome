using System;
using Lynex.Extension;
using LynexHome.ApiModel;
using LynexHome.Core;
using LynexHome.Core.Model;
using LynexHome.ViewModel;
using Newtonsoft.Json;

namespace LynexHome.NewWeb.WebScokets.MessageHandler
{
    public class AuthenticationHandler:MessageHandler<PiAuthenticationModel>
    {
        public bool IsAuthenticated { get; private set; }
        public AuthenticationHandler(string siteId) : base(siteId)
        {
        }

        protected override string ProcessMessage(PiAuthenticationModel model)
        {
            var result = new WebSocketResultViewModel();
            if (model.SiteId == null || model.AuthType == null || model.RequestType == null || model.Rnd == null)
            {
                result.StatusCode = 600;
                result.Message = "Invalid Request";
            }
            else if (model.RequestType != "auth")
            {
                result.StatusCode = 601;
                result.Message = "Not authenticated yet";
            }
            else
            {
                using (var dbContext = new LynexDbContext())
                {
                    var site = dbContext.Set<Site>().Find(model.SiteId);
                    if (site != null)
                    {
                        var queryStr = "authType=" + model.AuthType + "&requestType=" + model.RequestType + "&rnd=" + model.Rnd + "&siteId=" + model.SiteId + "&key=" + site.Secret;
                        if (model.AuthType == "md5")
                        {
                            var calculatedMd5 = queryStr.GetMD5();
                            if (string.Equals(model.Code, calculatedMd5, StringComparison.CurrentCultureIgnoreCase))
                            {
                                IsAuthenticated = true;
                                result.StatusCode = 101;
                                result.Message = "Success";
                            }
                            else
                            {
                                result.StatusCode = 300;
                                result.Message = "Authentication Failed";
                            }
                        }
                        else
                        {
                            result.StatusCode = 400;
                            result.Message = "Unsupported authentication";
                        }
                    }
                    else
                    {
                        result.StatusCode = 500;
                        result.Message = "Site does not exist";
                    }

                }
            }



            return JsonConvert.SerializeObject(result);
        }

    }
}
