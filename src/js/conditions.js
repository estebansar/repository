
//updated

import { getParkData, getParkAlerts, getVisitorCenterData } from "./parkService.mjs"; //  merged import
import { alertTemplate, visitorCenterTemplate, activityTemplate } from "./templates.mjs"; // merged import
import setHeaderFooter from "./setHeaderFooter.mjs";

function setAlerts(alerts) {
  const list = document.querySelector(".alerts > ul");
  list.innerHTML = "";
  const html = alerts.map(alertTemplate).join("");
  list.insertAdjacentHTML("beforeend", html);
}

//visitor center and activ/

function setVisitorCenters(centers) {
  const list = document.querySelector(".visitor details > ul");
  list.innerHTML = "";
  const html = centers.map(visitorCenterTemplate).join("");
  list.insertAdjacentHTML("beforeend", html);
}

function setActivities(activities) {
  const list = document.querySelector(".activities details > ul");
  list.innerHTML = "";
  const html = activities.map(activityTemplate).join("");
  list.insertAdjacentHTML("beforeend", html);
}

async function init() {
  const parkData = await getParkData();
  const alerts = await getParkAlerts(parkData.parkCode);
  const centers = await getVisitorCenterData(parkData.parkCode);
  setHeaderFooter(parkData);
  setAlerts(alerts);
  setVisitorCenters(centers);
}
init();