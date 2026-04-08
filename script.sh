#!/bin/bash

# Create solution and projects
dotnet new sln -n Warehouse
dotnet new classlib -n Warehouse.Domain
dotnet new classlib -n Warehouse.Application
dotnet new classlib -n Warehouse.Infrastructure
dotnet new webapi -n Warehouse.Api
dotnet sln add Warehouse.Domain.csproj
dotnet sln add Warehouse.Application.csproj
dotnet sln add Warehouse.Infrastructure.csproj
dotnet sln add Warehouse.Api.csproj
dotnet add Warehouse.Application reference Warehouse.Domain
dotnet add Warehouse.Infrastructure reference Warehouse.Domain
dotnet add Warehouse.Infrastructure reference Warehouse.Application
dotnet add Warehouse.Api reference Warehouse.Application
dotnet add Warehouse.Api reference Warehouse.Infrastructure

# Add packages
dotnet add Warehouse.Infrastructure package Microsoft.EntityFrameworkCore
dotnet add Warehouse.Infrastructure package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet add Warehouse.Api package Microsoft.EntityFrameworkCore.Design
dotnet add Warehouse.Api package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add Warehouse.Api package System.IdentityModel.Tokens.Jwt
dotnet add Warehouse.Api package Microsoft.IdentityModel.Tokens
dotnet add Warehouse.Api package BCrypt.Net-Next

# Create directories
mkdir -p Warehouse.Domain/Entities Warehouse.Application/Interfaces Warehouse.Application/Services Warehouse.Application/DTOs Warehouse.Infrastructure/Data Warehouse.Infrastructure/Repositories Warehouse.Api/Controllers Warehouse.Api/DTOs

# Entities
cat > Warehouse.Domain/Entities/User.cs << 'EOF'
using System;

namespace Warehouse.Domain.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}
EOF

cat > Warehouse.Domain/Entities/Order.cs << 'EOF'
using System;
using System.Collections.Generic;

namespace Warehouse.Domain.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Status { get; set; } = string.Empty;
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
        public ICollection<OrderStatusHistory> StatusHistory { get; set; } = new List<OrderStatusHistory>();
    }
}
EOF

cat > Warehouse.Domain/Entities/OrderItem.cs << 'EOF'
namespace Warehouse.Domain.Entities
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Order? Order { get; set; }
        public int InventoryItemId { get; set; }
        public InventoryItem? InventoryItem { get; set; }
        public int Quantity { get; set; }
    }
}
EOF

cat > Warehouse.Domain/Entities/OrderStatusHistory.cs << 'EOF'
using System;

namespace Warehouse.Domain.Entities
{
    public class OrderStatusHistory
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Order? Order { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime ChangedAt { get; set; }
        public string ChangedBy { get; set; } = string.Empty;
    }
}
EOF

cat > Warehouse.Domain/Entities/Warehouse.cs << 'EOF'
using System.Collections.Generic;

namespace Warehouse.Domain.Entities
{
    public class Warehouse
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public ICollection<InventoryItem> InventoryItems { get; set; } = new List<InventoryItem>();
    }
}
EOF

cat > Warehouse.Domain/Entities/InventoryItem.cs << 'EOF'
using System.Collections.Generic;

namespace Warehouse.Domain.Entities
{
    public class InventoryItem
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int WarehouseId { get; set; }
        public Warehouse? Warehouse { get; set; }
        public ICollection<InventoryStock> Stocks { get; set; } = new List<InventoryStock>();
        public ICollection<InventoryReservation> Reservations { get; set; } = new List<InventoryReservation>();
    }
}
EOF

cat > Warehouse.Domain/Entities/InventoryStock.cs << 'EOF'
using System;

