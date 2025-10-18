
import { getParkData } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";

async function init() {
  const parkData = await getParkData();
  setHeaderFooter(parkData);
}
init();