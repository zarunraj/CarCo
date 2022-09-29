using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarCo.Api.Core.Models
{
    [Table("OffersTB")]
    public class OffersTB
    {
        [Key]
        public int? ID { get; set; }
        public string? Name { get; set; }
        public int? Percentage { get; set; }
        public string? Image { get; set; }
        public string? Details { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime CreatedOn { get; set; }
        public bool IsActive { get; set; }
    }
}
