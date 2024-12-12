import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";
dotenv.config();
export default defineConfig({
  out: "./src/lib/db/migrations",
  schema: "./src/lib/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL as string,
  },
});
