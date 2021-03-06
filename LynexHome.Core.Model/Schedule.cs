﻿using LynexHome.Core.Model.Attributes;
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
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        [SqlDefaultValue("1")]
        public bool Active { get; set; }

        [Required]
        public TimeSpan StartTime { get; set; }

        [Required]
        public int Length { get; set; }

        [Required]
        public bool Monday { get; set; }

        [Required]
        public bool Tuesday { get; set; }

        [Required]
        public bool Wednesday { get; set; }

        [Required]
        public bool Thursday { get; set; }

        [Required]
        public bool Friday { get; set; }

        [Required]
        public bool Saturday { get; set; }

        [Required]
        public bool Sunday { get; set; }

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
