using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NightLifeApp.ViewModels
{
    public class BarReviewViewModel
    {
        public string Author { get; set; }
        public string ProfilePhotoUrl { get; set; }
        public float Rating { get; set; }
        public string ReviewDate { get; set; }
        public string ReviewBody { get; set; }
    }
}
