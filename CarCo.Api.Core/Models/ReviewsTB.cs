using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarCo.Api.Core.Models
{
    [Table("ReviewsTB")]
    public class ReviewsTB
    {
        [Key]
        public int ID { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Comments { get; set; }
        public int StarRating { get; set; }
        public DateTime CreatedOn { get; set; }
        public bool IsActive { get; set; }

        [ForeignKey("DriverID")]
        public DriverTB DriverTB { get; set; }
        public int DriverID { get; set; }
        [NotMapped]
        public string? DriverName { get; set; }
    }
}
