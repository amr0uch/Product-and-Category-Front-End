import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormCategoryComponent } from './form-category/form-category.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
{path: 'formcategory', component: FormCategoryComponent},
{path: 'listcategory', component: ListCategoriesComponent},

]

@NgModule({
  declarations: [
    FormCategoryComponent,
    ListCategoriesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingCategoryModule { }
