using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Net.Http;
using Microsoft.Extensions.Configuration;
using NightLifeApp.ViewModels;
using NightLifeApp.Models;
using NightLifeApp.Services;

namespace NightLifeApp.Controllers.Api
{
    [Route("api/search")]
    public class SearchController : Controller
    {
        private readonly string googlePlacesKey;
        private readonly string googleGeoKey;
        private IConfiguration config;
        private IApiParser parser;

        public SearchController(IConfiguration config, IApiParser parser)
        {
            this.parser = parser;

            this.config = config;
            googlePlacesKey = config["Data:GooglePlacesKey"];
            googleGeoKey = config["Data:GoogleGeoKey"];
        }

        //GET api/search/nearby?location=city
        [HttpGet("nearby")]
        public async Task<IActionResult> FindNearbyBars()
        {
            string location = Request.Query["location"];

            Coordinate coords = await GetCoords(location);

            //If coords Obj is null, the search did turn up anything, so return an empty Array.
            if (coords == null)
            {
                return Json(Array.Empty<BarViewModel>());
            }

            using (HttpClient client = new HttpClient())
            {
                using (HttpResponseMessage response =
                    await client.GetAsync($"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={coords.Latitude},{coords.Longitude}&radius=5000&type=bar&key={googlePlacesKey}"))
                {
                    response.EnsureSuccessStatusCode();

                    string jsonString = await response.Content.ReadAsStringAsync();

                    List<BarViewModel> bars = parser.ParseGooglePlacesApiResponse(jsonString);

                    return Json(bars);
                }
            }
        }

        private async Task<Coordinate> GetCoords(string location)
        {
            using (HttpClient client = new HttpClient())
            {
                using (HttpResponseMessage response =
                    await client.GetAsync($"https://maps.googleapis.com/maps/api/geocode/json?address={location}&key={googleGeoKey}"))
                {
                    response.EnsureSuccessStatusCode();

                    string jsonString = await response.Content.ReadAsStringAsync();

                    dynamic json = JsonConvert.DeserializeObject(jsonString);

                    if (json.results.Count == 0)
                    {
                        return null;
                    }

                    Coordinate coords = new Coordinate()
                    {
                        Latitude = json.results[0].geometry.location.lat,
                        Longitude = json.results[0].geometry.location.lng
                    };

                    return coords;
                }
            }
        }

        [HttpGet("photo/{photoReference}")]
        public async Task<IActionResult> GetBarPhoto(string photoReference)
        {
            using (HttpClient client = new HttpClient())
            {
                using (HttpResponseMessage response = await client.GetAsync($"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photoReference}&key={googlePlacesKey}"))
                {
                    response.EnsureSuccessStatusCode();

                    Byte[] bytes = await response.Content.ReadAsByteArrayAsync();

                    return File(bytes, "image/jpg");
                }
            }
        }
    }
}
