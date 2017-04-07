using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lynex.Common.Exception;
using LynexHome.Core;
using LynexHome.Core.Model;
using LynexHome.Repository.Interface;

namespace LynexHome.Repository
{
    public class WallRepository:BaseRepository<Wall>, IWallRepository
    {
        public WallRepository(DbContext dbContext)
            : base(dbContext)
        {
        }

        public Wall AddWall(Wall wall, string siteId)
        {
            var site = DbContext.Set<Site>().Find(siteId);

            if (site != null)
            {
                site.Walls.Add(wall);
                DbContext.SaveChanges();
                return wall;
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
                existWall.X = wall.X;
                existWall.Y = wall.Y;
                existWall.Length = wall.Length;
                existWall.Angle = wall.Angle;
                existWall.Type = wall.Type;
                existWall.UpdatedDateTime = DateTime.UtcNow;
                DbContext.Entry(existWall).State = EntityState.Modified;
                DbContext.Set<Wall>().Attach(existWall);
                DbContext.Entry(existWall).Property("UpdatedDateTime").IsModified = true;
                DbContext.Entry(existWall).Property("X").IsModified = true;
                DbContext.Entry(existWall).Property("Y").IsModified = true;
                DbContext.Entry(existWall).Property("Length").IsModified = true;
                DbContext.Entry(existWall).Property("Angle").IsModified = true;
                DbContext.Entry(existWall).Property("Type").IsModified = true;
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
