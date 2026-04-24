import { createApp } from "./app.js";
import { connectDatabase } from "./config/db.js";

async function start() {
  await connectDatabase();

  const app = createApp();
  const PORT = Number(process.env.PORT) || 10000;

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Maths Bodhi backend running on port ${PORT}`);
  });
}

start().catch((error) => {
  console.error("Failed to start Maths Bodhi backend.", error);
  process.exit(1);
});
