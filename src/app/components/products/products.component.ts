import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/interfaces/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  products: Products[] = [];

  searchTerm: string = '';

  constructor(private _ProductsService: ProductsService, private _CartService: CartService, private toastr: ToastrService) {

  }

  addToCart(productId: string) {
    this._CartService.addToCart(productId).subscribe({
      next: (res) => {
        this.products = res.data;
        this._CartService.numberOfCartItem.next(res.numOfCartItems);
        this.toastr.success(res.message);
      },
      error: (err) => {
        this.products = err
        this.toastr.success(err.message);
      },

    })
  }

  ngOnInit(): void {

    this._ProductsService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;

      }
    })

  }
  parseFloatNumber(str: string): number {
    return parseFloat(str);
  }
}
