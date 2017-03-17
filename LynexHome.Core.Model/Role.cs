using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;

namespace LynexHome.Core.Model
{
    public partial class Role : IdentityRole<string, UserRole> { }
}
