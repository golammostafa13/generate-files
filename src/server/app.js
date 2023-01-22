const puppeteer = require("puppeteer");
const cors = require("cors");
const express = require("express");
const app = express();
const content = require('./pdfHtml');
const b64string = require('./docxHtml');

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.get("/pdf", async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(content);

  const pdf = await page.pdf({ format: "A4" });
  res.send(Buffer.from(pdf));
  browser.close();
});

app.get("/doc", async (req, res) => {
  res.setHeader("Content-Disposition", "attachment; filename=My Document.docx");
  res.send(Buffer.from(await b64string, "base64"));
});

app.listen(9000, () => {
  console.log("Server is running");
});
