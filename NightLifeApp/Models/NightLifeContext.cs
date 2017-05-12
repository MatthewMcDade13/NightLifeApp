using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace NightLifeApp.Models
{
    public class NightLifeContext : IdentityDbContext<NightLifeUser>
    {
        private IConfiguration config;

        public DbSet<Bar> Bars { get; set; }

        public NightLifeContext(IConfiguration config, DbContextOptions options)
            :base(options)
        {
            this.config = config;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            optionsBuilder.UseSqlServer(config["Data:ConnectionString"]);
        }
    }
}
