﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LynexHome.Core.Model;

namespace LynexHome.Repository.Interface
{
    public interface ISiteRepository
    {
        void AddSite(Site site, string userId);

        void UpdateSite(Site site);

        void DeleteSite(string siteId);
    }
}