namespace Warehouse.Domain.Entities
{
    public class InventoryStock
    {
        public int Id { get; set; }
        public int InventoryItemId { get; set; }
        public InventoryItem? InventoryItem { get; set; }
        public int Quantity { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}
EOF

cat > Warehouse.Domain/Entities/InventoryReservation.cs << 'EOF'
using System;

namespace Warehouse.Domain.Entities
{
    public class InventoryReservation
    {
        public int Id { get; set; }
        public int InventoryItemId { get; set; }
        public InventoryItem? InventoryItem { get; set; }
        public int OrderId { get; set; }
        public Order? Order { get; set; }
        public int ReservedQuantity { get; set; }
        public DateTime ReservedAt { get; set; }
    }
}
EOF

cat > Warehouse.Domain/Entities/Shipment.cs << 'EOF'
using System;
using System.Collections.Generic;

namespace Warehouse.Domain.Entities
{
    public class Shipment
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Order? Order { get; set; }
        public string TrackingNumber { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime ShippedAt { get; set; }
        public ICollection<DeliveryTask> DeliveryTasks { get; set; } = new List<DeliveryTask>();
    }
}
EOF

cat > Warehouse.Domain/Entities/DeliveryTask.cs << 'EOF'
using System;

namespace Warehouse.Domain.Entities
{
    public class DeliveryTask
    {
        public int Id { get; set; }
        public int ShipmentId { get; set; }
        public Shipment? Shipment { get; set; }
        public string TaskType { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime AssignedAt { get; set; }
        public string AssignedTo { get; set; } = string.Empty;
    }
}
EOF

cat > Warehouse.Domain/Entities/ExceptionRecord.cs << 'EOF'
using System;

namespace Warehouse.Domain.Entities
{
    public class ExceptionRecord
    {
        public int Id { get; set; }
        public int ShipmentId { get; set; }
        public Shipment? Shipment { get; set; }
        public string ExceptionType { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime ReportedAt { get; set; }
        public string ReportedBy { get; set; } = string.Empty;
    }
}
EOF

# Repositories
cat > Warehouse.Infrastructure/Repositories/IRepository.cs << 'EOF'
using System.Linq.Expressions;

namespace Warehouse.Infrastructure.Repositories
{
    public interface IRepository<T> where T : class
    {
        Task<T?> GetByIdAsync(int id);
        Task<IEnumerable<T>> GetAllAsync();
        Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);
        Task AddAsync(T entity);
        void Update(T entity);
        void Delete(T entity);
    }
}
EOF

cat > Warehouse.Infrastructure/Repositories/Repository.cs << 'EOF'
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Warehouse.Infrastructure.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly ApplicationDbContext _context;
        public Repository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<T?> GetByIdAsync(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }
        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }
        public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate)
        {
            return await _context.Set<T>().Where(predicate).ToListAsync();
        }
        public async Task AddAsync(T entity)
        {
            await _context.Set<T>().AddAsync(entity);
        }
        public void Update(T entity)
        {
            _context.Set<T>().Update(entity);
        }
        public void Delete(T entity)
        {
            _context.Set<T>().Remove(entity);
        }
    }
}
EOF

cat > Warehouse.Infrastructure/Repositories/IOrderRepository.cs << 'EOF'
using Warehouse.Domain.Entities;

namespace Warehouse.Infrastructure.Repositories
{
    public interface IOrderRepository : IRepository<Order>
    {
        Task<Order?> GetOrderWithItemsAsync(int id);
    }
}
EOF

cat > Warehouse.Infrastructure/Repositories/OrderRepository.cs << 'EOF'
using Microsoft.EntityFrameworkCore;
using Warehouse.Domain.Entities;

namespace Warehouse.Infrastructure.Repositories
{
    public class OrderRepository : Repository<Order>, IOrderRepository
    {
        public OrderRepository(ApplicationDbContext context) : base(context) { }
        public async Task<Order?> GetOrderWithItemsAsync(int id)
        {
            return await _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.InventoryItem)
                .Include(o => o.StatusHistory)
                .FirstOrDefaultAsync(o => o.Id == id);
        }
    }
}
EOF

# DbContext
cat > Warehouse.Infrastructure/Data/ApplicationDbContext.cs << 'EOF'
using Microsoft.EntityFrameworkCore;
using Warehouse.Domain.Entities;

