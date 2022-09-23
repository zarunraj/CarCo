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
    public class VehicleTypeController : Controller
    {
        DatabaseContext _DatabaseContext;
        private readonly IHostingEnvironment _environment;

        public VehicleTypeController(DatabaseContext databasecontext, IHostingEnvironment hostingEnvironment)
        {
            _DatabaseContext = databasecontext;
            _environment = hostingEnvironment;
        }

        // GET: api/values
       
        // GET: api/values
        [HttpGet]
        public VehicleTypeTB[] Get()
        {
            try
            {
                var results = _DatabaseContext.VehicleTypeTB.Where(x=>x.IsActive).ToList();
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
                var vehicleType = _DatabaseContext.VehicleTypeTB.FirstOrDefault(x => x.ID == id && x.IsActive );
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
        public IActionResult Post([FromBody] VehicleTypeTB vehicletb)
        {
            try
            {
                var output = (from offer in _DatabaseContext.VehicleTypeTB
                              where offer.Name == vehicletb.Name
                              select offer.Name).Count();

                if (output > 0)
                {
                    return BadRequest("Already exists!");
                }
                else
                {
                    vehicletb.CreatedOn = DateTime.Now;
                    vehicletb.IsActive = true;
                    _DatabaseContext.Add(vehicletb);
                    _DatabaseContext.SaveChanges();
                    return Ok(vehicletb);
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

 

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] VehicleTypeTB vehicletb)
        {
            try
            {
                if (string.IsNullOrEmpty(Convert.ToString(id)))
                {
                    return BadRequest();
                }

                if (vehicletb == null)
                {
                    return BadRequest();
                }


                var vehicle = _DatabaseContext.VehicleTypeTB.FirstOrDefault(x => x.ID == id);
                if (vehicle == null)
                {
                    return BadRequest();
                }

                vehicle.Name = vehicletb.Name;
                vehicle.IsActive = vehicletb.IsActive;

                _DatabaseContext.SaveChanges();
                return Ok(vehicle);
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
            var result = await _DatabaseContext.VehicleTypeTB.FindAsync(id);
            if (result == null)
            {
                return NotFound();
            }
            _DatabaseContext.VehicleTypeTB.Remove(result);
            await _DatabaseContext.SaveChangesAsync();
            return Ok();
        }
    }
}
