import { ADMIN_ROLES, createEmptyUser, deleteUser, listUsers, saveUser } from "../../services/usersService";
import AdminCollectionPage from "../components/AdminCollectionPage";
import { StatusBadge } from "../components/primitives";
import { UserForm } from "../forms/simpleForms";

function UsersPage() {
  return (
    <AdminCollectionPage
      eyebrow="Access"
      title="Users"
      description="Manage admin-facing roles and mock invite/reset controls without pretending this is production auth."
      createLabel="Add User"
      queryPlaceholder="Search by name, email, or role"
      loader={listUsers}
      createEmptyItem={createEmptyUser}
      saveItem={saveUser}
      deleteItem={deleteUser}
      searchFields={["name", "email", "role"]}
      filters={[
        {
          key: "role",
          label: "Role",
          defaultValue: "all",
          options: [
            { value: "all", label: "All roles" },
            ...ADMIN_ROLES.map((role) => ({ value: role, label: role })),
          ],
          matches: (item, value) => value === "all" || item.role === value,
        },
      ]}
      columns={[
        {
          key: "name",
          label: "User",
          render: (item) => (
            <div>
              <p className="text-sm font-semibold text-slate-900">{item.name}</p>
              <p className="mt-1 text-sm text-slate-500">{item.email}</p>
            </div>
          ),
        },
        {
          key: "role",
          label: "Role",
          render: (item) => <p className="text-sm font-semibold text-slate-700">{item.role}</p>,
        },
        {
          key: "active",
          label: "Status",
          render: (item) => <StatusBadge status={item.active ? "active" : "inactive"} />,
        },
      ]}
      getItemLabel={(item) => item.name || "user"}
      renderForm={({ draftItem, setDraftItem }) => (
        <UserForm
          draftItem={draftItem}
          setDraftItem={setDraftItem}
          roleOptions={ADMIN_ROLES}
        />
      )}
    />
  );
}

export default UsersPage;
