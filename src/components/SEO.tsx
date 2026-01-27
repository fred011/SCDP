import { useEffect } from "react";

export type SeoProps = {
  title: string;
  description: string;
  /** Absolute canonical URL (recommended for SEO) */
  canonical?: string;
  /** Absolute URL for social preview image */
  image?: string;
  /** og:type */
  type?: "website" | "article";
  /** Allow indexing. Defaults to true */
  index?: boolean;
};

const DEFAULTS = {
  siteName: "SCDP",
  defaultImage: "https://scdp.co.za/logo2.png",
  defaultType: "website" as const,
};

function upsertMetaByName(name: string, content: string) {
  let el = document.head.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertMetaByProperty(property: string, content: string) {
  let el = document.head.querySelector(
    `meta[property="${property}"]`
  ) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function SEO({
  title,
  description,
  canonical,
  image,
  type = DEFAULTS.defaultType,
  index = true,
}: SeoProps) {
  useEffect(() => {
    const fullTitle = title.includes(DEFAULTS.siteName)
      ? title
      : `${title} | ${DEFAULTS.siteName}`;

    document.title = fullTitle;

    // Basic
    upsertMetaByName("description", description);
    upsertMetaByName("robots", index ? "index,follow" : "noindex,nofollow");

    if (canonical) upsertLink("canonical", canonical);

    // Open Graph
    upsertMetaByProperty("og:type", type);
    upsertMetaByProperty("og:site_name", DEFAULTS.siteName);
    upsertMetaByProperty("og:title", fullTitle);
    upsertMetaByProperty("og:description", description);
    if (canonical) upsertMetaByProperty("og:url", canonical);
    upsertMetaByProperty("og:image", image ?? DEFAULTS.defaultImage);

    // Twitter
    upsertMetaByName("twitter:card", "summary_large_image");
    upsertMetaByName("twitter:title", fullTitle);
    upsertMetaByName("twitter:description", description);
    upsertMetaByName("twitter:image", image ?? DEFAULTS.defaultImage);
  }, [title, description, canonical, image, type, index]);

  return null;
}
