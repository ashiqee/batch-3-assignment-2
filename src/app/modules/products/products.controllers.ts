import { Request, Response } from "express";
import { ProductsServices } from "./products.service";
import { productValidationSchema } from "./product.validation";
import { z } from "zod";

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    
    //validation create product
const parsedProduct = productValidationSchema.parse(product)

    const result = await ProductsServices.createProductsIntoDB(parsedProduct);

    res.status(200).json({
      success: true,
      message: "Product created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "can't not Product created!",
      error: err,
    });
  }
};

//get all products with search

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm  } = req.query;
    const result = await ProductsServices.getAllProductsFromDB(searchTerm  as string);
       
    if(result.length === 0){
      return res.status(404).json({
        success: false,
        message: `${searchTerm} Product not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Product ${searchTerm ? "searched" : "fetched"} successfully`,
      data: result,})
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not fetch All Products!",
      error: err,
    });
  }
};

//get single Product
const getSignleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductsServices.getSignleProductFromDB(productId);

    if(!result){
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Could not fetch Product!",
      error: err,
    });
  }
};

//update product

const updateAProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = req.body;

    const updateProductData = {
      _id: productId,
      data: product,
    };
    

    const result = await ProductsServices.updateAProductIntoDB(
      updateProductData
    );

    if(!result){
      return res.status(404).json({
        success: false,
        message: "Product not found",
        
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: result,
    });
  } catch (err: any) {
   if(err instanceof z.ZodError){
   
    const errorMsg = err.errors.map((error)=>({
      path: error.path.join('.'),
      errorMessage: error.message,
    }))
   
    return res.status(400).json({
      success:false,
      message:"Validation error",
      errors: errorMsg,
    });
   }else{
    return res.status(500).json({
      success:false,
      message: err.message,
    })
   }
  }
};

// delete product 

const deleteAProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await ProductsServices.deleteAProductFromDB(productId);

if(!result){
  return res.status(404).json({
    success: false,
    message: "Product not found",
  });
  }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: null,
    })
  }catch(err:any){
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      data: err.message,
    })
  }
}




export const ProductsControllers = {
  createProduct,
  getAllProducts,
  getSignleProduct,
  updateAProduct,
  deleteAProduct,
  
};
