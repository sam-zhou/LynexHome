using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LynexHome.Core.Model.Attributes;

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
            SwitchEvents = new HashSet<SwitchEvent>();
        }

        [Index("IX_Site_SerialNumber", IsClustered = false, IsUnique = true)]
        [StringLength(128)]
        [Required]
        public string SerialNumber { get; set; }

        public string Secret { get; set; }

        public bool IsDefault { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public string Suburb { get; set; }

        [StringLength(30)]
        public string State { get; set; }

        [StringLength(4)]
        public string Postcode { get; set; }

        [StringLength(20)]
        public string Country { get; set; }

        [Required, DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [SqlDefaultValue("GETUTCDATE()")]
        public DateTime UpdatedDateTime { get; set; }

        [Required, DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [SqlDefaultValue("GETUTCDATE()")]
        public DateTime CreatedDateTime { get; set; }

        public virtual ICollection<Wall> Walls { get; set; }

        public virtual ICollection<Switch> Switches { get; set; }

        public virtual ICollection<SwitchEvent> SwitchEvents { get; set; }

        public string UserId { get; set; }

        public virtual User User { get; set; }
    }
}
