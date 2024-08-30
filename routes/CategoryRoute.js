import express from 'express';
// import { isadmin, requiresignin } from '../middlewares/authMiddleware.js';
import createCategoryController, { deleteCategoryController, getCategoryController, getSingleCategoryController, updateCategoryController } from '../controllers/CategoryController.js';
import { isadmin, requiresignin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create-category', requiresignin, isadmin, createCategoryController);
router.put("/update-category/:id", requiresignin, isadmin, updateCategoryController);
router.get("/get-category", getCategoryController);
router.get("/single-category/:slug", getSingleCategoryController);
router.delete("/delete-category/:id", requiresignin, isadmin, deleteCategoryController);


export default router;