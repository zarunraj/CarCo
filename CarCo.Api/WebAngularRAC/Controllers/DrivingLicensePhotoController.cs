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
    [Route("api/driver")]
    public class DrivingLicensePhotoController : Controller
    {

        private readonly IHostingEnvironment _environment;
        DatabaseContext _DatabaseContext;
        public DrivingLicensePhotoController(DatabaseContext DatabaseContext, IHostingEnvironment hostingEnvironment)
        {
            _DatabaseContext = DatabaseContext;
            _environment = hostingEnvironment;
        }


        [Route("upload")]
        [HttpPost]
        public async Task<IActionResult> UploadFiles([FromHeader] DriverDocumentClass ReceiverClass)
        {
            try
            {
                if (string.IsNullOrEmpty(ReceiverClass.SelectedDriverID))
                {
                    return BadRequest("Driver id required");
                }

                var files = HttpContext.Request.Form.Files;
                string PathDB = string.Empty;
                if (files == null)
                {
                    return BadRequest("No file attached");
                }

                string folderPath = "";
                var D_Id = Convert.ToInt32(ReceiverClass.SelectedDriverID);

                Dictionary<string, string> map = new Dictionary<string, string>()
                {
                    {"license","DrivingLicense" } ,
                    {"profile","DriverProfile" } 
                };

                folderPath = map[ReceiverClass.DocumnetType];

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

                var driver = await _DatabaseContext.DriverTB.FindAsync(D_Id);
                if (driver == null)
                {
                    return BadRequest();
                }
                else
                {
                    switch (ReceiverClass.DocumnetType)
                    {
                        case "license":
                            driver.DrivingLicenseImage = PathDB;
                            break;
                        case "profile":
                            driver.ProfileImage = PathDB;
                            break;
                        default:
                            break;
                    }
                    var result = await _DatabaseContext.SaveChangesAsync();
                    return Ok(driver);
                }
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
