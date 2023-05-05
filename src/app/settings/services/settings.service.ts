import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private _HttpClient: HttpClient) { }

  userData = new BehaviorSubject(null);

  headers: any = {
    token: localStorage.getItem('userToken')
  }

  resetPassword(currentPassword: string, password: string, rePassword: string): Observable<any> {
    const requestBody = {
      currentPassword: currentPassword,
      password: password,
      rePassword: rePassword
    };

    return this._HttpClient.put(
      'https://route-ecommerce.onrender.com/api/v1/users/changeMyPassword',
      requestBody,
      { headers: this.headers }
    );
  }

}
