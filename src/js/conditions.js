
//updated

import { getParkData, getParkAlerts } from "./parkService.mjs";
import { alertTemplate } from "./templates.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";

function setAlerts(alerts) {
  const list = document.querySelector(".alerts > ul");
  list.innerHTML = "";
  const html = alerts.map(alertTemplate).join("");
  list.insertAdjacentHTML("beforeend", html);
}

async function init() {
  const parkData = await getParkData();
  const alerts = await getParkAlerts(parkData.parkCode);
  setHeaderFooter(parkData);
  setAlerts(alerts);
}
init();