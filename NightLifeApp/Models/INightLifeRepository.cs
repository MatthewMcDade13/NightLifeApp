using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NightLifeApp.Models
{
    public interface INightLifeRepository
    {
        void AddBar(Bar bar);

        void AddMultipleBars(List<Bar> bars);

        Bar GetBarById(int id);

        IEnumerable<string> GetBarAddresses(List<Bar> bars);

        IEnumerable<Bar> GetAllBars();

        IEnumerable<Bar> GetBarsByAdress(string[] addresses);

        Task SaveChangesAsync();
    }
}
