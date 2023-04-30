import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingProductModule } from './app-routing-product.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ProductService } from 'src/app/shared/service/product/product.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppRoutingProductModule,
    BrowserModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [ProductService],
  bootstrap: []
})
export class ProductModule { }
