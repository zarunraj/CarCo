using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CarCo.Api.Core.DBcontext;
using CarCo.Api.Core.Models;
using Microsoft.AspNetCore.Cors;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CarCo.Api.Core.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsApi")]

    public class ValidateModelNameController : Controller
    {

        DatabaseContext _DatabaseContext;
        public ValidateModelNameController(DatabaseContext DatabaseContext)
        {
            _DatabaseContext = DatabaseContext;
        }

        // POST api/values
        [HttpPost]
        public bool Post([FromBody]CarTB cartb)
        {
            try
            {
                if (string.IsNullOrEmpty(cartb.Registration_Number))
                {
                    return false;
                }

                var output = (from car in _DatabaseContext.CarTB
                              where car.Registration_Number == cartb.Registration_Number
                              select car.Registration_Number).Count();

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
