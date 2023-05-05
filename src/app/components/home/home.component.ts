import { Component, AfterViewInit, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import anime from 'animejs/lib/anime.es.js';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    products: any [] = [];
    brands: any [] = [];

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
        nav: true
    }

    constructor(private _ProductsService: ProductsService) { }

    ngOnInit() {
        this.myFunction()
        this._ProductsService.getBrands().subscribe({
            next: (res) => {
                this.brands = res.data.slice(0, 10);
            }
        })
    }

    myFunction() {
        let container = document.querySelector('.containerElement')!;
        for (let i = 1; i <= 100; i++) {
            let dot = document.createElement('div');
            dot.classList.add('element');
            dot.style.cssText = `
                position: relative;
                width: 40px;
                height: 40px;
                background-color: #fff;
                scale: 0.75;
                @media(max-width: 767px) {
                    width: 20px;
                    height: 20px;
                }
            `
            container.appendChild(dot);
        }

        let dotAll = document.querySelectorAll('.element');
        let animation = anime.timeline({
            targets: dotAll,
            easing: 'easeInOutExpo',
            loop: true,
            delay: anime.stagger(100, { grid: [10, 10], from: 'center' })
        })
        animation.add({
            scale: 0.8,
            rotateZ: 180,
            translateY: anime.stagger(-20, { grid: [10, 10], from: 'center', axis: 'y' }),
            translateX: anime.stagger(-20, { grid: [10, 10], from: 'center', axis: 'x' }),
            opacity: 1,
        }).add({
            borderRadius: 50,
        }).add({
            scale: 0.2,
            opacity: 0.2,
        })
        animation.add({
            rotateZ: 180,
            translateY: anime.stagger(0, { grid: [10, 10], from: 'center', axis: 'y' }),
            translateX: anime.stagger(0, { grid: [10, 10], from: 'center', axis: 'x' }),
            opacity: 1,
        }).add({
            scale: 1,
            borderRadius: 0,
        }).add({
            rotateZ: -90,
        })
    }
}


// "node_modules/anime-master/anime-master/lib/anime.min.js"