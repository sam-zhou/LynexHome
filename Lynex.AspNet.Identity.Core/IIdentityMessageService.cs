﻿// Copyright (c) Microsoft Corporation, Inc. All rights reserved.
// Licensed under the MIT License, Version 2.0. See License.txt in the project root for license information.

using System.Threading.Tasks;

namespace Lynex.AspNet.Identity
{
    /// <summary>
    ///     Expose a way to send messages (i.e. email/sms)
    /// </summary>
    public interface IIdentityMessageService
    {
        /// <summary>
        ///     This method should send the message
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        Task SendAsync(IdentityMessage message);
    }

    /// <summary>
    ///     Represents a message
    /// </summary>
    public class IdentityMessage
    {
        /// <summary>
        ///     Destination, i.e. To email, or SMS phone number
        /// </summary>
        public virtual string Destination { get; set; }

        /// <summary>
        ///     Subject
        /// </summary>
        public virtual string Subject { get; set; }

        /// <summary>
        ///     Message contents
        /// </summary>
        public virtual string Body { get; set; }
    }
}