using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System;
using System.Security.Claims;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class PulseController : ControllerBase
    {
        private readonly IPulseRepository _postRepository;
        private readonly IUserRepository _userProfileRepository;
        public PulseController(IPulseRepository postRepository, IUserRepository userProfileRepository)
        {
            _postRepository = postRepository;
            _userProfileRepository = userProfileRepository;
        }

        //[Authorize]
        [HttpGet]
        public IActionResult Get()
        {

            return Ok(_postRepository.GetAll());
        }

        //[Authorize]
        [HttpGet("{id}")]
        public IActionResult GetPostById(int id)
        {
            var post = _postRepository.GetById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }
    
        //[Authorize]
        [HttpGet("userposts")]
        public IActionResult GetUserPosts()
        {
            //var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var firebaseUserId = "0IgY8lxGLfNVUI6SvBXpLTOAwZQ2";

            return Ok(_postRepository.GetByUserId(firebaseUserId));
        }

        //[Authorize]
        [HttpPost]
        public IActionResult Post(Pulse post)
        {
            User user = GetCurrentUserProfile();

            post.PostedAt = DateTime.Now;
            post.UserId = user.Id;
            _postRepository.Add(post);
            return CreatedAtAction(
                nameof(GetPostById), new { post.Id }, post);
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            _postRepository.Delete(id);
            return Ok();
        }

        private User GetCurrentUserProfile()
        {
            //var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var firebaseUserId = "0IgY8lxGLfNVUI6SvBXpLTOAwZQ2";
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}