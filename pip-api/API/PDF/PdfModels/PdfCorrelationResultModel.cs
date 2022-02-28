using API.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Pdf
{
    public class PdfCorrelationResultModel
    {
        public PdfCorrelationResultModel(ICollection<PdfParameterModel> inputsList, PdfParameterModel output, CorrelationType type,
                                        ICollection<PdfEquationResultModel> equations, ICollection<PdfAbaqueModel> abaques, string description)
        {
            InputsList = inputsList;
            Output = output;
            Type = type;
            Equations = equations;
            Abaques = abaques;
            Description = description;
        }

        public string Description { get; set; }
        public ICollection<PdfParameterModel> InputsList { get; set; }
        public PdfParameterModel Output { get; set; }
        public CorrelationType Type { get; set; }
        public ICollection<PdfEquationResultModel> Equations { get; set; }

        public ICollection<PdfAbaqueModel> Abaques { get; set; }
        public ICollection<ICollection<string>> ToPdfTableContent()
        {
            var rows = new List<ICollection<string>>();
            var colomns = new List<string>();
            colomns.Add("Équation");
            colomns.Add("Applicabilité");
            colomns.Add("Référence");
            colomns.Add("Résultat");
            rows.Add(colomns);
            foreach (var e in Equations)
            {
                colomns = new List<string>();
                colomns.Add(e.equation);
                colomns.Add(e.Applicability);
                colomns.Add(e.Reference);
                colomns.Add($"{e.Result.ToString()} {e.Unit}");
                rows.Add(colomns);
            }
            return rows;
        }

        public ICollection<KeyValuePair<string, string>> ToPdfAbaqueContent()
        {
            var list = new List<KeyValuePair<string, string>>();
            foreach (var a in Abaques)
                list.Add(new KeyValuePair<string, string>(a.Title, a.Path));
            return list;
        }


    }
}
