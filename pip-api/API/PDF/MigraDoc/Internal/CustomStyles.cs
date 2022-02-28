using MigraDoc.DocumentObjectModel;

namespace API.Pdf
{
    internal class CustomStyles
    {
        public const string ColumnHeader = "ColumnHeader";

        public static void Define(Document doc)
        {
            var heading1 = doc.Styles[StyleNames.Heading1];
            heading1.BaseStyle = StyleNames.Normal;
            heading1.Font.Size = 26;
            heading1.ParagraphFormat.Font.Bold = true;
            heading1.ParagraphFormat.SpaceBefore = 30;
            heading1.ParagraphFormat.Alignment = ParagraphAlignment.Center;

            var heading2 = doc.Styles[StyleNames.Heading2];
            heading2.Font.Size = 18;
            heading2.BaseStyle = StyleNames.Normal;
            heading2.ParagraphFormat.Font.Bold = true;
            heading2.ParagraphFormat.SpaceBefore = 10;
            heading2.ParagraphFormat.Borders.Distance = Size.TableCellPadding;

            var heading3 = doc.Styles[StyleNames.Heading3];
            heading3.Font.Size = 22;
            heading3.Font.Color = Color.FromRgb(255, 0, 0);
            heading3.BaseStyle = StyleNames.Normal;
            heading3.ParagraphFormat.Font.Bold = true;
            heading3.ParagraphFormat.SpaceBefore = 10;
            heading3.ParagraphFormat.Borders.Distance = Size.TableCellPadding;

            var heading4 = doc.Styles[StyleNames.Heading4];
            heading4.Font.Size = 20;
            heading4.BaseStyle = StyleNames.Normal;
            heading4.ParagraphFormat.Font.Color = Color.FromRgb(0, 0, 0);
            heading4.ParagraphFormat.Font.Bold = true;
            heading4.ParagraphFormat.SpaceBefore = 10;
            heading4.ParagraphFormat.Borders.Distance = Size.TableCellPadding;

            var heading5 = doc.Styles[StyleNames.Heading5];
            heading5.Font.Size = 20;
            heading5.BaseStyle = StyleNames.Normal;
            heading5.ParagraphFormat.Font.Bold = true;
            heading5.ParagraphFormat.SpaceBefore = 50;
            heading5.ParagraphFormat.Borders.Distance = Size.TableCellPadding;
            heading5.ParagraphFormat.Alignment = ParagraphAlignment.Center;

            var heading6 = doc.Styles[StyleNames.Heading6];
            heading6.Font.Size = 20;
            heading6.BaseStyle = StyleNames.Normal;
            heading6.ParagraphFormat.Font.Color = Color.FromRgb(0, 0, 0);
            heading6.ParagraphFormat.Font.Bold = true;
            heading6.ParagraphFormat.SpaceBefore = 50;
            heading6.ParagraphFormat.Borders.Distance = Size.TableCellPadding;

            var heading7 = doc.Styles[StyleNames.Heading7];
            heading7.Font.Size = 18;
            heading7.BaseStyle = StyleNames.Normal;
            heading7.ParagraphFormat.Shading.Color = Color.FromRgb(0, 0, 0);
            heading7.ParagraphFormat.Font.Color = Color.FromRgb(255, 255, 255);
            heading7.ParagraphFormat.Font.Bold = true;
            heading7.ParagraphFormat.SpaceBefore = 10;
            heading7.ParagraphFormat.Borders.Distance = Size.TableCellPadding;

            var columnHeader = doc.Styles.AddStyle(ColumnHeader, StyleNames.Normal);
            columnHeader.ParagraphFormat.Font.Bold = true;
            columnHeader.ParagraphFormat.LeftIndent = Size.TableCellPadding;
            columnHeader.ParagraphFormat.RightIndent = Size.TableCellPadding;
        }
    }
}