import { useEffect, useState } from "react";
import { listCities, listLocalities } from "../../services/locationsService";
import { listPages } from "../../services/pagesService";
import { createEmptyFaq, deleteFaq, listFaqs, saveFaq } from "../../services/faqsService";
import AdminCollectionPage from "../components/AdminCollectionPage";
import { LoadingPanel, StatusBadge } from "../components/primitives";
import { FaqForm } from "../forms/simpleForms";

function FaqsPage() {
  const [resources, setResources] = useState({
    pages: [],
    cities: [],
    localities: [],
  });
  const [loadingResources, setLoadingResources] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadResources() {
      const [pages, cities, localities] = await Promise.all([
        listPages(),
        listCities(),
        listLocalities(),
      ]);

      if (!mounted) {
        return;
      }

      setResources({ pages, cities, localities });
      setLoadingResources(false);
    }

    loadResources();

    return () => {
      mounted = false;
    };
  }, []);

  if (loadingResources) {
    return <LoadingPanel label="Loading FAQ resources..." />;
  }

  return (
    <AdminCollectionPage
      eyebrow="FAQ Management"
      title="FAQs"
      description="Manage page-linked FAQs separately while keeping the copy aligned to visible public content."
      createLabel="Add FAQ"
      queryPlaceholder="Search by question, answer, or linked item"
      loader={listFaqs}
      createEmptyItem={createEmptyFaq}
      saveItem={saveFaq}
      deleteItem={deleteFaq}
      searchFields={["question", "answer", "linkedLabel"]}
      filters={[
        {
          key: "status",
          label: "Status",
          defaultValue: "all",
          options: [
            { value: "all", label: "All statuses" },
            { value: "draft", label: "Draft" },
            { value: "published", label: "Published" },
            { value: "archived", label: "Archived" },
          ],
          matches: (item, value) => value === "all" || item.status === value,
        },
      ]}
      columns={[
        {
          key: "question",
          label: "FAQ",
          render: (item) => (
            <div>
              <p className="text-sm font-semibold text-slate-900">{item.question}</p>
              <p className="mt-1 text-sm text-slate-500">{item.linkedLabel}</p>
            </div>
          ),
        },
        {
          key: "linkedType",
          label: "Linked Type",
          render: (item) => <p className="text-sm font-semibold capitalize text-slate-700">{item.linkedType}</p>,
        },
        {
          key: "status",
          label: "Status",
          render: (item) => <StatusBadge status={item.status} />,
        },
      ]}
      getItemLabel={(item) => item.question || "FAQ"}
      renderForm={({ draftItem, setDraftItem }) => (
        <FaqForm
          draftItem={draftItem}
          setDraftItem={setDraftItem}
          pageOptions={resources.pages}
          cityOptions={resources.cities}
          localityOptions={resources.localities}
        />
      )}
    />
  );
}

export default FaqsPage;
