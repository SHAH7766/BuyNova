import express from 'express'
const Productroute = express.Router();
import upload from '../Middleware/Multer.js';
import { GetProductById, RegisterProduct,GetAllProducts,DeleteAllProducts,DeleteProduct,UpdateProduct } from '../Controllers/ProductController.js';
Productroute.post('/registerproduct', upload.single('image'), RegisterProduct)
Productroute.get('/getproduct/:id',GetProductById)
Productroute.get('/getallproducts', GetAllProducts)
Productroute.delete('/deleteproduct/:id', DeleteProduct)
Productroute.delete('/deleteallproducts', DeleteAllProducts)
Productroute.put('/updateproduct/:id', upload.single('image'), UpdateProduct)

export default Productroute;