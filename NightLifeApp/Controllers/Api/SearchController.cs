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
using Microsoft.AspNetCore.Http;

namespace NightLifeApp.Controllers.Api
{
    [Route("api/search")]
    public class SearchController : Controller
    {
        private IApiParser parser;
        private INightLifeRepository repo;
        private IHttpService http;

        public SearchController(IApiParser parser, INightLifeRepository repo, IHttpService http)
        {
            this.http = http;
            this.parser = parser;
            this.repo = repo;
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
                return Json(Array.Empty<Bar>());
            }

            //Store user's last search in session cache
            HttpContext.Session.SetString("lastSearch", location);

            string jsonString = await http.GetNearbyBars(coords.Latitude, coords.Longitude);

            List<Bar> bars = parser.ParseGooglePlacesApiResponse(jsonString);

            string[] barAddresses = repo.GetBarAddresses(bars).ToArray();

            if (repo.AddMultipleBars(bars))
            {
                //Only save changes to database if any data was added.
                await repo.SaveChangesAsync();
            }
            
            bars = repo.GetBarsByAdress(barAddresses).ToList();                                     

            return Json(bars);
        }       

        //GET: api/search/photo/{photoReference}
        [HttpGet("photo/{photoReference}")]
        public async Task<IActionResult> GetBarPhoto(string photoReference)
        {
            Byte[] bytes = await http.GetBarPhoto(photoReference);

            return File(bytes, "image/jpg");
        }

        //GET api/search/last
        [HttpGet("last")]
        public IActionResult GetLastSearch()
        {
            string lastSearch = HttpContext.Session.GetString("lastSearch");

            return Json(new { LastSearch = lastSearch });
        }

        private async Task<Coordinate> GetCoords(string location)
        {
            string jsonString = await http.GetCoordinates(location);

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
