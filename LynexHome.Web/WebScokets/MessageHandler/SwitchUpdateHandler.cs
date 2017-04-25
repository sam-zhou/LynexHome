using System;
using System.Collections.Generic;
using System.Data.Entity;
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
    public class SwitchUpdateHandler : MessageHandler<SwitchUpdatedModel>
    {

        public SwitchUpdateHandler(string siteId) : base(siteId)
        {
        }

        protected override string ProcessMessage(SwitchUpdatedModel model)
        {
            var result = new WebSocketResultViewModel();
            if (model.ChipId != null)
            {
                using (var dbContext = new LynexDbContext())
                {
                    var site = dbContext.Set<Site>().Find(SiteId);

                    if (site != null)
                    {
                        var items =
                            dbContext.Set<SwitchEvent>()
                                .Where(
                                    q =>
                                        q.SiteId == site.Id && q.Switch.ChipId == model.ChipId &&
                                        q.Status == model.Status).ToList();

                        dbContext.Set<SwitchEvent>().RemoveRange(items);

                        var @switch = dbContext
                            .Set<Switch>().FirstOrDefault(q => q.ChipId == model.ChipId && q.SiteId == site.Id);

                        if (@switch != null)
                        {
                            @switch.Status = model.Status;
                            dbContext.Entry(@switch).State = EntityState.Modified;
                            dbContext.Set<Switch>().Attach(@switch);

                            dbContext.Entry(@switch).Property("Status").IsModified = true;
                            result.Message = "Success";
                            result.StatusCode = 200;
                            result.Result = new SimplifiedSwitchModel(@switch);
                            dbContext.SaveChanges();
                        }
                        else
                        {
                            result.StatusCode = 500;
                            result.Message = "Switch does not exist";
                        }
                        
                    }
                    else
                    {
                        result.StatusCode = 500;
                        result.Message = "Site does not exist";
                    }
                }
            }
            else
            {
                result.StatusCode = 600;
                result.Message = "Invalid Request";
            }


            return JsonConvert.SerializeObject(result);
        }

    }
}
