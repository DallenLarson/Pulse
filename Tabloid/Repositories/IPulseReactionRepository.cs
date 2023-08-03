using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPulseReactionRepository
    {
        void AddReaction(PulseReaction pulseReaction);
        void RemoveReaction(int pulseId, int userId);
    }

}