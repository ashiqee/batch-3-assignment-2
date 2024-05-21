import express from "express";
import { ProductsControllers } from './products.controller';

const router = express.Router();


router.post('/', ProductsControllers.createProduct);
router.get('/', ProductsControllers.getAllProducts);
router.get('/:productId', ProductsControllers.getSignleProduct);
router.put('/:productId', ProductsControllers.updateAProduct);
router.delete('/:productId', ProductsControllers.deleteAProduct);




export const ProductsRoutes = router;