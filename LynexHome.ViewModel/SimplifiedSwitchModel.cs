﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LynexHome.Core.Model;

namespace LynexHome.ViewModel
{
    public class SimplifiedSwitchModel : BaseEntityViewModel<Switch>
    {
        public SimplifiedSwitchModel(Switch data)
            : base(data)
        {
            ScheduleViewModels = new List<ScheduleViewModel>();
        }
        public string Name { get; set; }

        public string Id { get; set; }

        public bool Live { get; set; }

        public bool Status { get; set; }

        public SwitchType Type { get; set; }

        public string ChipId { get; set; }

        public string SiteId { get; set; }

        public int IconId { get; set; }

        public List<ScheduleViewModel> ScheduleViewModels { get; set; }
    }
}
