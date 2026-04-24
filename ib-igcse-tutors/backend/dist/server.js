import { createApp } from "./app.js";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";
async function start() {
    await connectDatabase();
    const app = createApp();
    app.listen(env.PORT, env.HOST, () => {
        console.log(`Maths Bodhi backend listening on http://${env.HOST}:${env.PORT}`);
    });
}
start().catch((error) => {
    console.error("Failed to start Maths Bodhi backend.", error);
    process.exit(1);
});
//# sourceMappingURL=server.js.map