import { config } from "dotenv";

config({path:`.env.${process.env.NODE_ENV || "development"}.local`})

export const { PORT, MONGODB_URL,JWT_SECRET, JWT_EXPIRES_IN, CORS_ORIGIN   } = process.env