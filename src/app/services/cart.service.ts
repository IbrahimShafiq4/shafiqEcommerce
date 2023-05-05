import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  numberOfCartItem = new BehaviorSubject(0);

  constructor(private _HttpClient: HttpClient) {
    this.getLoggedUserCart().subscribe({
      next: (data) => {
        this.numberOfCartItem.next(data.numOfCartItems)
      },
      error: (err) => console.log(err),
    })
  }

  headers: any = {
    token: localStorage.getItem('userToken')
  }

  addToCart(productId: string): Observable<any> {
    return this._HttpClient.post(`https://route-ecommerce.onrender.com/api/v1/cart`, {
      productId: productId
    }, { headers: this.headers })
  }

  getLoggedUserCart(): Observable<any> {
    return this._HttpClient.get(`https://route-ecommerce.onrender.com/api/v1/cart`, {
      headers: this.headers
    })
  }

  removeCartItem(productId: string): Observable<any> {
    return this._HttpClient.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`, { headers: this.headers })
  }

  clearCartItem(): Observable<any> {
    return this._HttpClient.delete(`https://route-ecommerce.onrender.com/api/v1/cart`, { headers: this.headers })
  }

  updateItemCount(productId: string, count: number): Observable<any> {
    return this._HttpClient.put(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`, {
      count: count,
    }, { headers: this.headers })
  }

  onlinePayment(shippingAddress: any, cartId: string) {
    return this._HttpClient.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`, {
      shippingAddress: shippingAddress
    }, { headers: this.headers })
  }
}
