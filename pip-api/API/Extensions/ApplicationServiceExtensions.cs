using API.Common.ConfigModels;
using API.Data;
using API.Interfaces;
using API.Mappers;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            // Repos
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IEmailRepository, EmailRepository>();
            services.AddScoped<ISubscriptionRepository, SubscriptionRepository>();
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<IParameterRepository, ParameterRepository>();
            //services.AddScoped<IEquationRepository, EquationRepository>();
            services.AddScoped<ICorrelationRepository, CorrelationRepository>();

            // Services
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IEmailSendingService, EmailSendingService>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IOrderProcessService, OrderProcessService>();
            services.AddScoped<IParameterService, ParameterService>();
            services.AddScoped<IReportPdfService, ReportPdfService>();
            services.AddScoped<IEmailService, EmailService>();

            // ConfigModels
            services.Configure<SMTPConfigModel>(config.GetSection("SMTPConfig"));
            services.Configure<BaseUrlConfigModel>(config.GetSection("BaseUrl"));

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ISubscriptionService, SubscriptionService>();

            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
                   
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });

            return services;
        }


    }
}
