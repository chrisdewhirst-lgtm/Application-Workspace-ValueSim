{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // === Chart.js Setup for Application Workspace Value Simulator ===\
\
let valueChart, fteChart;\
\
function updateCharts(chartData, symbol) \{\
  const ctxValue = document.getElementById("valueChart").getContext("2d");\
  const ctxFTE = document.getElementById("fteChart").getContext("2d");\
\
  // Destroy existing charts if they exist\
  if (valueChart) valueChart.destroy();\
  if (fteChart) fteChart.destroy();\
\
  // === Value Breakdown (Pie Chart) ===\
  valueChart = new Chart(ctxValue, \{\
    type: "pie",\
    data: chartData,\
    options: \{\
      plugins: \{\
        legend: \{\
          labels: \{ color: "#e8e8e8", font: \{ size: 13 \} \}\
        \},\
        title: \{\
          display: true,\
          text: "Annual Value Breakdown",\
          color: "#3db2ff",\
          font: \{ size: 16, weight: "bold" \}\
        \},\
        tooltip: \{\
          callbacks: \{\
            label: (context) => `$\{symbol\}$\{context.formattedValue.replace(/\\B(?=(\\d\{3\})+(?!\\d))/g, ",")\}`\
          \}\
        \}\
      \}\
    \}\
  \});\
\
  // === FTE Equivalent Chart (Bar) ===\
  const totalHours = window.valueSimResults\
    ? window.valueSimResults.details.productivity / (window.valueSimResults.annual / window.valueSimResults.fte)\
    : 0;\
  const fteValue = window.valueSimResults ? window.valueSimResults.fte : 0;\
\
  fteChart = new Chart(ctxFTE, \{\
    type: "bar",\
    data: \{\
      labels: ["Equivalent FTE Capacity"],\
      datasets: [\
        \{\
          label: "FTEs Gained",\
          data: [fteValue],\
          backgroundColor: "#38c172"\
        \}\
      ]\
    \},\
    options: \{\
      scales: \{\
        y: \{\
          beginAtZero: true,\
          ticks: \{ color: "#e8e8e8" \},\
          grid: \{ color: "#2a2d34" \}\
        \},\
        x: \{\
          ticks: \{ color: "#e8e8e8" \},\
          grid: \{ color: "#2a2d34" \}\
        \}\
      \},\
      plugins: \{\
        legend: \{ display: false \},\
        title: \{\
          display: true,\
          text: "Equivalent FTE Impact",\
          color: "#3db2ff",\
          font: \{ size: 16, weight: "bold" \}\
        \},\
        tooltip: \{\
          callbacks: \{\
            label: (context) => `$\{context.formattedValue\} FTEs`\
          \}\
        \}\
      \}\
    \}\
  \});\
\}\
}