import React from "react";
import "./App.css";
import MaterialTable from "material-table";
import XLSX from "xlsx";
import PrintIcon from "@material-ui/icons/Print";
import GridOnIcon from "@material-ui/icons/GridOn";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import jsPDF from "jspdf";
import { data1, data2, columns1, columns2 } from "./utils";
import { Button, Divider } from "@material-ui/core";
import XlsxPopulate from "xlsx-populate";
import axios from "axios";
import autoTable from "jspdf-autotable";

function App() {

  const downloadPdf = () => {
    const totalPagesExp = "{total_pages_count_string}";
    const doc = new jsPDF();
    doc.page = 1;
    doc.text("Table 1", 15, 10);
    autoTable(doc, {
      theme: "grid",
      headStyles: { fontSize: 10 },
      bodyStyles: { fontSize: 8, fontStyle: "italic" },

      columns: columns1.map((col) => ({ ...col, dataKey: col.field })),
      body: data1,
    });
    doc.autoTable({
      theme: "grid",
      columns: columns2.map((col) => ({ ...col, dataKey: col.field })),
      body: data2,
      addPageContent: (data) => {
        let footerStr = "Page " + doc.internal.getNumberOfPages();
        if (typeof doc.putTotalPages === "function") {
          footerStr = footerStr + " of " + totalPagesExp;
        }
        doc.setFontSize(10);
        doc.text(
          footerStr,
          data.settings.margin.left,
          doc.internal.pageSize.height - 10
        );
      },
    });
    if (typeof doc.putTotalPages === "function") {
      doc.putTotalPages(totalPagesExp);
    }
    doc.save("ReportTable.pdf");
  };

  const downloadExcel = () => {
    handleExport().then((url) => {
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", url);
      downloadAnchorNode.setAttribute("download", "report.xlsx");
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    });
  };

  const workbook2blob = (workbook) => {
    const wopts = {
      bookType: "xlsx",
      bookSST: false,
      type: "binary",
    };

    const wbout = XLSX.write(workbook, wopts);
    const blob = new Blob([s2ab(wbout)], {
      type: "application/octet-stream",
    });

    return blob;
  };

  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);

    for (let i = 0; i < s.length; ++i) {
      view[i] = s.charCodeAt(i);
    }

    return buf;
  };

  const handleExport = () => {
    let title = [{ A: "Report on Excel Sheet" }].concat("");
    let table1 = [
      {
        A: "Name",
        B: "Email",
      },
    ];
    let table2 = [
      {
        A: "Name",
        B: "Email",
        C: "Year",
        D: "Fee",
      },
    ];
    data1.forEach((row) => {
      table1.push({
        A: row.name,
        B: row.email,
      });
    });
    data2.forEach((row) => {
      table2.push({
        A: row.name,
        B: row.email,
        C: row.year,
        D: row.fee,
      });
    });
    let table = [{ A: "Table 1" }]
      .concat(table1)
      .concat([""])
      .concat([{ A: "Table 2" }])
      .concat(table2);
    let finalData = [...title, ...table];

    const wb = XLSX.utils.book_new();

    const sheet = XLSX.utils.json_to_sheet(finalData, {
      skipHeader: true,
    });

    XLSX.utils.book_append_sheet(wb, sheet, "Report");

    const workbookBlob = workbook2blob(wb);

    let headerIndexes = [];
    finalData.forEach((data, index) =>
      data["A"] === "Name" ? headerIndexes.push(index) : null
    );

    const totalRecords = [...data1, ...data2].length;

    const dataInfo = {
      titleCell: "A2",
      titleRange: "A1:D2",
      tbodyRange: `A3:D${finalData.length}`,
      theadRange:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[0] + 1}:D${headerIndexes[0] + 1}`
          : null,
      theadRange1:
        headerIndexes?.length >= 2
          ? `A${headerIndexes[1] + 1}:D${headerIndexes[1] + 1}`
          : null,
      tFirstColumnRange:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[0] + 1}:A${totalRecords + headerIndexes[0] + 1}`
          : null,

      tFirstColumnRange1:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[1] + 1}:A${totalRecords + headerIndexes[1] + 1}`
          : null,
    };

    return addStyle(workbookBlob, dataInfo);
  };

  const addStyle = async (workbookBlob, dataInfo) => {
    const workbook = await XlsxPopulate.fromDataAsync(workbookBlob);
    workbook.sheets().forEach((sheet) => {
      sheet.usedRange().style({
        fontFamily: "Arial",
        verticalAlignment: "center",
      });

      sheet.column("A").width(15);
      sheet.column("B").width(25);

      sheet.range(dataInfo.titleRange).merged(true).style({
        bold: true,
        horizontalAlignment: "center",
        verticalAlignment: "center",
      });

      if (dataInfo.tbodyRange) {
        sheet.range(dataInfo.tbodyRange).style({
          horizontalAlignment: "center",
        });
      }

      sheet.range(dataInfo.theadRange).style({
        fill: "808080",
        bold: true,
        horizontalAlignment: "center",
        fontColor: "ffffff",
      });

      sheet.range(dataInfo.theadRange1).style({
        fill: "808080",
        bold: true,
        horizontalAlignment: "center",
        fontColor: "ffffff",
      });

      if (dataInfo.tFirstColumnRange) {
        sheet.range(dataInfo.tFirstColumnRange).style({
          bold: true,
        });
      }

      if (dataInfo.tLastColumnRange) {
        sheet.range(dataInfo.tLastColumnRange).style({
          bold: true,
        });
      }

      if (dataInfo.tFirstColumnRange1) {
        sheet.range(dataInfo.tFirstColumnRange1).style({
          bold: true,
        });
      }

      if (dataInfo.tLastColumnRange1) {
        sheet.range(dataInfo.tLastColumnRange1).style({
          bold: true,
        });
      }
    });
    const workbookBlob_1 = await workbook.outputAsync();
    return URL.createObjectURL(workbookBlob_1);
  };

  const downloadFromBackendPdf = async () => {
    await axios
      .get("http://localhost:9000/pdf", { responseType: "blob" })
      .then((response) => {
        const href = URL.createObjectURL(
          new Blob([response.data], { type: "octet-stream" })
        );
        const a = Object.assign(document.createElement("a"), {
          href,
          style: "display: none",
          download: "Report.pdf",
        });
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(href);
        a.remove();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const downloadFromBackendDoc = async () => {
    await axios({
      url: "http://localhost:9000/doc",
      method: "GET",
      responseType: "blob", 
    })
      .then((response) => {
        const href = URL.createObjectURL(
          new Blob([response.data], { type: "octet-stream" })
        );
        const a = Object.assign(document.createElement("a"), {
          href,
          style: "display: none",
          download: "file.docx",
        });
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(href);
        a.remove()
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <h1 align="center">React-App</h1>
      <h4 align="center">Export Data to Pdf in Material Table</h4>
      <MaterialTable
        title="Report"
        columns={columns1}
        data={data1}
        actions={[
          {
            icon: () => (
                <>Export Excel <GridOnIcon /></>
            ),
            tooltip: "Excel",
            onClick: () => downloadExcel(),
            isFreeAction: true,
          },
          {
            icon: () => (
                <>PDF <PictureAsPdfIcon /></>
            ),
            tooltip: "Export to Pdf",
            onClick: () => downloadPdf(),
            isFreeAction: true,
          },
        ]}
      />
      <Divider />
      <MaterialTable title="Report" columns={columns2} data={data2} />

      <Button
        style={{ cursor: "pointer", margin: "0 auto" }}
        onClick={downloadFromBackendPdf}
      >
        Download PDF <PictureAsPdfIcon />
      </Button>
      <Button
        style={{ cursor: "pointer", margin: "0 auto" }}
        onClick={downloadFromBackendDoc}
      >
        Download DOCX <PrintIcon />
      </Button>
    </div>
  );
}

export default App;
