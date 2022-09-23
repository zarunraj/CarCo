using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using WebAngularRAC.DBcontext;
using Microsoft.Net.Http.Headers;
using System.IO;
using WebAngularRAC.Models;
using WebAngularRAC.Filters;

namespace WebAngularRAC.Controllers
{
    [TypeFilter(typeof(APIAdminAuthorizeAttribute))]
    public class AddCarsPhotoController : Controller
    {

        private readonly IHostingEnvironment _environment;
        DatabaseContext _DatabaseContext;
        public AddCarsPhotoController(DatabaseContext DatabaseContext, IHostingEnvironment hostingEnvironment)
        {
            _DatabaseContext = DatabaseContext;
            _environment = hostingEnvironment;
        }



        [HttpPost]
        public async Task<IActionResult> UploadFiles([FromHeader] ReceiverClass ReceiverClass)
        {
            try
            {
                if (string.IsNullOrEmpty(ReceiverClass.SelectedCarID))
                {
                    return BadRequest("Vehicle id required");
                }

                var files = HttpContext.Request.Form.Files;
                string PathDB = string.Empty;
                if (files == null)
                {
                    return BadRequest("No file attached");
                }

                string folderPath = "";
                var C_Id = Convert.ToInt32(ReceiverClass.SelectedCarID);

                Dictionary<string, string> map = new Dictionary<string, string>()
                {
                    {"car","Cars_Upload" },
                    {"rcbook","RC_Book_Upload" },
                    {"pollution","Polution_Upload" },
                    {"tax","Tax_Upalod" },
                    {"permit","Permit_Upload" },
                    {"insurance","Insurance_Upload" }
                };

                folderPath = map[ReceiverClass.DocumnetType];

                var uploads = Path.Combine(_environment.WebRootPath, folderPath);

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

                var car = await _DatabaseContext.CarTB.FindAsync(C_Id);
                if (car == null)
                {
                    return BadRequest();
                }
                else
                {
                    switch (ReceiverClass.DocumnetType)
                    {
                        case "car":
                            car.Image = PathDB;
                            break;
                        case "rcbook":
                            car.RC_Book_Image = PathDB;
                            break;
                        case "pollution":
                            car.Pollution_Certificate = PathDB;
                            break;
                        case "tax":
                            car.Tax_Image = PathDB;
                            break;
                        case "permit":
                            car.Permit_Image = PathDB;
                            break;
                        case "insurance":
                            car.Insurance_Image = PathDB;
                            break;
                        default:
                            break;
                    }
                    var result = await _DatabaseContext.SaveChangesAsync();
                    return Ok(car);
                }
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
