using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CarCo.Api.Core.Models;
using CarCo.Api.Core.DBcontext;
using CarCo.Api.Core.Filters;
using Microsoft.AspNetCore.Cors;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CarCo.Api.Core.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsApi")]


    public class UserDetailsController : Controller
    {
        DatabaseContext _DatabaseContext;
        public UserDetailsController(DatabaseContext DatabaseContext)
        {
            _DatabaseContext = DatabaseContext;
        }


        // POST api/values
        [HttpPost]
        public UserMasterTB Post([FromBody]CommonModel CommonModel)
        {
            try
            {
                if (string.IsNullOrEmpty(CommonModel.Username))
                {
                    return null;
                }

                var Userdetails = (from user in _DatabaseContext.UserMasterTB
                                   where user.Username == CommonModel.Username
                                   select user).SingleOrDefault();

                return Userdetails;
            }
            catch (Exception)
            {

                throw;
            }

        }

       
    }
}
