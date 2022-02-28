using System;
using MigraDoc.DocumentObjectModel;

namespace API.Pdf
{
    internal class HeaderAndFooter
    {
        public void Add(Section iSection, PdfContentModel iData)
        {
            AddHeader(iSection, iData);
            AddFooter(iSection);
        }

        /// <summary>
        /// Add the header.
        /// </summary>
        /// <param name="iSection"></param>
        /// <param name="iPatient"></param>
        private void AddHeader(Section iSection, PdfContentModel iPatient)
        {
            Paragraph wHeaderParagraph = iSection.Headers.Primary.AddParagraph();
            wHeaderParagraph.Format.AddTabStop(Size.GetWidth(iSection), TabAlignment.Center);
            
            //wHeaderParagraph.AddFormattedText("PIP", TextFormat.Bold);
            wHeaderParagraph.AddTab();
            //wHeaderParagraph.Format.AddTabStop(Size.GetWidth(iSection), TabAlignment.Right);
            wHeaderParagraph.AddText($"Generated {DateTime.Now:g}");
        }

        /// <summary>
        /// Add the footer.
        /// </summary>
        /// <param name="iSection"></param>
        private void AddFooter(Section iSection)
        {
            Paragraph wFooterParagraph = iSection.Footers.Primary.AddParagraph();
            wFooterParagraph.Format.AddTabStop(Size.GetWidth(iSection), TabAlignment.Right);

            //wFooterParagraph.AddText("Mean Dose Report, General Hospital, Radiation Oncology");
            wFooterParagraph.AddTab();
            wFooterParagraph.AddText("Page ");
            wFooterParagraph.AddPageField();
            wFooterParagraph.AddText(" of ");
            wFooterParagraph.AddNumPagesField();
        }
    }
}