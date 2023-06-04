import mongoose from 'mongoose';


//The purpose of creating productSchema is for the database to recognize the structure when inserting data into the MongoDB
const ProductStatSchema = new mongoose.Schema
(
    {
    productId:String,
    yearlySalesTotal:Number,
    yearTotalSoldUnits:Number,
    year:Number,
    monthlyData: [
        {
            month:String,
            totalSales:Number,
            totalUnits:Number
        }
    ],
    dailyData: {
        date:String,
        totalSales:Number,
        totalUnits:Number
    }
    },
    {timestamps:true}
   
);

const ProductStat = mongoose.model("ProductStat",ProductStatSchema);
export default ProductStat;