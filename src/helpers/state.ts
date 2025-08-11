import { Product } from "../types";

export type Tab = "all" | "single" | "bundles";

export type State = {
  products: Product[];
  filtered: Product[];
  tab: Tab;
  page: number;
  loading: boolean;
};

export const state: State = {
  products: [],
  filtered: [],
  tab: "all",
  page: 1,
  loading: false,
};
