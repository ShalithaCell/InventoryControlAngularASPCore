using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebPortal.API.Infrastructure.Interfaces;
using WebPortal.API.Model.ResponseModel;
using WebPortal.API.Model.SystemModel;

namespace WebPortal.API.ApplicationCore.Services
{
    public class AuthenticationServices : IAuthenticationServices
    {
        private readonly AppSettings _appSettings;

        public AuthenticationServices(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }
        public AuthenticatedResult GenerateJWT(AuthenticatedResult authenticatedResult)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, authenticatedResult.UserID.ToString()),
                    new Claim(ClaimTypes.Role, authenticatedResult.RoleID.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            authenticatedResult.Token = tokenHandler.WriteToken(token);

            return authenticatedResult;
        }

    }
}
