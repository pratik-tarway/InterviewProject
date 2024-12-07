namespace ProductManagementAPI.Models
{
    public class Product
    {
        public Guid Id { get; set; }  
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Category { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
