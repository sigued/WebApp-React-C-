using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Pdf
{
    public class PdfEquationResultModel
    {
        public PdfEquationResultModel(string equation, string applicability, string reference, double result, string unit)
        {
            this.equation = equation;
            Applicability = applicability;
            Reference = reference;
            Result = result;
            Unit = unit;
        }

        public string equation { get; set; }
        public string Applicability { get; set; }
        public string Reference { get; set; }
        public double Result { get; set; }
        public string Unit { get; set; }
    }
}
