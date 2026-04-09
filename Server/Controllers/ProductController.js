import ProductSchema from "../Models/Products.js"
export const RegisterProduct = async(req,res)=>{
    const image = req.file.filename
    console.log(image)
    if (!image) {
        return res.status(400).json({ message: 'No file uploaded' })
    }
    const{name,price,description,category} = req.body
    const newProduct = await ProductSchema.create({
        name,
        price,
        description,
        category,
        image
    })
    await newProduct.save()
    res.status(201).json(newProduct)
}
export const GetProductById = async(req,res)=>{
    try {
        const product = await ProductSchema.findById(req.params.id)
        res.status(200).json(product)

    } catch (error) {
        res.status(404).json({ message: 'Product not found' })
    }
}
export const GetAllProducts = async(req,res)=>{
    try {
        const products = await ProductSchema.find()
        res.status(200).json(products)
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products' })
    }
}
export const DeleteProduct = async(req,res)=>{
    try {
        await ProductSchema.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'Product deleted successfully' })
    } catch (error) {
        res.status(404).json({ message: 'Product not found' })
    }
}
export const DeleteAllProducts = async(req,res)=>{
    try{
        await ProductSchema.deleteMany()
        res.status(200).json({ message: 'All products deleted successfully' })
    }
    catch(error){
        res.status(500).json({ message: 'Error deleting products' })
    }
}
export const UpdateProduct = async(req,res)=>{
    try {
        const updatedProduct = await ProductSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(404).json({ message: 'Product not found' })
    }
}