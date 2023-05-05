import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  isLoading: boolean = false;

  constructor(private _CartService: CartService) {  }

  shippingAddress:FormGroup = new FormGroup({
    details: new FormControl (null),
    phone: new FormControl (null),
    city: new FormControl (null),
  })

  navigateToPage(url: string) {
    window.location.href = url;
  }

  handleSumbit(shippingAddress:FormGroup) {
    console.log(shippingAddress.value);
    this._CartService.onlinePayment(shippingAddress.value , "64551a897b67540033a499df").subscribe({
      next: (response:any) => {
        // console.log(response.session.url)
        this.navigateToPage(response.session.url)
      },
      error: (err) => console.log(err),
    })
  }
}
