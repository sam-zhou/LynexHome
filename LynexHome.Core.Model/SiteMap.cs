using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LynexHome.Core.Model
{
    public class SiteMap : BaseEntity
    {
        public SiteMap()
        {
            
        }

        public virtual ICollection<Wall> SiteMapWalls { get; set; }

        public virtual ICollection<Switch> Switches { get; set; }

        public virtual DateTime CreatedDateTime { get; set; }

        public virtual DateTime UpdatedDateTime { get; set; }
    }
}
