﻿// Copyright (c) Microsoft Corporation, Inc. All rights reserved.
// Licensed under the MIT License, Version 2.0. See License.txt in the project root for license information.

namespace Lynex.AspNet.Identity
{
    /// <summary>
    ///     Return result for IPasswordHasher
    /// </summary>
    public enum PasswordVerificationResult
    {
        /// <summary>
        ///     Password verification failed
        /// </summary>
        Failed = 0,

        /// <summary>
        ///     Success
        /// </summary>
        Success = 1,

        /// <summary>
        ///     Success but should update and rehash the password
        /// </summary>
        SuccessRehashNeeded = 2
    }
}