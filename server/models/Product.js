import mongoose from 'mongoose';


//The purpose of creating productSchema is for the database to recognize the structure when inserting data into the MongoDB
const ProductSchema = new mongoose.Schema
(
    {
    name:String,
    price:Number,
    description:String,
    category:String,
    rating:Number,
    supply:Number,
    },
    {timestamps:true}
   
);

const Product = mongoose.model("Product",ProductSchema);
export default Product;