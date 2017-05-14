using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NightLifeApp.Models
{
    public class NightLifeRepository : INightLifeRepository
    {
        private NightLifeContext context;

        public NightLifeRepository(NightLifeContext context)
        {
            this.context = context;
        }

        public void AddBar(Bar bar)
        {
            bool isBarInDb = context.Bars
                .Any(b => b.Address == bar.Address);

            if (isBarInDb == false)
            {
                context.Bars.Add(bar);
            }
        }

        public void AddMultipleBars(List<Bar> bars)
        {
            List<Bar> filteredBars = new List<Bar>();

            //Filter out duplicates
            for (int i = 0; i < bars.Count; i++)
            {
                if (context.Bars.Any(b => bars[i].Address == b.Address))
                {
                    continue;
                }

                filteredBars.Add(bars[i]);
            }

            //Only add new entries
            context.Bars.AddRange(filteredBars);
        }


        public Bar GetBarById(int id)
        {
            return context.Bars
                .Include(b => b.PeopleAttending)
                .SingleOrDefault(b => b.Id == id);
        }


        public IEnumerable<string> GetBarAddresses(List<Bar> bars)
        {
            return bars.Select(b => b.Address);
        }

        public IEnumerable<Bar> GetAllBars()
        {
            return context.Bars;
        }        

        public IEnumerable<Bar> GetBarsByAdress(string[] addresses)
        {
            List<Bar> bars = context.Bars
                            .Include(b => b.PeopleAttending)
                            .Where(b => addresses.Contains(b.Address))
                            .ToList();            

            return bars;
        }

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }        
    }
}
