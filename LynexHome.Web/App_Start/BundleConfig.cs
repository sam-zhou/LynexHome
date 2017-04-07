using System.Web.Optimization;

namespace LynexHome.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/jquery-1.10.2.js",
                "~/Scripts/jquery-ui-1.10.2.js",
                "~/Scripts/jquery.ui.touch-punch.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                "~/Scripts/jquery.unobtrusive*",
                "~/Scripts/jquery.validate*"));

            //bundles.Add(new ScriptBundle("~/bundles/knockout").Include(
            //    "~/Scripts/knockout-{version}.js",
            //    "~/Scripts/knockout.validation.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/angular.js",
                "~/Scripts/angular-route.js",
                "~/Scripts/angular-animate.js",
                "~/Scripts/angular-cookies.js",
                "~/Scripts/angular-sanitize.js",
                "~/Scripts/angular-touch.js",
                "~/Scripts/angular-dragdrop.min.js",
                "~/Scripts/angular-ui/ui-bootstrap-tpls.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                "~/Scripts/jstorage.js",
                "~/Scripts/event.js",
                "~/Scripts/fabric.js",
                //"~/Scripts/fabric.require.js",
                "~/app/common/modules/*.js",
                "~/app/common/services/*.js",
                "~/app/common/controllers/*.js",
                "~/app/common/directives/*.js",

                //"~/app/login/controllers/*.js",
                //"~/app/login/directives/*.js",



                "~/app/account/controllers/*.js",
                "~/app/account/directives/*.js",
                "~/app/account/services/*.js"
                
                
                ));



            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/bootstrap.js"));

            

            bundles.Add(new StyleBundle("~/Content/css").Include(
                 "~/Content/bootstrap.css",
                 "~/Content/Site.css",
                 "~/Content/1280.css",
                 "~/Content/1024.css",
                 "~/Content/767.css",
                 "~/Content/480.css",
                 "~/Content/font-awesome.css"
                 
                 ));

#if DEBUG
            BundleTable.EnableOptimizations = false;
#else
            BundleTable.EnableOptimizations = true;
#endif
        }
    }
}
