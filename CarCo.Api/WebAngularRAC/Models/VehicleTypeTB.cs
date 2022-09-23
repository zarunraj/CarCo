using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAngularRAC.Models
{
    [Table("VehicleTypeTB")]
    public class VehicleTypeTB
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }

        public DateTime CreatedOn { get; set; }
        public bool IsActive { get; set; }

        [Required]
        public int CostPerKM { get; set; }

        [ForeignKey("VehicleTypeID")]
        public ICollection<KMCostTB> KMRates { get; set; }

        [ForeignKey("VehicleTypeID")]
        public ICollection<CarTB> Cars { get; set; }
    }
}
