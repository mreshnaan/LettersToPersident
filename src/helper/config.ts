import dotenv from 'dotenv';

dotenv.config()

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'http://localhost';
const SERVER_PORT = process.env.SERVER_PORT || 3000;
const SERVER_DB: any = process.env.SERVER_DB;

export const ServerConfig = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    db: SERVER_DB
}
