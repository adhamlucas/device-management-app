import express from 'express';
import CategoryController from './controller';
import CategoryService from './service';
import { requestValidation } from '../handlers/requestValidator';
import { createCategorySchema, deleteCategorySchema } from './schema';

const router = express.Router();

const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService);

router.get('/', categoryController.getAllCategories);
router.post('/', requestValidation(createCategorySchema.request), categoryController.postCategory);
router.delete('/:id', requestValidation(deleteCategorySchema.request), categoryController.deleteCategory)

export default router;
