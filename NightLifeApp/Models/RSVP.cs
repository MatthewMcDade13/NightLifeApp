using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NightLifeApp.Models
{
    public class RSVP
    {
        public int BarId { get; set; }
        public Bar Bar { get; set; }

        public string NightLifeUserId { get; set; }
        public NightLifeUser NightLifeUser { get; set; }
    }
}
