using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CarCo.Api.Core.DBcontext;
using CarCo.Api.Core.Models;
using CarCo.Api.Core.AES256Encryption;
using Microsoft.AspNetCore.Cors;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CarCo.Api.Core.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsApi")]
    public class UserRegistrationController : Controller
    {
        DatabaseContext _DatabaseContext;
        public UserRegistrationController(DatabaseContext DatabaseContext)
        {
            _DatabaseContext = DatabaseContext;
        }

      
        // POST api/values
        [HttpPost]
        public bool Post([FromBody] UserMasterTB usermastertb)
        {
            try
            {

                var output = (from usermaster in _DatabaseContext.UserMasterTB
                              where usermastertb.Username == usermaster.Username
                              select usermaster.Username).Count();

                if (output > 0)
                {
                    return false;
                }
                else
                {
                    var userTypeID = (from user in _DatabaseContext.UserType
                                      where user.UserTypeName == "User"
                                      select user.UserTypeID).SingleOrDefault();
                    usermastertb.U_Id = 0;
                    usermastertb.UserTypeID = userTypeID;
                    usermastertb.Password = EncryptionLibrary.EncryptText(usermastertb.Password);
                    usermastertb.CreatedOn = DateTime.Now;
                    _DatabaseContext.Add(usermastertb);
                    _DatabaseContext.SaveChanges();

                    return true;
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

      
    }
}
