import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormProductComponent } from './form-product/form-product.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {path: 'formproduct', component: FormProductComponent},
  {path: 'listproducts', component: ListProductsComponent},

  ]


@NgModule({
  declarations: [
    ListProductsComponent,
    FormProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
   // RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingProductModule { }
