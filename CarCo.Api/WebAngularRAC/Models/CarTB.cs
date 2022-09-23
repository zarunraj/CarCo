using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAngularRAC.Models
{
    [Table("CarTB")]
    public class CarTB
    {
        [Key]
        public int C_Id { get; set; }
        public string Registration_Number { get; set; }
        public string Model_Name { get; set; }
        public string Brand { get; set; }
        public string Color { get; set; }
        public int No_of_Pas { get; set; }
        public string Image { get; set; }
        public string Fueltype { get; set; }
        public DateTime? RC_Book_ValidityDate { get; set; }
        public string RC_Book_Image { get; set; }
        public string Pollution_Certificate { get; set; }
        public DateTime? Pollution_Expiry { get; set; }
        public string Insurance_Image { get; set; }
        public DateTime? Insurance_Expiry { get; set; }
        public string Permit_Image { get; set; }
        public string Tax_Image { get; set; }
        public DateTime? Tax_Expiry { get; set; }
        public bool IsActive { get; set; }
        public bool IsAvailableForRide { get; set; }
        public bool IsDocumentVerifired { get; set; }
        public int UserID { get; set; }
        public DateTime CreatedOn { get; set; }

        [ForeignKey("DriverID")]
        public DriverTB DriverTB { get; set; }
        public int DriverID { get; set; }

        [ForeignKey("VehicleTypeID")]
        public VehicleTypeTB VehicleTypeTB { get; set; }
        public int VehicleTypeID { get; set; }
        [NotMapped]
        public string DriverName { get; set; }
        [NotMapped]
        public string Username { get; set; }
        [NotMapped]
        public string VehicleType { get; set; }
    }
}
