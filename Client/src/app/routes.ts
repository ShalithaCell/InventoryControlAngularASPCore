import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AuthComponent} from './auth/auth.component';
import {CategoriesComponent} from './home/categories/categories.component';
import {ProductsComponent} from './home/products/products.component';

export const appRoutes: Routes = [
  {path : 'home', component : HomeComponent, children : [
      {
        path: '',
        redirectTo: 'category',
        pathMatch: 'full'
      },
      {
        path: 'category', // child route path
        component: CategoriesComponent, // child route component that the router renders
      },
      {
        path: 'products', // child route path
        component: ProductsComponent, // child route component that the router renders
      }
    ]},
  {path : 'login', component : AuthComponent},
  {path : '' , redirectTo : '/login', pathMatch: 'full'}
];
