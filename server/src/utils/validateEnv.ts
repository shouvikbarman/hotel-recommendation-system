import { cleanEnv, str, port } from 'envalid'

const env = cleanEnv(process.env, {
    MONGO_URL: str(),
    PORT: port(),
    SESSION_SECRET: str(),
})

export default env