using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebPortal.API.Infrastructure.DAL;
using WebPortal.API.Model.DatabaseModels;
using WebPortal.API.Model.ResponseModel;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebPortal.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext applicationDbContext)
        {
            _context = applicationDbContext;
        }

        // GET: api/<ProductsController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            BaseAPIModel<ProductResult> response = new BaseAPIModel<ProductResult>();
            response.status = false;
            response.request = "Product";
            try
            {
                response.data = _context.Products.Include(o => o.productCategory).Where(o => o.IsActive == true).Select(i => new ProductResult
                {
                    ID = i.ID,
                    Name = i.Name,
                    Description = i.Description,
                    Category = i.productCategory.Name,
                    CategoryID = i.CategoryID
                }).ToList();
                response.status = true;

                return Ok(response);
            }
            catch (Exception ex)
            {
                response.error = ex.InnerException.Message;
                return BadRequest(response);
            }
        }

        // GET api/<ProductsController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            BaseAPIModel<Product> response = new BaseAPIModel<Product>();
            response.status = false;
            response.request = "Product";
            try
            {
                response.data = _context.Products.Where(o => o.IsActive == true).ToList();
                response.status = true;

                return Ok(response);
            }
            catch (Exception ex)
            {
                response.error = ex.InnerException.Message;
                return BadRequest(response);
            }
        }

        // POST api/<ProductsController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Model.RequestModel.Product product)
        {
            BaseAPIModel<Product> response = new BaseAPIModel<Product>();
            response.status = false;
            response.request = "Add Product";

            try
            {
                Product productDetail = new Product
                {
                    Name = product.Name,
                    Description = product.Description,
                    IsActive = true,
                    CategoryID = product.CategoryID,
                    RegistedDate = DateTime.Now
                };

                await _context.Products.AddAsync(productDetail);
                await _context.SaveChangesAsync();

                response.status = true;
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.error = ex.InnerException.Message;
                return BadRequest(response);
            }
        }

        [HttpPost("updateProduct")]
        public async Task<IActionResult> Update([FromBody] Model.RequestModel.ProductUpdate data)
        {
            BaseAPIModel<Product> response = new BaseAPIModel<Product>();
            response.status = false;
            response.request = "Update Product";

            try
            {
                Product product = new Product
                {
                    ID = data.ID,
                    Name = data.Name,
                    Description = data.Description,
                    CategoryID = data.CategoryID,
                    IsActive = true,
                    RegistedDate = DateTime.Now
                };

                _context.Products.Update(product);
                await _context.SaveChangesAsync();

                response.status = true;
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.error = ex.InnerException.Message;
                return BadRequest(response);
            }

        }

        // DELETE api/<ProductsController>/5
        [HttpPost("deleteProduct")]
        public async Task<IActionResult> Delete([FromBody] int id)
        {
            BaseAPIModel<Product> response = new BaseAPIModel<Product>();
            response.status = false;
            response.request = "Delete Product";

            try
            {
                Product product= new Product
                {
                    ID = id
                };

                _context.Products.Remove(product);
                await _context.SaveChangesAsync();

                response.status = true;
                return Ok(response);

            }
            catch (Exception ex)
            {
                response.error = ex.InnerException.Message;
                return BadRequest(response);
            }
        }
    }
}
