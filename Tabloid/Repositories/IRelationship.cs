using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IRelationship
    {
        List<IRelationship> GetAll();
        Relationship GetById(int id);
        void Add(Relationship post);
        void Delete(int id);
    }
}
