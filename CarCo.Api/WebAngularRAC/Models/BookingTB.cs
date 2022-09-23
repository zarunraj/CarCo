using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAngularRAC.Models
{
    [Table("BookingTB")]
    public class BookingTB
    {
        [Key]
        public int BookingID { get; set; }
        public string StartLocation { get; set; }
        public string EndLocation { get; set; }
        public int Distance { get; set; }
        public string TripNumber { get; set; }

        [ForeignKey("CustomerID")]
        public CustomerTB CustomerTB { get; set; }
        public int CustomerID { get; set; }  

        [ForeignKey("DriverID")]
        public DriverTB DriverTB { get; set; }
        public int DriverID { get; set; }

        [ForeignKey("C_Id")]
        public CarTB CarTB { get; set; }
        public int C_Id { get; set; }
        public int Amount { get; set; }
        public string PaymentStatus { get; set; }
        public DateTime CreatedOn { get; set; }
        public string Status { get; set; }
        public string StartAddress { get; set; }
        public string EndAddress { get; set; }
        public string AddressType { get; set; }

        [NotMapped]
        public string Carname { get; set; }
        [NotMapped]
        public string VehicleType { get; set; }
        [NotMapped]
        public string ModelName { get; set; }
        [NotMapped]
        public string CustomerName { get; set; }
        [NotMapped]
        public string DriverName { get; set; }
    }
}
