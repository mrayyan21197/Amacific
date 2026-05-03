/**
 * Central analytics helper — wire IDs in public/index.html (.env placeholders).
 * Events align with GA4 recommended ecommerce + custom conversions.
 */
export function trackEvent(name, params = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });

  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }

  if (typeof window.fbq === "function") {
    const metaMap = {
      page_view: "PageView",
      view_item: "ViewContent",
      add_to_cart: "AddToCart",
      begin_checkout: "InitiateCheckout",
      purchase: "Purchase",
      lead: "Lead",
      signup: "CompleteRegistration",
    };
    const ev = metaMap[name];
    if (ev) window.fbq("track", ev, params);
  }

  if (typeof window.ttq?.track === "function") {
    const ttMap = {
      page_view: "ViewContent",
      view_item: "ViewContent",
      add_to_cart: "AddToCart",
      begin_checkout: "InitiateCheckout",
      complete_payment: "CompletePayment",
      submit_form: "SubmitForm",
    };
    const tt = ttMap[name];
    if (tt) window.ttq.track(tt, params);
  }
}

export function trackPageView(path, title) {
  trackEvent("page_view", { page_path: path, page_title: title });
}
