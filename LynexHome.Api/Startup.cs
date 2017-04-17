using LynexHome.Api;
using LynexHome.Api.IoC;
using Microsoft.Owin;
using Owin;


namespace LynexHome.Api
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
