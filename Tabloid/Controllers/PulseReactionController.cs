using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PulseReactionController : ControllerBase
    {
        private readonly IPulseReactionRepository _pulseReactionRepository;

        public PulseReactionController(IPulseReactionRepository pulseReactionRepository)
        {
            _pulseReactionRepository = pulseReactionRepository;
        }

        [HttpPost]
        public IActionResult AddReaction([FromBody] PulseReaction pulseReaction)
        {

            try
            {
                _pulseReactionRepository.AddReaction(pulseReaction);
                return Ok("Reaction added successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest("Error adding the reaction: " + ex.Message);
            }
        }

        [HttpDelete("{pulseId}/{userId}")]
        public IActionResult RemoveReaction(int pulseId, int userId)
        {


            try
            {
                _pulseReactionRepository.RemoveReaction(pulseId, userId);
                return Ok("Reaction removed successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest("Error removing the reaction: " + ex.Message);
            }
        }
    }
}
