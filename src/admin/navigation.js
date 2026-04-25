export const adminNavigationGroups = [
  {
    label: "Workspace",
    items: [
      { label: "Dashboard", to: "/admin/dashboard" },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Tutors", to: "/admin/tutors" },
      { label: "Reviews", to: "/admin/reviews" },
      { label: "Results", to: "/admin/results" },
      { label: "Blogs", to: "/admin/blogs" },
      { label: "Pages", to: "/admin/pages" },
      { label: "FAQs", to: "/admin/faqs" },
      { label: "Cities", to: "/admin/cities" },
      { label: "Localities", to: "/admin/localities" },
    ],
  },
  {
    label: "Library",
    items: [
      { label: "Media", to: "/admin/media" },
      { label: "Users", to: "/admin/users" },
    ],
  },
  {
    label: "Configuration",
    items: [
      { label: "Settings", to: "/admin/settings" },
      { label: "SEO", to: "/admin/seo" },
    ],
  },
];

export const adminNavigationItems = adminNavigationGroups.flatMap((group) => group.items);

export function getAdminNavLabel(pathname) {
  const matched = [...adminNavigationItems]
    .sort((first, second) => second.to.length - first.to.length)
    .find((item) => pathname.startsWith(item.to));

  return matched?.label ?? "Admin";
}

export function getAdminBreadcrumbs(pathname) {
  const segments = pathname.split("/").filter(Boolean);

  return segments.map((segment, index) => {
    const to = `/${segments.slice(0, index + 1).join("/")}`;

    if (index === 0) {
      return { label: "Admin", to: "/admin/dashboard" };
    }

    if (segment === "new") {
      return { label: "New", to };
    }

    const matchedNav = adminNavigationItems.find((item) => item.to === to);

    if (matchedNav) {
      return { label: matchedNav.label, to };
    }

    return {
      label: segment
        .split("-")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" "),
      to,
    };
  });
}
