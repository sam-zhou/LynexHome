using System.Web.Mvc;

namespace LynexHome.NewWeb.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
