import { useEffect, useState } from "react";
import { listCities, listLocalities } from "../../services/locationsService";
import { listPages } from "../../services/pagesService";
import { createEmptyResult, deleteResult, listResults, saveResult } from "../../services/resultsService";
import { listTutors } from "../../services/tutorsService";
import AdminCollectionPage from "../components/AdminCollectionPage";
import { LoadingPanel, StatusBadge } from "../components/primitives";
import { ResultForm } from "../forms/simpleForms";

function ResultsPage() {
  const [resources, setResources] = useState({
    tutors: [],
    pages: [],
    cities: [],
    localities: [],
  });
  const [loadingResources, setLoadingResources] = useState(true);
  const [resourceError, setResourceError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadResources() {
      const resourceEntries = await Promise.allSettled([
        listTutors(),
        listPages(),
        listCities(),
        listLocalities(),
      ]);
      const [tutorsResult, pagesResult, citiesResult, localitiesResult] = resourceEntries;
      const failures = resourceEntries.filter((entry) => entry.status === "rejected");

      if (!mounted) {
        return;
      }

      setResources({
        tutors: tutorsResult.status === "fulfilled" ? tutorsResult.value : [],
        pages: pagesResult.status === "fulfilled" ? pagesResult.value : [],
        cities: citiesResult.status === "fulfilled" ? citiesResult.value : [],
        localities: localitiesResult.status === "fulfilled" ? localitiesResult.value : [],
      });
      setResourceError(
        failures.length ? failures[0].reason?.message || "Some result form resources could not be loaded." : "",
      );
      setLoadingResources(false);
    }

    loadResources().catch((error) => {
      if (!mounted) {
        return;
      }

      setResourceError(error?.message || "Unable to load result resources.");
      setLoadingResources(false);
    });

    return () => {
      mounted = false;
    };
  }, []);

  if (loadingResources) {
    return <LoadingPanel label="Loading result resources..." />;
  }

  return (
    <div className="space-y-4">
      {resourceError ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {resourceError}
        </div>
      ) : null}

      <AdminCollectionPage
        eyebrow="Success Stories"
        title="Results"
        description="Capture proof points, before-and-after movement, and story-led student outcomes in one place."
        createLabel="Add Result"
        queryPlaceholder="Search by student label, class, or result summary"
        loader={listResults}
        createEmptyItem={createEmptyResult}
        saveItem={saveResult}
        deleteItem={deleteResult}
        searchFields={["studentLabel", "board", "classLevel", "resultSummary", "beforeResult", "afterResult", "story"]}
        filters={[
          {
            key: "status",
            label: "Status",
            defaultValue: "all",
            options: [
              { value: "all", label: "All statuses" },
              { value: "draft", label: "Draft" },
              { value: "approved", label: "Approved" },
            ],
            matches: (item, value) => value === "all" || item.status === value,
          },
        ]}
        columns={[
          {
            key: "studentLabel",
            label: "Story",
            render: (item) => (
              <div>
                <p className="text-sm font-semibold text-slate-900">{item.studentLabel}</p>
                <p className="mt-1 text-sm text-slate-500">{item.classBoard}</p>
              </div>
            ),
          },
          {
            key: "change",
            label: "Summary",
            render: (item) => (
              <p className="max-w-xs text-sm leading-6 text-slate-700">
                {item.resultSummary || `${item.beforeResult} to ${item.afterResult}`}
              </p>
            ),
          },
          {
            key: "status",
            label: "Status",
            render: (item) => <StatusBadge status={item.status} />,
          },
        ]}
        getItemLabel={(item) => item.studentLabel || "result"}
        renderForm={({ draftItem, setDraftItem, validationErrors }) => (
          <ResultForm
            draftItem={draftItem}
            setDraftItem={setDraftItem}
            tutorOptions={resources.tutors}
            pageOptions={resources.pages}
            cityOptions={resources.cities}
            localityOptions={resources.localities}
            errors={validationErrors}
          />
        )}
      />
    </div>
  );
}

export default ResultsPage;
