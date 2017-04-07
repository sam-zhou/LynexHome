using Lynex.Extension;
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
                            Email = "test@lynex.com.au",
                            EmailConfirmed = true,
                            Phone = "0430501022",
                            PhoneNumber = "0430501022",
                            PhoneNumberConfirmed = true,
                            AccessFailedCount = 0,
                            LockoutEnabled = false,
                            UserName = "test@lynex.com.au",
                            SecurityStamp = "7668b7bc-7a5d-4b3b-8388-f2e5c59f3d43",
                            PasswordHash = "ABJ1bxk+trJ6PTk4iCBSq/WLDVmhI455FFxZbcXHtH1Xw2NyTKHsJmrWQ1Mbl7S4SQ=="
                        };
                        userManager.Create(user);
                        userManager.AddToRole(user.Id, "Administrator");

                        var user2 = new User("b1f9c2ce-ad49-4251-9f33-f0dc8a2080c9")
                        {
                            Email = "samzhou.it@gmail.com",
                            EmailConfirmed = true,
                            Phone = "0430501022",
                            PhoneNumber = "0430501022",
                            PhoneNumberConfirmed = true,
                            AccessFailedCount = 0,
                            LockoutEnabled = false,
                            UserName = "samzhou.it@gmail.com",
                            SecurityStamp = "6c5d586d-8390-4d96-9db7-f06bb2c6a6df",
                            PasswordHash = "ANNNzqwEGjePRrU/8VbqSXnJynL/wP51zG+1Ilf424Pu9nYvLWmfa0owBFtj99fywQ=="
                        };
                        userManager.Create(user2);
                        userManager.AddToRole(user2.Id, "Administrator");
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
                    SerialNumber = "RuHqYCQezwdrBmueo8ni",
                    Secret = "Zex6FTRzmp5UDResRDbtgr7ZtrZuzPTdWQvWnyD6jWy4FsVFNzaQZZawWSSfrAACfL9DCYKxGaNAChp53ADidNVbjebEugBNCawW"
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
                    SerialNumber = "hcShsFBNtWgP95enHcSM",
                    Secret = "MWFX6PvK7TZVXLZ75SWBmzmYpr74VoP7b4etbRe7mizXbzfjiz7B9wnFCpDNDuZJ2XY2dNgJonH8vpmGAGnGQLQEyMfRkxmysXzL"
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
                    SerialNumber = "yP93qCe9ZeiRNNNa5ZBK",
                    Secret = "HgUGCx4sfSpvBvcAhX9p7GKHQc8wpYGg5tSWhtHn4xjQQebEQvQmAg5EWtkuVSSPvqN7EmP7EjnveZtfMJeAEi83u47wc9DKrrD6"
                };

                dbContext.Set<Site>().Add(site3);

                var site4 = new Site("bba331f0-33a1-4a08-bdec-ea8257e807a9")
                {
                    IsDefault = true,
                    UserId = "b1f9c2ce-ad49-4251-9f33-f0dc8a2080c9",
                    Address = "11 Braceby Close",
                    Country = "Australia",
                    CreatedDateTime = DateTime.UtcNow,
                    Name = "Willetton",
                    Postcode = "6155",
                    State = "Western Australia",
                    Suburb = "Willetton",
                    UpdatedDateTime = DateTime.UtcNow,
                    SerialNumber = "oVCZ49N7jDr6VgrnYHGF",
                    Secret = "pShhgsaTuXQpyB7g8eKT7i5J3oWJGtkyTD5dBxuPEHvs3wsBzscMW4spNTZnqLDXe2fEP2nVsjUxrATNC3VetJRgBNmR64vK4dMd"
                };

                dbContext.Set<Site>().Add(site4);

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
                        Mac = StringExtension.GenerateMACAddress(),
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
                        Mac = StringExtension.GenerateMACAddress(),
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
                        Mac = StringExtension.GenerateMACAddress(),
                    };
                    dbContext.Set<Switch>().Add(theSwitch);
                }

                for (var i = 1; i <= 6; i++)
                {
                    var theSwitch = new Switch
                    {
                        SiteId = "bba331f0-33a1-4a08-bdec-ea8257e807a9",
                        CreatedDateTime = DateTime.UtcNow,
                        Name = "Switch " + i,
                        Status = i % 2 != 0,
                        Type = i % 2 == 0 ? SwitchType.Normal : SwitchType.PowerMonitoring,
                        UpdatedDateTime = DateTime.UtcNow,
                        X = 0,
                        Y = 0,
                        Order = i - 1,
                        Mac = StringExtension.GenerateMACAddress(),
                    };
                    dbContext.Set<Switch>().Add(theSwitch);
                }


                var wall1 = new Wall
                {
                    SiteId = "5735824c-93cc-4016-b6b3-26f7947bb58e",
                    CreatedDateTime = DateTime.UtcNow,
                    UpdatedDateTime = DateTime.UtcNow,
                    X = 94,
                    Y = 252,
                    Angle = 270,
                    Length = 194,
                    Type = WallType.Single
                };
                dbContext.Set<Wall>().Add(wall1);

                var wall2 = new Wall
                {
                    SiteId = "5735824c-93cc-4016-b6b3-26f7947bb58e",
                    CreatedDateTime = DateTime.UtcNow,
                    UpdatedDateTime = DateTime.UtcNow,
                    X = 448,
                    Y = -100,
                    Angle = 0,
                    Length = 104,
                    Type = WallType.Double
                };
                dbContext.Set<Wall>().Add(wall2);

                var wall3 = new Wall
                {
                    SiteId = "5735824c-93cc-4016-b6b3-26f7947bb58e",
                    CreatedDateTime = DateTime.UtcNow,
                    UpdatedDateTime = DateTime.UtcNow,
                    X = 1200,
                    Y = 432,
                    Angle = 0,
                    Length = 319.145802349033,
                    Type = WallType.Single
                };
                dbContext.Set<Wall>().Add(wall3);

                
                dbContext.Set<Wall>().Add(new Wall
                {
                    SiteId = "5735824c-93cc-4016-b6b3-26f7947bb58e",
                    CreatedDateTime = DateTime.UtcNow,
                    UpdatedDateTime = DateTime.UtcNow,
                    X = 703,
                    Y = 947,
                    Angle = 90,
                    Length = 276.828999999999,
                    Type = WallType.Double
                });

                dbContext.Set<Wall>().Add(new Wall
                {
                    SiteId = "5735824c-93cc-4016-b6b3-26f7947bb58e",
                    CreatedDateTime = DateTime.UtcNow,
                    UpdatedDateTime = DateTime.UtcNow,
                    X = 699,
                    Y = 748,
                    Angle = 360,
                    Length = 204.493579850322,
                    Type = WallType.Single
                });

                dbContext.Set<Wall>().Add(new Wall
                {
                    SiteId = "5735824c-93cc-4016-b6b3-26f7947bb58e",
                    CreatedDateTime = DateTime.UtcNow,
                    UpdatedDateTime = DateTime.UtcNow,
                    X = 95,
                    Y = 5,
                    Angle = 270,
                    Length = 359.000000000007,
                    Type = WallType.Double
                });
                dbContext.Set<Wall>().Add(new Wall
                {
                    SiteId = "5735824c-93cc-4016-b6b3-26f7947bb58e",
                    CreatedDateTime = DateTime.UtcNow,
                    UpdatedDateTime = DateTime.UtcNow,
                    X = 1201,
                    Y = 749,
                    Angle = 90,
                    Length = 500.963381096862,
                    Type = WallType.Single
                });
                dbContext.Set<Wall>().Add(new Wall
                {
                    SiteId = "5735824c-93cc-4016-b6b3-26f7947bb58e",
                    CreatedDateTime = DateTime.UtcNow,
                    UpdatedDateTime = DateTime.UtcNow,
                    X = 1204,
                    Y = 432,
                    Angle = 90,
                    Length = 504.662845174875,
                    Type = WallType.Double
                });
                dbContext.Set<Wall>().Add(new Wall
                {
                    SiteId = "5735824c-93cc-4016-b6b3-26f7947bb58e",
                    CreatedDateTime = DateTime.UtcNow,
                    UpdatedDateTime = DateTime.UtcNow,
                    X = 433,
                    Y = 747,
                    Angle = 90,
                    Length = 339.065299167577,
                    Type = WallType.Double
                });
                dbContext.Set<Wall>().Add(new Wall
                {
                    SiteId = "5735824c-93cc-4016-b6b3-26f7947bb58e",
                    CreatedDateTime = DateTime.UtcNow,
                    UpdatedDateTime = DateTime.UtcNow,
                    X = 92,
                    Y = 437,
                    Angle = 270,
                    Length = 610.679000000001,
                    Type = WallType.Single
                });
                dbContext.Set<Wall>().Add(new Wall
                {
                    SiteId = "5735824c-93cc-4016-b6b3-26f7947bb58e",
                    CreatedDateTime = DateTime.UtcNow,
                    UpdatedDateTime = DateTime.UtcNow,
                    X = 704,
                    Y = -100,
                    Angle = 90,
                    Length = 254.048950002483,
                    Type = WallType.Double
                });
                dbContext.Set<Wall>().Add(new Wall
                {
                    SiteId = "5735824c-93cc-4016-b6b3-26f7947bb58e",
                    CreatedDateTime = DateTime.UtcNow,
                    UpdatedDateTime = DateTime.UtcNow,
                    X = 426,
                    Y = 747,
                    Angle = 0,
                    Length = 205.186,
                    Type = WallType.Double
                });
                dbContext.Set<Wall>().Add(new Wall
                {
                    SiteId = "5735824c-93cc-4016-b6b3-26f7947bb58e",
                    CreatedDateTime = DateTime.UtcNow,
                    UpdatedDateTime = DateTime.UtcNow,
                    X = 286,
                    Y = -1,
                    Angle = 0,
                    Length = 251.294,
                    Type = WallType.Single
                });
                dbContext.Set<Wall>().Add(new Wall
                {
                    SiteId = "5735824c-93cc-4016-b6b3-26f7947bb58e",
                    CreatedDateTime = DateTime.UtcNow,
                    UpdatedDateTime = DateTime.UtcNow,
                    X = 99,
                    Y = 753,
                    Angle = 180,
                    Length = 753.35,
                    Type = WallType.Double
                });
                dbContext.Set<Wall>().Add(new Wall
                {
                    SiteId = "5735824c-93cc-4016-b6b3-26f7947bb58e",
                    CreatedDateTime = DateTime.UtcNow,
                    UpdatedDateTime = DateTime.UtcNow,
                    X = 705,
                    Y = 438,
                    Angle = 180,
                    Length = 539.66,
                    Type = WallType.Double
                });
                dbContext.SaveChanges();


            }

        }
    }
}
