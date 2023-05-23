import User from "../models/User.js";

//We need to call the id from the route into controller
//Fetch the information from the id's parameters and return the API status, if not found then error message will be
//displayed
export const getUser = async (req,res) =>
{
    try 
    {
      const {id} = req.params;
      const user = await User.findById(id);
      res.status(200).json(user);  

    } catch (error)
    {
        res.status(404).json({message:error.message});
    }
}