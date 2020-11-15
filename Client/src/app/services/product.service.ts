import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {
  GET_PRODUCTS_ENDPOINT, REMOVE_CATEGORIES_ENDPOINT, REMOVE_PRODUCT_ENDPOINT,
  STORAGE_IDENTITY,
  UPDATE_PRODUCT_ENDPOINT
} from '../../config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private router: Router) { }

  GetProducts = () => {
    const token = localStorage.getItem(STORAGE_IDENTITY);

    if (token === null){
      this.router.navigate(['/login']);
    }

    return this.http.get(GET_PRODUCTS_ENDPOINT,
      {
        headers : new HttpHeaders({Authorization : `Bearer ${token}`})
      });
  }

  SaveProduct = (name, description, category) => {
    const token = localStorage.getItem(STORAGE_IDENTITY);

    if (token === null){
      this.router.navigate(['/login']);
    }

    const data = JSON.stringify({Name: name, Description: description, CategoryID : category});

    return this.http.post(GET_PRODUCTS_ENDPOINT,
      data,
      {
        headers : new HttpHeaders({Authorization : `Bearer ${token}`, 'Content-Type': 'application/json'}),
      });
  }

  UpdateProduct = (id , name, description, category) => {
    const token = localStorage.getItem(STORAGE_IDENTITY);

    if (token === null){
      this.router.navigate(['/login']);
    }

    const data = JSON.stringify({ID : id, Name: name, Description: description, CategoryID : category});

    return this.http.post(UPDATE_PRODUCT_ENDPOINT,
      data,
      {
        headers : new HttpHeaders({Authorization : `Bearer ${token}`, 'Content-Type': 'application/json'}),
      });
  }

  RemoveProduct = (id) => {
    const token = localStorage.getItem(STORAGE_IDENTITY);

    if (token === null){
      this.router.navigate(['/login']);
    }

    const data = id;

    return this.http.post(REMOVE_PRODUCT_ENDPOINT,
      data,
      {
        headers : new HttpHeaders({Authorization : `Bearer ${token}`}),
      });
  }
}
