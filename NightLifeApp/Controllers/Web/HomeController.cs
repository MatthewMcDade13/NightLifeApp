﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NightLifeApp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            TempData["loginMessage"] = Request.Query["message"].ToString();

            return View();
        }
    }
}
