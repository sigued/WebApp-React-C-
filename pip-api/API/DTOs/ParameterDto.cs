using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class ParameterDto
    {
        public ParameterDto(Guid id, string category, string symbole, string name, string unit, double? value)
        {
            Id = id;
            Category = category;
            Symbole = symbole;
            Name = name;
            Unit = unit;
            Value = value;
        }

        public Guid Id { get; set; }
        public string Category { get; set; }
        public string Symbole { get; set; }
        public string Name { get; set; }
        public string Unit { get; set; }
        public double? Value { get; set; }
    }
}
