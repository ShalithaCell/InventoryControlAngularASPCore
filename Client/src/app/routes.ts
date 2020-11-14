import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AuthComponent} from './auth/auth.component';

export const appRoutes: Routes = [
  {path : 'home', component : HomeComponent},
  {path : 'login', component : AuthComponent},
  {path : '' , redirectTo : '/login', pathMatch: 'full'}
];
