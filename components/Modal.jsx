"use client";
import { useLayoutEffect, useRef, useState, useCallback } from "react";
let lockCount = 0;
let savedBodyStyle = {};
let savedScroll = 0;
export default function Modal({
  children,
  label,
  className = "",
  onClose,
  closeRef,
}) {
  const ref = useRef(null);
  const timer = useRef(null);
  const closingRef = useRef(false);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const [closing, setClosing] = useState(false);
  const requestClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setClosing(true);
    const style = getComputedStyle(ref.current);
    const duration =
      parseFloat(style.getPropertyValue("--motion-overlay")) || 0;
    timer.current = setTimeout(() => onCloseRef.current(), duration);
  }, []);
  useLayoutEffect(() => {
    const dialog = ref.current;
    const trigger = document.activeElement;
    const scrollParents = [];
    for (
      let node = trigger?.parentElement;
      node && node !== document.body;
      node = node.parentElement
    ) {
      if (node.scrollHeight > node.clientHeight)
        scrollParents.push([node, node.scrollTop]);
    }
    if (lockCount++ === 0) {
      savedScroll = window.scrollY;
      savedBodyStyle = Object.fromEntries(
        ["overflow", "position", "top", "width"].map((key) => [
          key,
          document.body.style[key],
        ]),
      );
      Object.assign(document.body.style, {
        overflow: "hidden",
        position: "fixed",
        top: `-${savedScroll}px`,
        width: "100%",
      });
    }
    dialog.showModal();
    dialog.querySelector("[data-autofocus]")?.focus({ preventScroll: true });
    if (closeRef) closeRef.current = requestClose;
    return () => {
      clearTimeout(timer.current);
      dialog.close();
      const lastOverlay = --lockCount === 0;
      if (lastOverlay) Object.assign(document.body.style, savedBodyStyle);
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
      for (const [node, top] of scrollParents)
        node.scrollTo({ top, behavior: "instant" });
      if (lastOverlay)
        window.scrollTo({ top: savedScroll, behavior: "instant" });
    };
  }, [closeRef, requestClose]);
  return (
    <dialog
      ref={ref}
      className={`modal ${className} ${closing ? "is-closing" : ""}`}
      aria-label={label}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const candidates = [
          ...ref.current.querySelectorAll(
            'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]',
          ),
        ].filter((el) => el.getClientRects().length > 0);
        const first = candidates[0],
          last = candidates[candidates.length - 1];
        if (!first) {
          event.preventDefault();
          return;
        }
        if (
          event.shiftKey &&
          (document.activeElement === first ||
            !ref.current.contains(document.activeElement))
        ) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          (document.activeElement === last ||
            !ref.current.contains(document.activeElement))
        ) {
          event.preventDefault();
          first.focus();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        requestClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget && className.includes("sheet"))
          requestClose();
      }}
    >
      {typeof children === "function" ? children(requestClose) : children}
    </dialog>
  );
}
