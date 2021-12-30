import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'reactive-form-app';
  colors: any;

  constructor() {
    this.addColorForm();
  }

  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    colors: new FormArray([]),
    weight: new FormControl('', [Validators.required, Validators.min(0)]),
    size: new FormControl('', [Validators.required, Validators.min(0)]),
    quantity: new FormControl('', [Validators.required, Validators.min(0)]),
  });

  errors: any = {};

  createColorForm() {
    return new FormGroup({
      colorName: new FormControl('', [Validators.required]),
    });
  }

  addColorForm() {
    this.colors = this.productForm.get('colors') as FormArray;
    this.colors.push(this.createColorForm());
  }

  onSubmit(e: any) {
    e.preventDefault();

    console.log(this.productForm.value);

    if (!this.productForm.valid) {
      this.errors.name = this.productForm.get('name')?.errors;
      this.errors.weight = this.productForm.get('weight')?.errors;
      this.errors.size = this.productForm.get('size')?.errors;
      this.errors.quantity = this.productForm.get('quantity')?.errors;

      this.errors.color = this.productForm.get('colors')?.invalid;

      console.log(this.errors.color);

      setTimeout(() => {
        this.errors = {};
      }, 3000);
      return;
    }
  }
}
