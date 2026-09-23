import { useEffect, useRef, type RefObject } from "react";

export default function useOutsideClick<T extends HTMLElement = HTMLElement>(
  handler: () => void,
  capturePhase = true
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    }

    document.addEventListener("click", handleClick, capturePhase);
    return () =>
      document.removeEventListener("click", handleClick, capturePhase);
  }, [handler, capturePhase]);

  return ref;
}
