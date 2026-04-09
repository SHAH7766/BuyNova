import express from 'express';
import { RegisterUser, LoginUser, Getallusers, GetUserById, DeleteUserById, DeleteAllUsers } from "../Controllers/AuthController.js"
const route = express.Router();
route.post('/register', RegisterUser);
route.post('/login', LoginUser);
route.get('/getallusers', Getallusers)
route.get('/getuserbyid/:id', GetUserById)
route.delete('/deleteuser/:id', DeleteUserById)
route.delete('/deleteallusers', DeleteAllUsers)
export default route;