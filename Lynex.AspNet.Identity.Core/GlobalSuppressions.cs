// Copyright (c) Microsoft Corporation, Inc. All rights reserved.
// Licensed under the MIT License, Version 2.0. See License.txt in the project root for license information.

// This file is used by Code Analysis to maintain SuppressMessage 
// attributes that are applied to this project.
// Project-level suppressions either have no target or are given 
// a specific target and scoped to a namespace, type, member, etc.
//
// To add a suppression to this file, right-click the message in the 
// Code Analysis results, point to "Suppress Message", and click 
// "In Suppression File".
// You do not need to add suppressions to this file manually.

using System.Diagnostics.CodeAnalysis;

[assembly:
    SuppressMessage("Microsoft.Design", "CA1040:AvoidEmptyInterfaces", Scope = "type",
        Target = "Lynex.AspNet.Identity.IUser")]
[assembly:
    SuppressMessage("Microsoft.Design", "CA1006:DoNotNestGenericTypesInMemberSignatures", Scope = "member",
        Target = "Lynex.AspNet.Identity.IUserClaimStore`2.#GetClaimsAsync(!0)")]
[assembly:
    SuppressMessage("Microsoft.Naming", "CA1726:UsePreferredTerms", MessageId = "Login", Scope = "type",
        Target = "Lynex.AspNet.Identity.IUserLoginStore`1")]
[assembly:
    SuppressMessage("Microsoft.Naming", "CA1726:UsePreferredTerms", MessageId = "Login", Scope = "type",
        Target = "Lynex.AspNet.Identity.IUserLoginStore`2")]
[assembly:
    SuppressMessage("Microsoft.Naming", "CA1726:UsePreferredTerms", MessageId = "login", Scope = "member",
        Target =
            "Lynex.AspNet.Identity.IUserLoginStore`2.#AddLoginAsync(!0,Lynex.AspNet.Identity.UserLoginInfo)")]
[assembly:
    SuppressMessage("Microsoft.Naming", "CA1726:UsePreferredTerms", MessageId = "Login", Scope = "member",
        Target =
            "Lynex.AspNet.Identity.IUserLoginStore`2.#AddLoginAsync(!0,Lynex.AspNet.Identity.UserLoginInfo)")]
[assembly:
    SuppressMessage("Microsoft.Naming", "CA1726:UsePreferredTerms", MessageId = "login", Scope = "member",
        Target =
            "Lynex.AspNet.Identity.IUserLoginStore`2.#RemoveLoginAsync(!0,Lynex.AspNet.Identity.UserLoginInfo)")
]
[assembly:
    SuppressMessage("Microsoft.Naming", "CA1726:UsePreferredTerms", MessageId = "Login", Scope = "member",
        Target =
            "Lynex.AspNet.Identity.IUserLoginStore`2.#RemoveLoginAsync(!0,Lynex.AspNet.Identity.UserLoginInfo)")
]
[assembly:
    SuppressMessage("Microsoft.Design", "CA1006:DoNotNestGenericTypesInMemberSignatures", Scope = "member",
        Target = "Lynex.AspNet.Identity.IUserLoginStore`2.#GetLoginsAsync(!0)")]
[assembly:
    SuppressMessage("Microsoft.Naming", "CA1726:UsePreferredTerms", MessageId = "login", Scope = "member",
        Target = "Lynex.AspNet.Identity.IUserLoginStore`2.#FindAsync(Lynex.AspNet.Identity.UserLoginInfo)")]
[assembly:
    SuppressMessage("Microsoft.Design", "CA1006:DoNotNestGenericTypesInMemberSignatures", Scope = "member",
        Target = "Lynex.AspNet.Identity.IUserRoleStore`2.#GetRolesAsync(!0)")]
[assembly:
    SuppressMessage("Microsoft.Naming", "CA1726:UsePreferredTerms", MessageId = "Login", Scope = "type",
        Target = "Lynex.AspNet.Identity.UserLoginInfo")]
[assembly:
    SuppressMessage("Microsoft.Naming", "CA1726:UsePreferredTerms", MessageId = "login", Scope = "member",
        Target = "Lynex.AspNet.Identity.UserLoginInfo.#.ctor(System.String,System.String)")]
