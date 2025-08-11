export type BottomBadgeKey =
  | "blue-raspberry"
  | "peach-cream"
  | "mullein"
  | "lavender-berry"
  | "cool-mint-frost"
  | "watermelon";

export const BADGES_BOTTOM: Record<
  BottomBadgeKey,
  { label: string; path?: string }
> = {
  "blue-raspberry": {
    label: "1x Blue Raspberry",
    path: "/icons/blue-raspberry.svg",
  },
  "peach-cream": {
    label: "1x Peach Cream",
    path: "/icons/peach-cream.svg",
  },
  mullein: { label: "1x Mullein", path: "/icons/mullein.svg" },
  "lavender-berry": {
    label: "1x Lavender Berry",
    path: "/icons/lavender-berry.svg",
  },
  "cool-mint-frost": {
    label: "1x Cool Mint Frost",
    path: "/icons/cool-mint-frost.svg",
  },
  watermelon: { label: "1x Watermelon", path: "/public/icons/watermelon.svg" },
};

export type TopBadgeKey =
  | "energy"
  | "relax"
  | "detox"
  | "sleep"
  | "enhance"
  | "multi"
  | "limited"
  | "deal"
  | "sale";

export const TOP_BADGES: Record<
  TopBadgeKey,
  { svgId?: string; path?: string }
> = {
  energy: { svgId: "badge-energy", path: "/icons/badge-energy.svg" },
  relax: { svgId: "badge-relax", path: "/icons/badge-relax.svg" },
  detox: { svgId: "badge-detox", path: "/icons/badge-detox.svg" },
  sleep: { svgId: "badge-sleep", path: "/icons/badge-sleep.svg" },
  enhance: { svgId: "badge-enhance", path: "/icons/badge-enhance.svg" },
  multi: { svgId: "badge-multi", path: "/icons/badge-multi.svg" },
  limited: { svgId: "badge-limited", path: "/icons/badge-limited.svg" },
  deal: { svgId: "badge-deal", path: "/icons/badge-sale.svg" },
  sale: { svgId: "badge-sale", path: "/icons/badge-sale.svg" },
};

export const isTopBadgeKey = (k: string): k is TopBadgeKey =>
  Object.prototype.hasOwnProperty.call(TOP_BADGES, k);

export const isBottomBadgeKey = (k: string): k is BottomBadgeKey =>
  Object.prototype.hasOwnProperty.call(BADGES_BOTTOM, k);
