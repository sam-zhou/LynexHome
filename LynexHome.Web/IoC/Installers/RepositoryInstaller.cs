using System.Web.ApplicationServices;
using Castle.Core.Internal;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using log4net;
using LynexHome.Repository;
using LynexHome.Repository.Interface;

namespace LynexHome.Web.IoC.Installers
{
    public class RepositoryInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(Classes.FromAssemblyInThisApplication()
                            .BasedOn<IRepository>().WithServiceAllInterfaces()
                            .LifestyleTransient()
                );
        }
    }
}