import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-categoriesslider',
  templateUrl: './categoriesslider.component.html',
  styleUrls: ['./categoriesslider.component.css']
})
export class CategoriessliderComponent implements OnInit {
  categories:any[] = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay: true,
    autoplayHoverPause: true,
    touchDrag: false,
    autoplayTimeout: 2000,
    autoplaySpeed: 500,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 7
      }
    },
    nav: false
  }
  customOptions2: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay: true,
    autoplayHoverPause: true,
    touchDrag: false,
    pullDrag: false,
    autoplayTimeout: 2000,
    autoplaySpeed: 500,
    dots: false,
    navSpeed: 700,
    rtl: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 7
      }
    },
    nav: false
  }
  constructor(private _ProductsService: ProductsService) {  }
  ngOnInit(): void {
    this._ProductsService.getCategories().subscribe({
      next: (response) => this.categories = response.data,
    })
  }

}
