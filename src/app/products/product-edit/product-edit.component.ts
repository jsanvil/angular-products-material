import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct, Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ComponentDeactivate } from '../../guards/leave-page.guard';
import { MinDateDirective } from '../../validators/min-date.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { convertImageFromInput } from '../../image/imagetool';
import { ImageService } from '../../services/image.service';
import { IImage, Image } from '../../interfaces/image';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MinDateDirective,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule
  ],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent implements ComponentDeactivate {
  productForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(60)]),
    description: new FormControl(''),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    available: new FormControl(''),
    image: new FormControl('')
  });

  get name() {
    return this.productForm.get('name');
  }

  get description() {
    return this.productForm.get('description');
  }

  get price() {
    return this.productForm.get('price');
  }

  get available() {
    return this.productForm.get('available');
  }

  get image() {
    return this.productForm.get('image');
  }

  product?: IProduct;
  productImage?: IImage = { id: '', url: '' };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private imageService: ImageService
  ) { }

  canDeactivate() {
    if (this.productForm!.dirty)
      return confirm($localize`¿Quiere abandonar la página?. Los cambios no se guardarán.`);
    return true;
  }

  ngOnInit() {
    this.product = this.route.snapshot.data['product'];
    if (!this.product) { return; }
    this.name!.setValue(this.product.name);
    this.description!.setValue(this.product.description);
    this.price!.setValue(this.product.price.toString());
    this.available!.setValue(this.product.available);
    if (this.product.image) {
      this.productImage = this.product.image;
      this.image!.setValue(this.productImage.url);
    }
    else {
      this.productImage = new Image();
    }

  }

  onSubmit() {
    if (this.product && this.productForm!.valid) {
      this.product.name = this.name!.value!;
      this.product.description = this.description!.value!;
      this.product.price = Number(this.price!.value!);
      this.product.available = this.available!.value!;
      // this.product.imageUrl = this.imageUrl!.value!;

      this.imageService.setImage(this.productImage!).subscribe({
        next: img => {
          this.productImage = img;
          this.product!.imageId = img.id;
          
          this.productService.updateProduct(this.product!).subscribe({
            next: prod => {
              this.product = prod;
              this.router.navigate(['/products', this.product.id]);
            },
            error: err => console.error(err)
          });
        },
        error: err => console.error(err)
      });

      // this.productService.updateProduct(this.product).subscribe({
      //   next: prod => {
      //     this.product = prod;
      //   },
      //   error: err => console.error(err)
      // });
    }
  }

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid
    };
  }

  changeImage(fileInput: HTMLInputElement) {
    if (!this.product) { return; }
    convertImageFromInput(fileInput, 200, 200).then((data: string) => {
      this.productImage!.url = data;
    });
  }
}


// import { CommonModule, NgFor } from '@angular/common';
// import { Component, ViewChild } from '@angular/core';
// import { FormsModule, NgForm, NgModel } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Product } from '../../interfaces/product';
// import { ProductService } from '../../services/product.service';
// import { ComponentDeactivate } from '../../guards/leave-page.guard';
// import { MinDateDirective } from '../../validators/min-date.directive';
// import { compressImage, convertImageFromInput } from '../../image/imagetool';

// @Component({
//   selector: 'app-product-edit',
//   standalone: true,
//   imports: [FormsModule, CommonModule, MinDateDirective],
//   templateUrl: './product-edit.component.html',
//   styleUrl: './product-edit.component.css'
// })
// export class ProductEditComponent implements ComponentDeactivate {
//   product?: Product;
//   productImage: string = '';

//   constructor(
//     private router: Router,
//     private route: ActivatedRoute,
//     private productService: ProductService
//   ) { }

//   ngOnInit() {
//     this.product = this.route.snapshot.data['product'];
//     this.product!.available = this.product!.available.replace('.000Z', '');
//   }

//   canDeactivate() {
//     return confirm('¿Quiere abandonar la página?. Los cambios no se guardarán.');
//   }

//   saveChanges(productForm: NgForm) {
//     if (this.product && productForm.valid) {
//       this.productService.updateProduct(this.product).subscribe({
//         next: prod => {
//           this.product = prod;
//           this.router.navigate(['/products', this.product.id]);
//         },
//         error: err => console.error(err)
//       });
//     }
//   }

//   validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
//     return {
//       [validClass]: ngModel.touched && ngModel.valid,
//       [errorClass]: ngModel.touched && ngModel.invalid
//     };
//   }

//   changeImage(fileInput: HTMLInputElement) {
//     if (!this.product) { return; }
//     convertImageFromInput(fileInput, 200, 200).then((data: string) => {
//       this.product!.imageUrl = data;
//     });
//   }
// }
