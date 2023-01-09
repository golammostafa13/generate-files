import React, { useRef } from "react";
import "./App.css";
import MaterialTable from "material-table";
import XLSX from "xlsx";
import PrintIcon from "@material-ui/icons/Print";
import GridOnIcon from "@material-ui/icons/GridOn";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { data1, data2 } from "./utils";
import Letter from "./Letter";
import { useReactToPrint } from "react-to-print";
import { Divider } from "@material-ui/core";

function App() {
  const componentRef = useRef(null);
  const generatePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const columns1 = [
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
  ];
  const columns2 = [
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Year", field: "year", type: "numeric" },
    { title: "Fee", field: "fee", type: "currency" },
  ];

  const downloadExcel = () => {
    const newData = data2.map((row) => {
      delete row.tableData;
      return row;
    });
    const workSheet = XLSX.utils.json_to_sheet(newData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "report");
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "ReportSheet.xlsx");
  };

  const downloadPdf = () => {
    const totalPagesExp = "{total_pages_count_string}";
    const doc = new jsPDF();
    doc.page = 1;
    doc.text("Report", 15, 10);
    doc.autoTable({
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

  // const dowloadDoc = () => {
  //   const doc = new
  // };

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
              <button style={{ cursor: "pointer" }}>
                Export Excel <GridOnIcon />
              </button>
            ),
            tooltip: "Excel",
            onClick: () => downloadExcel(),
            isFreeAction: true,
          },
          {
            icon: () => (
              <button style={{ cursor: "pointer" }}>
                PDF <PictureAsPdfIcon />
              </button>
            ),
            tooltip: "Export to Pdf",
            onClick: () => downloadPdf(),
            isFreeAction: true,
          },
        ]}
      />
      <Divider />
      <MaterialTable
        title="Report"
        columns={columns2}
        data={data2}
        // actions={[
        //   {
        //     icon: () => (
        //       <button style={{ cursor: "pointer" }}>
        //         Export Excel <GridOnIcon />
        //       </button>
        //     ),
        //     tooltip: "Excel",
        //     onClick: () => downloadExcel(),
        //     isFreeAction: true,
        //   },
        //   {
        //     icon: () => (
        //       <button style={{ cursor: "pointer" }}>
        //         PDF <PictureAsPdfIcon />
        //       </button>
        //     ),
        //     tooltip: "Export to Pdf",
        //     onClick: () => downloadPdf(),
        //     isFreeAction: true,
        //   },
        // {
        //   icon: () => (
        //     <button style={{ cursor: "pointer" }}>
        //       Print <PrintIcon />
        //     </button>
        //   ),
        //   tooltip: "Print",
        //   onClick: () => generatePrint(),
        //   isFreeAction: true,
        // },
        // ]}
      />
      <Letter componentRef={componentRef} />

      <button
        style={{ cursor: "pointer", margin: "0 auto" }}
        onClick={generatePrint}
      >
        Print Invoice <PrintIcon />
      </button>
    </div>
  );
}

export default App;
