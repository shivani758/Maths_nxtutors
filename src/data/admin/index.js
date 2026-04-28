import { citySeeds, localitySeeds } from "./locationsSeed";
import { cloneValue, createTimestamp } from "./seedUtils";
import { dashboardActivitySeeds, mediaSeeds, userSeeds } from "./mediaUsersSeed";
import { blogSeeds, faqSeeds, pageSeeds } from "./pagesSeed";
import { resultSeeds, reviewSeeds } from "./reviewsSeed";
import { settingsSeed } from "./settingsSeed";
import { tutorProfileSeeds, tutorSeeds } from "./tutorsSeed";

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
