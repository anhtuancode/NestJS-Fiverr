import "dotenv/config"

export const PORT = process.env.PORT
export const DATABASE_URL = process.env.DATABASE_URL

export const ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

export const REFRESH_TOKEN_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

export const CLOUD_NAME = process.env.CLOUD_NAME   
export const CLOUD_API_KEY = process.env.CLOUD_API_KEY
export const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET

console.log({
    PORT,
    DATABASE_URL,
    ACCESS_TOKEN_EXPIRES,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRES,
    REFRESH_TOKEN_SECRET,
    CLOUD_NAME,
    CLOUD_API_KEY,
    CLOUD_API_SECRET
})