import { connectDatabase, disconnectDatabase } from "../config/db.js";
import { env } from "../config/env.js";
import { ensureSeedAdmin } from "../services/authService.js";
function createEmptySeedStore() {
    return {
        tutors: [],
        tutorProfiles: [],
        blogs: [],
        reviews: [],
        results: [],
        pages: [],
        faqs: [],
    };
}
async function runSeed() {
    await connectDatabase();
    const seedStore = createEmptySeedStore();
    await ensureSeedAdmin({
        name: env.ADMIN_SEED_NAME,
        email: env.ADMIN_SEED_EMAIL,
        password: env.ADMIN_SEED_PASSWORD,
        role: "super_admin",
    });
    console.log("Maths Bodhi seed completed successfully.");
    console.log(JSON.stringify({
        tutors: seedStore.tutors.length,
        blogs: seedStore.blogs.length,
        reviews: seedStore.reviews.length,
        results: seedStore.results.length,
        pages: seedStore.pages.length,
        adminEmail: env.ADMIN_SEED_EMAIL,
    }, null, 2));
}
runSeed()
    .catch((error) => {
    console.error("Failed to seed Maths Bodhi backend.", error);
    process.exitCode = 1;
})
    .finally(async () => {
    await disconnectDatabase();
});
//# sourceMappingURL=runSeed.js.map