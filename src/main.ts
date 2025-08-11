import "./styles/styles.scss";
import { renderSkeleton, showStatus } from "./render";
import { setupTabs } from "./tabs";
import { setupPagination } from "./pagination";
import productsData from "./api/data.json";
import { setupFAQ } from "./faq";
import { ProductData } from "./types";
import { state } from "./helpers/state";

async function init() {
  try {
    renderSkeleton();
    state.products = (productsData as ProductData).products;
    setupTabs();
    setupPagination();
    setupFAQ();
    showStatus("");
  } catch (e) {
    console.error(e);
    showStatus("Couldn’t initialize the page. Please reload.", "error");
    const grid = document.querySelector("#grid") as HTMLElement;
    grid.innerHTML = "";
    const empty = document.querySelector("#empty") as HTMLElement;
    empty.hidden = false;
  }
}

init();
