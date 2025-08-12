import { APP_CONFIG } from "./helpers/config";
import { $, formatMoney } from "./helpers/utils";
import {
  BADGES_BOTTOM,
  isBottomBadgeKey,
  isTopBadgeKey,
  TOP_BADGES,
  TopBadgeKey,
} from "./badges";
import { state } from "./helpers/state";
import { Product } from "./types";

export function showStatus(
  msg: string,
  type: "info" | "error" | "success" = "info",
) {
  const el = $(APP_CONFIG.SELECTORS.status);
  el.textContent = msg;
  el.setAttribute("data-type", type);
  el.hidden = !msg;
}

// helpers
const slug = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const BADGE_VARIANTS: Record<string, TopBadgeKey | string> = {
  energy: "energy",
  relax: "relax",
  detox: "detox",
  sleep: "sleep",
  enhance: "enhance",
  "multi-formula": "multi",
  multi: "multi",
  "limited-stock": "limited",
  limited: "limited",
  "buy-2-get-1-free": "deal",
  "buy-3-get-2-free": "deal",
  "15-off": "sale",
  "15%-off": "sale",
  "40-off": "sale",
  "40%-off": "sale",
};

function renderBundleDivider() {
  return `
    <div class="collection__divider" role="separator" aria-label="Bundle & Save">
      <h2 class="collection__divider-title">Bundle &amp; Save</h2>
      <div class="collection__divider-line"></div>
    </div>
  `;
}


function renderTopBadges(list: string[] = []) {
  if (!list?.length) return "";
  const pills = list
    .map((label) => {
      const key = slug(label);
      const variantRaw = BADGE_VARIANTS[key] ?? key;
      const hasMeta = isTopBadgeKey(variantRaw);
      const meta = hasMeta ? TOP_BADGES[variantRaw] : undefined;

      const icon = meta?.path
        ? `<img class="svg-icon" src="${meta.path}" alt="" aria-hidden="true" loading="lazy" decoding="async">`
        : "";

      const safeVariant = hasMeta ? variantRaw : "sale";

      return `<div class="badge badge-top badge-${safeVariant}">
        ${icon ? `<span class="badge__icon">${icon}</span>` : ""}
        <span class="badge__text">${label}</span>
      </div>`;
    })
    .join("");

  return `<div class="card__badges card__badges-top">${pills}</div>`;
}


function renderBottomBadges(keys: string[] = []) {
  if (!keys?.length) return "";
  const pills = keys
    .map((k) => {
      if (!isBottomBadgeKey(k)) return "";
      const def = BADGES_BOTTOM[k];
      const icon = `<img class="svg-icon" src="${def.path}" alt="" aria-hidden="true" loading="lazy" decoding="async">`;
      return `<div class="badge badge-bottom" role="listitem" aria-label="${def.label}">
        <span class="badge__icon">${icon}</span>
        <span class="badge__text">${def.label}</span>
      </div>`;
    })
    .join("");

  return `<div class="card__badges card__badges-bottom" role="list">${pills}</div>`;
}


export function renderSkeleton(count = APP_CONFIG.PAGE_SIZE) {
  const grid = $(APP_CONFIG.SELECTORS.grid);
  grid.dataset.state = "loading";
  grid.setAttribute("aria-busy", "true");
  grid.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const el = document.createElement("article");
    el.className = "card is-loading";
    el.innerHTML =
      '<div class="card__media"></div><div class="card__body"><div></div><div></div><div></div></div><div class="card__cta"><div></div></div>';
    grid.appendChild(el);
  }
}

export function renderProducts(page = 1) {
  const end = APP_CONFIG.PAGE_SIZE * page;
  const items = state.filtered.slice(0, end) as Product[];
  const grid = $(APP_CONFIG.SELECTORS.grid);

  const inAllTab = state.tab === "all";
  const inBundlesTab = state.tab === "bundles";
  const inSingleTab = state.tab === "single";


  let dividerIndex = -1;
  if (inAllTab) {
    for (let i = 0; i < items.length; i++) {
      const p = items[i];
      const isBundle = p.category.toLowerCase() === "bundles";
      const firstWouldBe = !inSingleTab && i === 0;
      const wouldGetCardBundle =
        isBundle && (inAllTab || inBundlesTab) && !firstWouldBe;
      if (wouldGetCardBundle) {
        dividerIndex = i;
        break;
      }
    }
  }

  grid.innerHTML = items
    .map((p, i) => {
      const topBadges = renderTopBadges(p.badge || []);
      const bottomKeys = (p.badgeBottom ?? []) as string[];
      const bottomBadges = renderBottomBadges(bottomKeys);

      const firstClass = !inSingleTab && i === 0 ? " first-card" : "";
      let tabClass = "";
      const isBundleCategory = p.category.toLowerCase() === "bundles";
      if (isBundleCategory && (inAllTab || inBundlesTab) && !firstClass) {
        tabClass = " card__bundle";
      }

      const before =
        inAllTab && i === dividerIndex ? renderBundleDivider() : "";

      return `
        ${before}
        <article class="card${firstClass}${tabClass}">
          <div class="card__media">
            ${topBadges}
            <img
              loading="lazy"
              decoding="async"
              src="${p.image}"
              alt="${p.title}"
              onerror="this.onerror=null; this.src='https://dummyimage.com/800x1120/f3f4f6/9ca3af.png&text=Image+unavailable';"
            />
            ${bottomBadges}
          </div>
          <div class="card__body">
            <h3 class="card__title">${p.title}</h3>
            <p class="card__flavour">${p.flavour || ""}</p>
            <p class="card__meta">${p.description || ""}</p>
            <div class="card__price">
              <span class="card__price-compare">${formatMoney(
                p.compare_at_price,
              )}</span>
              <span class="card__price-current">${formatMoney(p.price)}</span>
              <span class="card__discount">${p.discount_label || ""}</span>
            </div>
          </div>
          <div class="card__cta">
            <button class="card__btn btn" aria-label="Add ${
              p.title
            } to cart">Get it Now</button>
          </div>
        </article>
      `;
    })
    .join("");

  grid.dataset.state = "ready";
  grid.removeAttribute("aria-busy");

  const empty = $(APP_CONFIG.SELECTORS.empty);
  empty.hidden = items.length !== 0;

  const hasMore = state.filtered.length > end;
  const loadBtn = $(APP_CONFIG.SELECTORS.loadMore);
  loadBtn.hidden = !hasMore;
}
