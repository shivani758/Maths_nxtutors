export function getTutorProfilePath(tutorOrSlug, fallbackId) {
  if (typeof tutorOrSlug === "string") {
    return tutorOrSlug ? `/tutors/${tutorOrSlug}` : fallbackId ? `/tutor/${fallbackId}` : "/subjects/maths";
  }

  if (tutorOrSlug?.slug) {
    return `/tutors/${tutorOrSlug.slug}`;
  }

  if (tutorOrSlug?.id ?? fallbackId) {
    return `/tutor/${tutorOrSlug?.id ?? fallbackId}`;
  }

  return "/subjects/maths";
}
