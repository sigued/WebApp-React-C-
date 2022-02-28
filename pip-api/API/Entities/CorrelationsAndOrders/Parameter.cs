using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities.CorrelationsAndOrders
{
    public class Parameter
    {
        public Parameter() { }

        public Parameter( string name, bool isConst, string category, string symbole, string unit, double value)
        {
            Id = Guid.NewGuid();
            Name = name;
            IsConst = isConst;
            Category = category;
            Symbole = symbole;
            Unit = unit;
            Value = value;
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool IsConst { get; set; }
        public string Category { get; set; }
        public string Symbole { get; set; }
        public string Unit { get; set; }

        //ce parametre est present que dans le cas de constantes
        public double Value { get; set; }

        // many to many
        public ICollection<Correlation> Correlations { get; set; }
    }
}
