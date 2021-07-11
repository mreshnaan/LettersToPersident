import express from "express";
const router = express.Router();
import controller from '../controller/postController';


router.get('/', controller.getAllPost);
router.get('/', controller.getPostById);
router.post('/:userID/:postID', controller.addPost);


export default router

