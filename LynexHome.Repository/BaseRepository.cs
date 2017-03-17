using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LynexHome.Core;
using LynexHome.Repository.Interface;

namespace LynexHome.Repository
{
    public interface IRepository
    {
        
    }

    public abstract class BaseRepository: IRepository
    {
        protected readonly LynexDbContext DbContext;

        protected BaseRepository(LynexDbContext dbContext)
        {
            DbContext = dbContext;
        }
    }
}
