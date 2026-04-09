import mongoose from 'mongoose'
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
    ,
    price: {
        type: Number,
        required: true
    }
    ,
    description: {
        type: String,
        default: null
    }
    ,   
    image: {
        type: String,
        default:null
    },
    category: {
        type: String,
        required: true
    }
}, { timestamps: true })

const ProductModel = mongoose.model('Products', ProductSchema)
export default ProductModel