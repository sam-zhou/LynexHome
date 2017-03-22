﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Lynex.Common.Exception
{
    public static class ApiControllerExtension
    {
        public static ApiExceptionActionResult ApiException(HttpRequestMessage request, HttpStatusCode statusCode, string message)
        {
            return new ApiExceptionActionResult(request, statusCode, message);
        }
    }
}
