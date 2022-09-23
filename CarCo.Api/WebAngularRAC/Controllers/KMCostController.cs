using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using WebAngularRAC.DBcontext;
using WebAngularRAC.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAngularRAC.Controllers
{
    [Route("api/[controller]")]
    public class KMCostController : Controller
    {
        DatabaseContext _DatabaseContext;
        private readonly IHostingEnvironment _environment;

        public KMCostController(DatabaseContext databasecontext, IHostingEnvironment hostingEnvironment)
        {
            _DatabaseContext = databasecontext;
            _environment = hostingEnvironment;
        }

        // GET: api/values
        [HttpGet]
        public KMCostTB[] Get()
        {
            try
            {
                var results = _DatabaseContext.KMCostTB.ToList();
                return results.ToArray();
            }
            catch (Exception)
            {
                throw;
            }
        }
        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var vehicleType = _DatabaseContext.KMCostTB.FirstOrDefault(x => x.ID == id);
                if (vehicleType == null)
                {
                    return BadRequest();
                }
                return Ok(vehicleType);
            }
            catch (Exception)
            {
                throw;
            }
        }


        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody] KMCostTB kmcost)
        {
            try
            {
                var output = (from km in _DatabaseContext.KMCostTB
                              where km.VehicleTypeID == kmcost.VehicleTypeID
                              select km.VehicleTypeID).Count();

                if (output > 0)
                {
                    return BadRequest("Already exists!");
                }
                else
                {
                    _DatabaseContext.Add(kmcost);
                    _DatabaseContext.SaveChanges();
                    return Ok(kmcost);
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

 

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] KMCostTB kmcost)
        {
            try
            {
                if (string.IsNullOrEmpty(Convert.ToString(id)))
                {
                    return BadRequest();
                }

                if (kmcost == null)
                {
                    return BadRequest();
                }


                var km = _DatabaseContext.KMCostTB.FirstOrDefault(x => x.ID == id);
                if (km == null)
                {
                    return BadRequest();
                }

                km.VehicleTypeID = kmcost.VehicleTypeID;
                km.KMCost = kmcost.KMCost;

                _DatabaseContext.SaveChanges();
                return Ok(km);
            }
            catch (Exception)
            {
                throw;
            }

        }


        // PUT api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _DatabaseContext.KMCostTB.FindAsync(id);
            if (result == null)
            {
                return NotFound();
            }
            _DatabaseContext.KMCostTB.Remove(result);
            await _DatabaseContext.SaveChangesAsync();
            return Ok();
        }
    }
}
