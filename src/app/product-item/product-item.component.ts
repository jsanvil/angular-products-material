import { Component, Input } from '@angular/core';
import { Product } from '../interfaces/product';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { ProductService } from '../services/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: '[app-product-item]',
  standalone: true,
  imports: [
    CommonModule,
    StarRatingComponent,
    RouterLink
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() product!: Product;
  @Input() showImage!: boolean;

  constructor(private productService: ProductService) { }
  
  changeRating(rating: number) {
    if (this.product.id) {
      this.productService.updateRating(this.product.id, rating).subscribe(prod => this.product = prod);
    }
  }
}
