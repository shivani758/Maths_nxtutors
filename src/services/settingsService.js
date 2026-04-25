import { commitMockStore, getMockStoreSnapshot } from "./mockCmsStore";

export async function getSettings() {
  return getMockStoreSnapshot().settings;
}

export async function saveSettings(payload) {
  return commitMockStore((draft) => {
    draft.settings = {
      ...draft.settings,
      ...payload,
      contact: {
        ...draft.settings.contact,
        ...payload.contact,
      },
      seo: {
        ...draft.settings.seo,
        ...payload.seo,
      },
      homepage: {
        ...draft.settings.homepage,
        ...payload.homepage,
      },
      branding: {
        ...draft.settings.branding,
        ...payload.branding,
      },
      socialLinks: {
        ...draft.settings.socialLinks,
        ...payload.socialLinks,
      },
      analyticsIds: {
        ...draft.settings.analyticsIds,
        ...payload.analyticsIds,
      },
      updatedAt: new Date().toISOString(),
    };

    return draft.settings;
  }, {
    module: "Settings",
    action: "Updated settings",
    entityId: "settings",
    entityLabel: "Global settings",
  });
}

export async function getSeoOverview() {
  const store = getMockStoreSnapshot();

  return {
    defaults: store.settings.seo,
    pages: store.pages.map((page) => ({
      id: page.id,
      title: page.title,
      status: page.status,
      type: page.pageType,
      hasSeoTitle: Boolean(page.seo?.title),
      hasSeoDescription: Boolean(page.seo?.description),
      canonicalUrl: page.seo?.canonicalUrl ?? "",
    })),
    blogs: store.blogs.map((blog) => ({
      id: blog.id,
      title: blog.title,
      status: blog.status,
      hasSeoTitle: Boolean(blog.seo?.title),
      hasSeoDescription: Boolean(blog.seo?.description),
      canonicalUrl: blog.seo?.canonicalUrl ?? "",
    })),
  };
}
