import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
    selector: 'app-mainslider',
    templateUrl: './mainslider.component.html',
    styleUrls: ['./mainslider.component.css']
})
export class MainsliderComponent {
    customOptions: OwlOptions = {
        loop: true,
        mouseDrag: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplaySpeed: 2000,
        autoplayHoverPause: true,
        touchDrag: false,
        pullDrag: true,
        dots: false,
        navSpeed: 700,
        navText: ['', ''],
        responsive: {
            0: {
                items: 1
            }
        },
        nav: false
    }
}
