using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Pdf
{
    public class PdfParameterModel
    {
        public PdfParameterModel(string category, string symbole, string name, string unit, double? value)
        {
            Category = category;
            Symbole = symbole;
            Name = name;
            Unit = unit;
            Value = value;
        }

        public string Category { get; set; }
        public string Symbole { get; set; }
        public string Name { get; set; }
        public string Unit { get; set; }
        public double? Value { get; set; }

    }
}
