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

    public class PulseRepository : BaseRepository, IPulseRepository
    {
        public PulseRepository(IConfiguration configuration) : base(configuration) { }

        public List<Pulse> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
               SELECT p.Id, p.Content, p.PostedAt,
                      p.UserId, up.FirebaseId, up.Username, up.Email, up.ProfilepicUrl
                        
                 FROM Pulse p
                      JOIN [User] up ON p.UserId = up.Id
            ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var posts = new List<Pulse>();
                        while (reader.Read())
                        {
                            posts.Add(new Pulse()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Content = DbUtils.GetString(reader, "Content"),
                                //PostedAt = DbUtils.GetDateTime(reader, "Postedat"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                User = new User()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    FirebaseId = DbUtils.GetString(reader, "FirebaseId"),
                                    Username = DbUtils.GetString(reader, "Username"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    ProfilepicUrl = DbUtils.GetString(reader, "ProfilepicUrl"),
                                },
                            });
                        }

                        return posts;
                    }
                }
            }
        }

        public Pulse GetById(int id)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
            
            SELECT p.Content, p.PostedAt, p.UserId,
                      up.FirebaseId, up.Username, up.Email, up.ProfilepicUrl

            FROM [Pulse] p
                      JOIN [User] up ON p.UserId = up.Id
                WHERE p.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        Pulse post = null;
                        if (reader.Read())
                        {
                            post = new Pulse()
                            {
                                Content = DbUtils.GetString(reader, "Content"),
                                //PostedAt = DbUtils.GetDateTime(reader, "Postedat"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                User = new User()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    FirebaseId = DbUtils.GetString(reader, "FirebaseId"),
                                    Username = DbUtils.GetString(reader, "Username"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    ProfilepicUrl = DbUtils.GetString(reader, "ProfilepicUrl"),
                                },
                            };
                        }
                        return post;
                    }
                }
            }
        }

        public List<Pulse> GetByUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
               SELECT p.Id, p.Content, p.PostedAt,
                      p.UserId,

                      up.FirebaseId, up.Username, up.Email,
                      up.ProfilepicUrl AS ProfilepicUrl
                        
                 FROM [Pulse] p
                      JOIN [User] up ON p.UserId = up.Id
                WHERE up.FirebaseId = @FirebaseId
            ";

                    DbUtils.AddParameter(cmd, "@FirebaseId", firebaseUserId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var posts = new List<Pulse>();
                        while (reader.Read())
                        {
                            posts.Add(new Pulse()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Content = DbUtils.GetString(reader, "Content"),
                                //PostedAt = DbUtils.GetDateTime(reader, "Postedat"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                User = new User()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    FirebaseId = DbUtils.GetString(reader, "FirebaseId"),
                                    Username = DbUtils.GetString(reader, "Username"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    ProfilepicUrl = DbUtils.GetString(reader, "ProfilepicUrl"),
                                },
                            });
                        }

                        return posts;
                    }
                }
            }
        }

        public void Add(Pulse post)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Pulse (
                        Content,
                        UserId
                        )
                        
                        OUTPUT INSERTED.ID
	                    
                        VALUES (
                        @Content,
                        @UserId)
                    ";

                    DbUtils.AddParameter(cmd, "@Content", post.Content);
                    //DbUtils.AddParameter(cmd, "@PostedAt", post.PostedAt);
                    DbUtils.AddParameter(cmd, "@UserId", post.UserId);

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
                    cmd.CommandText = "DELETE FROM Pulse WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
       
