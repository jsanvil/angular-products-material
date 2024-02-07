import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IProduct } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    // Material
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements AfterViewInit {
  @ViewChild(MatSort, { static: false }) sort?: MatSort;
  
  isAdmin: boolean;
  isLoading = true;

  // Columnas a mostrar en la tabla
  displayedColumns: string[] = ['image', 'name', 'price', 'available', 'rating', 'actions'];
  
  dataSource?: MatTableDataSource<IProduct>;

  today = new Date();

  // Ejemplo de internacionalización de las cabeceras de la tabla
  table_headings = {
    image: $localize`Imagen`,
    name: $localize`Nombre`,
    price: $localize`Precio`,
    available: $localize`Disponible`,
    rating: $localize`Valoración`
  }

  protected showImage = true;
  protected filterSearch = '';
  protected products: IProduct[] = [];

  constructor(
    private router: Router,
    private productService: ProductService,
    private loginService: UserService,
    protected title: Title
  ) {
    this.isAdmin = this.loginService.isAdmin();
  }

  ngAfterViewInit() {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: prods => {
        this.products = prods
        // Inicializa la fuente de datos de la tabla
        this.dataSource = new MatTableDataSource(this.products);
        // Filtro de la tabla para la columna "name"
        this.dataSource.filterPredicate = (data: IProduct, filter: string) => {
          return data.name.toLowerCase().includes(filter);
        }
        // Control de orden de las cabeceras de la tabla
        setTimeout(() => {
          this.dataSource!.sort = this.sort!
        }, 0);
      },
      error: err => {
        this.isLoading = false
        console.error(err)
      },
      complete: () => this.isLoading = false
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource!.filter = filterValue.trim().toLowerCase();
  }

  selectedProduct(product: IProduct): void {
    this.router.navigate(['/products', product.id]);
  }

  editProduct(event: Event, product: IProduct): void {
    event.stopPropagation();
    event.preventDefault();
    console.log('Edit product', product);
    this.router.navigate(['/products', 'edit', product.id]);
  }

  deleteProduct(event: Event, product: IProduct): void {
    event.stopPropagation();
    event.preventDefault();
    if (confirm($localize`¿Está seguro de querer borrar el producto: ${product.name}?`)) {
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
