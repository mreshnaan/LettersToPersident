import mongoose from 'mongoose';
import { ServerConfig } from '../helper/config';
export async function dbConnection() {
    try {

        await mongoose.connect(ServerConfig.db, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database Connected");
    } catch (error) {
        console.log("Database connection error", error);
    }
}