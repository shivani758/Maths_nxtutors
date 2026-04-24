import bcrypt from "bcryptjs";
const SALT_ROUNDS = 12;
export async function hashPassword(value) {
    return bcrypt.hash(value, SALT_ROUNDS);
}
export async function verifyPassword(value, hashedValue) {
    return bcrypt.compare(value, hashedValue);
}
//# sourceMappingURL=password.js.map