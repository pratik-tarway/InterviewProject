namespace ProductManagementAPI.Exceptions
{
    public class ProductException : Exception
    {
        public ProductException(string message) : base(message) { }
    }

    public class ProductNotFoundException : ProductException
    {
        public ProductNotFoundException(string message) : base(message) { }
    }

    public class ProductValidationException : ProductException
    {
        public ProductValidationException(string message) : base(message) { }
    }
}
