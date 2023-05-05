import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxImgZoomService } from 'ngx-img-zoom';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId: any;
  productDetails: any;
  imgUrl: any;
  enableZoom: Boolean = true;
  previewImageSrc: string = '';
  zoomImageSrc: string = '';

  showFullText: boolean = false;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    // nav: true  
  }

    Array = Array;
    rating: number = 0; // example rating, replace with actual rating from API response
  
    get fullStars(): number {
      return Math.floor(this.rating);
    }
  
    get halfStar(): boolean {
      return (this.rating % 1) >= 0.5;
    }
  
    get emptyStars(): number {
      return Math.floor(5 - this.rating);
    }
  

  constructor(private _ActivatedRoute: ActivatedRoute, private _ProductsService: ProductsService, private _NgxImgZoomService: NgxImgZoomService, private _CartService: CartService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.productId = params.get('id');
    })

    this._ProductsService.getProductDetails(this.productId).subscribe({
      next: (response) => {
        this.productDetails = response.data;
        this.rating = this.productDetails;
      },
    });
    const imageContainer = document.querySelector('.image-container');

    if (imageContainer) {
      window.addEventListener('load', () => {
        imageContainer.classList.add('loaded');
      });
    }
    const image = document.querySelector('.image-container .mainImg') as HTMLImageElement;
    image.onload = () => {
      this.imgUrl = image.src;
      this.previewImageSrc = `${this.imgUrl}`;
      this.zoomImageSrc = `${this.imgUrl}`;
    };

    this._NgxImgZoomService.setZoomBreakPoints([{w: 100, h: 100}, {w: 150, h: 150}, {w: 200, h: 200}, {w: 250, h: 250}, {w: 300, h: 300}]);


  }

  changeMainImg(event: Event) {
    let mainImg = document.querySelector('.mainImg') as HTMLImageElement;
    let zoomedImage = document.querySelector('.zoomed-image') as HTMLImageElement;
    let clickedImg = event.target as HTMLImageElement;
    mainImg.setAttribute('src', clickedImg.src);
    zoomedImage.setAttribute('src', clickedImg.src);
  }

  
  addToCart(productId: string): void {
    this._CartService.addToCart(productId).subscribe({
      next: (response) => {
        this._CartService.numberOfCartItem.next(response.numOfCartItems);
        this.toastr.success(response.message);
      },
      error: (err) => {
        this.toastr.success(err.message);
      },
    })
  }
}

