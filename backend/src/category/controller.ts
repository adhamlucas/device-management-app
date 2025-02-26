import { Request, Response } from 'express'
import CategoryService from './services';

class CategoryController {

  constructor(private categoryService: CategoryService) { 
    this.categoryService = categoryService;
    this.getAllCategories = this.getAllCategories.bind(this);
    this.postCategory = this.postCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  async getAllCategories(req: Request, res: Response) {
    const categories = await this.categoryService.findAll();
    res.json(categories); 
  }

  async postCategory(req: Request, res: Response) {
    // add verification and a good parser of request body
    const result = await this.categoryService.create(req.body.name)
    res.json(result)
  }

  async deleteCategory(req: Request, res: Response) {
    // add verification and a good parser of request parameters
    const id = parseInt(req.params.id)
    res.json(await this.categoryService.delete(id))
  }
}

export default CategoryController;