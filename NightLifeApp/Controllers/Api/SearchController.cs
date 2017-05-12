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

namespace NightLifeApp.Controllers.Api
{
    [Route("api/search")]
    public class SearchController : Controller
    {
        private readonly string googlePlacesKey;
        private IConfiguration config;

        public SearchController(IConfiguration config)
        {
            googlePlacesKey = config["Data:GooglePlacesKey"];
            this.config = config;
        }

        //GET api/search/nearby/?lat=54.6&long=89.4
        [HttpGet("nearby")]
        public async Task<IActionResult> FindNearbyBars()
        {
            float latitude = 0.0f;
            float longitude = 0.0f;

            try
            {
                latitude = float.Parse(Request.Query["lat"]);
                longitude = float.Parse(Request.Query["long"]);
            }
            catch (FormatException)
            {
                return Json(new { Error = "Lat or Long was not a number. Please use numbers for Lat and Long" });
            }

            using (HttpClient client = new HttpClient())
            {
                using (HttpResponseMessage response =
                    await client.GetAsync($"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={latitude},{longitude}&radius=5000&type=bar&key={googlePlacesKey}"))
                {
                    response.EnsureSuccessStatusCode();

                    string jsonString = await response.Content.ReadAsStringAsync();

                    dynamic json = JsonConvert.DeserializeObject(jsonString);

                    //For Testing Only, will have to make a service to return all Json Object we will need
                    JObject obj = new JObject(
                        new JProperty("name", json.results[0].name),                        
                        new JProperty("vicinity", json.results[0].vicinity),
                        new JProperty("rating", json.results[0].rating),
                        new JProperty("photoReference", json.results[0].photos[0].photo_reference)
                        );
                        

                    return Json(obj);
                }
            }
        }

        private IActionResult GetBarPhoto()
        {
            return Json(new { Placeholder = true });
        }

        [HttpGet("test")]
        public IActionResult Test()
        {


            var authTest = User.Identity.IsAuthenticated;
            var nameTest = User.Identity.Name;

            return Json(new { IsAuthenticated = authTest, UserName = nameTest });
        }
    }
}
