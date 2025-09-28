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

function getDisplayName(data) {
  if (data.name) return data.name;

  const full = (data.fullName || "").trim();
  const d = (data.designation || "").trim();

  if (d) {
    const re = new RegExp(`\\s*${d}\\s*$`); // remove " National Park" (or similar) at the end
    return full.replace(re, "").trim();
  }

  return full;
}

function parkInfoTemplate(data) {
  return `
    <a href="${data.url}" class="hero-banner__title">${getDisplayName(data)}</a>
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

function setParkInfoCards(items) {
  const infoEl = document.querySelector(".info");
  infoEl.innerHTML = items.map(mediaCardTemplate).join("");
}

function mediaCardTemplate(info) {
  return `
    <article class="media-card">
      <a href="${info.link}">
        <img class="media-card__img" src="${info.image}" alt="${info.name}">
        <h3 class="media-card__title">${info.name}</h3>
      </a>
      <p>${info.description}</p>
    </article>
  `;
}

function getMailingAddress(addresses) {
  const mailing = addresses.find((address) => address.type === "Mailing");
  return mailing;
}

function getVoicePhone(numbers) {
  const voice = numbers.find((num) => num.type === "Voice");
  return voice ? voice.phoneNumber : "";
}

function footerTemplate(info) {
  const mailing = getMailingAddress(info.addresses);
  const voice = getVoicePhone(info.contacts.phoneNumbers);

  return `
    <section class="contact">
      <h3>Contact Info</h3>
      <h4>Mailing Address:</h4>
     <div>
      <p>${mailing.line1}</p>
      <p>${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}</p>
     </div>
      <h4>Phone:</h4>
      <p>${voice}</p>
    </section>
  `;
}

function setFooter(data) {
  const footer = document.getElementById("park-footer");
  footer.innerHTML = footerTemplate(data);
}

function setParkIntro(data) {
  const introEl = document.querySelector(".intro");
  introEl.innerHTML = `
    <h1>${data.fullName}</h1>
    <p>${data.description}</p>
  `;
}
  


