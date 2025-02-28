import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

export function numberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && isNaN(control.value)) {
      return { notANumber: true };  // Custom error if value is not a valid number
    }
    return null;
  };
}


@Component({
  selector: 'app-device-dialog',
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatFormFieldModule,
    MatButton,
    MatInput,
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './device-dialog.component.html',
  styleUrl: './device-dialog.component.css'
})

export class DeviceDialogComponent implements OnInit {
  categories: Category[] = []
  deviceForm = new FormGroup({
    color: new FormControl('', [
      Validators.required,
      Validators.maxLength(16)
    ]),
    partNumber: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0),
      numberValidator(),
    ]),
    categoryId: new FormControl(null, Validators.required)
  });

  constructor(
    public dialogRef: MatDialogRef<DeviceDialogComponent>,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  onCancel(): void {
    this.dialogRef.close(); // Fecha o modal sem salvar
  }

  onSave(): void {
    if (this.deviceForm.valid) {
      const formData = this.deviceForm.value
      this.dialogRef.close(formData);
    }
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (devices) => this.categories = devices,
      error: (err) => {
        console.error(err)
      }
    })
  }

  onPartNumberChange(value: string): void {
    const parsedValue = Number(value);
  
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      this.deviceForm.patchValue({
        partNumber: parsedValue
      });
    }
  }

}
