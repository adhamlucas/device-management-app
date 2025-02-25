import { Request, Response } from 'express'
import CategoryService from './services';

class CategoryController {

  constructor(private categoryService: CategoryService) { 
    this.categoryService = categoryService;
    this.getAllCategories = this.getAllCategories.bind(this);
  }

  getAllCategories(req: Request, res: Response) {
    res.json(this.categoryService.findAll()); 
  }

  postCategory(req: Request, res: Response) {
    res.json(req.body);
  }
}

export default CategoryController;