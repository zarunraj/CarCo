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

    [TypeFilter(typeof(APIAdminAuthorizeAttribute))]
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
        public bool Put(int id, [FromBody] DriverTB drivertb)
        {
            try
            {
                if (string.IsNullOrEmpty(Convert.ToString(id)))
                {
                    return false;
                }

                if (drivertb == null)
                {
                    return false;
                }

                var driverupdate = new DriverTB
                {
                    IsActive = true,
                    Name = Convert.ToString(id),
                    Address = Convert.ToString(drivertb.Address),
                    DrivingLicenseExpiryDate = Convert.ToDateTime(drivertb.DrivingLicenseExpiryDate),
                    DrivingLicenseNumber = Convert.ToString(drivertb.DrivingLicenseNumber),
                    Email = Convert.ToString(drivertb.Email),
                    Phone = Convert.ToString(drivertb.Phone),
                };

                var db = _DatabaseContext;
                db.DriverTB.Attach(driverupdate);
                db.Entry(driverupdate).Property(x => x.Name).IsModified = true;
                db.Entry(driverupdate).Property(x => x.Address).IsModified = true;
                db.Entry(driverupdate).Property(x => x.DrivingLicenseExpiryDate).IsModified = true;
                db.Entry(driverupdate).Property(x => x.DrivingLicenseNumber).IsModified = true;
                db.Entry(driverupdate).Property(x => x.Email).IsModified = true;
                db.Entry(driverupdate).Property(x => x.Phone).IsModified = true;
                db.Entry(driverupdate).Property(x => x.IsActive).IsModified = true;
                db.SaveChanges();
                return true;
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
