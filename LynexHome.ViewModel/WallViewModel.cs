using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LynexHome.Core.Model;

namespace LynexHome.ViewModel
{
    public class WallViewModel:BaseEntityViewModel<Wall>
    {
        public WallViewModel()
        {
            
        }

        public WallViewModel(Wall data) : base(data)
        {
        }

        public string Id { get; set; }

        public int X { get; set; }

        public int Y { get; set; }

        public double Length { get; set; }

        public int Angle { get; set; }

        public WallType Type { get; set; }

        public DateTime CreatedDateTime { get; set; }

        public DateTime UpdatedDateTime { get; set; }

        public string SiteId { get; set; }

        public bool IsDirty { get; set; }

        public bool IsDelete { get; set; }
    }
}
