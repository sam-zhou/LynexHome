using LynexHome.Core.Model;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace LynexHome.Core.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<LynexDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;

        }

        protected override void Seed(LynexDbContext context)
        {

            
            using (var dbContext = new LynexDbContext())
            {
                using (var roleStore = new RoleStore<Role, string, UserRole>(dbContext))
                {
                    using (var roleManager = new RoleManager<Role>(roleStore))
                    {
                        roleManager.Create(new Role
                        {
                            Id = Guid.NewGuid().ToString(),
                            Name = "Administrator"
                        });

                        roleManager.Create(new Role
                        {
                            Id = Guid.NewGuid().ToString(),
                            Name = "User"
                        });

                        roleManager.Create(new Role
                        {
                            Id = Guid.NewGuid().ToString(),
                            Name = "CustomManager"
                        });
                    }
                }

                using (var userStore = new LynexUserStore(dbContext))
                {
                    using (var userManager = new UserManager<User>(userStore))
                    {
                        var user = new User("0efc7c0b-e378-4fc7-9e48-af184f78ee03")
                        {
                            Email = "samzhou.it@gmail.com",
                            EmailConfirmed = true,
                            Phone = "0430501022",
                            PhoneNumber = "0430501022",
                            PhoneNumberConfirmed = true,
                            AccessFailedCount = 0,
                            LockoutEnabled = false,
                            UserName = "samzhou.it@gmail.com",
                            SecurityStamp = "c5c18a28-6ca4-43d7-8a71-c1af36c937ae",
                            PasswordHash = "ANNNzqwEGjePRrU/8VbqSXnJynL/wP51zG+1Ilf424Pu9nYvLWmfa0owBFtj99fywQ=="
                        };
                        userManager.Create(user);
                        userManager.AddToRole(user.Id, "Administrator");
                    }
                }


                
            }

        }
    }
}
