using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAngularRAC.DBcontext;
using WebAngularRAC.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAngularRAC.Controllers
{
    [Route("api/[controller]")]
    public class CustomerController : Controller
    {
        DatabaseContext _DatabaseContext;
        public CustomerController(DatabaseContext databasecontext)
        {
            _DatabaseContext = databasecontext;
        }

        // GET: api/values
        [HttpGet]
        public CustomerTB[] Get()
        {
            try
            { 
                var Listofcustomers = _DatabaseContext.CustomerTB.ToList();
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
                return _DatabaseContext.CustomerTB.SingleOrDefault(x => x.ID == id);
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
