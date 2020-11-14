using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebPortal.API.Model.ResponseModel;

namespace WebPortal.API.Infrastructure.Interfaces
{
    public interface IAuthenticationServices
    {
        /// <summary>
        /// generate JWT token
        /// </summary>
        /// <param name="authenticatedResult"></param>
        /// <returns></returns>
        public AuthenticatedResult GenerateJWT(AuthenticatedResult authenticatedResult);
    }
}
