using System.Data.Entity;
using System.Net;
using System.Web;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using LynexHome.Core;
using LynexHome.Core.Model;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;

namespace LynexHome.NewWeb.IoC.Installers
{
    public class BaseInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(Component.For<DbContext>()
                .ImplementedBy<LynexDbContext>()
                .LifestylePerWebRequest());

            //container.Register(Component.For<LynexDbContext>().Instance(LynexDbContext.Create()).LifestyleSingleton());
            container.Register(Component.For<IUserStore<User>>().ImplementedBy<LynexUserStore>().LifestylePerWebRequest());
            container.Register(Component.For<LynexUserManager>().LifestylePerWebRequest());
            container.Register(Component.For<IAuthenticationManager>().UsingFactoryMethod<IAuthenticationManager>((kernel, creationContext) => HttpContext.Current.GetOwinContext().Authentication).LifestylePerWebRequest());
            container.Register(Component.For<LynexSignInManager>().LifestylePerWebRequest());
        }
    }
}