import { z } from 'zod';
import { productValidationSchema } from './product.validation';
import { Products } from './products.interface';
import { ProductsModel } from './products.model';

const createProductsIntoDB = async (products: Products) => {
  const result = await ProductsModel.create(products);
  return result;
};

const getAllProductsFromDB = async (searchTerm: string) => {
  const query = searchTerm
    ? {
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } },
          { tags: { $regex: searchTerm, $options: 'i' } },
        ],
      }
    : {};

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
    //validation update product
    const parsedProduct = productValidationSchema.parse(updateProductData.data);

    const result = await ProductsModel.findByIdAndUpdate(
      { _id: updateProductData._id },
      parsedProduct,
      {
        new: true,
        runValidators: true,
      }
    );

    return result;
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      throw err;
    } else {
      throw new Error(err.message);
    }
  }
};

// delete a Product

const deleteAProductFromDB = async (productId: string) => {
  try {
    const result = await ProductsModel.findByIdAndDelete(productId);
    return result;
  } catch (err: unknown) {
    throw new Error(err);
  }
};

// product inventory update

const orderInventoryUpdateInDB = async (
  productId: string,
  orderQuantity: number
) => {
  const product = await ProductsModel.findById(productId);

  if (!product) {
    throw new Error('Product not found');
  }

  // check quantity
  if (product.inventory.quantity < orderQuantity) {
    return false;
  }

  // update stock
  product.inventory.quantity -= orderQuantity;
  product.inventory.inStock = product.inventory.quantity > 0;

  await product.save();
  return product;
};

export const ProductsServices = {
  createProductsIntoDB,
  getAllProductsFromDB,
  getSignleProductFromDB,
  updateAProductIntoDB,
  deleteAProductFromDB,
  orderInventoryUpdateInDB,
};
