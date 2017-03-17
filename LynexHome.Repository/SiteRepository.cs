using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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

        public void AddSite(Site site, string id)
        {
            var user = DbContext.Users.Find(id);

            user.Sites.Add(site);
            //site.UserId = user.Id;
            //DbContext.Set<Site>().Attach(site);
            
            
            
            

            DbContext.SaveChanges();
        }
    }
}
