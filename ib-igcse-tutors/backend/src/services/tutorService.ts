import { TutorModel } from "../models/Tutor.js";
import { ApiError } from "../utils/ApiError.js";
import { slugify } from "../utils/slug.js";
import { createFieldErrorDetails } from "../utils/validationDetails.js";

type TutorPayload = {
  name?: string;
  slug?: string;
  title?: string;
  shortBio?: string;
  fullBio?: string;
  teachingStyle?: string;
  boards?: string[];
  classesSupported?: string[];
  topics?: string[];
  cities?: string[];
  localities?: string[];
  serviceModes?: string[];
  experienceYears?: number;
  experienceLabel?: string;
  rating?: number;
  startingFee?: string;
  featured?: boolean;
  featuredInHome?: boolean;
  status?: "active" | "inactive";
  image?: string;
  imageAlt?: string;
  seo?: Record<string, unknown>;
  qualifications?: string[];
  achievements?: string[];
  badges?: string[];
  schoolFocus?: string[];
  availability?: string;
  availabilityStatus?: "available" | "limited" | "waitlist";
  displayOrder?: number;
  linkedReviewIds?: string[];
  linkedResultIds?: string[];
  featuredOn?: string[];
};

function unique(values: string[] = []) {
  return [...new Set(values.filter(Boolean))];
}

