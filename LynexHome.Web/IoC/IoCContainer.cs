using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using Castle.Windsor;
using Castle.Windsor.Installer;
using LynexHome.Web.IoC.Factory;
using Owin;

namespace LynexHome.Web.IoC
{
    public static class IoCContainer
    {
        public static IWindsorContainer Container;

        public static void Setup()
        {



            Container = new WindsorContainer().Install(FromAssembly.This());
            GlobalConfiguration.Configuration.DependencyResolver = new WindsorDependencyResolver(Container);
            var controllerFactory = new WindsorControllerFactory(Container.Kernel);
            ControllerBuilder.Current.SetControllerFactory(controllerFactory);

        }

        public static T Resolve<T>()
        {
            return Container.Resolve<T>();
        }
    }
}