using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public User GetByFirebaseUserId(string FirebaseId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT up.Id, up.FirebaseId, up.Username, 
                           up.Email, up.ProfilepicUrl
                      FROM [User] up
                     WHERE up.FirebaseId = @FirebaseId";

                    DbUtils.AddParameter(cmd, "@FirebaseId", FirebaseId);

                    User user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseId = DbUtils.GetString(reader, "FirebaseId"),
                            Username = DbUtils.GetString(reader, "Username"),
                            Email = DbUtils.GetString(reader, "Email"),
                            ProfilepicUrl = DbUtils.GetString(reader, "ProfilepicUrl"),
                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }

        public User GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT up.Id, Up.FirebaseId, up.Username, 
                           up.Email, up.ProfilepicUrl
                      FROM [User] up
                     WHERE up.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    User userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseId = DbUtils.GetString(reader, "FirebaseId"),
                            Username = DbUtils.GetString(reader, "Username"),
                            Email = DbUtils.GetString(reader, "Email"),
                            ProfilepicUrl = DbUtils.GetString(reader, "ProfilepicUrl"),
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public List<User> GetUsers()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT up.Id, Up.FirebaseId, up.c
                                               up.Email, up.ProfilepicUrl,
                                               ut.[Name] AS UserTypeName
                                        FROM User up
                                        LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                                        ORDER BY up.Username";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var users = new List<User>();
                        while (reader.Read())
                        {
                            users.Add(new User()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FirebaseId = DbUtils.GetString(reader, "FirebaseId"),
                                Username = DbUtils.GetString(reader, "Username"),
                                Email = DbUtils.GetString(reader, "Email"),
                                ProfilepicUrl = DbUtils.GetString(reader, "ProfilepicUrl"),
                            });
                        }
                        return users;
                    }
                }
            }
        }

        public void Add(User userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO [User] (FirebaseId, Username, 
                                                                 Email, ProfilepicUrl)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseId, @Username, 
                                                @Email, @ProfilepicUrl)";
                    DbUtils.AddParameter(cmd, "@FirebaseId", userProfile.FirebaseId);
                    DbUtils.AddParameter(cmd, "@Username", userProfile.Username);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@ProfilepicUrl", userProfile.ProfilepicUrl);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(User userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE User
                                        SET Username = @username,
                                            Email = @email,
                                            ProfilepicUrl = @profilepicUrl,
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@username", userProfile.Username);
                    DbUtils.AddParameter(cmd, "@email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@profilepicUrl", userProfile.ProfilepicUrl);
                    DbUtils.AddParameter(cmd, "@id", userProfile.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
