
import "../css/style.css";

import { getParkData, getParkInfoLinks } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { mediaCardTemplate } from "./templates.mjs";

console.log("Has API key?", Boolean(import.meta.env.VITE_NPS_API_KEY));

window.addEventListener("DOMContentLoaded", async () => {
  const parkData = await getParkData("yell");

  // header + footer
  setHeaderFooter(parkData);

  // intro
  setParkIntro(parkData);

  // info cards
  setParkInfoLinks(getParkInfoLinks());
});

//part6_ moved anv toggle logic out of main.js 

//above_final part5

function setParkIntro(data) {
  document.querySelector(".intro").innerHTML = `
    <h1>${data.fullName}</h1>
    <p>${data.description}</p>
  `;
}
function setParkInfoLinks(items) {
  const infoEl = document.querySelector(".info");
  infoEl.innerHTML = items.map(mediaCardTemplate).join("");
}
