using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAngularRAC.Models
{
    [Table("DriverTB")]
    public class DriverTB
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string DrivingLicenseNumber { get; set; }
        public DateTime DrivingLicenseExpiryDate { get; set; }
        public string DrivingLicenseImage { get; set; }
        public DateTime CreatedOn { get; set; }
        public bool IsActive { get; set; }
        public bool IsOnline { get; set; }
        public string ProfileImage { get; set; }
        public string CurrentLocation { get; set; }

        [ForeignKey("DriverID")]
        public ICollection<ReviewsTB> Reviews { get; set; }

        [ForeignKey("DriverID")]
        public ICollection<CarTB> Cars { get; set; }
    }
}

