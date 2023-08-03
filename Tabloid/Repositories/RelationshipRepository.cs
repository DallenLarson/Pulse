using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Tabloid.Models;
using Tabloid.Utils;
using Tabloid.Repositories;

namespace Tabloid.Repositories
{

    public class RelationshipRepository : BaseRepository, IRelationshipRepository
    {
        public RelationshipRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public void Add(Relationship post)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Relationship (                    
                        FollowedId,
                        FollowerId
                        )
                        
                        OUTPUT INSERTED.ID
	                    
                        VALUES (
                        @FollowedId,
                        @FollowerId)
                    ";

                    DbUtils.AddParameter(cmd, "@FollowedId", post.FollowedId);
                    DbUtils.AddParameter(cmd, "@FollowerId", post.FollowerId);

                    post.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    // Step 1: Delete PulseReactions related to the Pulse
                    cmd.CommandText = "DELETE FROM Relationship WHERE id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();           
                }
            }
        }

        public List<Relationship> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * FROM dbo.Relationship R";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var posts = new List<Relationship>();
                        while (reader.Read())
                        {
                            posts.Add(new Relationship()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FollowedId = DbUtils.GetInt(reader, "FollowedId"),
                                FollowerId = DbUtils.GetInt(reader, "FollowerId")

                            });
                        }
                        return posts;
                    }
                }
            }
        }

        public Relationship GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * FROM [RelationShip]r WHERE r.ID  = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        Relationship post = null;
                        if (reader.Read())
                        {
                            post = new Relationship()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FollowedId = DbUtils.GetInt(reader, "FollowedId"),
                                FollowerId = DbUtils.GetInt(reader, "FollowerId"),
                            };
                        }
                        return post;
                    }
                }
            }
        }
    }
}