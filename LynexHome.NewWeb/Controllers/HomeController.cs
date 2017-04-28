using System.Web.Mvc;

namespace LynexHome.NewWeb.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Welcome";
            return View();
        }
    }
}
