using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebPortal.API.Model.BaseModel;
using WebPortal.API.Model.DatabaseModels;
using WebPortal.API.Model.IdentityModel;

namespace WebPortal.API.Infrastructure.DAL
{
    public class ApplicationDbContext : IdentityDbContext<AppUser, AppRole, int>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //Set model default values
            foreach (var entityType in builder.Model.GetEntityTypes()
                 .Where(t => t.ClrType.IsSubclassOf(typeof(BaseEntity))))
            {
                builder.Entity(
                        entityType.Name,
                        x =>
                        {
                            x.Property("RegistedDate")
                                .HasDefaultValueSql("GETDATE()");

                            x.Property("IsActive")
                                .HasDefaultValue(true);
                        });
            }

        }
    }
}
