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
export const GetAllProducts = async (req, res) => {
    try {
        // 1. Destructure and parse query parameters with defaults
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // 2. Calculate the number of documents to skip
        // Formula: (page - 1) * limit
        const skip = (page - 1) * limit;

        // 3. Execute query with pagination and get total count for metadata
        const [products, totalProducts] = await Promise.all([
            ProductSchema.find().skip(skip).limit(limit),
            ProductSchema.countDocuments()
        ]);

        // 4. Return data along with pagination metadata
        res.status(200).json({
            success: true,
            count: products.length,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: page,
            totalProducts,
            data: products
        });
        
    } catch (err) {
        res.status(500).json({ 
            success: false,
            message: 'Error fetching products', 
            error: err.message 
        });
    }
};
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