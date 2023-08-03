using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPulseRepository
    {
        List<Pulse> GetAll();
        Pulse GetById(int id);
        List<Pulse> GetByUserId(string firebaseId);
        void Add(Pulse post);
        void Delete(int id);
    }
}
