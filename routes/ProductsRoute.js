import express from "express";
import {
    createProductsController,
    deleteProductsController,
    filterProductController,
    getProductsController,
    photoProductsController,
    relatedProductController,
    singleProductsController,
    updateProductsController
} from "../controllers/ProductController.js";
import { isadmin, requiresignin } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const routers = express.Router();

routers.post('/create-product', formidable(), createProductsController);
routers.put('/update-products/:pid', formidable(), updateProductsController);
routers.get('/get-products', getProductsController);
routers.get('/single-products/:slug', singleProductsController);
routers.get('/photo-products/:pid', photoProductsController);
routers.delete('/delete-products/:pid', deleteProductsController);

routers.post('/filter-products', filterProductController)
routers.get('/related-products/:pid/:cid', relatedProductController);







export default routers;