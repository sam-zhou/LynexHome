using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using LynexHome.Repository;

namespace LynexHome.Api.IoC.Installers
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