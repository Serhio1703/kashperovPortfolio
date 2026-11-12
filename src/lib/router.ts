import { useEffect, useState } from "react";

export type DemoRoute = "landing" | "bot" | "analytics";

export function parseRoute(hash: string): DemoRoute | null {
  if (hash.startsWith("#/demo/")) {
    const r = hash.slice(7);
    if (r === "landing" || r === "bot" || r === "analytics") return r;
  }
  return null;
}

/** Лёгкий hash-роутер: #/demo/landing и т.п. открывают демо-страницы. */
export function useHashRoute() {
  const [route, setRoute] = useState<DemoRoute | null>(() =>
    parseRoute(window.location.hash)
  );

  useEffect(() => {
    const onChange = () => setRoute(parseRoute(window.location.hash));
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return route;
}

export function goHome() {
  window.location.hash = "";
}
