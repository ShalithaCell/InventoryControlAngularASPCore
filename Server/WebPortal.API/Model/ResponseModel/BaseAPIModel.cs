using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebPortal.API.Model.ResponseModel
{
    public class BaseAPIModel<T>
    {
        public string request { get; set; }
        public bool status { get; set; }
        public string message { get; set; }
        public string error { get; set; }
        public List<T> data { get; set; }
    }
}
