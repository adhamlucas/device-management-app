import { Component } from '@angular/core';
import { 
  MatDialogRef,
  MatDialogContent,
  MatDialogTitle,
  MatDialogActions
 } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input'
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatFormFieldModule,
    MatButton,
    MatInput,
    ReactiveFormsModule
  ],

  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent {
  categoryName = new FormControl('', Validators.required);

  constructor(public dialogRef: MatDialogRef<CategoryDialogComponent>) {}

  onCancel(): void {
    this.dialogRef.close(); // Fecha o modal sem salvar
  }

  onSave(): void {
    if (this.categoryName.valid) {
      this.dialogRef.close(this.categoryName.value); // Retorna o nome digitado
    }
  }
}