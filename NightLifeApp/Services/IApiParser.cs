using NightLifeApp.Models;
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
        BarDetailsViewModel ParseGooglePlaceDetailsResponse(string jsonResponse);

        List<Bar> ParseGooglePlacesApiResponse(string jsonResponse);

        List<BarViewModel> MapBarViewModel(List<Bar> bars);
    }
}
