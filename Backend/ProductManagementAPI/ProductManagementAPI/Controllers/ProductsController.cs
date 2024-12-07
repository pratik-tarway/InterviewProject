using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductManagementAPI.Dto;
using ProductManagementAPI.Models;
using ProductManagementAPI.Services;

namespace ProductManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProductsController : ControllerBase
    {
        private readonly ProductService _productService;

        public ProductsController(ProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var products = await _productService.GetAllProductsAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            return Ok(product);
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Post([FromBody] Product product)
        {
            await _productService.AddProductAsync(product);
            return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Put(Guid id, [FromBody] Product product)
        {
            if (id != product.Id)
            {
                return BadRequest(new { message = "Product ID mismatch." });
            }

            await _productService.UpdateProductAsync(product);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _productService.DeleteProductAsync(id);
            return NoContent();
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<ProductDto>>> SearchProducts([FromQuery] ProductSearchQuery query)
        {
            var products = await _productService.SearchProductsAsync(query);
            return Ok(products);
        }
    }
}
