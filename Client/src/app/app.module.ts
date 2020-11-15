import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import {appRoutes} from './routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import { DataTablesModule } from 'angular-datatables';
import { CategoriesComponent } from './home/categories/categories.component';
import { ProductsComponent } from './home/products/products.component';
import { CategoryAddDialogComponent } from './dialogs/category-add-dialog/category-add-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {ToastrModule} from 'ngx-toastr';
import { ProductAddDialogComponent } from './dialogs/product-add-dialog/product-add-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    CategoriesComponent,
    ProductsComponent,
    CategoryAddDialogComponent,
    ProductAddDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    DataTablesModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
