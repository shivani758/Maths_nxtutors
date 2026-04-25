import { createId, createTimestamp } from "../data/admin/seedUtils";
import { commitMockStore, getMockStoreSnapshot, removeById, upsertById } from "./mockCmsStore";

export const ADMIN_ROLES = [
  "super_admin",
  "admin",
  "editor",
  "seo_manager",
  "content_manager",
];

export async function listUsers() {
  return [...getMockStoreSnapshot().users].sort((first, second) =>
    String(first.name ?? "").localeCompare(String(second.name ?? "")),
  );
}

export async function createEmptyUser() {
  return {
    id: "",
    name: "",
    email: "",
    role: "editor",
    active: true,
    provider: "local",
    providerUserId: "",
    invitedBy: "Maths Bodhi Admin",
    lastLoginAt: "",
    forcePasswordReset: true,
  };
}

export async function saveUser(user) {
  return commitMockStore((draft) => {
    const existingUser = draft.users.find((item) => item.id === user.id);
    const nextUser = {
      ...existingUser,
      ...user,
      id: user.id || createId("user", user.email || user.name || Date.now()),
      createdAt: existingUser?.createdAt ?? createTimestamp(1),
      updatedAt: new Date().toISOString(),
    };

    draft.users = upsertById(draft.users, nextUser);
    return nextUser;
  }, {
    module: "Users",
    action: user.id ? "Updated user" : "Created user",
    entityId: user.id || user.email || user.name,
    entityLabel: user.name,
  });
}

export async function deleteUser(id) {
  return commitMockStore((draft) => {
    const existingUser = draft.users.find((item) => item.id === id);
    draft.users = removeById(draft.users, id);
    return existingUser ?? null;
  }, {
    module: "Users",
    action: "Deleted user",
    entityId: id,
    entityLabel: id,
  });
}