namespace Warehouse.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<OrderStatusHistory> OrderStatusHistories { get; set; }
        public DbSet<Warehouse> Warehouses { get; set; }
        public DbSet<InventoryItem> InventoryItems { get; set; }
        public DbSet<InventoryStock> InventoryStocks { get; set; }
        public DbSet<InventoryReservation> InventoryReservations { get; set; }
        public DbSet<Shipment> Shipments { get; set; }
        public DbSet<DeliveryTask> DeliveryTasks { get; set; }
        public DbSet<ExceptionRecord> ExceptionRecords { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
EOF

# Application
cat > Warehouse.Application/Interfaces/IOrderService.cs << 'EOF'
using Warehouse.Application.DTOs;

namespace Warehouse.Application.Interfaces
{
    public interface IOrderService
    {
        Task<OrderDto?> GetOrderByIdAsync(int id);
        Task<IEnumerable<OrderDto>> GetOrdersByUserAsync(int userId);
        Task<OrderDto> CreateOrderAsync(CreateOrderDto createOrderDto);
        Task UpdateOrderStatusAsync(int orderId, string status, string changedBy);
    }
}
EOF

cat > Warehouse.Application/Services/OrderService.cs << 'EOF'
using Warehouse.Application.DTOs;
using Warehouse.Application.Interfaces;
using Warehouse.Domain.Entities;
using Warehouse.Infrastructure.Repositories;

namespace Warehouse.Application.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IRepository<OrderItem> _orderItemRepository;
        private readonly IRepository<OrderStatusHistory> _statusHistoryRepository;
        private readonly IRepository<InventoryReservation> _reservationRepository;
        private readonly ApplicationDbContext _context;
        public OrderService(IOrderRepository orderRepository, IRepository<OrderItem> orderItemRepository, IRepository<OrderStatusHistory> statusHistoryRepository, IRepository<InventoryReservation> reservationRepository, ApplicationDbContext context)
        {
            _orderRepository = orderRepository;
            _orderItemRepository = orderItemRepository;
            _statusHistoryRepository = statusHistoryRepository;
            _reservationRepository = reservationRepository;
            _context = context;
        }
        public async Task<OrderDto?> GetOrderByIdAsync(int id)
        {
            var order = await _orderRepository.GetOrderWithItemsAsync(id);
            if (order == null) return null;
            return new OrderDto
            {
                Id = order.Id,
                UserId = order.UserId,
                Status = order.Status,
                CreatedAt = order.CreatedAt,
                Items = order.OrderItems.Select(oi => new OrderItemDto
                {
                    Id = oi.Id,
                    InventoryItemId = oi.InventoryItemId,
                    Name = oi.InventoryItem?.Name ?? "",
                    Quantity = oi.Quantity
                }).ToList(),
                StatusHistory = order.StatusHistory.Select(sh => new OrderStatusHistoryDto
                {
                    Status = sh.Status,
                    ChangedAt = sh.ChangedAt,
                    ChangedBy = sh.ChangedBy
                }).ToList()
            };
        }
        public async Task<IEnumerable<OrderDto>> GetOrdersByUserAsync(int userId)
        {
            var orders = await _orderRepository.FindAsync(o => o.UserId == userId);
            return orders.Select(o => new OrderDto
            {
                Id = o.Id,
                Status = o.Status,
                CreatedAt = o.CreatedAt
            });
        }
        public async Task<OrderDto> CreateOrderAsync(CreateOrderDto createOrderDto)
        {
            var order = new Order
            {
                UserId = createOrderDto.UserId,
                CreatedAt = DateTime.UtcNow,
                Status = "Pending"
            };
            await _orderRepository.AddAsync(order);
            foreach (var item in createOrderDto.Items)
            {
                var orderItem = new OrderItem
                {
                    OrderId = order.Id,
                    InventoryItemId = item.InventoryItemId,
                    Quantity = item.Quantity
                };
                await _orderItemRepository.AddAsync(orderItem);
                var reservation = new InventoryReservation
                {
                    InventoryItemId = item.InventoryItemId,
                    OrderId = order.Id,
                    ReservedQuantity = item.Quantity,
                    ReservedAt = DateTime.UtcNow
                };
                await _reservationRepository.AddAsync(reservation);
            }
            await _context.SaveChangesAsync();
            return new OrderDto { Id = order.Id, Status = order.Status, CreatedAt = order.CreatedAt };
        }
        public async Task UpdateOrderStatusAsync(int orderId, string status, string changedBy)
        {
            var order = await _orderRepository.GetByIdAsync(orderId);
            if (order != null)
            {
                order.Status = status;
                _orderRepository.Update(order);
                var history = new OrderStatusHistory
                {
                    OrderId = orderId,
                    Status = status,
                    ChangedAt = DateTime.UtcNow,
                    ChangedBy = changedBy
                };
                await _statusHistoryRepository.AddAsync(history);
                await _context.SaveChangesAsync();
            }
        }
    }
}
EOF

# DTOs
cat > Warehouse.Application/DTOs/CreateOrderDto.cs << 'EOF'
using System.Collections.Generic;

