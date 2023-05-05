import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  numOfCartItems: number = 0;
  isActive: boolean = false;
  isLogin:boolean = false;
  logOut() {
    this._AuthService.logout()
  }
  constructor (private _AuthService: AuthService, private _CartService: CartService) { 
    _CartService.numberOfCartItem.subscribe({
      next: (val) => this.numOfCartItems = val,
      error: (err) => console.log(err)
    })
    _AuthService.userData.subscribe({
      next: ()=> {
        if (_AuthService.userData.getValue() !== null) {
          this.isLogin = true;
        } else {
          this.isLogin = false
        }
      }
    })
  }
  isActivated() {
    this.isActive = !this.isActive;
  }
}