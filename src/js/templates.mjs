export function getDisplayName(data) {
  if (data.name) return data.name;
  const full = (data.fullName || "").trim();
  const d = (data.designation || "").trim();
  if (!d) return full;
  const re = new RegExp(`\\s*${d}\\s*$`);
  return full.replace(re, "").trim() || full;
}

export function parkInfoTemplate(data) {
  return `
    <a href="${data.url}" class="hero-banner__title">${getDisplayName(data)}</a>
    <p class="hero-banner__subtitle">
      <span>${data.designation}</span>
      <span>${data.states}</span>
    </p>
  `;
}

export function mediaCardTemplate(info) {
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

export function getMailingAddress(addresses) {
  return addresses.find(a => a.type === "Mailing");
}
export function getVoicePhone(numbers) {
  const v = numbers.find(n => n.type === "Voice");
  return v ? v.phoneNumber : "";
}
export function footerTemplate(info) {
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

//part 4//

export function alertTemplate(alert) {
  let alertType = "";
  switch (alert.category) {
    case "Park Closure":
      alertType = "closure";
      break;
    default:
      alertType = alert.category.toLowerCase();
  }

  return `<li class="alert">
    <svg class="icon" focusable="false" aria-hidden="true">
      <use xlink:href="/images/sprite.symbol.svg#alert-${alertType}"></use>
    </svg>
    <div>
      <h3 class="alert-${alertType}">${alert.title}</h3>
      <p>${alert.description}</p>
    </div>
  </li>`;
}

// part 4: updating tempalte for visitorcenter/

export function visitorCenterTemplate(vc) {
  return `<li class="visitor-item">
    <h3>${vc.name ?? ""}</h3>
    <p>${vc.description ?? ""}</p>
    <p><strong>Directions:</strong> ${vc.directionsInfo ?? ""}</p>
  </li>`;
}

//activities/

export function activityTemplate(act) {
  const name = act?.name ?? act ?? "";
  return `<li class="activity-item">${name}</li>`;
}