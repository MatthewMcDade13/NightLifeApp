﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NightLifeApp.Models;
using NightLifeApp.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NightLifeApp.Controllers.Api
{
    [Route("api/user")]
    public class UserController : Controller
    {
        private UserManager<NightLifeUser> userManager;

        public UserController(UserManager<NightLifeUser> userManager)
        {
            this.userManager = userManager;
        }

        //GET: api/user/isAuth
        [HttpGet("isAuth")]
        public IActionResult IsUserAuthenticated()
        {
            return Json(new { IsLoggedIn = User.Identity.IsAuthenticated });
        }

        //GET: api/user/getUser
        [HttpGet("getUser")]
        public async Task<IActionResult> GetUserData()
        {
            if (User.Identity.IsAuthenticated)
            {
                NightLifeUser user = await userManager.GetUserAsync(User);

                return Json(new UserViewModel()
                {
                    Name = user.Name,
                    Email = user.Email
                });
            }

            return Json(null);            
        }
    }
}
