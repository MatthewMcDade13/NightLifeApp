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
using AutoMapper;

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
                name = json.results[i].name;
                address = json.results[i].vicinity;
                placeId = json.results[i].place_id;
                rating = 0.0f;

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

        public BarDetailsViewModel ParseGooglePlaceDetailsResponse(string jsonResponse)
        {

            bool isOpenNow = false;
            List<string> daysOpen = new List<string>();
            float priceLevel = 0.0f;
            float rating = 0.0f;
            List<BarReviewViewModel> reviews = new List<BarReviewViewModel>();
            float userRating = 0.0f;

            dynamic json = JsonConvert.DeserializeObject(jsonResponse);

            //Ensure our non nullable types are not null to avoid runtime errors
            if (json.result.opening_hours != null)
            {
                isOpenNow = json.result.opening_hours.open_now;
            }
            if (json.result.opening_hours != null)
            {
                daysOpen.AddRange(json.result.opening_hours.weekday_text.ToObject<string[]>());
            }
            if (json.result.rating != null)
            {
                rating = json.result.rating;
            }
            if (json.result.price_level != null)
            {
                priceLevel = json.result.price_level;
            }
            if (json.result.reviews != null)
            {
                for (int i = 0; i < json.result.reviews.Count; i++)
                {
                    if (json.result.reviews[i].rating != null)
                    {
                        userRating = json.result.reviews[i].rating;
                    }

                    reviews.Add(new BarReviewViewModel()
                    {
                        Author = json.result.reviews[i].author_name,
                        ProfilePhotoUrl = json.result.reviews[i].profile_photo_url,
                        Rating = userRating,
                        ReviewDate = json.result.reviews[i].relative_time_description,
                        ReviewBody = json.result.reviews[i].text
                    });
                }
            }

            BarDetailsViewModel barDetails = new BarDetailsViewModel()
            {
                PhoneNumber = json.result.formatted_phone_number,
                IsOpenNow = isOpenNow,
                DaysOpen = daysOpen,
                PriceLevel = priceLevel,
                Rating = rating,
                Reviews = reviews
            };

            return barDetails;
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
                    Users = Mapper.Map<List<UserViewModel>>(bars[i].RSVPs.Select(rsvp => rsvp.NightLifeUser))
                });
            }

            return barsForView;
        }
    }
}