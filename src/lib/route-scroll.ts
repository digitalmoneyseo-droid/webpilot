const routeScrollTopKey = "webpilot:scroll-to-top";

export function scrollToPageTopInstantly() {
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;

  root.style.scrollBehavior = "auto";
  root.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
  root.style.scrollBehavior = previousScrollBehavior;
}

export function requestRouteScrollTop() {
  window.sessionStorage.setItem(routeScrollTopKey, "true");
}

export function consumeRouteScrollTopRequest() {
  if (window.sessionStorage.getItem(routeScrollTopKey) !== "true") return;
  window.sessionStorage.removeItem(routeScrollTopKey);
  scrollToPageTopInstantly();
}
