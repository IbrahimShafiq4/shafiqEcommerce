import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {
  

  brands:any[] = [];

  constructor(private _ProductsService: ProductsService) { }

  ngOnInit() {
      this._ProductsService.getBrands().subscribe({
          next: (res) => {
              this.brands = res.data;
          }
      })
  }
}
