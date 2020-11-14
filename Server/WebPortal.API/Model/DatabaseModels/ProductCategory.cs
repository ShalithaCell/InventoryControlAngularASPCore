using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using WebPortal.API.Model.BaseModel;

namespace WebPortal.API.Model.DatabaseModels
{
    public class ProductCategory : BaseEntity
    {
        [Required]
        public string Name { get; set; }  
        public string Description { get; set; }

        [ForeignKey("CategoryID")]
        public ICollection<Product> products { get; set; }
    }
}
