using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebPortal.API.Model.RequestModel
{
    public class Category
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
