namespace WebApplication5.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Customer : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Customer",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(maxLength: 50),
                        Address = c.String(maxLength: 50),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.ProductSold",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ProductId = c.Int(),
                        CustomerId = c.Int(),
                        StoreId = c.Int(),
                        DateSold = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Customer", t => t.CustomerId)
                .ForeignKey("dbo.Product", t => t.ProductId)
                .ForeignKey("dbo.Store", t => t.StoreId)
                .Index(t => t.ProductId)
                .Index(t => t.CustomerId)
                .Index(t => t.StoreId);
            
            CreateTable(
                "dbo.Product",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(maxLength: 50),
                        Price = c.String(maxLength: 50),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Store",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(maxLength: 50),
                        Address = c.String(maxLength: 50),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.sysdiagrams",
                c => new
                    {
                        diagram_id = c.Int(nullable: false, identity: true),
                        name = c.String(nullable: false, maxLength: 128),
                        principal_id = c.Int(nullable: false),
                        version = c.Int(),
                        definition = c.Binary(),
                    })
                .PrimaryKey(t => t.diagram_id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ProductSold", "StoreId", "dbo.Store");
            DropForeignKey("dbo.ProductSold", "ProductId", "dbo.Product");
            DropForeignKey("dbo.ProductSold", "CustomerId", "dbo.Customer");
            DropIndex("dbo.ProductSold", new[] { "StoreId" });
            DropIndex("dbo.ProductSold", new[] { "CustomerId" });
            DropIndex("dbo.ProductSold", new[] { "ProductId" });
            DropTable("dbo.sysdiagrams");
            DropTable("dbo.Store");
            DropTable("dbo.Product");
            DropTable("dbo.ProductSold");
            DropTable("dbo.Customer");
        }
    }
}
