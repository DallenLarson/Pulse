using Microsoft.AspNetCore.Mvc;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RelationshipController : Controller
    {


        public RelationshipController()
        {

        }

        [HttpGet]
        public IActionResult Hello()
        {
            return Content("Hello Relationship");
        }

        [HttpGet("{ID}")]
        public IActionResult GetRelationshipById(int id)
        {


            return Ok();
        }
    }
}
