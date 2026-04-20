import { useEffect } from "react";

function ensureMeta(name, content, attribute = "name") {
  let tag = document.head.querySelector(`meta[${attribute}="${name}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function ensureLink(rel, href) {
  let tag = document.head.querySelector(`link[rel="${rel}"]`);

  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }

  tag.setAttribute("href", href);
}

export default function Seo({
  title,
  description,
  keywords = [],
  canonicalPath = "/",
  imagePath = "/images/hero-maths-home.svg",
  schema = [],
}) {
  useEffect(() => {
    const siteUrl = import.meta.env.VITE_SITE_URL || "https://www.mathsbodhi.com";
    const canonicalUrl = new URL(canonicalPath, siteUrl).toString();
    const imageUrl = new URL(imagePath, siteUrl).toString();
    const schemaItems = Array.isArray(schema) ? schema : [schema];

    document.title = title;

    ensureMeta("description", description);
    ensureMeta("keywords", keywords.join(", "));
    ensureMeta("robots", "index, follow");
    ensureMeta("og:type", "website", "property");
    ensureMeta("og:title", title, "property");
    ensureMeta("og:description", description, "property");
    ensureMeta("og:url", canonicalUrl, "property");
    ensureMeta("og:image", imageUrl, "property");
    ensureMeta("twitter:card", "summary_large_image");
    ensureMeta("twitter:title", title);
    ensureMeta("twitter:description", description);
    ensureMeta("twitter:image", imageUrl);
    ensureLink("canonical", canonicalUrl);

    const schemaId = "seo-structured-data";
    let schemaScript = document.getElementById(schemaId);

    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.type = "application/ld+json";
      schemaScript.id = schemaId;
      document.head.appendChild(schemaScript);
    }

    schemaScript.textContent = JSON.stringify(schemaItems);
  }, [canonicalPath, description, imagePath, keywords, schema, title]);

  return null;
}

