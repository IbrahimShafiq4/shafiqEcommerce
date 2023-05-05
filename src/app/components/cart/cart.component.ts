import { Component, OnInit, ElementRef, ViewChildren, QueryList, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
// import VanillaTilt from 'vanilla-tilt';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @ViewChildren('grid, list, cart, imgCover, details, img') elements!: QueryList<ElementRef>;
  @ViewChildren('mainRow') mainRowElements!: QueryList<ElementRef>;
  cartDetails: any = null;
  isActive: boolean = false;

  constructor(private _CartService: CartService, private toastr: ToastrService) { }

  // ngAfterViewInit() {
  //   this.mainRowElements.changes.subscribe(() => {
  //     this.applyVanillaTilt();
  //   });
  //   this.applyVanillaTilt();
  // }

  // private applyVanillaTilt() {
  //   this.mainRowElements.forEach(element => {
  //     VanillaTilt.init(element.nativeElement, {
  //       max: 10,
  //       speed: 100,
  //     });
  //   });
  // }

  ngOnInit(): void {
    this._CartService.getLoggedUserCart().subscribe({
      next: (response) => {
        this.cartDetails = response.data;
        console.log(this.cartDetails)
        // Wait for the elements to be available in the view
        setTimeout(() => this.elements.notifyOnChanges(), 0);
      },
      error: (err) => console.log(err),
    })
  }

  isActivated() {
    this.isActive = !this.isActive;

    this.elements.forEach(element => {
      if (this.isActive) {
        if (element.nativeElement.tagName.toLowerCase() === 'img') {
          element.nativeElement.style.width = '100%'
        }

      } else {
        if (element.nativeElement.tagName.toLowerCase() === 'img') {
          element.nativeElement.style.width = '100%'
        }
      }
    });
  }

  removeItem(productId: string) {
    this._CartService.removeCartItem(productId).subscribe({
      next: (response) => {
        this.cartDetails = response.data;
        this._CartService.numberOfCartItem.next(response.numOfCartItems);
        this.toastr.success('Item Removed Successfully')
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('something went wrong please try again later')
      },
    })
  }

  clearCartItem() {
    this._CartService.clearCartItem().subscribe({
      next: (response) => {
        this.cartDetails = response.data;
        this._CartService.numberOfCartItem.next(0);
        this.toastr.success('Card Cleared Successfully')
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('something went wrong please try again later')
      },
    })
  }

  updateItemCountFromCart(productId: string, count: number) {
    this._CartService.updateItemCount(productId, count).subscribe({
      next: (response) => {
        this.cartDetails = response.data;
        console.log(this.cartDetails);
        this.toastr.success('cart Updated Successfully');
      },
      error: (err) => {
      },
    })

    if (count === 0) {
      this.removeItem(productId);
    }
  }

}
