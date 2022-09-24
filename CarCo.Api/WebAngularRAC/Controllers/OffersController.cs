using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using WebAngularRAC.DBcontext;
using WebAngularRAC.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAngularRAC.Controllers
{
    [Route("api/[controller]")]
    public class OffersController : Controller
    {
        DatabaseContext _DatabaseContext;
        private readonly IHostingEnvironment _environment;

        public OffersController(DatabaseContext databasecontext, IHostingEnvironment hostingEnvironment)
        {
            _DatabaseContext = databasecontext;
            _environment = hostingEnvironment;
        }

        // GET: api/values
        [HttpGet]
        public OffersTB[] Get()
        {
            try
            {
                var results = _DatabaseContext.OffersTB.ToList();
                return results.ToArray();
            }
            catch (Exception)
            {
                throw;
            }
        }
        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var offer = _DatabaseContext.OffersTB.FirstOrDefault(x => x.ID == id);
                if (offer == null)
                {
                    return BadRequest();
                }
                return Ok(offer);
            }
            catch (Exception)
            {
                throw;
            }
        }


        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody] OffersTB offerstb)
        {
            try
            {
                var output = (from offer in _DatabaseContext.OffersTB
                              where offer.Name == offerstb.Name
                              select offer.Name).Count();

                if (output > 0)
                {
                    return BadRequest("Already exists!");
                }
                else
                {
                    offerstb.CreatedOn = DateTime.Now;
                    offerstb.IsActive = true;
                    _DatabaseContext.Add(offerstb);
                    _DatabaseContext.SaveChanges();
                    return Ok(offerstb);
                }
            }
            catch (Exception)
            {

                throw;
            }
        }


        [HttpPost]
        [Route("{id}/status")]
        public IActionResult UpdateStatus([FromRoute]int id,bool isEnable)
        {
            try
            {
                var offer = _DatabaseContext.OffersTB.FirstOrDefault(x => x.ID == id);
                if (offer != null)
                {
                    offer.IsActive = isEnable;
                    _DatabaseContext.SaveChanges();
                    return Ok(true);
                }

                return Ok(false);
            }
            catch (Exception)
            {

                throw;
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] OffersTB offerstb)
        {
            try
            {
                if (string.IsNullOrEmpty(Convert.ToString(id)))
                {
                    return BadRequest();
                }

                if (offerstb == null)
                {
                    return BadRequest();
                }


                var offer = _DatabaseContext.OffersTB.FirstOrDefault(x => x.ID == id);
                if (offer == null)
                {
                    return BadRequest();
                }

                offer.StartDate = offerstb.StartDate;
                offer.EndDate = offerstb.EndDate;
                offer.Name = offerstb.Name;
                offer.Details = offerstb.Details;
                offer.Percentage = offerstb.Percentage;
                offer.IsActive = offerstb.IsActive;
                _DatabaseContext.SaveChanges();
                return Ok(offer);
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
            var offer = await _DatabaseContext.OffersTB.FindAsync(id);
            if (offer == null)
            {
                return NotFound();
            }
            _DatabaseContext.OffersTB.Remove(offer);
            await _DatabaseContext.SaveChangesAsync();
            return Ok();
        }


        [Route("{id}/uploadImage")]
        [HttpPost()]
        public async Task<IActionResult> uploadImage([FromRoute] int id)
        {
            try
            {
                var files = HttpContext.Request.Form.Files;
                string PathDB = string.Empty;
                if (files == null)
                {
                    return BadRequest("No file attached");
                }


                var offer = _DatabaseContext.OffersTB.FirstOrDefault(x => x.ID == id);
                if (offer == null)
                {
                    return BadRequest();
                }
                var folderPath = "Offer_Img";
                var uploads = Path.Combine(_environment.WebRootPath, folderPath);

                Directory.CreateDirectory(uploads);

                foreach (var file in files)
                {
                    if (file.Length > 0)
                    {
                        var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                        var myUniqueFileName = Convert.ToString(Guid.NewGuid());
                        var FileExtension = Path.GetExtension(fileName);
                        var newFileName = myUniqueFileName + FileExtension;
                        fileName = Path.Combine(_environment.WebRootPath, folderPath) + $@"\{newFileName}";
                        PathDB = folderPath + "/" + newFileName;
                        using (FileStream fs = System.IO.File.Create(fileName))
                        {
                            file.CopyTo(fs);
                            fs.Flush();
                        }
                    }
                }

                offer.Image = PathDB;
                var result = await _DatabaseContext.SaveChangesAsync();
                return Ok(offer);

            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
   
    
    }
}
