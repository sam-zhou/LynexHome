using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Configuration;
using Lynex.Notification.Email;
using Lynex.Notification.SMS;
using LynexHome.Core.Helper;
using LynexHome.Core.Model;
using LynexHome.Service;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;

namespace LynexHome.Core
{
    // Configure the application user manager which is used in this application.
    public class LynexUserManager : UserManager<User>
    {
        public LynexUserManager(IUserStore<User> store)
            : base(store)
        {
        }


        public static LynexUserManager Create(IdentityFactoryOptions<LynexUserManager> options,
            IOwinContext context)
        {
            var manager = new LynexUserManager(new LynexUserStore(context.Get<LynexDbContext>()));
            // Configure validation logic for usernames
            manager.UserValidator = new UserValidator<User>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };

            // Configure validation logic for passwords
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = int.Parse(WebConfigurationManager.AppSettings["PasswordRequiredLength"]),
                RequireNonLetterOrDigit = WebConfigurationManager.AppSettings["PasswordRequireNonLetterOrDigit"].ToLower() == "true",
                RequireDigit = WebConfigurationManager.AppSettings["PasswordRequireDigit"].ToLower() == "true",
                RequireLowercase = WebConfigurationManager.AppSettings["PasswordRequireLowercase"].ToLower() == "true",
                RequireUppercase = WebConfigurationManager.AppSettings["PasswordRequireUppercase"].ToLower() == "true",
            };

            // Configure user lockout defaults
            manager.UserLockoutEnabledByDefault = true;
            manager.DefaultAccountLockoutTimeSpan = TimeSpan.FromMinutes(5);
            manager.MaxFailedAccessAttemptsBeforeLockout = 5;

            // Register two factor authentication providers. This application uses Phone and Emails as a step of receiving a code for verifying the user
            // You can write your own provider and plug it in here.
            manager.RegisterTwoFactorProvider("Phone Code", new PhoneNumberTokenProvider<User>
            {
                MessageFormat = "Your security code is {0}"
            });
            manager.RegisterTwoFactorProvider("Email Code", new EmailTokenProvider<User>
            {
                Subject = "Security Code",
                BodyFormat = "Your security code is {0}"
            });


            manager.EmailService = new EmailNotificationService(NotificationSettingFactory.GetEmailNotificationSettings());
            manager.SmsService = new SMSNotificationService(NotificationSettingFactory.GetSMSNotificationSettings());
            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider =
                    new DataProtectorTokenProvider<User>(dataProtectionProvider.Create("ASP.NET Identity"));
            }
            return manager;
        }
    }
}
