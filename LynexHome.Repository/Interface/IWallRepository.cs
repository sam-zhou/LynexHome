using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LynexHome.Core.Model;

namespace LynexHome.Repository.Interface
{
    public interface IWallRepository : IRepository<Wall>
    {
        Wall AddWall(Wall wall, string siteId);

        void UpdateWall(Wall wall);

        void DeleteWall(string wallId);
    }
}
