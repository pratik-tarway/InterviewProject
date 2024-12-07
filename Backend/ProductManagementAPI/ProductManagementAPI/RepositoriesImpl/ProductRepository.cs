using ProductManagementAPI.Models;
using ProductManagementAPI.Repositories;
using System.Data;
using Dapper;
using Microsoft.Data.Sqlite;
using ProductManagementAPI.Dto;

namespace ProductManagementAPI.RepositoriesImpl
{
    public class ProductRepository : IProductRepository
    {
        private readonly IDbConnection _connection;

        public ProductRepository(IDbConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<ProductDto>> GetAllProductsAsync()
        {
            var query = "SELECT * FROM Products";
            return await _connection.QueryAsync<ProductDto>(query);
        }

        public async Task<ProductDto?> GetProductByIdAsync(Guid id)
        {
            var query = "SELECT * FROM Products WHERE Id = @Id LIMIT 1";
            return await _connection.QueryFirstOrDefaultAsync<ProductDto>(query, new { Id = id });
        }

        public async Task AddProductAsync(Product product)
        {
            var query = "INSERT INTO Products (Id, Name, Price, Category, CreatedAt) VALUES (@Id, @Name, @Price, @Category, @CreatedAt)";
            await _connection.ExecuteAsync(query, product);
        }

        public async Task UpdateProductAsync(Product product)
        {
            var query = "UPDATE Products SET Name = @Name, Price = @Price, Category = @Category WHERE Id = @Id";
            await _connection.ExecuteAsync(query, product);
        }

        public async Task DeleteProductAsync(Guid id)
        {
            var query = "DELETE FROM Products WHERE Id = @Id";
            await _connection.ExecuteAsync(query, new { Id = id });
        }

        public async Task<IEnumerable<ProductDto>> SearchProductsAsync(ProductSearchQuery searchQuery)
        {
            var sqlQuery = "SELECT * FROM Products WHERE 1=1";

            if (!string.IsNullOrEmpty(searchQuery.Name))
            {
                sqlQuery += " AND Name LIKE '%' || @Name || '%'";
            }

            if (!string.IsNullOrEmpty(searchQuery.Category))
            {
                sqlQuery += " AND Category LIKE '%' || @Category || '%'";
            }

            if (searchQuery.MinPrice.HasValue)
            {
                sqlQuery += " AND Price >= @MinPrice";
            }

            if (searchQuery.MaxPrice.HasValue)
            {
                sqlQuery += " AND Price <= @MaxPrice";
            }

            return await _connection.QueryAsync<ProductDto>(sqlQuery, searchQuery);
        }
    }
}
