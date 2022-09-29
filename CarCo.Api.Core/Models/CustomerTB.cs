using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarCo.Api.Core.Models
{
    [Table("CustomerTB")]
    public class CustomerTB
    {
        [Key]
        public int ID { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; } 
        public bool IsActive { get; set; }
        public DateTime CreatedOn { get; set; }
        public string? ProfileImage { get; set; }

    }
}
