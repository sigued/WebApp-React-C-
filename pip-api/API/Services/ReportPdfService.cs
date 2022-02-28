using API.Interfaces;
using API.Pdf;
using MigraDoc.DocumentObjectModel;
using MigraDoc.DocumentObjectModel.Tables;
using MigraDoc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;

namespace API.Services
{
    public class ReportPdfService : IReportPdfService
    {
        public void Export(PdfContentModel data)
        {
            var path = $"./PDF/ResultatsRapport/{data.UserInfos.Id}_{data.OrderInfos.Id}.pdf";
            ExportPdf(path, CreateReport(data));
        }

        private void ExportPdf(string path, Document report)
        {
            var pdfRenderer = new PdfDocumentRenderer();
            pdfRenderer.Document = report;
            pdfRenderer.RenderDocument();
            pdfRenderer.PdfDocument.Save(path);
        }

        private Document CreateReport(PdfContentModel data)
        {
            var doc = new Document();
            CustomStyles.Define(doc);
            doc.Add(CreateMainSection(data));
            return doc;
        }

        private Section CreateMainSection(PdfContentModel data)
        {
            var section = new Section();
            SetUpPage(section);
            AddHeaderAndFooter(section, data);
            AddContents(section, data);
            return section;
        }

        private void SetUpPage(Section section)
        {
            section.PageSetup.PageFormat = PageFormat.Letter;
            section.PageSetup.LeftMargin = Size.LeftRightPageMargin;
            section.PageSetup.TopMargin = Size.TopBottomPageMargin;
            section.PageSetup.RightMargin = Size.LeftRightPageMargin;
            section.PageSetup.BottomMargin = Size.TopBottomPageMargin;
            section.PageSetup.HeaderDistance = Size.HeaderFooterMargin;
            section.PageSetup.FooterDistance = Size.HeaderFooterMargin;
        }

        private void AddHeaderAndFooter(Section section, PdfContentModel data)
        {
            new HeaderAndFooter().Add(section, data);
        }

        private void AddContents(Section section, PdfContentModel data)
        {
            AddFirstPage(section);

            //User inputs
            section.AddParagraph("Entrées utilisateur", StyleNames.Heading7);
            AddTableContent(section, data.UserInfos.ToPdfContent(), "Informations sur l'utilisateur");
            AddSpace(section);

            AddTableContent(section, data.OrderInfos.ToPdfContent(), "Informations sur la commande");
            AddSpace(section);

            AddTableContent(section, data.UserInputsToPdfContent(), "Paramètres saisis pour le calcul");
            AddSpace(section);

            //Result
            section.AddParagraph("Résultats", StyleNames.Heading7);
            var i = 0;
            foreach (var c in data.Correlations)
            {
                if (c.Type == Common.Enums.CorrelationType.Equation)
                    AddTableContent(section, c.ToPdfTableContent(), $"Corrélation {++i}: {c.Description}");
                else
                    AddAbaqueContent(section, c.ToPdfAbaqueContent(), $"Corrélation {++i}: {c.Description}");
                AddSpace(section);
            }

        }

        private void AddFirstPage(Section section)
        {
            //Logo image.
            Table wFirstPageTable = section.AddTable();
            wFirstPageTable.AddColumn(Size.GetWidth(wFirstPageTable.Section));
            var row = wFirstPageTable.AddRow();
            Paragraph p = row.Cells[0].AddParagraph();
            p.AddImage(LoadResource("logo.png"));

            //The application title
            section.AddParagraph("Application au cas de la géotechnique.", StyleNames.Heading1);
            section.AddParagraph("« Corrélations sur demande », un outil numérique au service des ingénieurs de demain.", StyleNames.Heading5);

            //Administration
            Paragraph wAdministration = section.AddParagraph("Administration", StyleNames.Heading6);
            wAdministration.AddLineBreak();
            
            Paragraph wAdministrationInfos = section.AddParagraph("SIMON FRANCOEUR");
            wAdministrationInfos.AddLineBreak();
            wAdministrationInfos.AddText("Directeur exécutif");
            wAdministrationInfos.AddLineBreak();
            wAdministrationInfos.AddText("Tel : 514 340-2835");
            wAdministrationInfos.AddLineBreak();
            wAdministrationInfos.AddText("Courriel : s.francoeur@polymtl.ca");

            //Mailing address
            Paragraph wMailingAddress = section.AddParagraph("Adresse postale", StyleNames.Heading4);
            wMailingAddress.AddLineBreak();

            Paragraph wMailingAddressInfo = section.AddParagraph("PRESSES INTERNATIONALES POLYTECHNIQUE");
            wMailingAddressInfo.AddLineBreak();
            wMailingAddressInfo.AddText("P.O. Box 6079, sta. Centre-ville");
            wMailingAddressInfo.AddLineBreak();
            wMailingAddressInfo.AddText("Montréal, QC");
            wMailingAddressInfo.AddLineBreak();
            wMailingAddressInfo.AddText("CANADA  H3C 3A7");

            //Contact us
            Paragraph wContactUsTitle = section.AddParagraph("Nous joindre", StyleNames.Heading3);
            Paragraph wContactUsInfo = section.AddParagraph("Pour toute demande relative aux commandes, question générale ou commentaire, veuillez nous contacter par courriel à pip@polymtl.ca ou par téléphone au 514-340-3286.", StyleNames.Normal);

            //Jump to new page
            section.AddPageBreak();
        }

