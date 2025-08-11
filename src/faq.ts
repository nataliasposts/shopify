export function setupFAQ() {
  const items = Array.from(
    document.querySelectorAll<HTMLElement>(".faq__item"),
  );

  items.forEach((item) => {
    const btn = item.querySelector<HTMLButtonElement>(".faq__btn");
    if (!btn) return;

    const img = btn.querySelector<HTMLImageElement>("img");

    btn.addEventListener("click", () => {
      const isOpen = item.getAttribute("aria-expanded") === "true";

      items.forEach((i) => {
        i.setAttribute("aria-expanded", "false");
        const b = i.querySelector<HTMLButtonElement>(".faq__btn");
        if (b) b.setAttribute("aria-expanded", "false");
        const im = b?.querySelector<HTMLImageElement>("img");
        if (im) im.src = "/icons/plus.svg";
      });

      if (!isOpen) {
        item.setAttribute("aria-expanded", "true");
        btn.setAttribute("aria-expanded", "true");
        if (img) img.src = "/icons/minus.svg";
      }
    });
  });
}
