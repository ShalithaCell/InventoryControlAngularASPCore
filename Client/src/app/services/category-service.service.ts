import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {GET_CATEGORIES_ENDPOINT, REMOVE_CATEGORIES_ENDPOINT, STORAGE_IDENTITY, UPDATE_CATEGORIES_ENDPOINT} from '../../config';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(private http: HttpClient, private router: Router) { }

  GetCategories = () => {
    const token = localStorage.getItem(STORAGE_IDENTITY);

    if (token === null){
      this.router.navigate(['/login']);
    }

    return this.http.get(GET_CATEGORIES_ENDPOINT,
      {
      headers : new HttpHeaders({Authorization : `Bearer ${token}`})
    });
  }

  SaveCategory = (name, description) => {
    const token = localStorage.getItem(STORAGE_IDENTITY);

    if (token === null){
      this.router.navigate(['/login']);
    }

    const data = JSON.stringify({Name: name, Description: description});

    return this.http.post(GET_CATEGORIES_ENDPOINT,
      data,
      {
        headers : new HttpHeaders({Authorization : `Bearer ${token}`, 'Content-Type': 'application/json'}),
      });
  }

  UpdateCategory = (id , name, description) => {
    const token = localStorage.getItem(STORAGE_IDENTITY);

    if (token === null){
      this.router.navigate(['/login']);
    }

    const data = JSON.stringify({ID : id, Name: name, Description: description});

    return this.http.post(UPDATE_CATEGORIES_ENDPOINT,
      data,
      {
        headers : new HttpHeaders({Authorization : `Bearer ${token}`, 'Content-Type': 'application/json'}),
      });
  }

  RemoveCategory = (id) => {
    const token = localStorage.getItem(STORAGE_IDENTITY);

    if (token === null){
      this.router.navigate(['/login']);
    }

    const data = id;

    return this.http.post(REMOVE_CATEGORIES_ENDPOINT,
      data,
      {
        headers : new HttpHeaders({Authorization : `Bearer ${token}`}),
      });
  }
}
