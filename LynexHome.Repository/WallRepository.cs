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
    public class WallRepository:BaseRepository, IWallRepository
    {
        public WallRepository(LynexDbContext dbContext)
            : base(dbContext)
        {
        }

        public void AddWall(Wall wall, string siteId)
        {
            var site = DbContext.Set<Site>().Find(siteId);

            if (site != null)
            {
                site.Walls.Add(wall);
                DbContext.SaveChanges();
            }
            else
            {
                throw new LynexException(string.Format("Site {0} does not exists", siteId));
            }
            
        }

        public void UpdateWall(Wall wall)
        {
            var existWall = DbContext.Set<Wall>().Find(wall.Id);

            if (existWall != null)
            {

                DbContext.SaveChanges();
            }
            else
            {
                throw new LynexException(string.Format("Wall {0} does not exists", wall.Id));
            }
            
        }


        public void DeleteWall(string wallId)
        {
            var existWall = DbContext.Set<Wall>().Find(wallId);

            if (existWall != null)
            {
                DbContext.Set<Wall>().Remove(existWall);
                DbContext.SaveChanges();
            }
            else
            {
                throw new LynexException(string.Format("Wall {0} does not exists", wallId));
            }
            
        }
    }
}
