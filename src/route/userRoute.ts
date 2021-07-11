import express from "express";
const router = express.Router();
import controller from '../controller/userController';


router.get('/', controller.getAllusers);
router.get('/:id', controller.findUserById);
router.post('/', controller.addUser);


export default router

