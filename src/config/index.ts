import dotenv from 'dotenv';
dotenv.config();

export const config = {
  API_PORT: process.env.API_PORT,

  DB_URI:
    String(process.env.NODE_ENV) === 'prod'
      ? String(process.env.DB_URI_PROD)
      : String(process.env.DB_URI_DEV),
  DB_SYNC: String(process.env.NODE_ENV) === 'prod' ? false : true,

  SUPER_ADMIN_USERNAME: process.env.SUPER_ADMIN_USERNAME,
  SUPER_ADMIN_LOGIN: process.env.SUPER_ADMIN_LOGIN,
  SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD,
  SUPER_ADMIN_PHONE_NUMBER: process.env.SUPER_ADMIN_PHONE_NUMBER,
};
