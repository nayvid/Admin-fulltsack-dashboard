import Product from "../models/Product.js"
import ProductStat from "../models/ProductStat.js"
import Transaction from "../models/Transaction.js";
import User from "../models/User.js"
import getCountryIso3 from "country-iso-2-to-3"

export const getProducts = async (req, res) => {
    try {
      const products = await Product.find();
  
      const productsWithStats = await Promise.all(
        products.map(async (product) => {
          const stat = await ProductStat.find({
            productId: product._id,
          });
          return {
            ...product._doc,
            stat,
          };
        })
      );
      res.status(200).json(productsWithStats);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  //we write a controller statement to fetch the information of the customers
  export const getCustomers = async(req,res) => {
    try {
      const customers = await User.find({role:"user"}).select("-password")
      res.status(200).json(customers);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

//write controller function to fetch and display the transaction details
  export const getTransactions = async(req,res) =>
  {
    try 
    {
      //first we have to do sorting
      //the value are require to sort as such (field, userId, sort,desc)
      const {page=1,pageSize=20,sort=null,search=""} =req.query;
      
      //the formatted sort should look like this {userid: -1}
      const generateSort = () => 
      {
        const sortParsed = JSON.parse(sort);
        const sortFormatted = 
        {
          [sortParsed.field]: (sortParsed.sort="asc"?1:-1),
        };

        return sortFormatted;

        };
        const sortFormatted=Boolean(sort) ? generateSort(): {};

        const transactions= await Transaction.find({
          $or: [
            {cost:{$regex:new RegExp(search,"i") } },
            {userId:{$regex:new RegExp(search,"i") } },
          ],
        })
        .sort(sortFormatted)
        .skip(page*pageSize)
        .limit(pageSize);

        const total= await Transaction.countDocuments
        ({
          name: {$regex:search,$options:"i"},
        });


        res.status(200).json
        ({
          transactions,
          total,
        });
    }
    catch (error)
    {
      res.status(404).json({message:error.message});
    }
  }

  //1.create a function to retrieve the location
  //2.format the geography based on user location
  export const getGeography = async (req,res) => {
    try 
    {
      //3.create a users variable to temporarily store the users location 
      const users = await User.find();

      //create a variable to store the location by each map
      const mappedLocations = users.reduce((acc,{country}) =>
      {
        const countryISO3 =getCountryIso3(country);
        if(!acc[countryISO3]) {
          acc[countryISO3] = 0;
        }
        acc[countryISO3]++;
        return acc;
      },{});
    const formattedLocations=Object.entries(mappedLocations).map(
      ([country,count]) => {
        return {id: country,value:count};
      }
    );

    res.status(200).json(formattedLocations);
    }
    catch
    {
      res.status(404).json({message:error.message})
    }
  };
  