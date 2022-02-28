using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly SignInManager<AppUser> _signInManager;

        private readonly ITokenService _tokenService;
        private readonly IAccountService _accountService;
        private readonly IUserService _userService;
        private readonly UserManager<AppUser> _userManager;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, 
            ITokenService tokenService, IAccountService accountService, IUserService userService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _accountService = accountService;
            _userService = userService;
        }

        [HttpGet("subscriptionCreation/{guid}")]
        public async Task<ActionResult<UserDto>> ValidateSubscriptionCreationEmail(string guid)
        {
            var user = await _accountService.ValidateEmailLink(guid);
            return new UserDto
            {
                Id = user.Id,
                Token = await _tokenService.CreateToken(user)
            };
        }

        [Authorize(Policy = "RequireMemberRole")]
        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            
            if (await UserExists(registerDto.Username)) return BadRequest("Username is taken");

            var res = await _accountService.RegisterAccount(registerDto);
            if (res)
                return Ok("account created");
            return StatusCode(500);
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            // TODO: verifier si le user est actif
            var user = await _userService.GetActiveUser(loginDto);

            if (user == null) return Unauthorized("Invalid user");

            var res = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!res.Succeeded) return Unauthorized();

            var roles = await _userManager.GetRolesAsync(user);

            if (roles == null) return BadRequest("Invalid user");

            string mainRole = Helpers.AppUserHelper.GetMainRole(roles);

            return new UserDto
            {
                Id = user.Id,
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                Role = mainRole
            };
        }


        private async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}
