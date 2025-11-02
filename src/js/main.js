
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

  // menu toggle
  const menuBtn = document.getElementById("global-nav-toggle");
  const globalNav = document.getElementById("local-nav"); //part5_lets replace the localNav wit the globalNav

  globalNav.classList.remove("show");   //part5_it starts hiddien

  menuBtn.addEventListener("click", (ev) => {
    const btn = ev.target.closest("button"); //part5_if the en uer clicks the icon this will gind the real butotn
    const isOpenNow = globalNav.classList.toggle("show");   // part5_this will slide the global mane open/closed
    btn.setAttribute("aria-expanded", String(isOpenNow));
});
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
