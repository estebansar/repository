import { getParkData, getParkInfoLinks } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { mediaCardTemplate } from "./templates.mjs";

console.log("Has API key?", Boolean(import.meta.env.VITE_NPS_API_KEY));

window.addEventListener("DOMContentLoaded", () => {
  const parkData = getParkData();

  // header + footer
  setHeaderFooter(parkData);

  // intro
  setParkIntro(parkData);

  // info cards
  setParkInfoLinks(getParkInfoLinks());

  // menu toggle
  const menuBtn = document.getElementById("global-nav-toggle");
  const localNav = document.getElementById("local-nav");
  localNav.classList.add("closed");
  menuBtn.addEventListener("click", () => {
    const isOpen = localNav.classList.contains("open");
    localNav.classList.toggle("open", !isOpen);
    localNav.classList.toggle("closed", isOpen);
    menuBtn.setAttribute("aria-expanded", String(!isOpen));
  });
});

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
