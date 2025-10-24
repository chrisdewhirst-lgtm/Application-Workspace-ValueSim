{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // === Export & Sharing Functions for Value Simulator ===\
document.addEventListener("DOMContentLoaded", () => \{\
  const pdfBtn = document.getElementById("downloadPDF");\
  const csvBtn = document.getElementById("downloadCSV");\
  const copyBtn = document.getElementById("copySummary");\
\
  // === PDF EXPORT ===\
  pdfBtn.addEventListener("click", async () => \{\
    if (!window.valueSimResults) \{\
      alert("Please calculate results first.");\
      return;\
    \}\
\
    const \{ jsPDF \} = window.jspdf;\
    const pdf = new jsPDF("p", "mm", "a4");\
    const symbol = window.valueSimResults.currency;\
    const res = window.valueSimResults;\
\
    // Header\
    pdf.setFontSize(16);\
    pdf.setTextColor(0, 155, 255);\
    pdf.text("Recast Software \'96 Application Workspace Value Simulator", 10, 15);\
\
    // Summary text\
    pdf.setFontSize(11);\
    pdf.setTextColor(30);\
    pdf.text(\
      [\
        `Annual Benefit: $\{symbol\}$\{res.annual.toLocaleString(undefined, \{ maximumFractionDigits: 0 \})\}`,\
        `3-Year Value: $\{symbol\}$\{res.threeYear.toLocaleString(undefined, \{ maximumFractionDigits: 0 \})\}`,\
        `Equivalent FTEs: $\{res.fte.toFixed(1)\}`,\
        `ELTV Uplift: 3%`\
      ],\
      10,\
      30\
    );\
\
    // Add Charts as images\
    const valueCanvas = document.getElementById("valueChart");\
    const fteCanvas = document.getElementById("fteChart");\
\
    const valueImg = await html2canvas(valueCanvas);\
    const fteImg = await html2canvas(fteCanvas);\
\
    const valueData = valueImg.toDataURL("image/png", 1.0);\
    const fteData = fteImg.toDataURL("image/png", 1.0);\
\
    pdf.addImage(valueData, "PNG", 10, 55, 180, 80);\
    pdf.addPage();\
    pdf.addImage(fteData, "PNG", 10, 20, 180, 80);\
\
    // Footer\
    pdf.setFontSize(9);\
    pdf.setTextColor(100);\
    pdf.text("\'a9 2025 Recast Software | www.recastsoftware.com", 10, 285);\
\
    pdf.save("Application-Workspace-ValueSim-Results.pdf");\
  \});\
\
  // === CSV EXPORT ===\
  csvBtn.addEventListener("click", () => \{\
    if (!window.valueSimResults) \{\
      alert("Please calculate results first.");\
      return;\
    \}\
\
    const res = window.valueSimResults;\
    const rows = [\
      ["Category", "Value"],\
      ["Currency", res.currency],\
      ["Annual Benefit", res.annual],\
      ["3-Year Value", res.threeYear],\
      ["FTE Equivalent", res.fte],\
      ["Productivity", res.details.productivity],\
      ["IT Efficiency (Apps)", res.details.apps],\
      ["IT Efficiency (JML)", res.details.jml],\
      ["ELTV Uplift", res.details.eltv]\
    ];\
\
    const csvContent =\
      "data:text/csv;charset=utf-8," +\
      rows.map((r) => r.join(",")).join("\\n");\
    const encodedUri = encodeURI(csvContent);\
    const link = document.createElement("a");\
    link.setAttribute("href", encodedUri);\
    link.setAttribute("download", "Application-Workspace-ValueSim-Results.csv");\
    document.body.appendChild(link);\
    link.click();\
    document.body.removeChild(link);\
  \});\
\
  // === COPY SUMMARY ===\
  copyBtn.addEventListener("click", () => \{\
    if (!window.valueSimResults) \{\
      alert("Please calculate results first.");\
      return;\
    \}\
    const res = window.valueSimResults;\
    const text = `Annual Benefit: $\{res.currency\}$\{res.annual.toLocaleString(undefined, \{ maximumFractionDigits: 0 \})\}\\n` +\
      `3-Year Value: $\{res.currency\}$\{res.threeYear.toLocaleString(undefined, \{ maximumFractionDigits: 0 \})\}\\n` +\
      `Equivalent FTEs: $\{res.fte.toFixed(1)\}\\nELTV Uplift: 3%`;\
\
    navigator.clipboard.writeText(text)\
      .then(() => alert("Summary copied to clipboard"))\
      .catch(() => alert("Unable to copy summary"));\
  \});\
\});\
}