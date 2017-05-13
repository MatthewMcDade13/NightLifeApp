using NightLifeApp.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NightLifeApp.Services
{
    public interface IApiParser
    {
        List<BarViewModel> ParseGooglePlacesApiResponse(string jsonResponse);
    }
}
