using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;
using CarCo.Api.Core.DBcontext; 
using CarCo.Api.Core.Filters;
using Microsoft.AspNetCore.Cors;

namespace CarCo.Api.Core.Controllers
{
    [Route("api/files")] 
    [EnableCors("CorsApi")]

    public class FileController : Controller
    {
        private readonly DatabaseContext databaseContext;
        private readonly IHostEnvironment hostingEnvironment;

        public FileController(DatabaseContext DatabaseContext, IHostEnvironment hostingEnvironment)
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
            var imagePath = Path.Combine(hostingEnvironment.ContentRootPath, "docs", pathDB);

            return new PhysicalFileResult(imagePath, "image/jpeg");
        }

        [Route("offers/{id}")]
        public async Task<IActionResult> GetOfferImage([FromRoute] int id)
        {
            try
            {
                var offer = await databaseContext.OffersTB.FindAsync(id);
                var pathDB = string.IsNullOrEmpty(offer.Image) ? "images\\no-image.jpg" : offer.Image;
                var imagePath = Path.Combine(hostingEnvironment.ContentRootPath, "docs", pathDB);

                return new PhysicalFileResult(imagePath, "image/jpeg");
            }
            catch (System.Exception)
            {

                return NotFound();
            }
        }
    }
}
