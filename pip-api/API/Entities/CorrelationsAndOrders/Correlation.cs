using API.Common.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities.CorrelationsAndOrders
{
    public class Correlation
    {
        public Correlation() { }

        public Correlation(ICollection<Parameter> inputsList, Guid outputId, CorrelationType type, ICollection<Equation> equations, ICollection<Abaque> abaques, string description)
        {
            Id = Guid.NewGuid();
            InputsList = inputsList;
            OutputId = outputId;
            Type = type;
            Equations = equations;
            Abaques = abaques;
            Description = description;
        }

        public Guid Id { get; set; }
        public string Description { get; set; }
        public ICollection<Parameter> InputsList { get; set; }
        public Guid OutputId { get; set; }
        public CorrelationType Type { get; set; }
        public ICollection<Equation> Equations { get; set; }
        public ICollection<Abaque> Abaques { get; set; }
    }
}
