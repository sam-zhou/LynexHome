using LynexHome.Web;
using LynexHome.Web.IoC;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Startup))]

namespace LynexHome.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            IoCContainer.Setup();
            
            ConfigureAuth(app);
        }
    }
}
