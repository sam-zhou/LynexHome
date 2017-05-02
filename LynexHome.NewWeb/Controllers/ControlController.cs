using System.Web.Mvc;

namespace LynexHome.NewWeb.Controllers
{
    [Authorize]
    public class ControlController : Controller
    {
        public ActionResult Index()
        {
            return RedirectToAction("Index", "Home");
        }
    }
}
