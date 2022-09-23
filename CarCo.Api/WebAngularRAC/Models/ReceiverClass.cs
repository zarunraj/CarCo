using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAngularRAC.Models
{
    [NotMapped]
    public class ReceiverClass
    {
        public string SelectedCarID { get; set; } 
        public string DocumnetType { get; set; }

    }

    [NotMapped]
    public class DriverDocumentClass
    {
        public string SelectedDriverID { get; set; }
        public string DocumnetType { get; set; }

    }
}
