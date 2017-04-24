using System;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Lynex.Common.Exception;
using LynexHome.Core;

using LynexHome.Repository.Interface;
using LynexHome.ViewModel;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;

namespace LynexHome.Web.Api
{
    [Authorize]
    public class AuthenticationController : ApiController
    {
        private readonly LynexUserManager _userManager;
        private readonly ISiteRepository _siteRepository;
        private readonly IAuthenticationManager _authenticationManager;


        public AuthenticationController(LynexUserManager userManager, ISiteRepository siteRepository, IAuthenticationManager authenticationManager)
        {
            _userManager = userManager;
            _siteRepository = siteRepository;
            _authenticationManager = authenticationManager;
        }

        [HttpGet]
        public IHttpActionResult IsUserLoggedIn()
        {
            return Ok(HttpContext.Current.User.Identity.IsAuthenticated);
        }


        [HttpGet]
        public IHttpActionResult GetUser()
        {
            var user = _userManager.FindById(HttpContext.Current.User.Identity.GetUserId<string>());




            if (user != null)
            {
                var obj = new
                {
                    Success = true,
                    Message = "",
                    User = new UserViewModel(user),
                };

                return Ok(obj);
            }


            throw new ApiException(new HttpResponseMessage(HttpStatusCode.BadRequest));            
        }

        [HttpGet]
        public IHttpActionResult LogOut()
        {
            _authenticationManager.SignOut();
            return Ok(true);
        }
    }
}