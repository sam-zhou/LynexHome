using System;
using System.Web;
using System.Web.Http;
using LynexHome.Core;

using LynexHome.Repository.Interface;
using Microsoft.AspNet.Identity;

namespace LynexHome.Web.Api
{
    [Authorize]
    public class AccountController : ApiController
    {
        private readonly LynexUserManager _userManager;
        private readonly ISiteRepository _siteRepository;


        public AccountController(LynexUserManager userManager, ISiteRepository siteRepository)
        {
            _userManager = userManager;
            _siteRepository = siteRepository;
        }

        [AllowAnonymous]
        [HttpGet]
        public bool IsUserLoggedIn()
        {

            return HttpContext.Current.User.Identity.IsAuthenticated;



        }
    }
}