function getExperienceYears(experienceYears = 0, experienceLabel = "") {
  if (experienceYears > 0) {
    return experienceYears;
  }

  const match = experienceLabel.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function getExperienceLabel(experienceYears = 0, experienceLabel = "") {
  if (experienceLabel.trim()) {
    return experienceLabel.trim();
  }

  return experienceYears > 0 ? `${experienceYears} years` : "";
}

function serializeTutor(doc: any) {
  const experienceYears = getExperienceYears(doc.experienceYears, doc.experienceLabel);
  const experience = getExperienceLabel(experienceYears, doc.experienceLabel);

  return {
    id: doc._id.toString(),
    sourceId: doc.sourceId ?? "",
    name: doc.name,
    slug: doc.slug,
    title: doc.title,
    shortBio: doc.shortBio ?? "",
    fullBio: doc.fullBio ?? "",
    teachingStyle: doc.teachingStyle ?? "",
    boards: doc.boards ?? [],
    classesSupported: doc.classesSupported ?? [],
    topics: doc.topics ?? [],
    cities: doc.cities ?? [],
    localities: doc.localities ?? [],
    serviceModes: doc.serviceModes ?? [],
    experienceYears,
    experienceLabel: experience,
    experience,
    rating: doc.rating ?? 0,
    startingFee: doc.startingFee ?? "",
    featured: Boolean(doc.featured),
    featuredInHome: Boolean(doc.featuredInHome),
    status: doc.status,
    image: doc.image ?? "",
    imageAlt: doc.imageAlt ?? "",
    seo: doc.seo ?? {},
    qualifications: doc.qualifications ?? [],
    achievements: doc.achievements ?? [],
    badges: doc.badges ?? [],
    schoolFocus: doc.schoolFocus ?? [],
    availability: doc.availability ?? "",
    availabilityStatus: doc.availabilityStatus ?? "available",
    displayOrder: doc.displayOrder ?? 99,
    linkedReviewIds: doc.linkedReviewIds ?? [],
    linkedResultIds: doc.linkedResultIds ?? [],
    featuredOn: doc.featuredOn ?? [],
    summary: doc.shortBio ?? "",
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

async function ensureUniqueSlug(slug: string, excludeId?: string) {
  const existing = await TutorModel.findOne({
    slug,
    ...(excludeId ? { _id: { $ne: excludeId } } : {}),
  }).exec();

  if (existing) {
    throw new ApiError(409, "A tutor with this slug already exists.", {
      code: "DUPLICATE_TUTOR_SLUG",
      details: createFieldErrorDetails("slug", "A tutor with this slug already exists."),
    });
  }
}

export async function listTutors() {
  const tutors = await TutorModel.find().sort({ displayOrder: 1, name: 1 }).exec();
  return tutors.map((doc) => serializeTutor(doc));
}

export async function getTutorById(id: string) {
  const tutor = await TutorModel.findById(id).exec();

  if (!tutor) {
    throw new ApiError(404, "Tutor not found.", { code: "TUTOR_NOT_FOUND" });
  }

  return serializeTutor(tutor);
}

export async function getPublicTutors() {
  const tutors = await TutorModel.find({ status: "active" }).sort({ displayOrder: 1, name: 1 }).exec();
  return tutors.map((doc) => serializeTutor(doc));
}

export async function createTutor(payload: TutorPayload) {
  const slug = slugify(payload.slug || payload.name || "");
  await ensureUniqueSlug(slug);
  const experienceYears = getExperienceYears(payload.experienceYears, payload.experienceLabel);
  const tutor = await TutorModel.create({
    ...payload,
    slug,
    experienceYears,
    experienceLabel: getExperienceLabel(experienceYears, payload.experienceLabel),
    boards: unique(payload.boards),
    classesSupported: unique(payload.classesSupported),
    topics: unique(payload.topics),
    cities: unique(payload.cities),
    localities: unique(payload.localities),
    serviceModes: unique(payload.serviceModes),
    qualifications: unique(payload.qualifications),
    achievements: unique(payload.achievements),
    badges: unique(payload.badges),
    schoolFocus: unique(payload.schoolFocus),
    linkedReviewIds: unique(payload.linkedReviewIds),
    linkedResultIds: unique(payload.linkedResultIds),
    featuredOn: unique(payload.featuredOn),
  });

  return serializeTutor(tutor);
}

export async function updateTutor(id: string, payload: TutorPayload) {
  const tutor = await TutorModel.findById(id).exec();

  if (!tutor) {
    throw new ApiError(404, "Tutor not found.", { code: "TUTOR_NOT_FOUND" });
  }

  const slug = slugify(payload.slug || tutor.slug || payload.name || tutor.name);
  await ensureUniqueSlug(slug, id);
  const experienceYears = getExperienceYears(
    payload.experienceYears ?? tutor.experienceYears,
    payload.experienceLabel ?? tutor.experienceLabel,
  );

  Object.assign(tutor, {
    ...payload,
    slug,
    experienceYears,
    experienceLabel: getExperienceLabel(experienceYears, payload.experienceLabel ?? tutor.experienceLabel),
    boards: payload.boards ? unique(payload.boards) : tutor.boards,
    classesSupported: payload.classesSupported ? unique(payload.classesSupported) : tutor.classesSupported,
    topics: payload.topics ? unique(payload.topics) : tutor.topics,
    cities: payload.cities ? unique(payload.cities) : tutor.cities,
    localities: payload.localities ? unique(payload.localities) : tutor.localities,
    serviceModes: payload.serviceModes ? unique(payload.serviceModes) : tutor.serviceModes,
    qualifications: payload.qualifications ? unique(payload.qualifications) : tutor.qualifications,
    achievements: payload.achievements ? unique(payload.achievements) : tutor.achievements,
    badges: payload.badges ? unique(payload.badges) : tutor.badges,
    schoolFocus: payload.schoolFocus ? unique(payload.schoolFocus) : tutor.schoolFocus,
    linkedReviewIds: payload.linkedReviewIds ? unique(payload.linkedReviewIds) : tutor.linkedReviewIds,
    linkedResultIds: payload.linkedResultIds ? unique(payload.linkedResultIds) : tutor.linkedResultIds,
    featuredOn: payload.featuredOn ? unique(payload.featuredOn) : tutor.featuredOn,
  });

  await tutor.save();
  return serializeTutor(tutor);
}

export async function deleteTutor(id: string) {
  const tutor = await TutorModel.findByIdAndDelete(id).exec();

  if (!tutor) {
    throw new ApiError(404, "Tutor not found.", { code: "TUTOR_NOT_FOUND" });
  }

  return serializeTutor(tutor);
}
