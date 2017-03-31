using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LynexHome.Core.Model
{
    public partial class Wall : BaseEntity
    {
        public int X { get; set; }

        public int Y { get; set; }

        public double Length { get; set; }

        public int Angle { get; set; }

        public WallType Type { get; set; }

        public DateTime CreatedDateTime { get; set; }

        public DateTime UpdatedDateTime { get; set; }

        public string SiteId { get; set; }

        public virtual Site Site { get; set; }
    }
}
