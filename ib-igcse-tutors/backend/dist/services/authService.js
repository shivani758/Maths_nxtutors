import { UserModel } from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
function toSessionUser(user) {
    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
    };
}
export async function authenticateAdmin(identifier, password) {
    const normalizedIdentifier = identifier.trim().toLowerCase();
    const user = await UserModel.findOne({
        $or: [{ email: normalizedIdentifier }, { name: new RegExp(`^${normalizedIdentifier}$`, "i") }],
    }).exec();
    if (!user || !user.active) {
        throw new ApiError(401, "Invalid email or password.", { code: "INVALID_CREDENTIALS" });
    }
    const isValidPassword = await verifyPassword(password, user.passwordHash);
    if (!isValidPassword) {
        throw new ApiError(401, "Invalid email or password.", { code: "INVALID_CREDENTIALS" });
    }
    user.lastLoginAt = new Date();
    await user.save();
    return toSessionUser(user);
}
export async function getUserSessionById(userId) {
    const user = await UserModel.findById(userId).exec();
    if (!user || !user.active) {
        return null;
    }
    return toSessionUser(user);
}
export async function ensureSeedAdmin(input) {
    const normalizedEmail = input.email.trim().toLowerCase();
    const existing = await UserModel.findOne({ email: normalizedEmail }).exec();
    if (existing) {
        return existing;
    }
    const passwordHash = await hashPassword(input.password);
    return UserModel.create({
        name: input.name,
        email: normalizedEmail,
        passwordHash,
        role: input.role ?? "super_admin",
        active: true,
    });
}
//# sourceMappingURL=authService.js.map