import express from 'express';
import { RegisterUser, LoginUser, Getallusers, GetUserById, DeleteUserById, DeleteAllUsers } from "../Controllers/AuthController.js"
import { VerifyToken } from '../Middleware/Validator.js';
const route = express.Router();
route.post('/register', RegisterUser);
route.post('/login', LoginUser);
route.get('/getallusers',VerifyToken, Getallusers)
route.get('/getuserbyid/:id',VerifyToken, GetUserById)
route.delete('/deleteuser/:id',VerifyToken, DeleteUserById)
route.delete('/deleteallusers',VerifyToken, DeleteAllUsers)
export default route;