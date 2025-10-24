{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // Navigation logic for the 5-step demo flow\
document.addEventListener("DOMContentLoaded", () => \{\
  const steps = document.querySelectorAll(".demo-step");\
  const nextBtns = document.querySelectorAll(".next-btn");\
  const prevBtns = document.querySelectorAll(".prev-btn");\
\
  const showStep = (id) => \{\
    steps.forEach((s) => \{\
      s.classList.add("hidden");\
      s.classList.remove("slide-in");\
    \});\
    const target = document.getElementById(id);\
    if (target) \{\
      target.classList.remove("hidden");\
      target.classList.add("slide-in");\
      target.scrollIntoView(\{ behavior: "smooth" \});\
    \}\
  \};\
\
  nextBtns.forEach((btn) =>\
    btn.addEventListener("click", () => showStep(btn.dataset.next))\
  );\
\
  prevBtns.forEach((btn) =>\
    btn.addEventListener("click", () => showStep(btn.dataset.prev))\
  );\
\
  // Optional: Keyboard navigation (\uc0\u8592  \u8594 )\
  document.addEventListener("keydown", (e) => \{\
    const active = Array.from(steps).find((s) => !s.classList.contains("hidden"));\
    if (!active) return;\
    const nextId = active.querySelector(".next-btn")?.dataset.next;\
    const prevId = active.querySelector(".prev-btn")?.dataset.prev;\
    if (e.key === "ArrowRight" && nextId) showStep(nextId);\
    if (e.key === "ArrowLeft" && prevId) showStep(prevId);\
  \});\
\});\
\
// Add slide-in animation via CSS dynamically\
const style = document.createElement("style");\
style.innerHTML = `\
  .slide-in \{\
    animation: slideIn 0.6s ease;\
  \}\
\
  @keyframes slideIn \{\
    from \{ opacity: 0; transform: translateX(40px); \}\
    to \{ opacity: 1; transform: translateX(0); \}\
  \}\
`;\
document.head.appendChild(style);\
}