using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lynex.Common.Exception;
using LynexHome.Core;
using LynexHome.Core.Model;
using LynexHome.Repository.Interface;

namespace LynexHome.Repository
{
    public class SiteRepository:BaseRepository, ISiteRepository
    {
        public SiteRepository(LynexDbContext dbContext) : base(dbContext)
        {
        }

        public void AddSite(Site site, string userId)
        {
            var user = DbContext.Users.Find(userId);

            if (user != null)
            {
                user.Sites.Add(site);
                //site.UserId = user.Id;
                //DbContext.Set<Site>().Attach(site);

                DbContext.SaveChanges();
            }
            else
            {
                throw new LynexException(string.Format("User {0} does not exists", userId));
            }
            
        }

        public void UpdateSite(Site site)
        {
            var existSite = DbContext.Set<Site>().Find(site.Id);

            if (existSite != null)
            {
                existSite.Name = site.Name;
                existSite.Postcode = site.Postcode;
                existSite.State = site.State;
                existSite.Suburb = site.Suburb;
                existSite.Address = site.Address;
                DbContext.SaveChanges();

            }
            else
            {
                throw new LynexException(string.Format("Site {0} does not exists", site.Id));
            }
            
        }


        public void DeleteSite(string siteId)
        {
            var existSite = DbContext.Set<Site>().Find(siteId);

            if (existSite != null)
            {
                DbContext.Set<Site>().Remove(existSite);
                DbContext.SaveChanges();
            }
            else
            {
                throw new LynexException(string.Format("Site {0} does not exists", siteId));
            }
            
        }
    }
}
