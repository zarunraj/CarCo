using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CarCo.Api.Core.Models;
using CarCo.Api.Core.DBcontext;
using CarCo.Api.Core.Filters;
using Microsoft.AspNetCore.Cors;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CarCo.Api.Core.Controllers
{
    [Route("api/[controller]")]
    [TypeFilter(typeof(APIAdminAuthorizeAttribute))]
    [EnableCors("CorsApi")]
    public class DeletingBookingAdminController : Controller
    {

        DatabaseContext _DatabaseContext;
        public DeletingBookingAdminController(DatabaseContext databasecontext)
        {
            _DatabaseContext = databasecontext;
        }

        // POST api/values
        [HttpPost]
        public bool Post([FromBody] CommonDeleteModel CommonModel)
        {
            try
            {
                var itemToRemove = _DatabaseContext.BookingTB.SingleOrDefault(x => x.BookingID == CommonModel.id);
                var BookingTB = new BookingTB { BookingID = CommonModel.id, PaymentStatus = "C" };

                if (itemToRemove != null)
                {
                    _DatabaseContext.BookingTB.Remove(itemToRemove);
                    _DatabaseContext.SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
