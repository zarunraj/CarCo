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

    public class ReviewsController : Controller
    {
        DatabaseContext _DatabaseContext;
        public ReviewsController(DatabaseContext databasecontext)
        {
            _DatabaseContext = databasecontext;
        }

        // GET: api/values
        [HttpGet]
        public ReviewsTB[] Get()
        {
            try
            { 
                var Listofcustomers = _DatabaseContext.ReviewsTB.ToList().OrderByDescending(x=>x.CreatedOn);
                return Listofcustomers.ToArray();
            }
            catch (Exception)
            {
                throw;
            }
        }
        // GET api/values/5
        [HttpGet("{id}")]
        public ReviewsTB Get(int id)
        {
            try
            {
                return _DatabaseContext.ReviewsTB.SingleOrDefault(x => x.ID == id);
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
