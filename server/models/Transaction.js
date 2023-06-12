import mongoose from 'mongoose';


//The purpose of creating productSchema is for the database to recognize the structure when inserting data into the MongoDB
const TransactionSchema = new mongoose.Schema
(
    {
    userId:String,
    cost:String,
    products: {
        type:[mongoose.Types.ObjectId],
        of:Number
    }
    },
    {timestamps:true}
   
);

const Transaction = mongoose.model("Transaction",TransactionSchema);
export default Transaction;