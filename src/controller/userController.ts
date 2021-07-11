import { Request, Response, NextFunction } from 'express';
import model from '../model/userModel';
import { responseHandler, errorResponseHandler } from '../helper/customeHandler'
import axios from "axios";

async function getAllusers(_: Request, res: Response, __: NextFunction) {

    try {
        let data = await model.find({});
        return responseHandler(res, "Success", 201, JSON.parse(JSON.stringify({ data })), "Get All User Data Successfuly Retrieve")

    } catch (error) {

        return errorResponseHandler(res, "Fail", 400, JSON.parse(JSON.stringify({})), "Opps something went wrong in Get Post By Id ")


    }
}
async function findUserById(req: Request, res: Response, __: NextFunction) {
    try {
        //get id in params
        let userId = req.params
        //check if the user exists in DB
        let data = await model.findById(userId);
        //user not exists throw error
        if (!data) {

            return errorResponseHandler(res, "Fail", 400, JSON.parse(JSON.stringify({})), "Opps something went wrong User Not Exists ")
        }
        return responseHandler(res, "Success", 201, JSON.parse(JSON.stringify({ data })), "Get User Data By ID Successfuly Retrieve")


    } catch (error) {
        return errorResponseHandler(res, "Fail", 400, JSON.parse(JSON.stringify({})), "Oppsts something went wrong find User By Id ")

    }

}
async function addUser(req: Request, res: Response, __: NextFunction) {
    try {
        const { accessToken, userID } = req.body;
        const fectUserData = await axios.get(`https://graph.facebook.com/v2.8/${userID}/?fields=id,name,email&access_token=${accessToken}`)

        if (!fectUserData.data.id === userID) {
            return errorResponseHandler(res, "Fail", 400, JSON.parse(JSON.stringify({})), "Oppsts something went wrong ")

        }
        //a vaild user
        //check here if the user exist DB  then login 
        const userResponse = await model.findOne({ facebookID: userID })
        if (userResponse) {
            return responseHandler(res, "Success", 201, JSON.parse(JSON.stringify({})), " User Login  Successfuly")
        }
        //or eles register and then login
        //create new user
        let data = new model({

            facebookID: fectUserData.data.id,
            name: fectUserData.data.name,
            email: fectUserData.data.email,


        }).save();

        return responseHandler(res, "Success", 201, JSON.parse(JSON.stringify({ data, accessToken })), " User Data Inserted And Login Successfuly")

    } catch (error) {
        //impersonate the user
        return errorResponseHandler(res, "Fail", 400, JSON.parse(JSON.stringify({})), "Oppsts something went wrong ")

    }

}


export = {
    getAllusers,
    findUserById,
    addUser
}