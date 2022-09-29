using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CarCo.Api.Core.Models;
using CarCo.Api.Core.DBcontext;
using System.IO;
using Microsoft.Net.Http.Headers;
using Microsoft.AspNetCore.Hosting;
using CarCo.Api.Core.Filters;
using Microsoft.AspNetCore.Cors;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CarCo.Api.Core.Controllers
{
    [Route("api/[controller]")]
    [TypeFilter(typeof(APIAdminAuthorizeAttribute))]
    [EnableCors("CorsApi")]
    public class CarsController : Controller
    {
        DatabaseContext _DatabaseContext;
        private readonly IHostEnvironment hostingEnvironment;

        public CarsController(DatabaseContext DatabaseContext, IHostEnvironment hostingEnvironment)
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

                var ListofCars = (from car in _DatabaseContext.CarTB
                                  join driver in _DatabaseContext.DriverTB
                                     on car.DriverID equals driver.ID
                                  join vtype in _DatabaseContext.VehicleTypeTB
                                 on car.VehicleTypeID equals vtype.ID
                                  select new CarTB
                                  {
                                      Brand = car.Brand,
                                      Color = car.Color,
                                      DriverID = car.DriverID,
                                      DriverName = driver.Name,
                                      Fueltype = car.Fueltype,
                                      Image = car.Image,
                                      Insurance_Expiry = car.Insurance_Expiry,
                                      Insurance_Image = car.Insurance_Image,
                                      IsActive = car.IsActive,
                                      C_Id = car.C_Id,
                                      CreatedOn = car.CreatedOn,
                                      IsAvailableForRide = car.IsAvailableForRide,
                                      Model_Name = car.Model_Name,
                                      IsDocumentVerifired = car.IsDocumentVerifired,
                                      No_of_Pas = car.No_of_Pas,
                                      Permit_Image = car.Permit_Image,
                                      Pollution_Certificate = car.Pollution_Certificate,
                                      Pollution_Expiry = car.Pollution_Expiry,
                                      RC_Book_Image = car.RC_Book_Image,
                                      RC_Book_ValidityDate = car.RC_Book_ValidityDate,
                                      Registration_Number = car.Registration_Number,
                                      Tax_Expiry = car.Tax_Expiry,
                                      Tax_Image = car.Tax_Image,
                                      UserID = car.UserID,
                                      VehicleTypeID = car.VehicleTypeID,
                                      VehicleType = vtype.Name
                                  }).ToList();

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

                var output = (from car in _DatabaseContext.CarTB
                              join driver in _DatabaseContext.DriverTB
                                 on car.DriverID equals driver.ID
                              join vtype in _DatabaseContext.VehicleTypeTB
                             on car.VehicleTypeID equals vtype.ID
                              where car.C_Id == id
                              select new CarTB
                              {
                                  Brand = car.Brand,
                                  Color = car.Color,
                                  DriverID = car.DriverID,
                                  DriverName = driver.Name,
                                  Fueltype = car.Fueltype,
                                  Image = car.Image,
                                  Insurance_Expiry = car.Insurance_Expiry,
                                  Insurance_Image = car.Insurance_Image,
                                  IsActive = car.IsActive,
                                  C_Id = car.C_Id,
                                  CreatedOn = car.CreatedOn,
                                  IsAvailableForRide = car.IsAvailableForRide,
                                  Model_Name = car.Model_Name,
                                  IsDocumentVerifired = car.IsDocumentVerifired,
                                  No_of_Pas = car.No_of_Pas,
                                  Permit_Image = car.Permit_Image,
                                  Pollution_Certificate = car.Pollution_Certificate,
                                  Pollution_Expiry = car.Pollution_Expiry,
                                  RC_Book_Image = car.RC_Book_Image,
                                  RC_Book_ValidityDate = car.RC_Book_ValidityDate,
                                  Registration_Number = car.Registration_Number,
                                  Tax_Expiry = car.Tax_Expiry,
                                  Tax_Image = car.Tax_Image,
                                  UserID = car.UserID,
                                  VehicleTypeID = car.VehicleTypeID,
                                  VehicleType = vtype.Name
                              }).OrderByDescending(r => r.C_Id).FirstOrDefault();

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