namespace Warehouse.Application.DTOs
{
    public class CreateOrderDto
    {
        public int UserId { get; set; }
        public List<OrderItemCreateDto> Items { get; set; } = new();
    }
    public class OrderItemCreateDto
    {
        public int InventoryItemId { get; set; }
        public int Quantity { get; set; }
    }
}
EOF

cat > Warehouse.Application/DTOs/OrderDto.cs << 'EOF'
using System;
using System.Collections.Generic;

namespace Warehouse.Application.DTOs
{
    public class OrderDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public List<OrderItemDto> Items { get; set; } = new();
        public List<OrderStatusHistoryDto> StatusHistory { get; set; } = new();
    }
    public class OrderItemDto
    {
        public int Id { get; set; }
        public int InventoryItemId { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Quantity { get; set; }
    }
    public class OrderStatusHistoryDto
    {
        public string Status { get; set; } = string.Empty;
        public DateTime ChangedAt { get; set; }
        public string ChangedBy { get; set; } = string.Empty;
    }
}
EOF

# API
cat > Warehouse.Api/DTOs/LoginDto.cs << 'EOF'
namespace Warehouse.Api.DTOs
{
    public class LoginDto
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
EOF

cat > Warehouse.Api/Controllers/AuthController.cs << 'EOF'
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Warehouse.Api.DTOs;
using Warehouse.Domain.Entities;
using Warehouse.Infrastructure.Repositories;

namespace Warehouse.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IRepository<User> _userRepository;
        private readonly IConfiguration _configuration;
        public AuthController(IRepository<User> userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var user = (await _userRepository.FindAsync(u => u.Username == loginDto.Username)).FirstOrDefault();
            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
                return Unauthorized();
            var token = GenerateJwtToken(user);
            return Ok(new { Token = token });
        }
        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
EOF

cat > Warehouse.Api/Controllers/OrdersController.cs << 'EOF'
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Warehouse.Application.DTOs;
using Warehouse.Application.Interfaces;

namespace Warehouse.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;
        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrder(int id)
        {
            var order = await _orderService.GetOrderByIdAsync(id);
            if (order == null) return NotFound();
            return Ok(order);
        }
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetOrdersByUser(int userId)
        {
            var orders = await _orderService.GetOrdersByUserAsync(userId);
            return Ok(orders);
        }
        [HttpPost]
        public async Task<IActionResult> CreateOrder(CreateOrderDto createOrderDto)
        {
            var order = await _orderService.CreateOrderAsync(createOrderDto);
            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] UpdateStatusDto updateStatusDto)
        {
            await _orderService.UpdateOrderStatusAsync(id, updateStatusDto.Status, updateStatusDto.ChangedBy);
            return NoContent();
        }
    }
    public class UpdateStatusDto
    {
        public string Status { get; set; } = string.Empty;
        public string ChangedBy { get; set; } = string.Empty;
    }
}
EOF

# Update appsettings
cat > Warehouse.Api/appsettings.json << 'EOF'
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=warehouse;Username=postgres;Password=password"
  },
  "Jwt": {
    "Key": "your-super-secret-key-here",
    "Issuer": "WarehouseApi",
    "Audience": "WarehouseUsers"
  }
}
EOF

# Update Program.cs
cat > Warehouse.Api/Program.cs << 'EOF'
using Microsoft.EntityFrameworkCore;
using Warehouse.Api.Controllers;
using Warehouse.Application.Interfaces;
using Warehouse.Application.Services;
using Warehouse.Domain.Entities;
using Warehouse.Infrastructure.Data;
using Warehouse.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IOrderService, OrderService>();

builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

builder.Services.AddAuthorization();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
EOF

echo "Backend created"

# Frontend
sudo apt update
sudo apt install -y nodejs npm
npx @angular/cli new warehouse-frontend --routing --style=scss --skip-git --yes
cd warehouse-frontend
npm install @angular/material @angular/cdk @angular/platform-browser-dynamic
ng generate component login --skip-tests
ng generate component dashboard --skip-tests
ng generate component order-create --skip-tests
ng generate component order-list --skip-tests
ng generate component order-details --skip-tests
ng generate component inventory-check --skip-tests
ng generate component dispatch-order --skip-tests
ng generate component shipments-queue --skip-tests
ng generate component shipment-details --skip-tests
ng generate service auth --skip-tests
ng generate service order --skip-tests
ng generate service inventory --skip-tests
ng generate service shipment --skip-tests

echo "Frontend created"