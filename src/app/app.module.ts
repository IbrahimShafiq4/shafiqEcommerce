import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AboutComponent } from './components/about/about.component';
import { CartComponent } from './components/cart/cart.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductsComponent } from './components/products/products.component';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgParticlesModule } from 'ng-particles';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductDetailsComponent } from './components/product-details/product-details.component'
import { NgxImgZoomModule } from 'ngx-img-zoom';
import { MainsliderComponent } from './components/mainslider/mainslider.component';
import { CategoriessliderComponent } from './components/categoriesslider/categoriesslider.component';
import { BuyPipe } from './pipes/buy.pipe';
import { SeemorePipe } from './pipes/seemore.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ngx-toastr';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HeaderInterceptor } from './header.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    BrandsComponent,
    CategoriesComponent,
    AboutComponent,
    CartComponent,
    FooterComponent,
    HomeComponent,
    NotfoundComponent,
    ProductsComponent,
    ProductDetailsComponent,
    MainsliderComponent,
    CategoriessliderComponent,
    BuyPipe,
    SeemorePipe,
    SearchPipe,
    ContactUsComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxTypedJsModule,
    BrowserAnimationsModule,
    NgParticlesModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxImgZoomModule,
    FormsModule,
    CarouselModule,
    ToastrModule.forRoot({
      timeOut: 1500,
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
