using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarCo.Api.Core.Models
{
    [Table("EmergencyTB")]
    public class EmergencyTB
    {
        [Key]
        public int ID { get; set; }
        public string LatitudeandLongitude { get; set; }
        public string Name { get; set; }
        public string ContactNumber { get; set; }
        public DateTime CreatedOn { get; set; }
        public bool IsActive { get; set; }
    }
}
