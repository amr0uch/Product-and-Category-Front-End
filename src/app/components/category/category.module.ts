import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from 'src/app/shared/service/category/category.service';
import { AppRoutingCategoryModule } from './app-routing-category.module';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../../app-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppRoutingCategoryModule,
    BrowserModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [CategoryService],
  bootstrap: []
})
export class CategoryModule { }
