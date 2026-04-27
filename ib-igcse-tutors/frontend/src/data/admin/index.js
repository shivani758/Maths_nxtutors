import { dashboardActivitySeeds, mediaSeeds, userSeeds } from "./mediaUsersSeed";
import { blogSeeds, faqSeeds, pageSeeds } from "./pagesSeed";
import { resultSeeds, reviewSeeds } from "./reviewsSeed";
import { settingsSeed } from "./settingsSeed";
import { tutorProfileSeeds, tutorSeeds } from "./tutorsSeed";

function cloneValue(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

function createTimestamp(dayOffset = 0) {
  return new Date(Date.now() - dayOffset * 24 * 60 * 60 * 1000).toISOString();
}

export function createInitialAdminStore() {
  return cloneValue({
    meta: {
      version: 2,
      createdAt: createTimestamp(45),
      updatedAt: createTimestamp(0),
    },
    tutors: tutorSeeds,
    tutorProfiles: tutorProfileSeeds,
    reviews: reviewSeeds,
    results: resultSeeds,
    blogs: blogSeeds,
    pages: pageSeeds,
    faqs: faqSeeds,
    cities: citySeeds,
    localities: localitySeeds,
    media: mediaSeeds,
    users: userSeeds,
    settings: settingsSeed,
    dashboardActivity: dashboardActivitySeeds,
  });
}
