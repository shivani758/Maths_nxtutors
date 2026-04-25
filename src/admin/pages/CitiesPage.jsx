import { createEmptyCity, deleteCity, listCities, saveCity } from "../../services/locationsService";
import AdminCollectionPage from "../components/AdminCollectionPage";
import { StatusBadge } from "../components/primitives";
import { CityForm } from "../forms/simpleForms";

function CitiesPage() {
  return (
    <AdminCollectionPage
      eyebrow="Geo Pages"
      title="Cities"
      description="Maintain city-level landing pages that connect geography, local trust, and subject discovery."
      createLabel="Add City"
      queryPlaceholder="Search by city name or headline"
      loader={listCities}
      createEmptyItem={createEmptyCity}
      saveItem={saveCity}
      deleteItem={deleteCity}
      searchFields={["label", "headline", "subtitle"]}
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
          key: "label",
          label: "City",
          render: (item) => (
            <div>
              <p className="text-sm font-semibold text-slate-900">{item.label}</p>
              <p className="mt-1 text-sm text-slate-500">{item.slug}</p>
            </div>
          ),
        },
        {
          key: "headline",
          label: "Headline",
          render: (item) => <p className="max-w-md text-sm leading-6 text-slate-700">{item.headline}</p>,
        },
        {
          key: "status",
          label: "Status",
          render: (item) => <StatusBadge status={item.status} />,
        },
      ]}
      getItemLabel={(item) => item.label || "city"}
      renderForm={({ draftItem, setDraftItem }) => (
        <CityForm draftItem={draftItem} setDraftItem={setDraftItem} />
      )}
    />
  );
}

export default CitiesPage;
