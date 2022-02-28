using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities.CorrelationsAndOrders
{
    public class Equation
    {
        public Equation() { }
        public Equation(string equation, string applicability, string reference)
        {
            Id = Guid.NewGuid();
            this.equation = equation;
            Applicability = applicability;
            Reference = reference;
        }

        public Guid Id { get; set; }
        public string equation { get; set; }
        public string Applicability { get; set; }
        public string Reference { get; set; }

    }
}
