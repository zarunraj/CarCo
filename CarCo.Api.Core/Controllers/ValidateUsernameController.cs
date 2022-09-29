using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CarCo.Api.Core.Models;
using CarCo.Api.Core.DBcontext;
using Microsoft.AspNetCore.Cors;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CarCo.Api.Core.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsApi")]
    public class ValidateUsernameController : Controller
    {

        DatabaseContext _DatabaseContext;
        public ValidateUsernameController(DatabaseContext DatabaseContext)
        {
            _DatabaseContext = DatabaseContext;
        }


        // POST api/values
        [HttpPost]
        public bool Post([FromBody]UserMasterTB usermastertb)
        {
            try
            {
                if (string.IsNullOrEmpty(usermastertb.Username))
                {
                    return false;
                }

                var output = (from usermaster in _DatabaseContext.UserMasterTB
                              where usermastertb.Username == usermaster.Username
                              select usermaster.Username).Count();

                if (output > 0)
                {
                    return false;
                }
                else
                {
                    return true;
                }

            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
