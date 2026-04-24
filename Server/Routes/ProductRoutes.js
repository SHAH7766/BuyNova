import express from 'express'
const Productroute = express.Router();
import upload from '../Middleware/Multer.js';
import { GetProductById, RegisterProduct,GetAllProducts,DeleteAllProducts,DeleteProduct,UpdateProduct } from '../Controllers/ProductController.js';
import { VerifyToken } from '../Middleware/Validator.js';
Productroute.post('/registerproduct', upload.single('image'), RegisterProduct)
Productroute.get('/getproductbyid/:id',GetProductById)
Productroute.get('/getallproducts', GetAllProducts)
Productroute.delete('/deleteproduct/:id',VerifyToken, DeleteProduct)
Productroute.delete('/deleteallproducts',VerifyToken, DeleteAllProducts)
Productroute.put('/updateproduct/:id',VerifyToken, upload.single('image'), UpdateProduct)

export default Productroute;