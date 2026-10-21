(() => {
  const LABELS = /^(comment|reply|save|assign|post)$/i;

  const isVisible = (el) => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none";
  };

  // Walk up from the focused editor until we find the container holding the submit button.
  const findSubmitButton = (start) => {
    let node = start;
    for (let i = 0; node && i < 12; i++, node = node.parentElement) {
      const candidates = node.querySelectorAll(
        '[role="button"], button, .jfk-button, .docos-input-post-button'
      );
      const matches = [...candidates].filter((el) => {
        const text = (el.textContent || "").trim();
        const label = (el.getAttribute("aria-label") || "").trim();
        return isVisible(el) && (LABELS.test(text) || LABELS.test(label));
      });
      if (matches.length) {
        // Prefer the primary-action button if several match.
        return matches.find((el) => el.classList.contains("jfk-button-action")) || matches[0];
      }
    }
    return null;
  };

  // Google Docs buttons listen for mouse events, not just click.
  const press = (el) => {
    const opts = { bubbles: true, cancelable: true, view: window };
    ["mousedown", "mouseup", "click"].forEach((type) =>
      el.dispatchEvent(new MouseEvent(type, opts))
    );
  };

  document.addEventListener(
    "keydown",
    (e) => {
      if (!(e.metaKey && e.key === "Enter") || e.ctrlKey || e.altKey || e.shiftKey) return;

      const target = e.target;
      if (!(target instanceof Element)) return;

      // Only act inside comment inputs, never in the document body itself.
      const inComment = target.closest(
        '.docos-input, .docos-input-textarea, .docos-replyview, .docos-docoview, .docos-anchoreddocoview, [class*="docos"]'
      );
      if (!inComment) return;

      const btn = findSubmitButton(target);
      if (!btn) return;

      e.preventDefault();
      e.stopPropagation();
      press(btn);
    },
    true
  );
})();
