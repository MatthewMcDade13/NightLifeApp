using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NightLifeApp.Models
{
    public class Bar
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImgUrl { get; set; }
        public string BarUrl { get; set; }
        public ICollection<NightLifeUser> PeopleAttending { get; set; }
        public int NumberOfPeopleAttending { get; set; }
        public float Rating { get; set; }
    }
}
