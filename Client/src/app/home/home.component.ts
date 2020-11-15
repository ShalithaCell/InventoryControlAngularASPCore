import { Component, OnInit } from '@angular/core';
import {UserServiceService} from '../services/user-service.service';
import {CategoryServiceService} from '../services/category-service.service';
import {STORAGE_IDENTITY} from '../../config';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Categories';
  constructor(private  categoryServices: CategoryServiceService) { }

  ngOnInit(): void {
    this.categoryServices.GetCategories().subscribe((data: any) => {
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      });
  }

}
