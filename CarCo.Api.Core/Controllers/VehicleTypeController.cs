using CarCo.Api.Core.DBcontext;
using CarCo.Api.Core.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarCo.Api.Core.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleTypeController : ControllerBase
    {
        private readonly DatabaseContext databaseContext;
        private readonly IWebHostEnvironment hostingEnvironment;

        public VehicleTypeController(DatabaseContext DatabaseContext, IWebHostEnvironment hostingEnvironment)
        {
            databaseContext = DatabaseContext;
            this.hostingEnvironment = hostingEnvironment;
        }


        // GET: api/values

        // GET: api/values
        [HttpGet]
        public VehicleTypeTB[] Get()
        {
            try
            {
                var results = databaseContext.VehicleTypeTB.Where(x => x.IsActive).ToList();
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
                var vehicleType = databaseContext.VehicleTypeTB.FirstOrDefault(x => x.ID == id && x.IsActive);
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
                var output = (from offer in databaseContext.VehicleTypeTB
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
                    databaseContext.Add(vehicletb);
                    databaseContext.SaveChanges();
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


                var vehicle = databaseContext.VehicleTypeTB.FirstOrDefault(x => x.ID == id);
                if (vehicle == null)
                {
                    return BadRequest();
                }

                vehicle.Name = vehicletb.Name;
                vehicle.IsActive = vehicletb.IsActive;

                databaseContext.SaveChanges();
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
            var result = await databaseContext.VehicleTypeTB.FindAsync(id);
            if (result == null)
            {
                return NotFound();
            }
            databaseContext.VehicleTypeTB.Remove(result);
            await databaseContext.SaveChangesAsync();
            return Ok();
        }

    }
}
