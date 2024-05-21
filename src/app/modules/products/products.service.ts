import { Products } from "./products.interface";
import { ProductsModel } from "./products.model";

const createProductsIntoDB = async (products: Products) => {
  const result = await ProductsModel.create(products);
  return result;
};

const getAllProductsFromDB = async (searchTerm: string ) => {
  

  const query = searchTerm ? {
    $or: [
      { name: { $regex: searchTerm , $options: "i" } },
      { description: { $regex: searchTerm , $options: "i" } },
      { category: { $regex: searchTerm , $options: "i" } },
      { tags: { $regex: searchTerm , $options: "i" } },
    
    ]
  } :{};


    const result = await ProductsModel.find(query);
    return result;

      
};

const getSignleProductFromDB = async (productId: string) => {
  // console.log("Service:",productId);

  const result = await ProductsModel.findOne({ _id: productId });
  return result;
};

const updateAProductIntoDB = async (updateProductData: {
  _id: string;
  data: Partial<Products>;
}) => {
  try {
    const result = await ProductsModel.findByIdAndUpdate(
      { _id: updateProductData._id },
      updateProductData.data,
      {
        new: true,
        runValidators: true,
      }
    );
   
    return result;
  } catch (err) {
    console.log(err);
  }
};


// delete a Product 

const deleteAProductFromDB = async (productId: string) => {

  try{
    const result = await ProductsModel.findByIdAndDelete(productId);
    return result
  }catch(err){
    console.log(err);
    
  }
}


//search product



export const ProductsServices = {
  createProductsIntoDB,
  getAllProductsFromDB,
  getSignleProductFromDB,
  updateAProductIntoDB,
  deleteAProductFromDB,
  
};
