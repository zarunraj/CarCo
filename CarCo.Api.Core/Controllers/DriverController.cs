using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using CarCo.Api.Core.DBcontext;
using CarCo.Api.Core.Models; 
using CarCo.Api.Core.Filters;
using Microsoft.AspNetCore.Cors;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CarCo.Api.Core.Controllers
{
    [Route("api/[controller]")]

   
    [EnableCors("CorsApi")]
    public class DriverController : Controller
    {
        DatabaseContext _DatabaseContext;
        private readonly IHostEnvironment hostingEnvironment;

        public DriverController(DatabaseContext databasecontext, IHostEnvironment hostingEnvironment)
        {
            _DatabaseContext = databasecontext;
            this.hostingEnvironment = hostingEnvironment;
        }

        // GET: api/values
        [HttpGet]
        [TypeFilter(typeof(APIAdminAuthorizeAttribute))]
        public DriverTB[] Get()
        {
            try
            {
                var results = _DatabaseContext.DriverTB.ToList();
                return results.ToArray();
            }
            catch (Exception)
            {
                throw;
            }
        }
        // GET api/values/5
        [HttpGet("{id}")]
        [TypeFilter(typeof(APIAdminAuthorizeAttribute))]
        public DriverTB Get(int id)
        {
            try
            {
                return _DatabaseContext.DriverTB.SingleOrDefault(x => x.ID == id);
            }
            catch (Exception)
            {
                throw;
            }
        }


        // POST api/values
        [HttpPost]
        [TypeFilter(typeof(APIAdminAuthorizeAttribute))]
        public IActionResult Post([FromBody] DriverTB drivertb)
        {
            try
            {
                drivertb.CreatedOn = DateTime.Now;
                drivertb.IsActive = true;
                _DatabaseContext.Add(drivertb);
                _DatabaseContext.SaveChanges();
                return Ok(drivertb);
            }
            catch (Exception)
            {

                throw;
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        [TypeFilter(typeof(APIAdminAuthorizeAttribute))]
        public IActionResult Put(int id, [FromBody] DriverTB drivertb)
        {
            try
            {
                if (string.IsNullOrEmpty(Convert.ToString(id)))
                {
                    return NotFound();
                }

                if (drivertb == null)
                {
                    return NotFound();
                }

                var db = _DatabaseContext;

                var driver = db.DriverTB.Find(id);
                if(driver is null)
                {
                    return NotFound();
                }
                driver.Name =drivertb?.Name;
                driver.Address = Convert.ToString(drivertb?.Address);
                driver.DrivingLicenseExpiryDate=Convert.ToDateTime(drivertb?.DrivingLicenseExpiryDate);
                driver.DrivingLicenseNumber = drivertb?.DrivingLicenseNumber;
                driver.CurrentLocation = drivertb?.CurrentLocation;
                driver.Email = drivertb?.Email;
                driver.Phone = drivertb?.Phone;
                driver.IsActive = drivertb.IsActive;

               
                db.SaveChanges();
                return Ok(driver);
            }
            catch (Exception)
            {
                throw;
            }

        }


        // PUT api/values/5
        [HttpDelete("{id}")]
        [TypeFilter(typeof(APIAdminAuthorizeAttribute))]
        public async Task<IActionResult> Delete(int id)
        {
            var driver = await _DatabaseContext.DriverTB.FindAsync(id);
            if (driver == null)
            {
                return NotFound();
            }
            _DatabaseContext.DriverTB.Remove(driver);
            await _DatabaseContext.SaveChangesAsync();
            return Ok();
        }



        [Route("{id}/drivinglicense")]
        [HttpGet()]
        public async Task<IActionResult> GetDriverLicenseImage([FromRoute] int id, [FromQuery] string type)
        {
            var driver = await _DatabaseContext.DriverTB.FindAsync(id);

            var pathDB = driver.DrivingLicenseImage;
            pathDB = string.IsNullOrEmpty(pathDB) ? "images\\no-image.jpg" : pathDB;
            var imagePath = Path.Combine(hostingEnvironment.ContentRootPath,"docs", pathDB);

            return new PhysicalFileResult(imagePath, "image/jpeg");

        }


        [Route("{id}/profilePhoto")]
        [HttpGet()]
        public async Task<IActionResult> GetDriverProfilePhoto([FromRoute] int id, [FromQuery] string type)
        {
            var driver = await _DatabaseContext.DriverTB.FindAsync(id);

            var pathDB = driver.ProfileImage;
            pathDB = string.IsNullOrEmpty(pathDB) ? "images\\no-image.jpg" : pathDB;
            var imagePath = Path.Combine(hostingEnvironment.ContentRootPath,"docs", pathDB);

            return new PhysicalFileResult(imagePath, "image/jpeg");

        }
    }
}
