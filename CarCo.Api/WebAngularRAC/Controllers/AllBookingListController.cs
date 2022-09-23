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
    public class AllBookingListController : Controller
    {
        DatabaseContext _DatabaseContext;
        public AllBookingListController(DatabaseContext databasecontext)
        {
            _DatabaseContext = databasecontext;
        }

        // GET: api/values
        [HttpGet]
        public BookingTB[] Get()
        {
            try
            {
                var ListofBooking = (from book in _DatabaseContext.BookingTB
                                     select new BookingTB {
                                         Amount = book.Amount,
                                         CustomerID = book.CustomerID,
                                         BookingID = book.BookingID,
                                         Carname = book.Carname,
                                         Distance = book.Distance,
                                         CreatedOn = book.CreatedOn,
                                         C_Id = book.C_Id,
                                         DriverID = book.DriverID,
                                         StartLocation = book.StartLocation,
                                         EndLocation = book.EndLocation,
                                         ModelName = book.ModelName,
                                         TripNumber = book.TripNumber,
                                         PaymentStatus = book.PaymentStatus,
                                         Status = book.PaymentStatus == "D" ? "Completed" : book.PaymentStatus == "C" ? "Cancel" : book.PaymentStatus == "P" ? "Pending" : "Unknown"
                                     }).ToList();

                return ListofBooking.ToArray();
            }
            catch (Exception)
            {
                throw;
            }
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public BookingTB Get(int id)
        {
            try
            {
                return _DatabaseContext.BookingTB.SingleOrDefault(x => x.BookingID == id);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
