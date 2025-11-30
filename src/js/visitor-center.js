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


