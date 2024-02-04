import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../interfaces/product';
import { ProductFilterPipe } from '../../pipes/product-filter.pipe';
import { ProductService } from '../../services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { HighlightDirective } from '../../directives/highlight.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
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
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements AfterViewInit {
  @ViewChild(MatSort, { static: false }) sort?: MatSort;

  displayedColumns: string[] = ['image', 'description', 'price', 'available', 'rating'];
  dataSource?: MatTableDataSource<IProduct>;
  today = new Date();

  protected showImage = true;
  protected filterSearch = '';
  protected products: IProduct[] = [];

  constructor(
    private router: Router,
    private productService: ProductService,
    protected title: Title) { }

  ngAfterViewInit() {
    this.productService.getProducts().subscribe({
      next: prods => {
        this.products = prods
        // Funte de datos de la tabla
        this.dataSource = new MatTableDataSource(this.products);
        // Filtro de la tabla para la columna "description"
        this.dataSource.filterPredicate = (data: IProduct, filter: string) => {
          return data.description.toLowerCase().includes(filter);
        }
        // Control de orden de las cabeceras de la tabla
        setTimeout(() => {
          this.dataSource!.sort = this.sort!
        }, 0);
      },
      error: err => console.error(err),
      complete: () => console.log('Productos obtenidos')
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource!.filter = filterValue.trim().toLowerCase();
  }

  selectedProduct(product: IProduct): void {
    this.router.navigate(['/products', product.id]);
  }

  deleteProduct(product: IProduct): void {
    if (confirm(`¿Está seguro de querer borrar el producto: ${product.description}?`)) {
      this.productService.deleteProduct(product.id!).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== product.id);
          this.dataSource = new MatTableDataSource(this.products);
          this.dataSource!.sort = this.sort!;
        },
        error: err => console.error(err)
      });
    }
  }

}
