using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAngularRAC.Models;
using WebAngularRAC.DBcontext;
using System.IO;
using Microsoft.Net.Http.Headers;
using Microsoft.AspNetCore.Hosting;
using WebAngularRAC.Filters;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAngularRAC.Controllers
{
    [Route("api/[controller]")]
    [TypeFilter(typeof(APIAdminAuthorizeAttribute))]
    public class CarsController : Controller
    {
        DatabaseContext _DatabaseContext;
        private readonly IHostingEnvironment hostingEnvironment;

        public CarsController(DatabaseContext DatabaseContext, IHostingEnvironment hostingEnvironment)
        {
            _DatabaseContext = DatabaseContext;
            this.hostingEnvironment = hostingEnvironment;
        }

        // GET: api/values
        [HttpGet]
        public CarTB[] Get()
        {
            try
            {
                var ListofCars = _DatabaseContext.CarTB.Select(i=>new CarTB {Brand=i.Brand,Color=i.Color,DriverID=i.DriverID,DriverName=i.DriverTB.Name,Fueltype=i.Fueltype,Image=i.Image,Insurance_Expiry=i.Insurance_Expiry,Insurance_Image=i.Insurance_Image,IsActive=i.IsActive,C_Id=i.C_Id,CreatedOn=i.CreatedOn,IsAvailableForRide=i.IsAvailableForRide,Model_Name=i.Model_Name,IsDocumentVerifired=i.IsDocumentVerifired,No_of_Pas=i.No_of_Pas,Permit_Image=i.Permit_Image,Pollution_Certificate=i.Pollution_Certificate,Pollution_Expiry=i.Pollution_Expiry,RC_Book_Image=i.RC_Book_Image,RC_Book_ValidityDate=i.RC_Book_ValidityDate,Registration_Number=i.Registration_Number,Tax_Expiry=i.Tax_Expiry,Tax_Image=i.Tax_Image,UserID=i.UserID,VehicleTypeID=i.VehicleTypeID,VehicleType=i.VehicleTypeTB.Name }).ToList().OrderByDescending(x => x.C_Id);
                return ListofCars.ToArray();
            }
            catch (Exception)
            {

                throw;
            }
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public CarTB Get(int id)
        {
            try
            {
                var output = (from Cars in _DatabaseContext.CarTB
                              where Cars.C_Id == id
                              select Cars).SingleOrDefault();

                return output;
            }
            catch (Exception)
            {
                throw;
            }
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody] CarTB cartb)
        {
            try
            {
                var output = (from Cars in _DatabaseContext.CarTB
                              where Cars.Registration_Number == cartb.Registration_Number && Cars.Brand == cartb.Brand
                              select Cars.Brand).Count();

                if (output > 0)
                {
                    return BadRequest("Already exists");
                }
                else
                {
                    var UserID = (from user in _DatabaseContext.UserMasterTB
                                  where user.Username == cartb.Username
                                  select user.U_Id).SingleOrDefault();
                    cartb.UserID = UserID;
                    cartb.IsActive = true;
                    cartb.IsAvailableForRide = true;
                    cartb.IsDocumentVerifired = false;
                    cartb.CreatedOn = DateTime.Now;
                    _DatabaseContext.Add(cartb);
                    _DatabaseContext.SaveChanges();
                    return Ok(cartb);
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] CarTB cartb)
        {
            try
            {
                if (string.IsNullOrEmpty(Convert.ToString(id)))
                {
                    return NotFound("Invalid vehicle id");
                }

                if (cartb == null)
                {
                    return BadRequest("Invalid data");
                }

                var carupdate = await _DatabaseContext.CarTB.FindAsync(id);
                if (carupdate == null)
                {
                    return NotFound();
                }
                carupdate.Registration_Number = cartb.Registration_Number;
                carupdate.Brand = cartb.Brand;
                carupdate.Color = cartb.Color;
                carupdate.Fueltype = cartb.Fueltype;
                carupdate.No_of_Pas = cartb.No_of_Pas;
                carupdate.Model_Name = cartb.Model_Name;
                carupdate.IsDocumentVerifired = cartb.IsDocumentVerifired;
                carupdate.IsActive = cartb.IsActive;
                carupdate.Insurance_Expiry = cartb.Insurance_Expiry;
                carupdate.Pollution_Expiry = cartb.Pollution_Expiry;
                carupdate.RC_Book_ValidityDate = cartb.RC_Book_ValidityDate;
                carupdate.Tax_Expiry = cartb.Tax_Expiry;
                carupdate.VehicleTypeID = cartb.VehicleTypeID;
                carupdate.DriverID = cartb.DriverID;
                //_DatabaseContext.CarTB.Add(carupdate);
                _DatabaseContext.SaveChanges();

                return Ok(carupdate);
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
            var car = await _DatabaseContext.CarTB.FindAsync(id);
            if (car == null)
            {
                return NotFound();
            }
            _DatabaseContext.CarTB.Remove(car);
            await _DatabaseContext.SaveChangesAsync();
            return Ok();
        }
    }
}
