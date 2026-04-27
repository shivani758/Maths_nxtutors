import { createId, createTimestamp } from "./clientDataUtils";
import { commitMockStore, getMockStoreSnapshot, removeById, upsertById } from "./mockCmsStore";

function sortFaqs(items = []) {
  return [...items].sort(
    (first, second) =>
      String(first.linkedLabel ?? "").localeCompare(String(second.linkedLabel ?? "")) ||
      (first.order ?? 0) - (second.order ?? 0),
  );
}

export async function listFaqs() {
  return sortFaqs(getMockStoreSnapshot().faqs);
}

export async function saveFaq(faq) {
  return commitMockStore((draft) => {
    const existingFaq = draft.faqs.find((item) => item.id === faq.id);
    const nextFaq = {
      ...existingFaq,
      ...faq,
      id: faq.id || createId("faq", `${faq.linkedType}-${faq.linkedId}-${Date.now()}`),
      createdAt: existingFaq?.createdAt ?? createTimestamp(1),
      updatedAt: new Date().toISOString(),
    };

    draft.faqs = upsertById(draft.faqs, nextFaq);
    return nextFaq;
  }, {
    module: "FAQs",
    action: faq.id ? "Updated FAQ" : "Created FAQ",
    entityId: faq.id || faq.question,
    entityLabel: faq.question,
  });
}

export async function deleteFaq(id) {
  return commitMockStore((draft) => {
    const existingFaq = draft.faqs.find((item) => item.id === id);
    draft.faqs = removeById(draft.faqs, id);
    return existingFaq ?? null;
  }, {
    module: "FAQs",
    action: "Deleted FAQ",
    entityId: id,
    entityLabel: id,
  });
}

export async function createEmptyFaq() {
  return {
    id: "",
    question: "",
    answer: "",
    linkedType: "page",
    linkedId: "",
    linkedLabel: "",
    boardKey: "",
    citySlug: "",
    localitySlug: "",
    order: 99,
    status: "draft",
  };
}
