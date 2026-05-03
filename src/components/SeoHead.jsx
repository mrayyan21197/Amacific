import { useEffect } from "react";

/**
 * Client-side SEO defaults for CRA (full SSR would use react-helmet-async).
 */
export default function SeoHead({
  title,
  description,
  keywords,
  canonicalPath,
}) {
  useEffect(() => {
    const base = "Amacific — Pakistan’s youth-first one-stop marketplace";
    document.title = title ? `${title} | Amacific` : base;

    const setMeta = (name, content, attr = "name") => {
      if (!content) return;
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta(
      "description",
      description ||
        "Shop fashion, tech, beauty, stationery, and student essentials online in Pakistan. Verified sellers, COD, JazzCash & Easypaisa. One cart. Every need."
    );
    setMeta(
      "keywords",
      keywords ||
        "online shopping Pakistan, best online store Pakistan, student essentials Pakistan, deals under PKR 999, fashion online Pakistan"
    );

    if (canonicalPath && typeof window !== "undefined") {
      const href = `${window.location.origin}${canonicalPath}`;
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = href;
    }
  }, [title, description, keywords, canonicalPath]);

  return null;
}
