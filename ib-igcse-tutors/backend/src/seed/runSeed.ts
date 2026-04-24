import { connectDatabase, disconnectDatabase } from "../config/db.js";
import { env } from "../config/env.js";
import { ensureSeedAdmin } from "../services/authService.js";
import { importFrontendSeeds } from "./importFrontendSeeds.js";

async function runSeed() {
  await connectDatabase();

  const frontendSeedModulePath = "../../../frontend/src/data/admin/index.js";
  const { createInitialAdminStore } = (await import(frontendSeedModulePath)) as {
    createInitialAdminStore: () => {
      tutors: Array<Record<string, any>>;
      tutorProfiles: Array<Record<string, any>>;
      blogs: Array<Record<string, any>>;
      reviews: Array<Record<string, any>>;
      results: Array<Record<string, any>>;
      pages: Array<Record<string, any>>;
      faqs: Array<Record<string, any>>;
    };
  };
  const seedStore = createInitialAdminStore();

  await ensureSeedAdmin({
    name: env.ADMIN_SEED_NAME,
    email: env.ADMIN_SEED_EMAIL,
    password: env.ADMIN_SEED_PASSWORD,
    role: "super_admin",
  });

  await importFrontendSeeds(seedStore);

  console.log("Maths Bodhi seed completed successfully.");
  console.log(
    JSON.stringify(
      {
        tutors: seedStore.tutors.length,
        blogs: seedStore.blogs.length,
        reviews: seedStore.reviews.length,
        results: seedStore.results.length,
        pages: seedStore.pages.length,
        adminEmail: env.ADMIN_SEED_EMAIL,
      },
      null,
      2,
    ),
  );
}

runSeed()
  .catch((error) => {
    console.error("Failed to seed Maths Bodhi backend.", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDatabase();
  });
