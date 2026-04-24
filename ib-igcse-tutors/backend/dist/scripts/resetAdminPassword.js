import { connectDatabase, disconnectDatabase } from "../config/db.js";
import { UserModel } from "../models/User.js";
import { hashPassword } from "../utils/password.js";
const ADMIN_EMAIL = "admin@mathsbodhi.in";
const NEXT_PASSWORD = "Admin@12345";
async function resetAdminPassword() {
    // Development-only helper. Replace with a secure admin workflow in production.
    await connectDatabase();
    const user = await UserModel.findOne({ email: ADMIN_EMAIL.toLowerCase() });
    if (!user) {
        throw new Error(`Seeded admin user not found for ${ADMIN_EMAIL}.`);
    }
    user.passwordHash = await hashPassword(NEXT_PASSWORD);
    await user.save();
    console.log(`Development admin password reset complete for ${ADMIN_EMAIL}. New password: ${NEXT_PASSWORD}`);
}
resetAdminPassword()
    .catch((error) => {
    console.error("Failed to reset the development admin password.", error);
    process.exitCode = 1;
})
    .finally(async () => {
    await disconnectDatabase();
});
//# sourceMappingURL=resetAdminPassword.js.map