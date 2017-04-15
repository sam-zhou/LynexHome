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
                    Secret = "{\"D\":\"Z7At6fVvJdIX8QUS5s6qKo1K6YRrikZDCBtmZtFNvsLVDvmB5LNNtQ/TjrcxbmJCxcZCNudlnPSdK298QZFxc3asGpLtPkT9z2zjFOaQA9wpNtvQK7BTP/56QJQP6ioxGfEvilEXVXw+2ERkniu5zgOj5MdLy/T31JTUL6iCIJKsK6x2+pu0QbqCJPnQiZk+GvRB4/Y9VEvtUZl9xJQxuTkR/fYLXRL1sKbOxtWvf1Mimm62T1EH1GmR7cZvKkqdtLKrb/8/gehlcaWZ8ms0rfUWeEJUB1mPvqsCVjH5rvS1rX08j5gPyZtolpRqSoYjvFhk+3y6FQ6EOBX93RHVoQ==\",\"DP\":\"TniHOfpjiWIuvEY46jdEgXfpycz5qwOBvkT59H551kAZvNjthCi3qaIhwpL+Eitfwe0ReqJKD/UYyojfq/6IDV+2UrKcitgd1f4E6dX5NIzQQ1cLN9Xga6hBPfosq12zZPHLUoHxQRtcNb305+EFHiHmEoYxfQl69RJBM3X3iZE=\",\"DQ\":\"KR8L8vC8XiAFSg25dFmVrMxPmWT66+YmJKwanN2XV1bw3uajy5EFE0BjP74Ggt1IvnZm/PftBPQHNRRpF5VaQ5npaV6OVW1qDA2gdAOCU4tOh5Hnge1eN3r7bIwZ7S23ZhHBwvIYv3AHrjU9Ek25hqKMZ1B+A9Ghw22kNLB5BB0=\",\"Exponent\":\"AQAB\",\"InverseQ\":\"FjYzuUqQ4/EFTsWB2upii23mu5r0bEZ579TKNdbzVeSQkGcbI7tTRI4TrOWo07WkiAiJHe4XJtPxc/yj+vjzGhqqxjaaLWMK18qTwPY6OSOavwRZLEqdl/2kVslwZni8JTON18LY9itRM7uaY5lmmDUI7PNpyibbhJo9q0uBJYI=\",\"Modulus\":\"mMxzNRkfAUGaa1CX8VGlsM07alr3mBMYbRWbOEz5/CtsrA8h70GMomHw97iTn6kn0/tTaOUUrEOu7bRZUiKLLlswV8Q5uyfukoNuSKR5bQUFGaZ1/WO11nAcdCcH0vmN8gZ9eRZiXfOx5sWA+SJ8YXN0H9DwlglhrRQZg8WA05bZ5jbAcfzeF3+rfkL+3b7CnZic2Yupk9zrR1uxQnD3qNKR2dlXCtSibb4JVzJ4CNSySqWvP0Q6fB0IBHnqLgJbE7lDRhLveW6IP6wcAZDxGFJ7fWys4Q2CGd0iCjviBHWDtkCWOaB57xTbR5Su7/mNhYWie14cuuWji9DiToNgZw==\",\"P\":\"yx4toDmRKT1nu7MrJeNAbK1VzxxqpoovMiCezDnbv9XGwt2Yk1wejxasPNXVZ3Ca9DBItxZcx+fnKegZh2XzE8O8R+DZuXPEfOOwM+DZNZ5lk5VA/f+9XSjJZJaZeucatap75y4iTpvniuVx6zYIduUteS7Nyor8S3sLFsBch/E=\",\"Q\":\"wJR9dPtEgb63x0Wdw9VNpRSt0eks6JE3CsLZkI80qnbpdZ5cmxIyDl5ww4t5haYiiJnD/FJIwFItdiH+GOyIaghcQnEMedSZG3iQVF6CvrjNhpymLPHqpg3iECmubyUlf3Q78UoVUl8u+3GEQQekwiHvbGyKq7vB5PziJqX9hdc=\"}"
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

                var switch1 = new Switch
                {
                    SiteId = "5735824c-93cc-4016-b6b3-26f7947bb58e",
                    CreatedDateTime = DateTime.UtcNow,
                    Name = "Switch 1",
                    Status = false,
                    Type = SwitchType.PowerMonitoring,
                    UpdatedDateTime = DateTime.UtcNow,
                    X = 0,
                    Y = 0,
                    Order = 1,
                    ChipId = "ESP10499465"//StringExtension.GenerateMACAddress(),
                };
                dbContext.Set<Switch>().Add(switch1);

                var switch2 = new Switch
                {
                    SiteId = "5735824c-93cc-4016-b6b3-26f7947bb58e",
                    CreatedDateTime = DateTime.UtcNow,
                    Name = "Switch 2",
                    Status = false,
                    Type = SwitchType.PowerMonitoring,
                    UpdatedDateTime = DateTime.UtcNow,
                    X = 0,
                    Y = 0,
                    Order = 2,
                    ChipId = "ESP10498757"//StringExtension.GenerateMACAddress(),
                };
                dbContext.Set<Switch>().Add(switch2);

                var switch3 = new Switch
                {
                    SiteId = "5735824c-93cc-4016-b6b3-26f7947bb58e",
                    CreatedDateTime = DateTime.UtcNow,
                    Name = "Switch 3",
                    Status = false,
                    Type = SwitchType.PowerMonitoring,
                    UpdatedDateTime = DateTime.UtcNow,
                    X = 0,
                    Y = 0,
                    Order = 3,
                    ChipId = "ESP10472361"//StringExtension.GenerateMACAddress(),
                };
                dbContext.Set<Switch>().Add(switch3);

                var switch4 = new Switch
                {
                    SiteId = "5735824c-93cc-4016-b6b3-26f7947bb58e",
                    CreatedDateTime = DateTime.UtcNow,
                    Name = "Switch 4",
                    Status = false,
                    Type = SwitchType.PowerMonitoring,
                    UpdatedDateTime = DateTime.UtcNow,
                    X = 0,
                    Y = 0,
                    Order = 4,
                    ChipId = "ESP10499464"//StringExtension.GenerateMACAddress(),
                };
                dbContext.Set<Switch>().Add(switch4);

                var switch5 = new Switch
                {
                    SiteId = "5735824c-93cc-4016-b6b3-26f7947bb58e",
                    CreatedDateTime = DateTime.UtcNow,
                    Name = "Switch 5",
                    Status = false,
                    Type = SwitchType.PowerMonitoring,
                    UpdatedDateTime = DateTime.UtcNow,
                    X = 0,
                    Y = 0,
                    Order = 5,
                    ChipId = "ESP10499179"//StringExtension.GenerateMACAddress(),
                };
                dbContext.Set<Switch>().Add(switch5);

                var switch6 = new Switch
                {
                    SiteId = "5735824c-93cc-4016-b6b3-26f7947bb58e",
                    CreatedDateTime = DateTime.UtcNow,
                    Name = "Switch 6",
                    Status = false,
                    Type = SwitchType.PowerMonitoring,
                    UpdatedDateTime = DateTime.UtcNow,
                    X = 0,
                    Y = 0,
                    Order = 6,
                    ChipId = "ESP10500253"//StringExtension.GenerateMACAddress(),
                };
                dbContext.Set<Switch>().Add(switch6);


                var switch7 = new Switch
                {
                    SiteId = "5735824c-93cc-4016-b6b3-26f7947bb58e",
                    CreatedDateTime = DateTime.UtcNow,
                    Name = "SV 1",
                    Status = false,
                    Type = SwitchType.PowerMonitoring,
                    UpdatedDateTime = DateTime.UtcNow,
                    X = 0,
                    Y = 0,
                    Order = 7,
                    ChipId = "ESP10488107"//StringExtension.GenerateMACAddress(),
                };
                dbContext.Set<Switch>().Add(switch7);

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
                        ChipId = StringExtension.GenerateMACAddress(),
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
                        ChipId = StringExtension.GenerateMACAddress(),
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
                        ChipId = StringExtension.GenerateMACAddress(),
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
