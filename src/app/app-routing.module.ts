import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductsComponent } from './components/products/products.component';
import { AuthGuard } from './AuthGuard/auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', canActivate:[AuthGuard] ,component: HomeComponent, title: 'home'},
  {path: 'about', canActivate:[AuthGuard] ,component: AboutComponent, title: 'about'},
  {path: 'categories', canActivate:[AuthGuard] ,component: CategoriesComponent, title: 'categories'},
  {path: 'cart', canActivate:[AuthGuard] ,component: CartComponent, title: 'cart'},
  {path: 'brands', canActivate:[AuthGuard] ,component: BrandsComponent, title: 'brands'},
  {path: 'products', canActivate:[AuthGuard] ,component: ProductsComponent, title: 'products'},
  {path: 'checkout', canActivate:[AuthGuard] ,component: CheckoutComponent, title: 'checkout'},
  {path: 'productdetails/:id/:title', canActivate:[AuthGuard] ,component: ProductDetailsComponent, title: 'details'},
  {path: 'contact-us', canActivate:[AuthGuard] ,component: ContactUsComponent, title: 'contact-us'},
  {path: 'login', component: LoginComponent, title: 'login'},
  {path: 'register', component: RegisterComponent, title: 'register'},
  {path: 'settings', loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule)},
  {path: '**', component: NotfoundComponent, title: 'Error 404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
