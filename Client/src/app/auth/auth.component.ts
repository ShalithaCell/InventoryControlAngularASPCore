import { Component, OnInit } from '@angular/core';
import {UserServiceService} from '../services/user-service.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginError = false;

  constructor(private  userService: UserServiceService) { }

  ngOnInit(): void {
  }

  OnSubmit = (email: string, password: string) => {
    this.userService.userAuthentication(email, password).subscribe((data: any) => {
      console.log(data);
    },
    (error: HttpErrorResponse) => {
      this.isLoginError = true;
    });
  }

}
