using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RelationshipController : Controller
    {
        private readonly IRelationshipRepository _relationshipRepository;

        public RelationshipController(IRelationshipRepository relationshipRepository)
        {
            _relationshipRepository = relationshipRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_relationshipRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetRelationshipById(int id)
        {
            var post = _relationshipRepository.GetById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }


        [HttpGet("followed/{followedId}")]
        public IActionResult GetRelationshipByFollowedId(int followedId)
        {
            var post = _relationshipRepository.GetByFollowedId(followedId);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [HttpGet("follower/{followerId}")]
        public IActionResult GetRelationshipByFollowerId(int followerId)
        {
            var post = _relationshipRepository.GetByFollowerId(followerId);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }


        [HttpPost]
        public IActionResult Post(Relationship post)
        {
            Relationship relationship = new Relationship()
            {
                Id = post.Id,
                FollowedId = post.FollowedId,
                FollowerId = post.FollowerId
            };
            _relationshipRepository.Add(relationship);

            return CreatedAtAction(
               nameof(GetRelationshipById), new { post.Id }, post);
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            _relationshipRepository.Delete(id);
            return Ok();
        }

        [HttpDelete("followerId")]
        public IActionResult DeleteByFollowerId(int followerId)
        {
            _relationshipRepository.DeleteFollowers(followerId);
            return Ok();
        }

        [HttpDelete("followedId")]
        public IActionResult DeleteByFollowedId(int followedId)
        {
            _relationshipRepository.DeleteFolloweds(followedId);
            return Ok();
        }
    }
}
