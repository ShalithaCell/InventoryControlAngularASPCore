import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { LOGIN_ENDPOINT } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  constructor(private http: HttpClient) { }

  userAuthentication = (username: string, password: string) => {
    const data = {
      Email : username,
      Password : password
    };
    const rqHeader = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post(LOGIN_ENDPOINT, data, {headers : rqHeader});
  }
}
