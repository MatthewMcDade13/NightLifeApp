using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NightLifeApp.ViewModels
{
    public class BarDetailsViewModel
    {
        public string PhoneNumber { get; set; }
        public bool IsOpenNow { get; set; }
        public List<string> DaysOpen { get; set; }
        public float PriceLevel { get; set; }
        public float Rating { get; set; }
        public List<BarReviewViewModel> Reviews { get; set; }
    }
}
