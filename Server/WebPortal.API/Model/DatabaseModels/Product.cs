using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebPortal.API.Model.BaseModel;

namespace WebPortal.API.Model.DatabaseModels
{
    public class Product : BaseEntity
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        [Required]
        public int CategoryID { get; set; }

        public ProductCategory productCategory { get; }

    }
}
