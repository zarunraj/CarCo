using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CarCo.Api.Core.DBcontext;
using CarCo.Api.Core.Models;
using CarCo.Api.Core.Filters;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CarCo.Api.Core.Controllers
{
    [Route("api/booking")]

    [TypeFilter(typeof(APIAdminAuthorizeAttribute))]
    [EnableCors("CorsApi")]

    public class PendingBookingController : Controller
    {

        DatabaseContext _DatabaseContext;
        public PendingBookingController(DatabaseContext databasecontext)
        {
            _DatabaseContext = databasecontext;
        }

        // GET: api/values
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                //var ListofBooking = (from book in _DatabaseContext.BookingTB
                //                     where book.PaymentStatus == "P"
                //                     select book);


                var bookings = from book in _DatabaseContext.BookingTB
                               join car in _DatabaseContext.CarTB on book.C_Id equals car.C_Id
                               join customer in _DatabaseContext.CustomerTB on book.CustomerID equals customer.ID
                               join driver in _DatabaseContext.DriverTB on book.DriverID equals driver.ID
                               select new
                               {
                                   book,
                                   customer,
                                   driver,
                                   car
                               };

                return Ok(bookings);
            }
            catch (Exception)
            {
                throw;
            }
        }

     
        // POST api/values
        [HttpPost]
        public BookingTB[] Post([FromBody] CommonModel CommonModel)
        {
            try
            {
                if (string.IsNullOrEmpty(CommonModel.Username))
                {
                    return null;
                }

                var getUserID = (from user in _DatabaseContext.UserMasterTB
                                 where user.Username == CommonModel.Username
                                 select user.U_Id).SingleOrDefault();

                var ListofBooking = (from book in _DatabaseContext.BookingTB
                                     where book.PaymentStatus == "P" 
                                     select book).ToList();

                return ListofBooking.ToArray();
            }
            catch (Exception)
            {

                throw;
            }

        }

   
    }
}
