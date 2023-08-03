using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;
using Tabloid.Models;

namespace Tabloid.Models
{
    public class PulseReaction
    {
        public int Id { get; set; }

        [Required]
        public int PulseId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int ReactionId { get; set; }

    }
}