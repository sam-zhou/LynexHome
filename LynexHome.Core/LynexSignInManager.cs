using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using LynexHome.Core.Model;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security;

namespace LynexHome.Core
{
    // Configure the application sign-in manager which is used in this application.  
    public class LynexSignInManager : SignInManager<User, string>
    {
        public LynexSignInManager(LynexUserManager userManager, IAuthenticationManager authenticationManager) :
            base(userManager, authenticationManager) { }

        public override Task<ClaimsIdentity> CreateUserIdentityAsync(User user)
        {
            return user.GenerateUserIdentityAsync((LynexUserManager)UserManager);
        }

        public static LynexSignInManager Create(IdentityFactoryOptions<LynexSignInManager> options, IOwinContext context)
        {
            return new LynexSignInManager(context.GetUserManager<LynexUserManager>(), context.Authentication);
        }
    }
}
