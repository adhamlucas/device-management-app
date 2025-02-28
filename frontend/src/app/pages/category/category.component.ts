import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryDialogComponent } from '../../components/category-dialog/category-dialog.component';

@Component({
  selector: 'app-category',
  imports: [
    MatTableModule,
    MatButton,
    MatIcon
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Failed while fetching categories', err);
      }
    })
  }

  showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snacbar-success']
    })
  }

  openAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(categoryName => {
      if (categoryName) {
        this.createCategory(categoryName);
      }
    });
  }

  createCategory(name: string): void {
    this.categoryService.createCategory({ name }).subscribe({
      next: () => this.loadCategories(),
      error: (err) => console.error('Error creating category:', err)
    });
  }

  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.loadCategories()
      },
      error: (err) => {
        console.error(err)
        this.showMessage(err.error.error || "Error deleting category")
      }
    })
  }

  displayedColumns: string[] = ['id', 'name', 'actions']
}
