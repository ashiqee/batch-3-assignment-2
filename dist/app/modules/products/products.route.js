'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProductsRoutes = void 0;
const express_1 = __importDefault(require('express'));
const products_controllers_1 = require('./products.controllers');
const router = express_1.default.Router();
router.post('/', products_controllers_1.ProductsControllers.createProduct);
router.get('/', products_controllers_1.ProductsControllers.getAllProducts);
router.get(
  '/:productId',
  products_controllers_1.ProductsControllers.getSignleProduct
);
router.put(
  '/:productId',
  products_controllers_1.ProductsControllers.updateAProduct
);
router.delete(
  '/:productId',
  products_controllers_1.ProductsControllers.deleteAProduct
);
exports.ProductsRoutes = router;
