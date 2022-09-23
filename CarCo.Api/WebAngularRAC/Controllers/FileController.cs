using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;
using WebAngularRAC.DBcontext;

namespace WebAngularRAC.Controllers
{
    [Route("api/files")]
    public class FileController : Controller
    {
        private readonly DatabaseContext databaseContext;
        private readonly IHostingEnvironment hostingEnvironment;

        public FileController(DatabaseContext DatabaseContext, IHostingEnvironment hostingEnvironment)
        {
            databaseContext = DatabaseContext;
            this.hostingEnvironment = hostingEnvironment;
        }

        [Route("cars/{id}")]
        public async Task<IActionResult> GetVehicleImage([FromRoute] int id, [FromQuery] string type)
        {
            var car = await databaseContext.CarTB.FindAsync(id);

            var pathDB = string.Empty;
            switch (type)
            {
                case "car":
                    pathDB = car.Image;
                    break;
                case "rcbook":
                    pathDB = car.RC_Book_Image;
                    break;
                case "pollution":
                    pathDB = car.Pollution_Certificate;
                    break;
                case "tax":
                    pathDB = car.Tax_Image;
                    break;
                case "permit":
                    pathDB = car.Permit_Image;
                    break;
                case "insurance":
                    pathDB = car.Insurance_Image;
                    break;
                default:
                    break;
            }
            pathDB = string.IsNullOrEmpty(pathDB) ? "images\\no-image.jpg" : pathDB;
            var imagePath = Path.Combine(hostingEnvironment.WebRootPath, pathDB);

            return new PhysicalFileResult(imagePath, "image/jpeg");
        }
    }
}
