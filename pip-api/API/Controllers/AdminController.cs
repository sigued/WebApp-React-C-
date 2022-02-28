using API.Common.Enums;
using API.DTOs;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;


// Voir IdentityServiceExtention services.AddAuthorization pour le setup des autorisations
namespace API.Controllers
{
    public class AdminController : BaseApiController
    {
        private readonly IAccountService _accountService;
        private readonly IUserService _userManagementService;
        private readonly IEmailService _membershipService;

        public AdminController(IAccountService accountService, IUserService userManagementService, IEmailService membershipService)
        {
            _accountService = accountService;
            _userManagementService = userManagementService;
            _membershipService = membershipService;
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("create-account")]
        public async Task<ActionResult> CreateAccount(SubscriptionCreationDto subscriptionCreationDto)
        {
            var res = await _accountService.CreateAccountAsync(subscriptionCreationDto);
            if (res)
                return Ok("Account successfully created");
            return StatusCode(500);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("update-account")]
        public async Task<ActionResult> UpdateAccount(SubscriptionCreationDto subscriptionCreationDto)
        {
            var res = await _accountService.UpdateAccountAsync(subscriptionCreationDto);
            if (res)
                return Ok("Account successfully updated");
            return StatusCode(500);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpDelete("delete-member/{guid}")]
        public async Task<ActionResult> DeleteAccount(string guid)
        {
            var res = await _accountService.DeleteAccountAsync(guid, false);
            if (res)
                return Ok("Account successfully deleted");
            return StatusCode(500);
        }

        [Authorize(Policy = "RequireSAdminRole")]
        [HttpDelete("delete-admin/{guid}")]
        public async Task<ActionResult> DeleteAdmin(string guid)
        {
            var res = await _accountService.DeleteAccountAsync(guid, true);
            if (res)
                return Ok("Account successfully deleted");
            return StatusCode(500);
        }


        [Authorize(Policy = "RequireSAdminRole")]
        [HttpGet("users-with-roles")]
        public async Task<ActionResult> getInvitations()
        {
            return Ok(await _accountService.GetInvitations());
        }

        [Authorize(Policy = "RequireSAdminRole")]
        [HttpGet("emails")]
        public async Task<ActionResult> GetEmails()
        {
            return Ok(await _membershipService.GetEmails());
        }

    }
}
