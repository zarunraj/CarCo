using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CarCo.Api.Core.Models
{
    [Table("KMCostTB")]
    public class KMCostTB
    {
        [Key]
        public int ID { get; set; }
        [ForeignKey("VehicleTypeID")]
        public VehicleTypeTB VehicleTypeTB { get; set; }
        public int VehicleTypeID { get; set; }
        public int KMCost { get; set; }
        [NotMapped]
        public string VehicleType { get; set; }
    }
}
