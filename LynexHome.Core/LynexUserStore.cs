using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LynexHome.Core.Model;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace LynexHome.Core
{
    public class LynexUserStore :
    UserStore<User, Role, string, UserLogin, UserRole, UserClaim>,
    IUserStore<User>,
    IDisposable
    {
        public LynexUserStore(LynexDbContext context) : base(context)
        {
           
        }

    }
}
