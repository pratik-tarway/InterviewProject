using ProductManagementAPI.Dto;
using ProductManagementAPI.Models;

namespace ProductManagementAPI.Repositories
{
    public interface IProductRepository
    {
        Task<IEnumerable<ProductDto>> GetAllProductsAsync();
        Task<ProductDto?> GetProductByIdAsync(Guid id);
        Task AddProductAsync(Product product);
        Task UpdateProductAsync(Product product);
        Task DeleteProductAsync(Guid id);
        Task<IEnumerable<ProductDto>> SearchProductsAsync(ProductSearchQuery searchQuery);
    }
}
