namespace ProductManagementAPI.Exceptions
{
    public class DatabaseException : Exception
    {
        public DatabaseException(string message, Exception ex = null) : base(message, ex) { }
    }
}
