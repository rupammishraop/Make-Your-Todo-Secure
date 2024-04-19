import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        // console.log("process cheakc ", process.env.MONGODB_URI);
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDB Connect !! DB Host ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("error happen while connecting with mongodb database", error);
        process.exit(1); // terminate the node app if there is an error in db connection
    }
}
export default connectDB