using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LynexHome.Core.Model;

namespace LynexHome.ApiModel
{
    public class WallUpdateModel
    {
        public string WallId { get; set; }

        public int X { get; set; }

        public int Y { get; set; }

        public double Length { get; set; }

        public int Angle { get; set; }

        public string SiteId { get; set; }

        public WallType Type { get; set; } 
    }
}
