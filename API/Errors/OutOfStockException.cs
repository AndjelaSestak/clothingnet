using System;

namespace API.Errors;

public class OutOfStockException : Exception
{
    public int StatusCode { get; }

        public OutOfStockException(string message = "Not enough stock") 
            : base(message)
        {
            StatusCode = 400; // Bad Request
        }

}
