import { createApp } from "./app.js";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";

async function start() {
  await connectDatabase();

  const app = createApp();
 const PORT = process.env.PORT || env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Maths Bodhi backend running on port ${PORT}`);
});
}

start().catch((error) => {
  console.error("Failed to start Maths Bodhi backend.", error);
  process.exit(1);
});
