using Microsoft.AspNetCore.Http.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NightLifeApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace NightLifeApp.Controllers.Web
{
    public class AuthController : Controller
    {
        private UserManager<NightLifeUser> userManager;
        private SignInManager<NightLifeUser> signInManager;

        public AuthController(UserManager<NightLifeUser> userManager, SignInManager<NightLifeUser> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }


        public async Task<IActionResult> Logout()
        {
            if (User.Identity.IsAuthenticated)
            {
                await signInManager.SignOutAsync();
            }

            return RedirectToAction(nameof(HomeController.Index), "Home");
        }

        public IActionResult Login()
        {            
            return View();
        }       

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult ExternalLogin(string provider, string returnUrl = null)
        {
            string redirectUrl = Url.Action(nameof(ExternalLoginCallback), "Auth", new { ReturnUrl = returnUrl });
            AuthenticationProperties props = signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
            return Challenge(props, provider);
        }

        [HttpGet]
        public async Task<IActionResult> ExternalLoginCallback(string returnUrl = null, string remoteError = null)
        {
            if (remoteError != null)
            {
                throw new Exception($"Error from external provider: {remoteError}");
            }

            ExternalLoginInfo info = await signInManager.GetExternalLoginInfoAsync();

            if (info == null)
            {
                throw new Exception($"External Login Info returned null.");
            }

            var signInResult = await signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, false);

            if (signInResult.Succeeded)
            {
                return RedirectToLocal(returnUrl);
            }
            else
            {
                //Clear auth cookies to make sure we create and sign in the user correctly
                await signInManager.SignOutAsync();

                string facebookId = null;

                if (info.LoginProvider == "Facebook")
                {
                    facebookId = info.ProviderKey;
                }
                
                //Create the user and log them in
                NightLifeUser user = new NightLifeUser
                {
                    UserName = info.Principal.FindFirstValue(ClaimTypes.Email),
                    Email = info.Principal.FindFirstValue(ClaimTypes.Email),
                    Name = info.Principal.FindFirstValue(ClaimTypes.Name),
                    FacebookId = facebookId
                };

                IdentityResult result = await userManager.CreateAsync(user);

                if (result.Succeeded)
                {
                    result = await userManager.AddLoginAsync(user, info);

                    if (result.Succeeded)
                    {
                        await signInManager.SignInAsync(user, isPersistent: false);
                        return RedirectToLocal(returnUrl);
                    }
                }
                
                //If we have gotten this far, the user has logged in with a different social media account.
                return RedirectToAction(nameof(HomeController.Index), "Home", new { message = "The given email address is already in use. Try logging in with a different provider" });
            }
        }

        private IActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }

            return RedirectToAction(nameof(HomeController.Index), "Home");
        }
    }
}
