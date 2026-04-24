import { apiRequest } from "./apiClient";
import { refreshPublicSiteData } from "./publicSiteService";

function uniqueValues(values = []) {
  return [...new Set((values ?? []).filter(Boolean))];
}

function extractExperienceYears(value = "") {
  const match = String(value ?? "").match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function createProfileFromTutor(tutor) {
  return {
    id: tutor.profile?.id || `profile-${tutor.id || "new"}`,
    tutorId: tutor.id || "",
    longFormProfile: tutor.fullBio ?? "",
    qualifications: tutor.qualifications ?? [],
    teachingStyle: tutor.teachingStyle ?? "",
    achievements: tutor.achievements ?? [],
    associatedBoards: tutor.boards ?? [],
    associatedTags: tutor.badges ?? [],
    profileMediaIds: tutor.profile?.profileMediaIds ?? [],
    linkedFaqIds: tutor.profile?.linkedFaqIds ?? [],
    linkedStudentResultIds: tutor.linkedResultIds ?? [],
  };
}

function toTutorBundle(entity) {
  const tutor = {
    ...entity,
    experienceYears: Number(entity.experienceYears ?? extractExperienceYears(entity.experience ?? entity.experienceLabel)),
    experienceLabel: entity.experienceLabel ?? entity.experience ?? "",
    experience: entity.experience ?? entity.experienceLabel ?? "",
    summary: entity.summary ?? entity.shortBio ?? "",
  };

  return {
    tutor,
    profile: createProfileFromTutor(entity),
  };
}

function toFlatTutor(entity) {
  return {
    ...entity,
    profile: createProfileFromTutor(entity),
  };
}

function toTutorPayload(bundle) {
  const tutor = bundle.tutor;
  const profile = bundle.profile;

  return {
    name: tutor.name,
    slug: tutor.slug,
    title: tutor.title,
    shortBio: tutor.shortBio,
    fullBio: profile.longFormProfile || tutor.fullBio,
    teachingStyle: profile.teachingStyle,
    boards: uniqueValues(tutor.boards),
    classesSupported: uniqueValues(tutor.classesSupported),
    topics: uniqueValues(tutor.topics),
    cities: uniqueValues(tutor.cities?.length ? tutor.cities : ["gurugram"]),
    localities: uniqueValues(tutor.localities),
    serviceModes: uniqueValues(tutor.serviceModes),
    experienceYears: Number(tutor.experienceYears ?? extractExperienceYears(tutor.experience ?? tutor.experienceLabel)),
    experienceLabel:
      tutor.experienceLabel?.trim() ||
      tutor.experience?.trim() ||
      (Number(tutor.experienceYears ?? 0) > 0 ? `${Number(tutor.experienceYears)} years` : ""),
    rating: Number(tutor.rating ?? 4.8),
    startingFee: tutor.startingFee,
    featured: Boolean(tutor.featured),
    featuredInHome: Boolean(tutor.featuredInHome),
    status: tutor.status,
    image: tutor.image,
    imageAlt: tutor.imageAlt,
    seo: tutor.seo,
    qualifications: uniqueValues(profile.qualifications),
    achievements: uniqueValues(profile.achievements),
    badges: uniqueValues(tutor.badges),
    schoolFocus: uniqueValues(tutor.schoolFocus),
    availability: tutor.availability,
    availabilityStatus: tutor.availabilityStatus,
    displayOrder: Number(tutor.displayOrder ?? 99),
    linkedReviewIds: uniqueValues(tutor.linkedReviewIds),
    linkedResultIds: uniqueValues(tutor.linkedResultIds),
    featuredOn: uniqueValues(tutor.featuredOn),
  };
}

export async function listTutors() {
  const items = await apiRequest("/api/admin/tutors");
  return items.map((item) => toFlatTutor(item));
}

export async function getTutorById(id) {
  if (!id) {
    throw new Error("Tutor ID is required.");
  }

  const item = await apiRequest(`/api/admin/tutors/${id}`);
  return toTutorBundle(item);
}

export function createEmptyTutor() {
  return {
    tutor: {
      id: "",
      name: "",
      slug: "",
      title: "",
      shortBio: "",
      fullBio: "",
      experienceYears: 3,
      experienceLabel: "3 years",
      experience: "3 years",
      rating: 4.8,
      startingFee: "Rs 1,500 per class",
      boards: ["CBSE Maths"],
      classesSupported: ["Class 9"],
      examSupport: [],
      topics: ["Algebra"],
      localities: [],
      cities: ["gurugram"],
      serviceModes: ["Home Tuition"],
      featured: false,
      featuredInHome: false,
      status: "active",
      displayOrder: 99,
      availabilityStatus: "available",
      badges: [],
      featuredOn: [],
      boardTags: [],
      topicTags: [],
      localityTags: [],
      serviceModeTags: [],
      schoolFitTags: [],
      schoolFocus: [],
      image: "/images/hero-maths-home.svg",
      imageAlt: "Maths tutor profile image",
      summary: "",
      studentsHelped: 0,
      availability: "",
      achievements: [],
      qualifications: [],
      location: "Gurugram",
      seo: {
        title: "",
        description: "",
        canonicalUrl: "",
        keywords: [],
        ogImage: "/images/hero-maths-home.svg",
        indexable: true,
      },
      linkedReviewIds: [],
      linkedResultIds: [],
    },
    profile: {
      id: "",
      tutorId: "",
      longFormProfile: "",
      qualifications: [],
      teachingStyle: "",
      achievements: [],
      associatedBoards: [],
      associatedTags: [],
      profileMediaIds: [],
      linkedFaqIds: [],
      linkedStudentResultIds: [],
    },
  };
}

export async function saveTutorBundle(bundle) {
  const payload = toTutorPayload(bundle);
  const saved = bundle.tutor.id
    ? await apiRequest(`/api/admin/tutors/${bundle.tutor.id}`, { method: "PUT", body: payload })
    : await apiRequest("/api/admin/tutors", { method: "POST", body: payload });

  await refreshPublicSiteData().catch(() => {});
  return toTutorBundle(saved);
}

export async function deleteTutor(id) {
  const deleted = await apiRequest(`/api/admin/tutors/${id}`, { method: "DELETE" });
  await refreshPublicSiteData().catch(() => {});
  return deleted;
}

export async function toggleTutorFeatured(id) {
  const current = await apiRequest(`/api/admin/tutors/${id}`);
  const updated = await apiRequest(`/api/admin/tutors/${id}`, {
    method: "PUT",
    body: { featured: !current.featured },
  });
  await refreshPublicSiteData().catch(() => {});
  return updated;
}

export async function toggleTutorStatus(id) {
  const current = await apiRequest(`/api/admin/tutors/${id}`);
  const updated = await apiRequest(`/api/admin/tutors/${id}`, {
    method: "PUT",
    body: { status: current.status === "active" ? "inactive" : "active" },
  });
  await refreshPublicSiteData().catch(() => {});
  return updated;
}

export async function reorderTutors(ids = []) {
  const items = await Promise.all(
    ids.map((id, index) =>
      apiRequest(`/api/admin/tutors/${id}`, {
        method: "PUT",
        body: { displayOrder: index + 1 },
      }),
    ),
  );

  await refreshPublicSiteData().catch(() => {});
  return items.map((item) => toFlatTutor(item));
}
