import { Component, OnInit } from '@angular/core';
import {UserServiceService} from '../services/user-service.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {STORAGE_IDENTITY} from '../../config';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginError = false;

  constructor(private  userService: UserServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  OnSubmit = (email: string, password: string) => {
    this.userService.userAuthentication(email, password).subscribe((data: any) => {
      console.log(data);

      if (data.authenticated){
        localStorage.setItem(STORAGE_IDENTITY, data.token);
        this.router.navigate(['/home']);
      }
    },
    (error: HttpErrorResponse) => {
      this.isLoginError = true;
    });
  }

}
