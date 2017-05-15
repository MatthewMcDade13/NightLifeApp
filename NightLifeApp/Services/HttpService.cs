using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace NightLifeApp.Services
{
    public class HttpService : IHttpService
    {
        private IConfiguration config;
        private string googlePlacesKey;
        private string googleGeoKey;

        public HttpService(IConfiguration config)
        {
            this.config = config;
            googlePlacesKey = config["Api:Google:PlacesKey"];
            googleGeoKey = config["Api:Google:GeoKey"];
        }

        public async Task<Byte[]> GetBarPhoto(string photoReference)
        {
            using (HttpClient client = new HttpClient())
            {
                using (HttpResponseMessage response =
                    await client.GetAsync($"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photoReference}&key={googlePlacesKey}"))
                {
                    response.EnsureSuccessStatusCode();

                    Byte[] bytes = await response.Content.ReadAsByteArrayAsync();

                    return bytes;
                }
            }
        }

        public async Task<string> GetCoordinates(string location)
        {
            using (HttpClient client = new HttpClient())
            {
                using (HttpResponseMessage response =
                    await client.GetAsync($"https://maps.googleapis.com/maps/api/geocode/json?address={location}&key={googleGeoKey}"))
                {
                    response.EnsureSuccessStatusCode();

                    string jsonString = await response.Content.ReadAsStringAsync();

                    return jsonString;
                }
            }
        }

        public async Task<string> GetNearbyBars(float latitude, float longitude)
        {
            using (HttpClient client = new HttpClient())
            {
                using (HttpResponseMessage response =
                    await client.GetAsync($"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={latitude},{longitude}&radius=5000&type=bar&key={googlePlacesKey}"))
                {
                    response.EnsureSuccessStatusCode();

                    string jsonString = await response.Content.ReadAsStringAsync();

                    return jsonString;
                }
            }
        }
    }
}
