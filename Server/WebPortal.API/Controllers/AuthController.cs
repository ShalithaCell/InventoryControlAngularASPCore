using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebPortal.API.Infrastructure.DAL;
using WebPortal.API.Infrastructure.Interfaces;
using WebPortal.API.Model.IdentityModel;
using WebPortal.API.Model.RequestModel;
using WebPortal.API.Model.ResponseModel;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebPortal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ApiController
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<AppRole> _roleManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IAuthenticationServices _authenticationServices;

        public AuthController(ApplicationDbContext context, UserManager<AppUser> userManager, RoleManager<AppRole> roleManager, SignInManager<AppUser> signInManager, IAuthenticationServices authenticationServices)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _authenticationServices = authenticationServices;
        }

        // POST api/<AuthController>
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] AuthenticateModel model)
        {
            AuthenticatedResult authenticatedResult = new AuthenticatedResult();

            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                //current user
                var user = await _userManager.FindByNameAsync(model.Email).ConfigureAwait(true);
                // Get the roles for the user
                var roles = await _userManager.GetRolesAsync(user).ConfigureAwait(true);
                var RoleDetails = _context.Roles.Where(o => o.Name == roles[0]).FirstOrDefault();

                authenticatedResult.Authenticated = true;
                authenticatedResult.Email = user.Email;
                authenticatedResult.Role = RoleDetails.Name;
                authenticatedResult.RoleID = RoleDetails.Id;
                authenticatedResult.UserID = user.Id;
                authenticatedResult.UserName = user.UserName;
                authenticatedResult.StatusCode = StatusCodes.Status200OK;
                authenticatedResult = _authenticationServices.GenerateJWT(authenticatedResult);

                return Ok(authenticatedResult);
            }
            else if (result.RequiresTwoFactor)
            {
                authenticatedResult.Authenticated = false;
                authenticatedResult.StatusCode = StatusCodes.Status203NonAuthoritative;
                authenticatedResult.ErrorMessages = new List<string> { "two factor authentication is allowed. " };
                return Ok(authenticatedResult);
            }
            else if (result.IsLockedOut)
            {
                authenticatedResult.Authenticated = false;
                authenticatedResult.StatusCode = StatusCodes.Status401Unauthorized;
                authenticatedResult.ErrorMessages = new List<string> { "Your account is locked. please contact your system administrator." };
                return Unauthorized(authenticatedResult);
            }
            else
            {
                authenticatedResult.Authenticated = false;
                authenticatedResult.StatusCode = StatusCodes.Status401Unauthorized;
                authenticatedResult.ErrorMessages = new List<string> { "Incorrect email or password." };
                return Unauthorized(authenticatedResult);
            }
        }

    }
}
