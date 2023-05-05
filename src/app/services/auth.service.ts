import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData = new BehaviorSubject(null);

  constructor(private _HttpClient: HttpClient, private _Router: Router) { 
    
    if (localStorage.getItem('userToken')) {
      this.decodeUserData()
    }
  }

  decodeUserData() {
    let encodedToken = JSON.stringify(localStorage.getItem('userToken'));
    let decodedToken:any = jwtDecode(encodedToken);
    this.userData.next(decodedToken)
  }

  register(userData:Object):Observable<any> {
    return this._HttpClient.post('https://route-ecommerce.onrender.com/api/v1/auth/signup', userData)
  }

  login(userData:any):Observable<any> {
    return this._HttpClient.post('https://route-ecommerce.onrender.com/api/v1/auth/signin', userData)
  }

  logout() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['/login']);
  }
}
