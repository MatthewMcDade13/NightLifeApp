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

            services.AddDbContext<NightLifeContext>();

            services.AddIdentity<NightLifeUser, IdentityRole>(options =>
            {
                options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&'*+-/=?^_`{|}~.@ ";
            })
                .AddEntityFrameworkStores<NightLifeContext>();

            services.AddMvc()
                .AddJsonOptions( options => {
                    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole();

            app.UseStaticFiles();

            app.UseIdentity();

            app.UseFacebookAuthentication(new FacebookOptions()
            {
                AppId = Configuration["Authentication:Facebook:AppId"],
                AppSecret = Configuration["Authentication:Facebook:AppSecret"],
                AutomaticChallenge = true,
                AutomaticAuthenticate = true,
                Scope = { "public_profile", "email" }

            });

            //Havent got the Keys for Twitter just yet

            //app.UseTwitterAuthentication(new TwitterOptions()
            //{
            //    ConsumerKey = Configuration["Authentication:Twitter:ConsumerKey"],
            //    ConsumerSecret = Configuration["Authentication:Twitter:ConsumerSecret"]
            //});

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
