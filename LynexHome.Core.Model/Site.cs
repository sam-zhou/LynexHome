using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LynexHome.Core.Model
{
    public partial class Site : BaseEntity
    {
        public Site(string id):base(false)
        {
            Id = id;
        }

        public Site()
        {
            Switches = new HashSet<Switch>();
            Walls = new HashSet<Wall>();
        }

        public bool IsDefault { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public string Suburb { get; set; }

        public string State { get; set; }

        public string Postcode { get; set; }

        public string Country { get; set; }

        public DateTime UpdatedDateTime { get; set; }

        public DateTime CreatedDateTime { get; set; }

        public virtual ICollection<Wall> Walls { get; set; }

        public virtual ICollection<Switch> Switches { get; set; }

        public string UserId { get; set; }

        public virtual User User { get; set; }
    }
}
