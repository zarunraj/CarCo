using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CarCo.Api.Core.Models
{
    [Table("BankTB")]
    public class BankTB
    {
        [Key]
        public int BankID { get; set; }
        public string? BankName { get; set; }
    }
}
