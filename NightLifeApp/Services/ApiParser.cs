using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NightLifeApp.ViewModels;
using Newtonsoft.Json;
using System.Net.Http;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using NightLifeApp.Models;

namespace NightLifeApp.Services
{
    public class ApiParser : IApiParser
    {
        public List<Bar> ParseGooglePlacesApiResponse(string jsonResponse)
        {
            List<Bar> bars = new List<Bar>();

            string name = string.Empty;
            string address = string.Empty;
            string placeId = string.Empty;
            string photoReference = string.Empty;
            float rating = 0.0f;

            dynamic json = JsonConvert.DeserializeObject(jsonResponse);

            for (int i = 0; i < json.results.Count; i++)
            {
                name = string.Empty;
                address = string.Empty;                
                photoReference = string.Empty;
                rating = 0.0f;

                //Make sure none of the fields we want are null to avoid runtime errors.
                if (json.results[i].name != null)
                {
                    name = json.results[i].name;
                }
                if (json.results[i].vicinity != null)
                {
                    address = json.results[i].vicinity;
                }
                if (json.results[i].place_id != null)
                {
                    placeId = json.results[i].place_id;
                }
                if (json.results[i].photos != null)
                {
                    photoReference = json.results[i].photos[0].photo_reference;
                }
                if (json.results[i].rating != null)
                {
                    rating = json.results[i].rating;
                }

                bars.Add(new Bar()
                {
                    Name = name,
                    Address = address,
                    PlaceId = placeId,
                    PhotoReference = photoReference,
                    Rating = rating
                });
            }

            return bars;
        }

        public List<BarViewModel> MapBarViewModel(List<Bar> bars)
        {
            List<BarViewModel> barsForView = new List<BarViewModel>();

            for (int i = 0; i < bars.Count(); i++)
            {
                //Map properties we need for every bar
                barsForView.Add(new BarViewModel()
                {
                    Id = bars[i].Id,
                    Name = bars[i].Name,
                    Address = bars[i].Address,
                    NumberOfPeopleAttending = bars[i].NumberOfPeopleAttending,
                    PhotoReference = bars[i].PhotoReference,
                    PlaceId = bars[i].PlaceId,
                    Rating = bars[i].Rating,
                    Users = new List<UserViewModel>()
                });

                //Then we map only the properties we want to know client side for the user
                for (int j = 0; j < bars[i].RSVPs.Count; j++)
                {                   
                    barsForView[i].Users.Add(new UserViewModel()
                    {
                        Name = bars[i].RSVPs.ToList()[i].NightLifeUser.Name,
                        Email = bars[i].RSVPs.ToList()[i].NightLifeUser.Email,
                        FacebookId = bars[i].RSVPs.ToList()[i].NightLifeUser.FacebookId
                    });
                }
            }

            return barsForView;
        }
    }
}
