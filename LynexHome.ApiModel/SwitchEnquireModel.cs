﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LynexHome.Core.Model;

namespace LynexHome.ApiModel
{
    public class SwitchEnquireModel
    {
        public string SiteId { get; set; }

        public string EncryptedSerialNumber { get; set; }
    }
}
