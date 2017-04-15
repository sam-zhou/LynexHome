namespace LynexHome.Core.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Roles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
            
            CreateTable(
                "dbo.UserRoles",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        RoleId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.Roles", t => t.RoleId, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Phone = c.String(),
                        Email = c.String(maxLength: 256),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(),
                        SecurityStamp = c.String(),
                        PhoneNumber = c.String(),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.UserName, unique: true, name: "UserNameIndex");
            
            CreateTable(
                "dbo.UserClaims",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(nullable: false, maxLength: 128),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.UserLogins",
                c => new
                    {
                        LoginProvider = c.String(nullable: false, maxLength: 128),
                        ProviderKey = c.String(nullable: false, maxLength: 128),
                        UserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.Sites",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        SerialNumber = c.String(nullable: false, maxLength: 128),
                        Secret = c.String(),
                        IsDefault = c.Boolean(nullable: false),
                        Name = c.String(),
                        Address = c.String(),
                        Suburb = c.String(),
                        State = c.String(maxLength: 30),
                        Postcode = c.String(maxLength: 4),
                        Country = c.String(maxLength: 20),
                        UpdatedDateTime = c.DateTime(nullable: false),
                        CreatedDateTime = c.DateTime(nullable: false),
                        UserId = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.UserId)
                .Index(t => t.SerialNumber, unique: true, name: "IX_Site_SerialNumber")
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.Switches",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false, maxLength: 50),
                        Status = c.Boolean(nullable: false),
                        X = c.Int(nullable: false),
                        Y = c.Int(nullable: false),
                        Type = c.Int(nullable: false),
                        ChipId = c.String(maxLength: 20),
                        Order = c.Int(nullable: false),
                        CreatedDateTime = c.DateTime(nullable: false),
                        UpdatedDateTime = c.DateTime(nullable: false),
                        SiteId = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Sites", t => t.SiteId)
                .Index(t => t.SiteId);
            
            CreateTable(
                "dbo.Walls",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        X = c.Int(nullable: false),
                        Y = c.Int(nullable: false),
                        Length = c.Double(nullable: false),
                        Angle = c.Int(nullable: false),
                        Type = c.Int(nullable: false),
                        CreatedDateTime = c.DateTime(nullable: false),
                        UpdatedDateTime = c.DateTime(nullable: false),
                        SiteId = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Sites", t => t.SiteId)
                .Index(t => t.SiteId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Walls", "SiteId", "dbo.Sites");
            DropForeignKey("dbo.Sites", "UserId", "dbo.Users");
            DropForeignKey("dbo.Switches", "SiteId", "dbo.Sites");
            DropForeignKey("dbo.UserRoles", "UserId", "dbo.Users");
            DropForeignKey("dbo.UserLogins", "UserId", "dbo.Users");
            DropForeignKey("dbo.UserClaims", "UserId", "dbo.Users");
            DropForeignKey("dbo.UserRoles", "RoleId", "dbo.Roles");
            DropIndex("dbo.Walls", new[] { "SiteId" });
            DropIndex("dbo.Switches", new[] { "SiteId" });
            DropIndex("dbo.Sites", new[] { "UserId" });
            DropIndex("dbo.Sites", "IX_Site_SerialNumber");
            DropIndex("dbo.UserLogins", new[] { "UserId" });
            DropIndex("dbo.UserClaims", new[] { "UserId" });
            DropIndex("dbo.Users", "UserNameIndex");
            DropIndex("dbo.UserRoles", new[] { "RoleId" });
            DropIndex("dbo.UserRoles", new[] { "UserId" });
            DropIndex("dbo.Roles", "RoleNameIndex");
            DropTable("dbo.Walls");
            DropTable("dbo.Switches");
            DropTable("dbo.Sites");
            DropTable("dbo.UserLogins");
            DropTable("dbo.UserClaims");
            DropTable("dbo.Users");
            DropTable("dbo.UserRoles");
            DropTable("dbo.Roles");
        }
    }
}