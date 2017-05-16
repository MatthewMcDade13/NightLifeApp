using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NightLifeApp.Models
{
    public class NightLifeUser : IdentityUser
    {
        public string Name { get; set; }
        public string FacebookId { get; set; }
        public ICollection<RSVP> RSVPs { get; set; }
    }
}
