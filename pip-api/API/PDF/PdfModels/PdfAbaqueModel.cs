using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Pdf
{
    public class PdfAbaqueModel
    {
        public PdfAbaqueModel(string title, string path)
        {
            Title = title;
            Path = path;
        }

        public string Path { get; set; }
        public string Title { get; set; }
    }
}
