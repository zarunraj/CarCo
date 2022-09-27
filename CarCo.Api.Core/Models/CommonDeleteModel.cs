﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;


namespace CarCo.Api.Core.Models
{
    [NotMapped]
    public class CommonDeleteModel
    {
        public string Username { get; set; }
        public int id { get; set; }
    }
}
