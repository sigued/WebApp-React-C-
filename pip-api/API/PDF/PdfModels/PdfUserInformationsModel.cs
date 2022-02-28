using MigraDoc.DocumentObjectModel;
using MigraDoc.DocumentObjectModel.Tables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Pdf
{
    public class PdfUserInformationsModel
    {
        public PdfUserInformationsModel(Guid id, string userName, string email)
        {
            Id = id;
            UserName = userName;
            Email = email;
        }

        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }

        public ICollection<ICollection<string>> ToPdfContent()
        {
            var rows = new List<ICollection<string>>();
            var colomns = new List<string>();
            colomns.Add("Nom de l'utilisateur");
            colomns.Add("Courriel");
            rows.Add(colomns);
            colomns = new List<string>();
            colomns.Add(UserName);
            colomns.Add(Email);
            rows.Add(colomns);
            return rows;
        }

    }
}
