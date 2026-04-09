import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import colors from 'colors'
import route from './Routes/UserRoute.js';
import Productroute from './Routes/ProductRoutes.js';
import { Dbconnection } from "./Config/Dbconnection.js";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json())
app.use(cors())
app.use('/api/user', route)
app.use('/api/product',Productroute)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.listen(process.env.ServerPort, () => {
    console.log(`Server runnig at port ${process.env.ServerPort}`.bgBlue.white);

})
Dbconnection()