[assembly:
    SuppressMessage("Microsoft.Naming", "CA1726:UsePreferredTerms", MessageId = "Login", Scope = "member",
        Target = "Lynex.AspNet.Identity.UserLoginInfo.#LoginProvider")]
[assembly:
    SuppressMessage("Microsoft.Naming", "CA1726:UsePreferredTerms", MessageId = "Login", Scope = "member",
        Target = "Lynex.AspNet.Identity.UserManager`2.#SupportsUserLogin")]
[assembly:
    SuppressMessage("Microsoft.Naming", "CA1726:UsePreferredTerms", MessageId = "login", Scope = "member",
        Target = "Lynex.AspNet.Identity.UserManager`2.#FindAsync(Lynex.AspNet.Identity.UserLoginInfo)")]
[assembly:
    SuppressMessage("Microsoft.Naming", "CA1726:UsePreferredTerms", MessageId = "login", Scope = "member",
        Target = "Lynex.AspNet.Identity.UserManager`2.#RemoveLoginAsync(!1,Lynex.AspNet.Identity.UserLoginInfo)"
        )]
[assembly:
    SuppressMessage("Microsoft.Naming", "CA1726:UsePreferredTerms", MessageId = "Login", Scope = "member",
        Target = "Lynex.AspNet.Identity.UserManager`2.#RemoveLoginAsync(!1,Lynex.AspNet.Identity.UserLoginInfo)"
        )]
[assembly:
    SuppressMessage("Microsoft.Naming", "CA1726:UsePreferredTerms", MessageId = "login", Scope = "member",
        Target = "Lynex.AspNet.Identity.UserManager`2.#AddLoginAsync(!1,Lynex.AspNet.Identity.UserLoginInfo)")]
[assembly:
    SuppressMessage("Microsoft.Naming", "CA1726:UsePreferredTerms", MessageId = "Login", Scope = "member",
        Target = "Lynex.AspNet.Identity.UserManager`2.#AddLoginAsync(!1,Lynex.AspNet.Identity.UserLoginInfo)")]
[assembly:
    SuppressMessage("Microsoft.Design", "CA1006:DoNotNestGenericTypesInMemberSignatures", Scope = "member",
        Target = "Lynex.AspNet.Identity.UserManager`2.#GetLoginsAsync(!1)")]
[assembly:
    SuppressMessage("Microsoft.Design", "CA1006:DoNotNestGenericTypesInMemberSignatures", Scope = "member",
        Target = "Lynex.AspNet.Identity.UserManager`2.#GetClaimsAsync(!1)")]
[assembly:
    SuppressMessage("Microsoft.Design", "CA1006:DoNotNestGenericTypesInMemberSignatures", Scope = "member",
        Target = "Lynex.AspNet.Identity.UserManager`2.#GetRolesAsync(!1)")]
[assembly:
    SuppressMessage("Microsoft.Naming", "CA1726:UsePreferredTerms", MessageId = "login", Scope = "member",
        Target =
            "Lynex.AspNet.Identity.UserManagerExtensions.#AddLogin`2(Lynex.AspNet.Identity.UserManager`2<!!0,!!1>,!!1,Lynex.AspNet.Identity.UserLoginInfo)"
        )]
[assembly:
    SuppressMessage("Microsoft.Naming", "CA1726:UsePreferredTerms", MessageId = "Login", Scope = "member",
        Target =
            "Lynex.AspNet.Identity.UserManagerExtensions.#AddLogin`2(Lynex.AspNet.Identity.UserManager`2<!!0,!!1>,!!1,Lynex.AspNet.Identity.UserLoginInfo)"
        )]
[assembly:
    SuppressMessage("Microsoft.Naming", "CA1726:UsePreferredTerms", MessageId = "login", Scope = "member",
        Target =
            "Lynex.AspNet.Identity.UserManagerExtensions.#RemoveLogin`2(Lynex.AspNet.Identity.UserManager`2<!!0,!!1>,!!1,Lynex.AspNet.Identity.UserLoginInfo)"
        )]
