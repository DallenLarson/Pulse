namespace Tabloid.Models
{
    public class Relationship
    {
        public int Id { get; set; }
        public int FollowerId { get; set; }
        public int FollowedId { get; set; }
    }
}
