{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // === Application Workspace Value Simulator ===\
// Core logic for productivity, IT efficiency, JML, and ELTV impact\
document.addEventListener("DOMContentLoaded", () => \{\
  const calcBtn = document.getElementById("calculateBtn");\
  const summaryDiv = document.getElementById("summaryText");\
  const currencySelect = document.getElementById("currencySelect");\
\
  const chartData = \{\
    labels: ["End-User Productivity", "IT Efficiency (Apps)", "IT Efficiency (JML)", "ELTV Uplift"],\
    datasets: [\
      \{\
        label: "Annual Value",\
        data: [0, 0, 0, 0],\
        backgroundColor: ["#009bff", "#3db2ff", "#38c172", "#ffcc00"]\
      \}\
    ]\
  \};\
\
  const currencySymbols = \{ GBP: "\'a3", USD: "$", EUR: "\'80" \};\
  let currentSymbol = currencySymbols[currencySelect.value];\
\
  currencySelect.addEventListener("change", () => \{\
    currentSymbol = currencySymbols[currencySelect.value];\
    // Optionally you could apply simple fixed conversion rates if needed\
  \});\
\
  calcBtn.addEventListener("click", () => \{\
    // === CONSTANTS ===\
    const hoursPerYear = 1750;\
    const weeksPerYear = parseFloat(document.getElementById("workWeeks").value);\
    const eltvUpliftRate = 0.03; // 3% uplift\
    const conversionRates = \{ GBP: 1, USD: 1.25, EUR: 1.15 \};\
\
    // === USER PRODUCTIVITY ===\
    const numEmployees = parseFloat(document.getElementById("numEmployees").value);\
    const avgSalary = parseFloat(document.getElementById("avgSalary").value);\
    const lostTime = parseFloat(document.getElementById("lostTime").value);\
    const reductionLostTime = parseFloat(document.getElementById("reductionLostTime").value);\
\
    const hourlyRate = avgSalary / hoursPerYear;\
    const weeklyLostHours = lostTime / 60;\
    const annualLostHours = weeklyLostHours * weeksPerYear;\
    const savedHoursPerUser = annualLostHours * (reductionLostTime / 100);\
    const totalSavedHoursUsers = savedHoursPerUser * numEmployees;\
    const valuePerUser = savedHoursPerUser * hourlyRate;\
    const totalValueUsers = valuePerUser * numEmployees;\
\
    // === IT EFFICIENCY - APPLICATIONS ===\
    const numApps = parseFloat(document.getElementById("numApps").value);\
    const updatesPerApp = parseFloat(document.getElementById("updatesPerApp").value);\
    const hoursPerUpdate = parseFloat(document.getElementById("hoursPerUpdate").value);\
    const autoGainApps = parseFloat(document.getElementById("autoGainApps").value);\
\
    const totalAppHours = numApps * updatesPerApp * hoursPerUpdate;\
    const savedAppHours = totalAppHours * (autoGainApps / 100);\
    const savedAppValue = savedAppHours * (hourlyRate * 1.4); //\
}