import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../../products/star-rating/star-rating.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    StarRatingComponent
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  product!: IProduct;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.product = this.route.snapshot.data['product'];
    this.title.setTitle(`Producto: ${this.product.description}`);
  }

  changeRating(rating: number) {
    if (this.product.id) {
      this.productService.updateRating(this.product.id, rating)
        .subscribe({
          next: prod => this.product = prod,
          error: err => console.error(err)
        });
    }
  }

  edit() {
    this.router.navigate(['products', 'edit', this.product.id]);
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}
