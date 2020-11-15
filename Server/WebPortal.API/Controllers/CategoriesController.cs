using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebPortal.API.Infrastructure.DAL;
using WebPortal.API.Model.DatabaseModels;
using WebPortal.API.Model.RequestModel;
using WebPortal.API.Model.ResponseModel;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebPortal.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ApiController
    {
        private readonly ApplicationDbContext _context;

        public CategoriesController(ApplicationDbContext applicationDbContext)
        {
            _context = applicationDbContext;
        }
        // GET: api/<CategoriesController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            BaseAPIModel<ProductCategory> response = new BaseAPIModel<ProductCategory>();
            response.status = false;
            response.request = "Product Categories";
            try
            {
                response.data = _context.ProductCategories.Where(o => o.IsActive == true).ToList();
                response.status = true;

                return Ok(response);
            }catch(Exception ex)
            {
                response.error = ex.InnerException.Message;
                return BadRequest(response);
            }
        }

        // GET api/<CategoriesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            BaseAPIModel<ProductCategory> response = new BaseAPIModel<ProductCategory>();
            response.status = false;
            response.request = "Get Product Categories";
            try
            {
                response.data = _context.ProductCategories.Where(o => o.IsActive == true && o.ID == id).ToList();
                response.status = true;

                return Ok(response);
            }
            catch (Exception ex)
            {
                response.error = ex.InnerException.Message;
                return BadRequest(response);
            }
        }

        // POST api/<CategoriesController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Category data)
        {
            BaseAPIModel<ProductCategory> response = new BaseAPIModel<ProductCategory>();
            response.status = false;
            response.request = "Add Product Categories";

            try
            {
                ProductCategory category = new ProductCategory
                {
                    Name = data.Name,
                    Description = data.Description,
                    IsActive = true,
                    RegistedDate = DateTime.Now
                };

                await _context.ProductCategories.AddAsync(category);
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

        [HttpPost("updateCategory")]
        public async Task<IActionResult> Update([FromBody] CategoryUpdate data)
        {
            BaseAPIModel<ProductCategory> response = new BaseAPIModel<ProductCategory>();
            response.status = false;
            response.request = "Update Product Categories";

            try
            {
                ProductCategory category = new ProductCategory
                {
                    ID = data.ID,
                    Name = data.Name,
                    Description = data.Description,
                    IsActive = true,
                    RegistedDate = DateTime.Now
                };

                _context.ProductCategories.Update(category);
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


        // DELETE api/<CategoriesController>/5
        [HttpPost("deleteCategory")]
        public async Task<IActionResult> Delete([FromBody] int id)
        {
            BaseAPIModel<ProductCategory> response = new BaseAPIModel<ProductCategory>();
            response.status = false;
            response.request = "Add Product Categories";

            try
            {
                int productCount = _context.Products.Where(o => o.CategoryID == id).Count();

                if(productCount > 0)
                {
                    response.error = "Category cannot be deleted. It references from products.";
                    return Conflict(response);
                }

                ProductCategory productCategory = new ProductCategory
                {
                    ID = id
                };


                _context.ProductCategories.Remove(productCategory);
                await _context.SaveChangesAsync();

                response.status = true;
                return Ok(response);

            }catch(Exception ex)
            {
                response.error = ex.InnerException.Message;
                return BadRequest(response);
            }
        }
    }
}
