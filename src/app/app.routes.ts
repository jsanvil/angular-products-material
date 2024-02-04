import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductAddComponent } from './products/product-add/product-add.component';
import { leavePageGuard } from './guards/leave-page.guard';
import { productResolver } from './resolvers/product.resolver';
import { loggedUserGuard } from './guards/logged-user.guard';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { anonymousUserGuard } from './guards/anonymous-user.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  // BIENVENIDA
  {
    path: 'welcome',
    component: WelcomeComponent,
    title: 'Welcome',
    data: { animation: 'welcome' }
  },
  // LISTA DE PRODUCTOS
  {
    path: 'products',
    component: ProductsListComponent,
    title: 'Lista de productos',
    data: { animation: 'products-list' }
  },
  // AÑADIR NUEVO PRODUCTO
  {
    path: 'products/add',
    canActivate: [loggedUserGuard, adminGuard],
    canDeactivate: [leavePageGuard],
    component: ProductAddComponent,
    title: 'Añadir nuevo producto',
    data: { animation: 'product-add' }
  },
  // DETALLE DEL PRODUCTO
  {
    path: 'products/:id',
    component: ProductDetailComponent,
    resolve: {
      product: productResolver
    },
    title: 'Detalle del producto',
    data: { animation: 'product-detail' }
  },
  // EDITAR PRODUCTO
  {
    path: 'products/edit/:id',
    canActivate: [loggedUserGuard, adminGuard],
    canDeactivate: [leavePageGuard],
    resolve: {
      product: productResolver
    },
    component: ProductEditComponent,
    title: 'Modificando producto',
    data: { animation: 'product-edit' }
  },
  // USUARIO
  {
    path: 'user', redirectTo: 'user/login', pathMatch: 'full'
  },
  // INICIAR SESIÓN
  {
    path: 'user/login',
    canActivate: [anonymousUserGuard],
    component: UserLoginComponent,
    title: 'Iniciar sesión',
    data: { animation: 'user-login' }
  },
  // PERFIL DE USUARIO
  {
    path: 'user/profile',
    canActivate: [loggedUserGuard],
    component: UserProfileComponent,
    title: 'Perfil de usuario',
    data: { animation: 'user-profile' }
  },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', redirectTo: '/welcome', pathMatch: 'full' }
];
