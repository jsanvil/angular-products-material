import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../interfaces/product';
import { ProductFilterPipe } from '../pipes/product-filter.pipe';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ProductService } from '../services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { HighlightDirective } from '../directives/highlight.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
import { Router, RouterLink } from '@angular/router';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HttpClientModule,
    ProductFilterPipe,
    ProductItemComponent,
    HighlightDirective,
    ReactiveFormsModule,
    // Material
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatSortModule
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  
  color = '#ffff66';
  displayedColumns: string[] = ['image', 'description', 'price', 'available', 'rating'];

  protected headers = {
    description: 'Producto',
    price: 'Precio',
    available: 'Disponible',
    image: 'Imagen',
    rating: 'Valoración'
  };

  protected showImage = true;
  protected filterSearch = '';
  protected products: Product[] = [];

  constructor(
    private router: Router,
    private productService: ProductService,
    protected title: Title) { }

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: prods => this.products = prods,
      error: err => console.error(err),
      complete: () => console.log('Productos obtenidos')
    });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => {
      console.log('Sort change');
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterSearch = filterValue.trim().toLowerCase();
  }

  selectedProduct(product: Product): void {
    this.router.navigate(['/products', product.id]);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }
}
