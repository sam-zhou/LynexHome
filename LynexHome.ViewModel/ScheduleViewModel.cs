using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lynex.Common.Extension;
using LynexHome.Core.Model;

namespace LynexHome.ViewModel
{
    public class ScheduleViewModel: BaseEntityViewModel<Schedule>
    {
        

        public long Id { get; set; }


        public ScheduleFrequency Frequency { get; set; }

        
        public string Name { get; set; }


        public bool Active { get; set; }

        public TimeSpan StartTime { get; set; }

        public int Length { get; set; }

        public bool Monday { get; set; }

        public bool Tuesday { get; set; }

        public bool Wednesday { get; set; }

        public bool Thursday { get; set; }

        public bool Friday { get; set; }

        public bool Saturday { get; set; }

        public bool Sunday { get; set; }

        public DateTime CreatedDateTime { get; set; }

        public DateTime UpdatedDateTime { get; set; }

        public string SwitchId { get; set; }

        public TimeViewModel STime { get; set; }


        public TimeViewModel ETime { get; set; }

        public ScheduleViewModel(Schedule data) : base(data)
        {
            STime = new TimeViewModel(StartTime.Hours, StartTime.Minutes);

            var endTimeSpan = StartTime.Add(new TimeSpan(Length * TimeSpan.TicksPerMinute));

            ETime = new TimeViewModel(endTimeSpan.Hours, endTimeSpan.Minutes);
        }
    }


    public class TimeViewModel
    {
        public int Hour { get; set; }

        public int Minute { get; set; }

        public TimeViewModel()
        {
        }

        public TimeViewModel(int hour, int minute)
        {
            Hour = hour;
            Minute = minute;
        }
    }
}
