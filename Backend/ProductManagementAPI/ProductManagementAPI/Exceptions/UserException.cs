namespace ProductManagementAPI.Exceptions
{
    public class UserException : Exception
    {
        public UserException(string message) : base(message) { }
    }

    public class UserValidationException : UserException
    {
        public UserValidationException(string message) : base(message) { }
    }

    public class UserAlreadyExistsException : UserException
    {
        public UserAlreadyExistsException(string message) : base(message) { }
    }

    public class InvalidCredentialsException : UserException
    {
        public InvalidCredentialsException(string message) : base(message) { }
    }

    public class UnauthorizedAccessException : UserException
    {
        public UnauthorizedAccessException(string message) : base(message) { }
    }
}
