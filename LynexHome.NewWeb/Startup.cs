using LynexHome.NewWeb.IoC;
using LynexHome.NewWeb;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Startup))]

namespace LynexHome.NewWeb
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
