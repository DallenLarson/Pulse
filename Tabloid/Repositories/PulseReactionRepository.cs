using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class PulseReactionRepository : BaseRepository, IPulseReactionRepository
    {
        public PulseReactionRepository(IConfiguration configuration) : base(configuration) { }

        public void AddReaction(PulseReaction pulseReaction)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO PulseReaction (PulseId, UserId, ReactionId)
                    VALUES (@PulseId, @UserId, @ReactionId)
                ";

                    DbUtils.AddParameter(cmd, "@PulseId", pulseReaction.PulseId);
                    DbUtils.AddParameter(cmd, "@UserId", pulseReaction.UserId);
                    DbUtils.AddParameter(cmd, "@ReactionId", pulseReaction.ReactionId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void RemoveReaction(int pulseId, int userId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE FROM PulseReaction
                    WHERE PulseId = @PulseId AND UserId = @UserId
                ";

                    DbUtils.AddParameter(cmd, "@PulseId", pulseId);
                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}