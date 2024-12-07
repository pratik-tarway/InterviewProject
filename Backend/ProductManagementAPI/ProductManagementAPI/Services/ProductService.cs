using ProductManagementAPI.Dto;
using ProductManagementAPI.Exceptions;
using ProductManagementAPI.Models;
using ProductManagementAPI.Repositories;
using System.Threading.Tasks;

namespace ProductManagementAPI.Services
{
    public class ProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<IEnumerable<ProductDto>> GetAllProductsAsync()
        {
            try
            {
                return await _productRepository.GetAllProductsAsync();
            }
            catch (Exception ex)
            {
                throw new DatabaseException("Error occurred while fetching all products from the database.", ex);
            }
        }

        public async Task<ProductDto> GetProductByIdAsync(Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new ProductValidationException("Product ID cannot be empty.");
            }

            try
            {
                var product = await _productRepository.GetProductByIdAsync(id);
                if (product == null)
                {
                    throw new ProductNotFoundException($"Product with ID {id} not found.");
                }
                return product;
            }
            catch (Exception ex)
            {
                throw new DatabaseException("Error occurred while fetching the product by ID.", ex);
            }
        }

        public async Task AddProductAsync(Product product)
        {
            if (product == null)
            {
                throw new ProductValidationException("Product data is invalid.");
            }

            try
            {
                product.Id = Guid.NewGuid();
                product.CreatedAt = DateTime.UtcNow;
                await _productRepository.AddProductAsync(product);
            }
            catch (Exception ex)
            {
                throw new DatabaseException("Error occurred while adding the product.", ex);
            }
        }

        public async Task UpdateProductAsync(Product product)
        {
            if (product == null || product.Id == Guid.Empty)
            {
                throw new ProductValidationException("Product data is invalid.");
            }

            try
            {
                await _productRepository.UpdateProductAsync(product);
            }
            catch (Exception ex)
            {
                throw new DatabaseException("Error occurred while updating the product.", ex);
            }
        }

        public async Task DeleteProductAsync(Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new ProductValidationException("Product ID cannot be empty.");
            }

            try
            {
                await _productRepository.DeleteProductAsync(id);
            }
            catch (Exception ex)
            {
                throw new DatabaseException("Error occurred while deleting the product.", ex);
            }
        }

        public async Task<IEnumerable<ProductDto>> SearchProductsAsync(ProductSearchQuery query)
        {
            if (query == null)
            {
                throw new ProductValidationException("Search query cannot be null.");
            }

            try
            {
                return await _productRepository.SearchProductsAsync(query);
            }
            catch (Exception ex)
            {
                throw new DatabaseException("Error occurred while searching products.", ex);
            }
        }
    }
}
