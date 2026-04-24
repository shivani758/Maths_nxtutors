function createValidationDetails() {
    return {
        fieldErrors: {},
        formErrors: [],
    };
}
function pushFieldError(details, field, message) {
    if (!field) {
        details.formErrors.push(message);
        return;
    }
    if (!details.fieldErrors[field]) {
        details.fieldErrors[field] = [];
    }
    details.fieldErrors[field].push(message);
}
export function createFieldErrorDetails(field, message) {
    const details = createValidationDetails();
    pushFieldError(details, field, message);
    return details;
}
export function createFormErrorDetails(message) {
    const details = createValidationDetails();
    details.formErrors.push(message);
    return details;
}
export function zodErrorToDetails(error) {
    const details = createValidationDetails();
    for (const issue of error.issues) {
        const field = issue.path.join(".");
        pushFieldError(details, field, issue.message);
    }
    return details;
}
export function mongooseValidationErrorToDetails(error) {
    const details = createValidationDetails();
    for (const issue of Object.values(error.errors)) {
        pushFieldError(details, issue.path, issue.message);
    }
    return details;
}
//# sourceMappingURL=validationDetails.js.map