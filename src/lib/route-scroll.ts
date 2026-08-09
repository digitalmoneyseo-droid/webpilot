let routeScrollTopRequested = false;

function scrollToPageTopInstantly() {
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;

  root.style.scrollBehavior = "auto";
  root.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
  root.style.scrollBehavior = previousScrollBehavior;
}

export function scrollToPageTopSmoothly() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, left: 0, behavior: reducedMotion ? "auto" : "smooth" });
}

export function requestRouteScrollTop() {
  routeScrollTopRequested = true;
}

export function consumeRouteScrollTopRequest() {
  if (!routeScrollTopRequested) return;
  routeScrollTopRequested = false;
  scrollToPageTopInstantly();
}
