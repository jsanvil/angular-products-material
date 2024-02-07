import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../../products/star-rating/star-rating.component';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../services/user.service';
import { MatCardModule } from '@angular/material/card';
import { ImageComponent } from '../../image/image.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    ImageComponent,
    CommonModule,
    StarRatingComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  product!: IProduct;
  isAdmin: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private productService: ProductService,
    private loginService: UserService
  ) { }

  ngOnInit() {
    this.product = this.route.snapshot.data['product'];
    this.title.setTitle(`Producto: ${this.product.description}`);
    this.isAdmin = this.loginService.isAdmin();
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
