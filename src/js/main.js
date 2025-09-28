import { getParkData } from "./parkService.mjs";

window.addEventListener("DOMContentLoaded", () => {
const parkData = getParkData();

// part2
setHeaderInfo(parkData);
setParkIntro(parkData);
setParkInfoCards(parkInfoLinks);
setFooter(parkData); 

//menu toggle
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



document.title = parkData.fullName;

const disclaimerLink = document.querySelector(".disclaimer > a");
if (disclaimerLink) {
    disclaimerLink.href = parkData.url;
    disclaimerLink.textContent = parkData.fullName;
}

const heroImg = document.querySelector("#park-header .hero-banner > img");
const img0 = parkData?.images?.[0];
if (heroImg && img0) {
    heroImg.src = img0.url;
    heroImg.alt = img0.altText || parkData.fullName;
}

const titleLink = document.querySelector(".hero-banner__title");
  const subtitle = document.querySelector(".hero-banner__subtitle");
  if (titleLink) titleLink.textContent = parkData.fullName;
  if (subtitle) {
    const [desig, states] = subtitle.querySelectorAll("span");
    if (desig) desig.textContent = parkData.designation;
    if (states) states.textContent = parkData.states;
  }
});

