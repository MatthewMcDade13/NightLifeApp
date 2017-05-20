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

            optionsBuilder.UseNpgsql(config["Data:ConnectionString"]);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<RSVP>()
                .HasKey(rsvp => new { rsvp.BarId, rsvp.NightLifeUserId });

            builder.Entity<RSVP>()
                .HasOne(rsvp => rsvp.Bar)
                .WithMany(b => b.RSVPs)
                .HasForeignKey(rsvp => rsvp.BarId);

            builder.Entity<RSVP>()
                .HasOne(rsvp => rsvp.NightLifeUser)
                .WithMany(u => u.RSVPs)
                .HasForeignKey(rsvp => rsvp.NightLifeUserId);
        }
    }
}
