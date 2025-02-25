import express from 'express';
import CategoryController from './controller';
import CategoryService from './services';

const router = express.Router();

const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService);

router.get('/', categoryController.getAllCategories);
router.post('/', categoryController.postCategory);

export default router;
