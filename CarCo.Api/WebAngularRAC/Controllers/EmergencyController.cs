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
    public class EmergencyController : Controller
    {
        DatabaseContext _DatabaseContext;
        public EmergencyController(DatabaseContext databasecontext)
        {
            _DatabaseContext = databasecontext;
        }

        // GET: api/values
        [HttpGet]
        public EmergencyTB[] Get()
        {
            try
            {
                var results = _DatabaseContext.EmergencyTB.ToList();
                return results.ToArray();
            }
            catch (Exception)
            {
                throw;
            }
        }
        // GET api/values/5
        [HttpGet("{id}")]
        public EmergencyTB Get(int id)
        {
            try
            {
                return _DatabaseContext.EmergencyTB.SingleOrDefault(x => x.ID == id);
            }
            catch (Exception)
            {
                throw;
            }
        }


        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody] EmergencyTB emergencytb)
        {
            try
            {
                    emergencytb.IsActive = true;
                    emergencytb.CreatedOn = DateTime.Now;
                    _DatabaseContext.Add(emergencytb);
                    _DatabaseContext.SaveChanges();
                    return Ok(emergencytb);
            }
            catch (Exception)
            {

                throw;
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] EmergencyTB emergencytb)
        {
            try
            {
                if (string.IsNullOrEmpty(Convert.ToString(id)))
                {
                    return NotFound();
                }

                if (emergencytb == null)
                {
                    return BadRequest();
                }

                var emergency = _DatabaseContext.EmergencyTB.SingleOrDefault(x => x.ID == id);
                emergency.ContactNumber = emergencytb.ContactNumber;
                emergency.LatitudeandLongitude = emergencytb.LatitudeandLongitude;
                emergency.Name = emergencytb.Name;
                emergency.IsActive = emergencytb.IsActive;
                _DatabaseContext.SaveChanges();
                return Ok(emergency);
            }
            catch (Exception)
            {
                throw;
            }

        }

         
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var emergency = await _DatabaseContext.EmergencyTB.FindAsync(id);
            if (emergency == null)
            {
                return NotFound();
            }
            _DatabaseContext.EmergencyTB.Remove(emergency);
            await _DatabaseContext.SaveChangesAsync();
            return Ok();
        }

    }
}
