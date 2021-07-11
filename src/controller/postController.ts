import { Request, Response, NextFunction } from 'express';
import model from "../model/postModel";
import userModel from '../model/userModel';
import { responseHandler, errorResponseHandler } from '../helper/customeHandler'
import * as moment from 'moment'


async function getAllPost(_: Request, res: Response, __: NextFunction) {
    try {

        let data = await model.find({});
        return responseHandler(res, "Success", 201, JSON.parse(JSON.stringify({ data })), "Post Data Successfuly Retrieve")

    } catch (error) {

        return errorResponseHandler(res, "Fail", 201, JSON.parse(JSON.stringify({})), "Opps something went wrong in Post Data ")

    }

}
async function getPostById(req: Request, res: Response, __: NextFunction) {
    try {
        let id = req.params.id
        let post = await model.findById(id);
        if (!post) {
            return errorResponseHandler(res, "Fail", 400, JSON.parse(JSON.stringify({})), "Post Data Does Not Exists ")
        }
        return responseHandler(res, "Success", 201, JSON.parse(JSON.stringify({ post })), "Post Data Successfuly Retrieve")

    } catch (error) {

        return errorResponseHandler(res, "Fail", 400, JSON.parse(JSON.stringify({})), "Opps something went wrong in Get Post By Id ")

    }

}

async function addPost(req: Request, res: Response, __: NextFunction) {
    try {
        const { userID, postID } = req.params;
        // check user exist 
        const user = await userModel.findOne({ facebookID: userID });
        if (!user) {
            //if user not exits throw error
            return errorResponseHandler(res, "Fail", 400, JSON.parse(JSON.stringify({})), "user not exists ");

        }
        //if user exist 
        // check post exits 
        const post = await model.findOne({ postID })
        //if post exist then check if the post duration with current time example : 1 month
        // if post not exists 
        if (!post) {
            return errorResponseHandler(res, "Fail", 400, JSON.parse(JSON.stringify({})), "Post not exists ");

        }
        //user can add post
        // Find the duration between two dates
        const currentDate = moment.now();
        const postDate = moment.now();
        // if postDate will always be in past, use currDate as the base to diff, 
        // Months
        const result = currentDate.diff(postDate, 'months');
        // check if the post has been passed a month within the current time
        if (!result > 1) {
            console.log("user post limit has been exceeded")
            return errorResponseHandler(res, "Fail", 401, JSON.parse(JSON.stringify({})), "user post limit has been exceed");
        }

        let data = new model({
            title: req.body.title,
            note: req.body.note,
            isPublic: true,
            user: userID


        }).save();
        
        return responseHandler(res, "Success", 201, JSON.parse(JSON.stringify({ data })), " Post Data  Successfuly Inserted")

    } catch (error) {

        return errorResponseHandler(res, "Fail", 400, JSON.parse(JSON.stringify({})), "Opps something went wrong ")

    }



}

export = {
    getAllPost,
    addPost,
    getPostById,
}

// a user can add a per month mean user add a 1 post per month 
// check user exist 
//if user exist then check post exits 
//if post exist then check if the post has passed a month with the current time