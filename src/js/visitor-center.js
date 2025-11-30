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
