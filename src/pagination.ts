import { APP_CONFIG } from "./helpers/config";
import { state } from "./helpers/state";
import { $ } from "./helpers/utils";
import { renderProducts, showStatus } from "./render";

export function setupPagination() {
  let isLoadingMore = false;
  const loadMoreBtn = $(APP_CONFIG.SELECTORS.loadMore);
  loadMoreBtn.addEventListener("click", async () => {
    if (isLoadingMore) return;
    isLoadingMore = true;
    state.page += 1;
    try {
      renderProducts(state.page);
      showStatus("");
    } catch (e) {
      state.page -= 1;
      showStatus("Failed to load more. Try again.", "error");
      console.error(e);
    } finally {
      isLoadingMore = false;
    }
  });
}
