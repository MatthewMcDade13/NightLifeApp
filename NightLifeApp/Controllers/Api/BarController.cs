using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NightLifeApp.Controllers.Web;
using NightLifeApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NightLifeApp.Controllers.Api
{
    [Route("api/bar")]
    public class BarController : Controller
    {
        private INightLifeRepository repo;
        private UserManager<NightLifeUser> userManager;

        public BarController(INightLifeRepository repo, UserManager<NightLifeUser> userManager)
        {
            this.userManager = userManager;
            this.repo = repo;
        }

        /// <summary>
        /// Add or removes user from a Bar model based on if that user has rsvp'ed
        ///  to it or not
        /// </summary>
        /// <param name="barId">Id of bar subscribing to</param>
        /// <returns>True is user was added to the Bar model, False if user was removed from Bar model</returns>
        [HttpPut("sub/{barId}")]        
        public async Task<IActionResult> ToggleRSVPToBar(int barId)
        {
            //We dont want Facebook or Google auth to redirect user,
            //So send a json response that contains url for client to redirect to
            if (User.Identity.IsAuthenticated == false)
            {
                return Json(new { RedirectUrl = "/Auth/Login" });
            }

            NightLifeUser user = await userManager.GetUserAsync(User);

            Bar bar = repo.GetBarById(barId);

            //If the user attempting to rsvp to a bar that they have already subscribed to, remove them instead
            if (bar.RSVPs.Any(rsvp => rsvp.NightLifeUserId == user.Id))
            {
                bar.RSVPs.Remove(
                    bar.RSVPs
                    .First(rsvp => rsvp.NightLifeUserId == user.Id));
                bar.NumberOfPeopleAttending--;
                await repo.SaveChangesAsync();
                return Json(new { Subbed = false });
            }
            else
            {
                bar.RSVPs.Add( new RSVP()
                {
                    NightLifeUserId = user.Id,
                    NightLifeUser = user,
                    BarId = bar.Id,
                    Bar = bar
                });

                bar.NumberOfPeopleAttending++;
                await repo.SaveChangesAsync();
                return Json(new { Subbed = true });
            }
        }
    }
}
