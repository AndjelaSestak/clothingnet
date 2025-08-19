using System;
using System.Reflection;

namespace Core.Entities;

public class ShoppingCart
{
    public required String Id { get; set; }
    public List<CartItem> Items { get; set; } = [];
}
