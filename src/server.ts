import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { responseHandler, errorResponseHandler } from '../src/helper/customeHandler'
import { ServerConfig } from './helper/config';

//connect to database
import { dbConnection } from './utils/dbConnection';
dbConnection();

const app = express();

app.use(express.json());

app.use(cors());
//import routes
import userRoute from "./route/userRoute"
import postRoute from "./route/postsRoute"


const apiPrefix = "/api/v1/";
app.use(`${apiPrefix}user`, userRoute);
app.use(`${apiPrefix}post`, postRoute);


app.get('', (_: Request, res: Response, __: NextFunction) => {

    try {
        responseHandler(res, "Success", 201, JSON.parse(JSON.stringify({ data: "hellow" })), "demo route Works Sucessully ")
    } catch (error) {
        errorResponseHandler(res, "Faile", 201, JSON.parse(JSON.stringify({})), "Opps,something went wront in demo route")
    }
})

app.listen(ServerConfig.port, () => console.log(`${ServerConfig.hostname}:${ServerConfig.port}`));