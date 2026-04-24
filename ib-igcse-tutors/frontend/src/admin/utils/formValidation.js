export function getErrorMessage(error, fallbackMessage) {
  return error instanceof Error && error.message ? error.message : fallbackMessage;
}

export function slugifyValue(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getValidationErrors(error) {
  const details = error?.details;

  if (!details || typeof details !== "object") {
    return {};
  }

  if (details.fieldErrors && typeof details.fieldErrors === "object") {
    return details.fieldErrors;
  }

  return {};
}

export function getFormErrorMessage(error, fallbackMessage) {
  const details = error?.details;

  if (details && typeof details === "object" && Array.isArray(details.formErrors) && details.formErrors[0]) {
    return details.formErrors[0];
  }

  return getErrorMessage(error, fallbackMessage);
}

export function getFieldError(errors, fieldName) {
  const value = errors?.[fieldName];

  if (Array.isArray(value) && value[0]) {
    return value[0];
  }

  return "";
}
