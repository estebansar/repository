console.log("ENV PRESENT?", !!import.meta.env.VITE_NPS_API_KEY);
//updated
import "../css/style.css";        
import "../css/conditions.css";

import { fetchParkFromAPI, getParkAlerts, getVisitorCenterData } from "./parkService.mjs";
import { alertTemplate, visitorCenterTemplate, activityTemplate } from "./templates.mjs";
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
  const parkData = await fetchParkFromAPI("yell");
  console.log("parkData:", parkData);

  const code = parkData.parkCode;
  console.log("using parkCode:", code);

  const alerts = await getParkAlerts(code);
  console.log("alerts:", alerts?.length);

  const centers = await getVisitorCenterData(code);
  console.log("visitor centers:", centers?.length);

  setHeaderFooter(parkData);
  setAlerts(alerts || []);
  setVisitorCenters(centers || []);
  setActivities(parkData.activities || []);
}
init();