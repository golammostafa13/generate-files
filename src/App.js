import React from 'react';
import './App.css';
import MaterialTable from 'material-table'
import XLSX from 'xlsx'
import PrintIcon from '@material-ui/icons/Print'
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
const studentData = [
  {
    id: 1,
    name: "Neeraj",
    email: "neeraj@gmail.com",
    year: 2015,
    fee: 167000,
  },
  {
    id: 2,
    name: "Vikas",
    email: "vikas@gmail.com",
    year: 2013,
    fee: 785462,
  },

  {
    id: 3,
    name: "Rahul",
    email: "rahul@gmail.com",
    year: 2020,
    fee: 784596,
  },
  {
    id: 4,
    name: "Neeraj",
    email: "neeraj@gmail.com",
    year: 2015,
    fee: 167000,
  },
  {
    id: 5,
    name: "Vikas",
    email: "vikas@gmail.com",
    year: 2013,
    fee: 785462,
  },

  {
    id: 6,
    name: "Rahul",
    email: "rahul@gmail.com",
    year: 2020,
    fee: 784596,
  },
  {
    id: 7,
    name: "Neeraj",
    email: "neeraj@gmail.com",
    year: 2015,
    fee: 167000,
  },
  {
    id: 8,
    name: "Vikas",
    email: "vikas@gmail.com",
    year: 2013,
    fee: 785462,
  },

  {
    id: 9,
    name: "Rahul",
    email: "rahul@gmail.com",
    year: 2020,
    fee: 784596,
  },
  {
    id: 10,
    name: "Neeraj",
    email: "neeraj@gmail.com",
    year: 2015,
    fee: 167000,
  },
  {
    id: 11,
    name: "Vikas",
    email: "vikas@gmail.com",
    year: 2013,
    fee: 785462,
  },

  {
    id: 12,
    name: "Rahul",
    email: "rahul@gmail.com",
    year: 2020,
    fee: 784596,
  },
  {
    id: 13,
    name: "Neeraj",
    email: "neeraj@gmail.com",
    year: 2015,
    fee: 167000,
  },
  {
    id: 14,
    name: "Vikas",
    email: "vikas@gmail.com",
    year: 2013,
    fee: 785462,
  },

  {
    id: 15,
    name: "Rahul",
    email: "rahul@gmail.com",
    year: 2020,
    fee: 784596,
  },
  {
    id: 16,
    name: "Neeraj",
    email: "neeraj@gmail.com",
    year: 2015,
    fee: 167000,
  },
  {
    id: 17,
    name: "Vikas",
    email: "vikas@gmail.com",
    year: 2013,
    fee: 785462,
  },

  {
    id: 18,
    name: "Rahul",
    email: "rahul@gmail.com",
    year: 2020,
    fee: 784596,
  },
  {
    id: 19,
    name: "Neeraj",
    email: "neeraj@gmail.com",
    year: 2015,
    fee: 167000,
  },
  {
    id: 20,
    name: "Vikas",
    email: "vikas@gmail.com",
    year: 2013,
    fee: 785462,
  },

  {
    id: 21,
    name: "Rahul",
    email: "rahul@gmail.com",
    year: 2020,
    fee: 784596,
  },
  {
    id: 22,
    name: "Neeraj",
    email: "neeraj@gmail.com",
    year: 2015,
    fee: 167000,
  },
  {
    id: 23,
    name: "Vikas",
    email: "vikas@gmail.com",
    year: 2013,
    fee: 785462,
  },

  {
    id: 24,
    name: "Rahul",
    email: "rahul@gmail.com",
    year: 2020,
    fee: 784596,
  }
]
function App() {
  const columns = [
    { title: "Name", field: "name", },
    { title: "Email", field: "email", },
    { title: "Year", field: "year", type: "numeric" },
    { title: "Fee", field: 'fee', type: "currency" }]

  const downloadExcel = () => {
    const newData = studentData.map(row => {
      delete row.tableData
      return row
    })
    const workSheet = XLSX.utils.json_to_sheet(newData)
    const workBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workBook, workSheet, "students")
    //Buffer
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" })
    //Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
    //Download
    XLSX.writeFile(workBook, "ReportSheet.xlsx")


  }
  const downloadPdf = () => {
    const doc = new jsPDF()
    doc.text("Student Details", 20, 10)
    doc.autoTable({
      theme: "grid",
      columns: columns.map(col => ({ ...col, dataKey: col.field })),
      body: studentData
    })
    doc.save('ReportTable.pdf')
  }

  return (
    <div className="App">
      <h1 align="center">React-App</h1>
      <h4 align='center'>Export Data to Pdf in Material Table</h4>
      <MaterialTable
        title="Student Details"
        columns={columns}
        data={studentData}
        actions={[
          {
            icon: () => (<button>Export as Excel<GetAppOutlinedIcon /></button>),
            tooltip: "Export to Excel",
            onClick: () => downloadExcel(),
            isFreeAction: true
          },
          {
            icon: () => (<button>Export as PDF<PrintIcon /></button>),
            tooltip: "Export to Pdf",
            onClick: () => downloadPdf(),
            isFreeAction: true
          }
        ]}
      />
    </div>
  );
}

export default App;
