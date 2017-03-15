using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LynexHome.Core.Model
{
    public class Site : BaseEntity
    {
        public Site()
        {
            Switches = new List<Switch>();
        }

        public virtual string Name { get; set; }

        public virtual string Address { get; set; }

        public virtual string Suburb { get; set; }

        public virtual string State { get; set; }

        public virtual string Postcode { get; set; }

        public virtual string Country { get; set; }

        public virtual SiteMap SiteMap { get; set; }

        public virtual DateTime CreatedDateTime { get; set; }

        public virtual ICollection<Switch> Switches { get; set; }
    }
}
