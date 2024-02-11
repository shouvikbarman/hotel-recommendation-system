import { cleanEnv, str, port } from 'envalid'

const env = cleanEnv(process.env, {
    MONGO_URL: str(),
    PORT: port(),
})

export default env