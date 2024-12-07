namespace ProductManagementAPI.Dto
{
    public class ProductDto
    {
        public string Id { get; set; } 
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Category { get; set; }
        public string CreatedAt { get; set; }
    }
}
