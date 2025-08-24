using System;

namespace Core.Entities.OrderAggregate;

public class ProductItemOrdered //bice owned by orderitem class i u orderitem table
{
    public int ProductId { get; set; }
    public required string ProductName { get; set; }
    public required string PictureUrl { get; set; }
}
