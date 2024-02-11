import env from "./utils/validateEnv";
import mongoose from "mongoose";
import app from "./app";

const PORT = env.PORT;



mongoose.connect(env.MONGO_URL).then(() => {
    console.log("database connected")
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`)
    })
}).catch((err) => {
    console.error(err)
})