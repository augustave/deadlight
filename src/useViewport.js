import { useEffect, useState } from "react";

// Reports viewport width + coarse breakpoints so inline-styled artifacts can
// collapse fixed-column grids on narrow screens (Principle 05 — survive density,
// including the density of a phone).
export function useViewport() {
  const [width, setWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return { width, narrow: width < 720, mid: width < 1024 };
}
