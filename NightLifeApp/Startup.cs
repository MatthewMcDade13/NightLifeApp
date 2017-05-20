using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore;
using Newtonsoft.Json.Serialization;
using NightLifeApp.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using NightLifeApp.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using AutoMapper;
using NightLifeApp.ViewModels;

namespace NightLifeApp
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("config.json")
                .AddEnvironmentVariables();

            if (env.IsDevelopment())
            {
                builder.AddUserSecrets<Startup>();
            }

            Configuration = builder.Build();

        }



        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton(Configuration);

            services.AddDistributedMemoryCache();

            services.AddSession();

            services.AddScoped<IApiParser, ApiParser>();

            services.AddScoped<IHttpService, HttpService>();

            services.AddScoped<INightLifeRepository, NightLifeRepository>();

            services.AddDbContext<NightLifeContext>();

            services.AddIdentity<NightLifeUser, IdentityRole>(config =>
            {
                config.User.RequireUniqueEmail = true;
                config.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&'*+-/=?^_`{|}~.@ ";
                config.Cookies.ApplicationCookie.LoginPath = "/Auth/Login";
                config.Cookies.ApplicationCookie.Events = new CookieAuthenticationEvents()
                {
                    OnRedirectToLogin = async context =>
                    {
                        if (context.Request.Path.StartsWithSegments("/api") &&
                            context.Response.StatusCode == 200)
                        {
                            context.Response.StatusCode = 401;
                        }
                        else
                        {
                            context.Response.Redirect(context.RedirectUri);
                        }

                        await Task.Yield();
                    }
                };
            })
                .AddEntityFrameworkStores<NightLifeContext>();

            services.AddMvc()
                .AddJsonOptions( options => {
                    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            Mapper.Initialize(config =>
            {
                config.CreateMap<NightLifeUser, UserViewModel>().ReverseMap();
                config.CreateMap<Bar, BarViewModel>().ReverseMap();
            });

            loggerFactory.AddConsole();

            app.UseStaticFiles();

            app.UseSession();

            app.UseIdentity();

            app.UseFacebookAuthentication(new FacebookOptions()
            {
                AppId = Environment.GetEnvironmentVariable("FacebookAppId"),
                AppSecret = Environment.GetEnvironmentVariable("FacebookAppSecret"),
                AutomaticChallenge = true,
                AutomaticAuthenticate = true,
                Scope = { "public_profile", "email" }

            });

            app.UseGoogleAuthentication(new GoogleOptions()
            {
                ClientId = Environment.GetEnvironmentVariable("GoogleClientId"),
                ClientSecret = Environment.GetEnvironmentVariable("GoogleClientSecret"),
                AutomaticAuthenticate = true,
                AutomaticChallenge = true
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }            

            app.UseMvc(config =>
            {
                config.MapRoute(
                    "Default",
                    "{controller}/{action}/{id?}",
                    new { controller = "Home", action = "Index" });
            });           
        }
    }
}
