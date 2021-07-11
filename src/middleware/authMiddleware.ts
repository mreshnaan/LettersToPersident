// import express, { Request, Response, NextFunction } from 'express';
// import jwt from 'jwt-simple';
// import { errorResponseHandler } from "../helper/customeHandler";
// import axios from 'axios'

// interface IRequest extends Request {
//     [key: string]: any
// }




// export function facebookAuth(req: IRequest, res: express.Response, next: express.NextFunction) {
//     const { accessToken, userID } = req.body.token;
//     axios.get(`https://graph.facebook.com/v2.8/me?fields=id,name,email&access_token=${accessToken}`)
//         .then((response) => {
//             if (response.data.id === userID) {
//                 //a vaild user
//                 //check here if the user exist DB  then login or eles register and then login
                
//             }
//             //impersonate the user

//         })

// }