using API.Pdf;
using MigraDoc.DocumentObjectModel;
using System.Collections.Generic;

namespace API.Interfaces
{
    public interface IReportPdfService
    {
        void Export(PdfContentModel data);
    }
}