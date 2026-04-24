import type mongoose from "mongoose";
import type { ZodError } from "zod";

export type ValidationDetails = {
  fieldErrors: Record<string, string[]>;
  formErrors: string[];
};

function createValidationDetails(): ValidationDetails {
  return {
    fieldErrors: {},
    formErrors: [],
  };
}

function pushFieldError(details: ValidationDetails, field: string, message: string) {
  if (!field) {
    details.formErrors.push(message);
    return;
  }

  if (!details.fieldErrors[field]) {
    details.fieldErrors[field] = [];
  }

  details.fieldErrors[field].push(message);
}

export function createFieldErrorDetails(field: string, message: string): ValidationDetails {
  const details = createValidationDetails();
  pushFieldError(details, field, message);
  return details;
}

export function createFormErrorDetails(message: string): ValidationDetails {
  const details = createValidationDetails();
  details.formErrors.push(message);
  return details;
}

export function zodErrorToDetails(error: ZodError): ValidationDetails {
  const details = createValidationDetails();

  for (const issue of error.issues) {
    const field = issue.path.join(".");
    pushFieldError(details, field, issue.message);
  }

  return details;
}

export function mongooseValidationErrorToDetails(
  error: mongoose.Error.ValidationError,
): ValidationDetails {
  const details = createValidationDetails();

  for (const issue of Object.values(error.errors)) {
    pushFieldError(details, issue.path, issue.message);
  }

  return details;
}
