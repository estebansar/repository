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

//---function---
function setHeaderInfo(data) {
  const disclaimer = document.querySelector(".disclaimer > a");
  disclaimer.href = data.url;
  disclaimer.innerHTML = data.fullName;

  document.querySelector("head > title").textContent = data.fullName;
  document.querySelector(".hero-banner > img").src = data.images[0].url;
  document.querySelector(".hero-banner__content").innerHTML =
        parkInfoTemplate(data);
}

function parkInfoTemplate(data) {
  return `
    <a href="${data.url}" class="hero-banner__title">${data.fullName}</a>
    <p class="hero-banner__subtitle">
      <span>${data.designation}</span>
      <span>${data.states}</span>
    </p>
  `;
}

const parkInfoLinks = [
  {
    name: "Current Conditions &#x203A;",
    link: "conditions.html",
    image: getParkData().images[2].url,
    description:
      "See what conditions to expect in the park before leaving on your trip!"
  },
  {
    name: "Fees and Passes &#x203A;",
    link: "fees.html",
    image: getParkData().images[3].url,
    description: "Learn about the fees and passes that are available."
  },
  {
    name: "Visitor Centers &#x203A;",
    link: "visitor_centers.html",
    image: getParkData().images[9].url,
    description: "Learn about the visitor centers in the park."
  }
];




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

