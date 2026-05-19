import { useEffect, useRef } from "react";

export default function useOutsideClick(handler, capturePhase = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    document.addEventListener("click", handleClick, capturePhase);
    return () =>
      document.removeEventListener("click", handleClick, capturePhase);
  }, [handler, capturePhase]);

  return ref;
}
