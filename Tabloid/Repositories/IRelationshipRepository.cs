using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IRelationshipRepository
    {
        List<Relationship> GetAll();
        Relationship GetById(int id);
        void Add(Relationship post);
        void Delete(int id);
    }
}
