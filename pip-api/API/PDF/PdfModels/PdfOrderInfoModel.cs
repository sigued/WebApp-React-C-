using System;
using System.Collections.Generic;

namespace API.Pdf
{
    public class PdfOrderInfoModel
    {
        public PdfOrderInfoModel(Guid id, DateTime creationDate, string status)
        {
            Id = id;
            CreationDate = creationDate;
            Status = status;
        }

        public Guid Id { get; set; }
        public DateTime CreationDate { get; set; }
        public string Status { get; set; }

        public ICollection<ICollection<string>> ToPdfContent()
        {
            var rows = new List<ICollection<string>>();
            var colomns = new List<string>();
            colomns.Add("Id. de commande");
            colomns.Add("Date de création");
            colomns.Add("Statut");
            rows.Add(colomns);
            colomns = new List<string>();
            colomns.Add(Id.ToString());
            colomns.Add(CreationDate.ToString());
            colomns.Add(Status);
            rows.Add(colomns);
            return rows;
        }
    }
}
