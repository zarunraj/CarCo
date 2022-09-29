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
    public class CustomerController : Controller
    {
        private readonly DatabaseContext databaseContext;
        public CustomerController(DatabaseContext DatabaseContext)
        {
            databaseContext = DatabaseContext;
        }

        // GET: api/values
        [HttpGet]
        public CustomerTB[] Get()
        {
            try
            { 
                var Listofcustomers = databaseContext.CustomerTB.ToList();
                return Listofcustomers.ToArray();
            }
            catch (Exception)
            {
                throw;
            }
        }
        // GET api/values/5
        [HttpGet("{id}")]
        public CustomerTB Get(int id)
        {
            try
            {
                return databaseContext.CustomerTB.SingleOrDefault(x => x.ID == id);
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
