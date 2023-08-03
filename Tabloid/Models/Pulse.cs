using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;
using Tabloid.Models;

namespace Tabloid.Models
{
    public class Pulse
    {
        public int Id { get; set; }

        [Required]
        public string Content { get; set; }

        public DateTime PostedAt { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }


        /* Add this for when categories are implemented */

        // public Category Category { get; set; }

    }
}