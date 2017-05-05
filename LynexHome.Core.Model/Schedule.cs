using LynexHome.Core.Model.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LynexHome.Core.Model
{
    public class Schedule : BaseEntity<long>
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public override long Id { get; set; }

        [Required]
        public ScheduleFrequency Frequency { get; set; }

        [Required]
        [SqlDefaultValue("1")]
        public bool Active { get; set; }

        [Required]
        public TimeSpan StartTime { get; set; }

        [Required]
        public int Last { get; set; }

        [Required]
        public string Day { get; set; }

        [Required, DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [SqlDefaultValue("GETUTCDATE()")]
        public DateTime CreatedDateTime { get; set; }

        [Required, DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [SqlDefaultValue("GETUTCDATE()")]
        public DateTime UpdatedDateTime { get; set; }

        
        public virtual Switch Switch { get; set; }

        [Required]
        public string SwitchId { get; set; }
    }

    
}
