import { Request, Response } from 'express'
import CategoryService from './service';

class CategoryController {

  constructor(private categoryService: CategoryService) { 
    this.categoryService = categoryService;
    this.getAllCategories = this.getAllCategories.bind(this);
    this.postCategory = this.postCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  async getAllCategories(req: Request, res: Response) {
    const categories = await this.categoryService.findAll();
    res.status(200).json(categories); 
  }

  async postCategory(req: Request, res: Response) {
    // add verification and a good parser of request body
    const result = await this.categoryService.create(req.body.name)
    res.status(200).json(result)
  }

  async deleteCategory(req: Request, res: Response) {
    const { id } = req.params;
    
    try {
      const category = await this.categoryService.delete(Number(id));
      res.status(204).json(category); // Sucesso, sem conteúdo
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }
}

export default CategoryController;