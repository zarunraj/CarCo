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
    public class BankListController : Controller
    {
        DatabaseContext _DatabaseContext;
        public BankListController(DatabaseContext databasecontext)
        {
            _DatabaseContext = databasecontext;
        }

        // GET: api/values
        [HttpGet]
        public BankTB[] Get()
        {
            try
            {
                //BankTB
                var Listofbanks = _DatabaseContext.BankTB.ToList();
                return Listofbanks.ToArray();
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