[assembly:
    SuppressMessage("Microsoft.Naming", "CA1726:UsePreferredTerms", MessageId = "Login", Scope = "member",
        Target =
            "Lynex.AspNet.Identity.UserManagerExtensions.#RemoveLogin`2(Lynex.AspNet.Identity.UserManager`2<!!0,!!1>,!!1,Lynex.AspNet.Identity.UserLoginInfo)"
        )]
[assembly:
    SuppressMessage("Microsoft.Naming", "CA1726:UsePreferredTerms", MessageId = "login", Scope = "member",
        Target =
            "Lynex.AspNet.Identity.UserManagerExtensions.#Find`2(Lynex.AspNet.Identity.UserManager`2<!!0,!!1>,Lynex.AspNet.Identity.UserLoginInfo)"
        )]
[assembly:
    SuppressMessage("Microsoft.Design", "CA1040:AvoidEmptyInterfaces", Scope = "type",
        Target = "Lynex.AspNet.Identity.IRole")]
[assembly:
    SuppressMessage("Microsoft.Maintainability", "CA1506:AvoidExcessiveClassCoupling", Scope = "type",
        Target = "Lynex.AspNet.Identity.UserManager`2")]
[assembly:
    SuppressMessage("Microsoft.Design", "CA1006:DoNotNestGenericTypesInMemberSignatures", Scope = "member",
        Target = "Lynex.AspNet.Identity.UserManager`2.#GetValidTwoFactorProvidersAsync(!1)")]
[assembly:
    SuppressMessage("Microsoft.Design", "CA1006:DoNotNestGenericTypesInMemberSignatures", Scope = "member",
        Target = "Lynex.AspNet.Identity.UserManager`2.#TwoFactorProviders")]
[assembly:
    SuppressMessage("Microsoft.Naming", "CA1704:IdentifiersShouldBeSpelledCorrectly", MessageId = "Totp", Scope = "type",
        Target = "Lynex.AspNet.Identity.TotpSecurityStampBasedTokenProvider`2")]
[assembly:
    SuppressMessage("Microsoft.Design", "CA1006:DoNotNestGenericTypesInMemberSignatures", Scope = "member",
        Target = "Lynex.AspNet.Identity.IUserTokenStore`2.#FindTokensByTypeAsync(!0,System.String)")]
[assembly:
    SuppressMessage("Microsoft.Naming", "CA1704:IdentifiersShouldBeSpelledCorrectly", MessageId = "Sms",
        Scope = "member", Target = "Lynex.AspNet.Identity.UserManager`2.#SmsService")]
[assembly:
    SuppressMessage("Microsoft.Naming", "CA1704:IdentifiersShouldBeSpelledCorrectly", MessageId = "Sms",
        Scope = "member", Target = "Lynex.AspNet.Identity.UserManager`2.#SendSmsAsync(!1,System.String)")]
[assembly:
    SuppressMessage("Microsoft.Naming", "CA1704:IdentifiersShouldBeSpelledCorrectly", MessageId = "c", Scope = "member",
        Target = "Lynex.AspNet.Identity.PasswordValidator.#IsDigit(System.Char)")]
[assembly:
    SuppressMessage("Microsoft.Naming", "CA1704:IdentifiersShouldBeSpelledCorrectly", MessageId = "c", Scope = "member",
        Target = "Lynex.AspNet.Identity.PasswordValidator.#IsLower(System.Char)")]
[assembly:
    SuppressMessage("Microsoft.Naming", "CA1704:IdentifiersShouldBeSpelledCorrectly", MessageId = "c", Scope = "member",
        Target = "Lynex.AspNet.Identity.PasswordValidator.#IsUpper(System.Char)")]
[assembly:
    SuppressMessage("Microsoft.Naming", "CA1704:IdentifiersShouldBeSpelledCorrectly", MessageId = "c", Scope = "member",
        Target = "Lynex.AspNet.Identity.PasswordValidator.#IsLetterOrDigit(System.Char)")]
[assembly:
    SuppressMessage("Microsoft.Naming", "CA1704:IdentifiersShouldBeSpelledCorrectly", MessageId = "Sms",
        Scope = "member",
        Target =
            "Lynex.AspNet.Identity.UserManagerExtensions.#SendSms`2(Lynex.AspNet.Identity.UserManager`2<!!0,!!1>,!!1,System.String)"
        )]