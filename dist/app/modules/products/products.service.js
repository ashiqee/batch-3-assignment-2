'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProductsServices = void 0;
const zod_1 = require('zod');
const product_validation_1 = require('./product.validation');
const products_model_1 = require('./products.model');
const createProductsIntoDB = products =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.ProductsModel.create(products);
    return result;
  });
const getAllProductsFromDB = searchTerm =>
  __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield products_model_1.ProductsModel.find(query);
    return result;
  });
const getSignleProductFromDB = productId =>
  __awaiter(void 0, void 0, void 0, function* () {
    // console.log("Service:",productId);
    const result = yield products_model_1.ProductsModel.findOne({
      _id: productId,
    });
    return result;
  });
const updateAProductIntoDB = updateProductData =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      //validation update product
      const parsedProduct = product_validation_1.productValidationSchema.parse(
        updateProductData.data
      );
      const result = yield products_model_1.ProductsModel.findByIdAndUpdate(
        { _id: updateProductData._id },
        parsedProduct,
        {
          new: true,
          runValidators: true,
        }
      );
      return result;
    } catch (err) {
      if (err instanceof zod_1.z.ZodError) {
        throw err;
      } else {
        throw new Error(err.message);
      }
    }
  });
// delete a Product
const deleteAProductFromDB = productId =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const result = yield products_model_1.ProductsModel.findByIdAndDelete(
        productId
      );
      return result;
    } catch (err) {
      console.log(err);
    }
  });
// product inventory update
const orderInventoryUpdateInDB = (productId, orderQuantity) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const product = yield products_model_1.ProductsModel.findById(productId);
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
    yield product.save();
    return product;
  });
exports.ProductsServices = {
  createProductsIntoDB,
  getAllProductsFromDB,
  getSignleProductFromDB,
  updateAProductIntoDB,
  deleteAProductFromDB,
  orderInventoryUpdateInDB,
};
