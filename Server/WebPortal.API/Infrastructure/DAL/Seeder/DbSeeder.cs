using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebPortal.API.Model.IdentityModel;

namespace WebPortal.API.Infrastructure.DAL.Seeder
{
    public class DbSeeder
    {
        public static void SeedDb(ApplicationDbContext context, RoleManager<AppRole> roleManager)
        {
            SeedRole(roleManager);
        }

        private static void SeedRole(RoleManager<AppRole> roleManager)
        {
            AppRole appRoleSuperAdmin = new AppRole()
            {
                Name = "Administrator"
            };

            roleManager.CreateAsync(appRoleSuperAdmin).Wait();
        }

        public static void SeedUsers(UserManager<AppUser> userManager)
        {
            if (userManager.FindByEmailAsync("admin@imanage.com").Result == null)
            {
                AppUser user = new AppUser
                {
                    UserName = "admin@imanage.com",
                    Email = "admin@imanage.com",
                    EmailConfirmed = true
                };

                IdentityResult result = userManager.CreateAsync(user, "Core@2020").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "Administrator").Wait();
                }
            }
        }
    }
}
