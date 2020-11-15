using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebPortal.API.Model.ResponseModel
{
    public class ProductResult
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int CategoryID { get; set; }
        public string Category { get; set; }
    }
}
