import { parkInfoTemplate, footerTemplate } from "./templates.mjs";

export default function setHeaderFooter(data) {
  // Update page title
  document.querySelector("head > title").textContent = data.fullName;

  const disclaimerLink = document.querySelector(".disclaimer > a");
  if (disclaimerLink) {
    disclaimerLink.href = data.url;
    disclaimerLink.textContent = data.fullName;
  }

  const heroImg = document.querySelector(".hero-banner > img");
  if (heroImg) heroImg.src = data.images[0]?.url || "";

  const heroContent = document.querySelector(".hero-banner__content");
  if (heroContent) heroContent.innerHTML = parkInfoTemplate(data);

  const footerEl = document.querySelector("footer, #park-footer, #site-footer");
  if (footerEl) footerEl.innerHTML = footerTemplate(data);
}