        private string LoadResource(string name)
        {
            var bytes = System.IO.File.ReadAllBytes($"./PDF/MigraDoc/Resources/{name}");
            return $"base64:{Convert.ToBase64String(bytes)}";
        }


        private void AddTableContent(Section iSection, ICollection<ICollection<string>> pdfTable, string title)
        {
            AddTitle(iSection, title);
            AddStructureTable(iSection, pdfTable);
        }

        private void AddAbaqueContent(Section iSection, ICollection<KeyValuePair<string, string>> pdfAbaques, string title)
        {
            AddTitle(iSection, title);
            foreach (var a in pdfAbaques)
            {
                iSection.AddParagraph(a.Key, CustomStyles.ColumnHeader);
                Table wFirstPageTable = iSection.AddTable();
                wFirstPageTable.AddColumn(Size.GetWidth(wFirstPageTable.Section));
                var row = wFirstPageTable.AddRow();
                Paragraph p = row.Cells[0].AddParagraph();
                p.AddImage(LoadResource(a.Value));
                p.Format.KeepWithNext = false;
                var p2 = iSection.AddParagraph("");
                AddSpace(iSection);

            }
        }

        private void AddTitle(Section iSection, string iTitle)
        {

            var p = iSection.AddParagraph(iTitle, StyleNames.Heading2);
            p.Format.KeepWithNext = false;
        }

        private void AddSpace(Section iSection)
        {

            var p = iSection.AddParagraph("");
            p.AddLineBreak();
            p.AddLineBreak();
            p.AddLineBreak();
            p.Format.KeepWithNext = false;
        }

        private void AddStructureTable(Section iSection, ICollection<ICollection<string>> pdfTable)
        {
            Table wParametersTable = iSection.AddTable();
            FormatParametersTable(wParametersTable);
            AddColumnsAndHeadersParametersTable(wParametersTable, pdfTable.OfType<ICollection<string>>().FirstOrDefault());
            pdfTable.Remove(pdfTable.OfType<ICollection<string>>().FirstOrDefault());
            AddStructureRowsParametersTable(wParametersTable, pdfTable);
            AddLastRowBorderParametersTable(wParametersTable);
            AlternateRowShadingParametersTable(wParametersTable);
        }

        private static void FormatParametersTable(Table iTable)
        {
            iTable.LeftPadding = 0;
            iTable.TopPadding = Size.TableCellPadding;
            iTable.RightPadding = 5;
            iTable.BottomPadding = Size.TableCellPadding;
            iTable.Format.LeftIndent = Size.TableCellPadding;
            iTable.Format.RightIndent = Size.TableCellPadding;
        }

        private void AddColumnsAndHeadersParametersTable(Table iTable, ICollection<string> colomns)
        {

            var width = Size.GetWidth(iTable.Section);

            foreach (var c in colomns)
                iTable.AddColumn(width / colomns.Count);

            var row1 = iTable.AddRow();
            row1.Borders.Bottom.Width = 2;

            var i = 0;
            foreach (var c in colomns)
                AddHeader(row1.Cells[i++], c);
        }

        private void AddHeader(Cell iCell, string iHeader)
        {
            var p = iCell.AddParagraph(iHeader);
            p.Style = CustomStyles.ColumnHeader;
            p.Format.KeepWithNext = false;

        }

        private void AddStructureRowsParametersTable(Table iTable, ICollection<ICollection<string>> pdfTable)
        {
            foreach (var r in pdfTable)
            {
                var row = iTable.AddRow();
                row.VerticalAlignment = VerticalAlignment.Center;

                var i = 0;
                foreach (var c in r)
                {
                    var p = row.Cells[i++].AddParagraph(c);
                    p.Format.KeepWithNext = false;
                }
            }
        }

        private void AddLastRowBorderParametersTable(Table iTable)
        {
            var lastRow = iTable.Rows[iTable.Rows.Count - 1];
            lastRow.Borders.Bottom.Width = 2;
        }

        private void AlternateRowShadingParametersTable(Table iTable)
        {
            for (var i = 1; i < iTable.Rows.Count; i++)
            {
                if (i % 2 == 0)  // Even rows
                    iTable.Rows[i].Shading.Color = Color.FromRgb(216, 216, 216);
            }
        }
    }
}