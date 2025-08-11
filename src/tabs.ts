import { APP_CONFIG } from "./helpers/config";
import { state, Tab } from "./helpers/state";
import { $, $$, setURLParam, getURLParam } from "./helpers/utils";
import { renderProducts } from "./render";

export function applyFilter(tab: Tab) {
  state.tab = tab;
  setURLParam(APP_CONFIG.PARAM, tab);
  const all = state.products.slice();
  state.filtered =
    tab === "all"
      ? all
      : all.filter((p) =>
          tab === "bundles"
            ? p.category === "bundles"
            : p.category === "single",
        );
  state.page = 1;
  renderProducts(state.page);
  $$(APP_CONFIG.SELECTORS.tabs).forEach((btn) => {
    const active = btn.getAttribute("data-tab") === tab;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-selected", String(active));
  });
}

export function setupTabs() {
  const current = getURLParam(APP_CONFIG.PARAM, "all") as Tab;
  applyFilter(current);
  $$(APP_CONFIG.SELECTORS.tabs).forEach((btn) => {
    btn.addEventListener("click", () =>
      applyFilter(btn.getAttribute("data-tab") as Tab),
    );
    btn.addEventListener("keydown", (e: KeyboardEvent) => {
      const list = $$(APP_CONFIG.SELECTORS.tabs);
      const idx = list.indexOf(btn);
      if (e.key === "ArrowRight") list[(idx + 1) % list.length].focus();
      if (e.key === "ArrowLeft")
        list[(idx - 1 + list.length) % list.length].focus();
    });
  });
  const clearBtn = $(APP_CONFIG.SELECTORS.clear);
  clearBtn?.addEventListener("click", () => applyFilter("all"));
}
