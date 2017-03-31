using Lynex.Extension.Enum;
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
                var enumToLookup = new EnumToLookup();
                enumToLookup.NameFieldLength = 25;
                enumToLookup.TableNamePrefix = string.Empty;
                enumToLookup.Apply(dbContext);

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
                    using (var userManager = new LynexUserManager(userStore))
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

                var site = new Site("5735824c-93cc-4016-b6b3-26f7947bb58e")
                {
                    IsDefault = true,
                    UserId = "0efc7c0b-e378-4fc7-9e48-af184f78ee03",
                    Address = "11 Braceby Close",
                    Country = "Australia",
                    CreatedDateTime = DateTime.UtcNow,
                    Name = "Willetton",
                    Postcode = "6155",
                    State = "Western Australia",
                    Suburb = "Willetton",
                    UpdatedDateTime = DateTime.UtcNow,
                };

                dbContext.Set<Site>().Add(site);

                var site2 = new Site("781af7e0-0fe5-44b0-97c3-63a7ec48e420")
                {
                    IsDefault = false,
                    UserId = "0efc7c0b-e378-4fc7-9e48-af184f78ee03",
                    Address = "8 Arklow Glen",
                    Country = "Australia",
                    CreatedDateTime = DateTime.UtcNow,
                    Name = "Canning Vale",
                    Postcode = "6155",
                    State = "Western Australia",
                    Suburb = "Canning Vale",
                    UpdatedDateTime = DateTime.UtcNow,
                };

                dbContext.Set<Site>().Add(site2);


                var site3 = new Site("ae8213ef-cdc3-46f9-aff1-845a31f0b39a")
                {
                    IsDefault = false,
                    UserId = "0efc7c0b-e378-4fc7-9e48-af184f78ee03",
                    Address = "59 Parry St",
                    Country = "Australia",
                    CreatedDateTime = DateTime.UtcNow,
                    Name = "Office",
                    Postcode = "6000",
                    State = "Western Australia",
                    Suburb = "Perth",
                    UpdatedDateTime = DateTime.UtcNow,
                };

                dbContext.Set<Site>().Add(site3);

                dbContext.SaveChanges();

                for (var i = 1; i <= 6; i++)
                {
                    var theSwitch = new Switch
                    {
                        SiteId = "5735824c-93cc-4016-b6b3-26f7947bb58e",
                        CreatedDateTime = DateTime.UtcNow,
                        Name = "Switch " + i,
                        Status = i % 2 != 0,
                        Type = i % 2 ==0 ? SwitchType.Normal : SwitchType.PowerMonitoring,
                        UpdatedDateTime = DateTime.UtcNow,
                        X = 0,
                        Y = 0,
                        Order = i - 1,
                    };
                    dbContext.Set<Switch>().Add(theSwitch);
                }


                for (var i = 1; i <= 4; i++)
                {
                    var theSwitch = new Switch
                    {
                        SiteId = "781af7e0-0fe5-44b0-97c3-63a7ec48e420",
                        CreatedDateTime = DateTime.UtcNow,
                        Name = "Other Switch " + i,
                        Status = i % 2 != 0,
                        Type = i % 2 == 0 ? SwitchType.Normal : SwitchType.PowerMonitoring,
                        UpdatedDateTime = DateTime.UtcNow,
                        X = 0,
                        Y = 0,
                        Order = i - 1,
                    };
                    dbContext.Set<Switch>().Add(theSwitch);
                }


                for (var i = 1; i <= 3; i++)
                {
                    var theSwitch = new Switch
                    {
                        SiteId = "ae8213ef-cdc3-46f9-aff1-845a31f0b39a",
                        CreatedDateTime = DateTime.UtcNow,
                        Name = "Office Switch " + i,
                        Status = i % 2 != 0,
                        Type = i % 2 == 0 ? SwitchType.Normal : SwitchType.PowerMonitoring,
                        UpdatedDateTime = DateTime.UtcNow,
                        X = 0,
                        Y = 0,
                        Order = i - 1,
                    };
                    dbContext.Set<Switch>().Add(theSwitch);
                }


                var wall1 = new Wall
                {
                    SiteId = "5735824c-93cc-4016-b6b3-26f7947bb58e",
                    CreatedDateTime = DateTime.UtcNow,
                    UpdatedDateTime = DateTime.UtcNow,
                    X = 20,
                    Y = 20,
                    Angle = 90,
                    Length = 200,
                    Type = WallType.Double
                };
                dbContext.Set<Wall>().Add(wall1);

                var wall2 = new Wall
                {
                    SiteId = "5735824c-93cc-4016-b6b3-26f7947bb58e",
                    CreatedDateTime = DateTime.UtcNow,
                    UpdatedDateTime = DateTime.UtcNow,
                    X = 20,
                    Y = 20,
                    Angle = 0,
                    Length = 200,
                    Type = WallType.Double
                };
                dbContext.Set<Wall>().Add(wall2);

                var wall3 = new Wall
                {
                    SiteId = "5735824c-93cc-4016-b6b3-26f7947bb58e",
                    CreatedDateTime = DateTime.UtcNow,
                    UpdatedDateTime = DateTime.UtcNow,
                    X = 20,
                    Y = 220,
                    Angle = 45,
                    Length = 282.84271247,
                    Type = WallType.Double
                };
                dbContext.Set<Wall>().Add(wall3);

                var wall4 = new Wall
                {
                    SiteId = "5735824c-93cc-4016-b6b3-26f7947bb58e",
                    CreatedDateTime = DateTime.UtcNow,
                    UpdatedDateTime = DateTime.UtcNow,
                    X = 230,
                    Y = 230,
                    Angle = 135,
                    Length = 282.84271247,
                    Type = WallType.Double
                };
                dbContext.Set<Wall>().Add(wall4);

                dbContext.SaveChanges();


            }

        }
    }
}
