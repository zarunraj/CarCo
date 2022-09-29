using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    public class GetAllPaymentAdminController : Controller
    {

        DatabaseContext _DatabaseContext;
        public GetAllPaymentAdminController(DatabaseContext DatabaseContext)
        {
            _DatabaseContext = DatabaseContext;
        }

        [HttpPost]
        public PaymentViewModel[] Post([FromBody] CommonModel CommonModel)
        {
            try
            {
                if (string.IsNullOrEmpty(CommonModel.Username))
                {
                    return null;
                }

                var ListofBooking = (from book in _DatabaseContext.BookingTB
                                     join car in _DatabaseContext.CarTB on book.C_Id equals car.C_Id
                                     join payment in _DatabaseContext.PaymentTB on book.BookingID equals payment.BookingID
                                     join bank in _DatabaseContext.BankTB on payment.BankID equals bank.BankID
                                     select new PaymentViewModel
                                     {
                                         Amount = book.Amount??0,
                                         BookingID = book.BookingID,
                                         BankName = bank.BankName,
                                         Carname = car.Registration_Number,
                                         PaymentDate = payment.PaymentDate,
                                         CreatedOn = payment.CreatedOn
                                     }).ToList();


                return ListofBooking.ToArray();
            }
            catch (Exception)
            {
                throw;
            }

        }

    }
}
