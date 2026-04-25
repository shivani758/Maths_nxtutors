import { useMemo, useState } from "react";
import { useAdminCollection } from "../hooks/useAdminCollection";
import { getFormErrorMessage, getValidationErrors } from "../utils/formValidation";
import {
  ActionButton,
  AdminPageHeader,
  ConfirmDialog,
  EmptyState,
  LoadingPanel,
  ModalDialog,
  SearchAndFilterBar,
} from "./primitives";
import { EntityTable } from "../tables/EntityTable";
import { useAdminToast } from "../providers/AdminToastContext";

function matchesQuery(item, query, fields) {
  if (!query) {
    return true;
  }

  const normalizedQuery = query.trim().toLowerCase();

  return fields.some((field) => {
    const value = typeof field === "function" ? field(item) : item[field];
    return String(value ?? "").toLowerCase().includes(normalizedQuery);
  });
}

function AdminCollectionPage({
  eyebrow,
  title,
  description,
  createLabel,
  queryPlaceholder,
  filters,
  columns,
  loader,
  createEmptyItem,
  saveItem,
  deleteItem,
  searchFields,
  renderForm,
  getItemLabel,
  pageSize = 8,
}) {
  const { items, loading, error, refresh } = useAdminCollection(loader);
  const { pushToast } = useAdminToast();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState(
    () =>
      filters?.reduce((map, filter) => ({ ...map, [filter.key]: filter.defaultValue ?? "all" }), {}) ??
      {},
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [draftItem, setDraftItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [formError, setFormError] = useState("");

  function clearDialogErrors() {
    setValidationErrors({});
    setFormError("");
  }

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const queryMatch = matchesQuery(item, query, searchFields);
      const filtersMatch =
        filters?.every((filter) => filter.matches(item, activeFilters[filter.key] ?? "all")) ?? true;
      return queryMatch && filtersMatch;
    });
  }, [activeFilters, filters, items, query, searchFields]);

  const filterConfigs =
    filters?.map((filter) => ({
      key: filter.key,
      label: filter.label,
      value: activeFilters[filter.key] ?? filter.defaultValue ?? "all",
      onChange: (value) => {
        setActiveFilters((current) => ({ ...current, [filter.key]: value }));
        setPage(1);
      },
      options: filter.options,
    })) ?? [];

  async function openCreateDialog() {
    clearDialogErrors();
    setDraftItem(await createEmptyItem());
    setIsDialogOpen(true);
  }

  function openEditDialog(item) {
    clearDialogErrors();
    setDraftItem(item);
    setIsDialogOpen(true);
  }

  async function handleSave() {
    try {
      clearDialogErrors();
      await saveItem(draftItem);
      pushToast({ title: `${getItemLabel(draftItem)} saved successfully.` });
      setIsDialogOpen(false);
      setDraftItem(null);
      await refresh();
    } catch (saveError) {
      const nextValidationErrors = getValidationErrors(saveError);
      const nextFormError = getFormErrorMessage(saveError, "Unable to save this item right now.");
      setValidationErrors(nextValidationErrors);
      setFormError(nextFormError);
      pushToast({
        title: nextFormError,
        tone: "error",
      });
    }
  }

  async function handleDelete() {
    if (!itemToDelete) {
      return;
    }

    try {
      await deleteItem(itemToDelete.id);
      pushToast({ title: `${getItemLabel(itemToDelete)} deleted.`, tone: "warning" });
      setItemToDelete(null);
      await refresh();
    } catch (deleteError) {
      pushToast({
        title: deleteError.message || "Unable to delete this item right now.",
        tone: "error",
      });
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        primaryAction={{ label: createLabel, onClick: openCreateDialog }}
      />

      <SearchAndFilterBar
        query={query}
        onQueryChange={(value) => {
          setQuery(value);
          setPage(1);
        }}
        queryPlaceholder={queryPlaceholder}
        filters={filterConfigs}
      />

      {loading ? <LoadingPanel /> : null}
      {!loading && error ? <EmptyState title="Unable to load items" description={error} /> : null}
      {!loading && !error && !filteredItems.length ? (
        <EmptyState
          title={`No ${title.toLowerCase()} found`}
          description="Try adjusting your filters or create a fresh entry for this section."
          action={<ActionButton label={createLabel} onClick={openCreateDialog} />}
        />
      ) : null}
      {!loading && !error && filteredItems.length ? (
        <EntityTable
          columns={[
            ...columns,
            {
              key: "actions",
              label: "Actions",
              render: (item) => (
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => openEditDialog(item)}
                    className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setItemToDelete(item)}
                    className="rounded-xl border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-50"
                  >
                    Delete
                  </button>
                </div>
              ),
            },
          ]}
          rows={filteredItems}
          emptyLabel={`No ${title.toLowerCase()} available.`}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      ) : null}

      <ModalDialog
        open={isDialogOpen}
        title={draftItem?.id ? `Edit ${getItemLabel(draftItem)}` : createLabel}
        description="This CRUD flow now keeps API validation visible in place so fixes are faster during admin entry."
        onClose={() => {
          setIsDialogOpen(false);
          setDraftItem(null);
          clearDialogErrors();
        }}
        footer={
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setIsDialogOpen(false);
                setDraftItem(null);
                clearDialogErrors();
              }}
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Save changes
            </button>
          </div>
        }
      >
        {formError ? (
          <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {formError}
          </div>
        ) : null}
        {draftItem
          ? renderForm({
              draftItem,
              setDraftItem: (nextValue) => {
                clearDialogErrors();
                setDraftItem((current) =>
                  typeof nextValue === "function" ? nextValue(current) : nextValue,
                );
              },
              validationErrors,
              formError,
            })
          : null}
      </ModalDialog>

      <ConfirmDialog
        open={Boolean(itemToDelete)}
        title="Delete this item?"
        description="This permanently removes the current record from the connected data source for this module."
        confirmLabel="Delete item"
        onConfirm={handleDelete}
        onCancel={() => setItemToDelete(null)}
      />
    </div>
  );
}

export default AdminCollectionPage;
