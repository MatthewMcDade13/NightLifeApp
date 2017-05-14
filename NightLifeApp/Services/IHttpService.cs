using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NightLifeApp.Services
{
    public interface IHttpService
    {
        Task<string> GetNearbyBars(float latitude, float longitude);

        Task<Byte[]> GetBarPhoto(string photoReference);

        Task<string> GetCoordinates(string location);
    }
}
