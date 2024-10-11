import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL || "mongodb://localhost:27017/",
  databaseName: process.env.DATABASE_NAME || "db",
  databaseUsername: process.env.DATABASE_USERNAME || "root",
  databasePassword: process.env.DATABASE_PASSWORD || "toor",
  accessTokenExpireTime: process.env.ACCESS_TOKEN_EXPIRE_TIME || "1m",
  refreshTokenExpireTime: process.env.REFRESH_TOKEN_EXPIRE_TIME || "10h",
  bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || "10"),
  tokenSecret: process.env.TOKEN_SECRET || "f53660afa7f5e596e0459346d534465d11f676787c822e8fd3c3feac47c02b0ef110eedc10776870f2f8459a8595bb7f10c739c510bb667c704503b424c73259",
};
