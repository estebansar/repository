import "../css/style.css";             
import "../css/visitor-center.css";    

import { getParkData, getParkVisitorCenterDetails } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";

import { listTemplate, vcImageTemplate, vcAmenityTemplate } from "./templates.mjs";

function getParam(param) {
  const params = new URLSearchParams(location.search);
  return params.get(param);
}

function splitAddresses(addresses = []) {
  const physical = addresses.find(a => a.type === "Physical");
  const mailing = addresses.find(a => a.type === "Mailing");
  return { physical, mailing };
}

//Addresses section
function buildAddressesHtml(center) {
  const { physical, mailing } = splitAddresses(center.addresses || []);

  const physicalHtml = physical
    ? `
      <section class="vc-addresses-physical">
        <h3>Physical Address</h3>
        <address>  
          ${physical.line1}<br />
          ${physical.city}, ${physical.stateCode} ${physical.postalCode}
        </address>
      </section>
    `
    : "";

  const mailingHtml = mailing
    ? `
      <section class="vc-addresses-mailing">
        <h3>Mailing Address</h3>
        <address>
          ${mailing.line1}<br />
          ${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}
        </address>
      </section>
    `
    : "";

  return physicalHtml + mailingHtml;
}

// Directions section
function buildDirectionsHtml(center) {
  const info = center.directionsInfo || "";
  const url = center.directionsUrl || "";

  return `
    <p>${info}</p>
    ${url ? `<p><a href="${url}" target="_blank">View detailed directions</a></p>` : ""}
  `;
}

// Contact section
function buildContactHtml(center) {
  const emails = center.contacts?.emailAddresses || [];
  const phones = center.contacts?.phoneNumbers || [];

  const email = emails[0]?.emailAddress || "";
  const phone = phones[0]?.phoneNumber || "";

  const emailHtml = email
    ? `
      <section class="vc-contact-phone">
        <h3>Phone Number</h3>
        <a href="tel:${phone.replace(/[^0-9+]/g, "")}">${phone}</a>
      </section>
    `
    : "";

  return emailHtml + phoneHtml;
}

// Build full VC page

function renderVisitorCenter(center) {
  const main = document.querySelector("#main");
  if (!main || !center) return;

  const image = center.images?.[0] || null;
  const amenities = center.amenities || [];

  const galleryHtml = center.images?.length
    ? listTemplate(center.images, vcImageTemplate)
    : "<p>No images available.</p>";

  const amenitiesHtml = amenities.length
    ? listTemplate(amenities, vcAmenityTemplate)
    : "<p>No amenities listed.</p>";

  main.innerHTML = `
    <h1 class="vc-name">
      <svg class="icon" role="presentation" focusable="false">
        <use xlink:href="images/sprite.symbol.svg#ranger-station"></use>
      </svg>
      ${center.name}
    </h1>
    
    <section class="vc-info">
      <figure>
        <img src="${image?.url || ""}" alt="${image?.altText || ""}">
        <figcaption>${image?.title || ""}</figcaption>
      </figure>
      <p>${center.description || ""}</p>
    </section>

    <section class="vc-details-list">
      <details>
        <summary>Addresses</summary>
        ${buildAddressesHtml(center)}
      </details>

      <details>
        <summary>Directions</summary>
        ${buildDirectionsHtml(center)}
      </details>

      <details>
        <summary>Amenities</summary>
        ${amenitiesHtml}
      </details>

      <details>
        <summary>Contact Information</summary>
        ${buildContactHtml(center)}
      </details>
    </section>

    <section class="vc-gallery">
      <h2>Image Gallery</h2>
      ${galleryHtml}
    </section>
  `;

  // Only 1 details open at a time
  const detailsList = main.querySelectorAll(".vc-details-list details");
  detailsList.forEach(d => {
    d.addEventListener("toggle", () => {
      if (d.open) {
        detailsList.forEach(other => {
          if (other !== d) other.open = false;
        });
      }
    });
  });
}


//  function to start the page

async function init() {
  const parkData = await getParkData();
  const id = getParam("id");

  if (!id) {
    console.warn("Visitor center ID missing in URL.");
    return;
  }

  const center = await getParkVisitorCenterDetails(id);
  setHeaderFooter(parkData);
  renderVisitorCenter(center);
}

init();

