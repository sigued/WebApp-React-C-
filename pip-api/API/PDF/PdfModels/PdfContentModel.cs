using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Pdf
{
    public class PdfContentModel
    {
        public PdfContentModel(PdfUserInformationsModel userInfos, PdfOrderInfoModel orderInfos, ICollection<PdfParameterModel> userInputList, ICollection<PdfCorrelationResultModel> correlations)
        {
            UserInfos = userInfos;
            OrderInfos = orderInfos;
            UserInputList = userInputList;
            Correlations = correlations;
        }

        public PdfUserInformationsModel UserInfos { get; set; }
        public PdfOrderInfoModel OrderInfos { get; set; }
        public ICollection<PdfParameterModel> UserInputList { get; set; }
        public ICollection<PdfCorrelationResultModel> Correlations { get; set; }

        public ICollection<ICollection<string>> UserInputsToPdfContent()
        {
            var rows = new List<ICollection<string>>();
            var colomns = new List<string>();
            colomns.Add("Catégorie");
            colomns.Add("Nom");
            colomns.Add("Symbole");
            colomns.Add("Valeur");
            rows.Add(colomns);
            foreach (var u in UserInputList)
            {
                colomns = new List<string>();
                colomns.Add(u.Category);
                colomns.Add(u.Name);
                colomns.Add(u.Symbole);
                colomns.Add($"{u.Value} {u.Unit}");
                rows.Add(colomns);
            }
            return rows;
        }
    }
}
