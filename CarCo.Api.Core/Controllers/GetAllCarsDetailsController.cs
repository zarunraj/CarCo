using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CarCo.Api.Core.DBcontext;
using CarCo.Api.Core.Models;
using CarCo.Api.Core.Filters;
using Microsoft.AspNetCore.Cors;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CarCo.Api.Core.Controllers
{
    [Route("api/[controller]")]
    [TypeFilter(typeof(APIAdminAuthorizeAttribute))]
    [EnableCors("CorsApi")]
    public class GetAllCarsDetailsController : Controller
    {
        DatabaseContext _DatabaseContext;
        public GetAllCarsDetailsController(DatabaseContext DatabaseContext)
        {
            _DatabaseContext = DatabaseContext;
        }

        // GET: api/values
        [HttpGet]
        public CarTB[] Get()
        {
            try
            {
                var ListofCars = _DatabaseContext.CarTB.ToList().OrderByDescending(x=>x.C_Id);
                return ListofCars.ToArray();
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
