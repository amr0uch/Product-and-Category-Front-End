import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/shared/models/category/category.model';
import { CategoryService } from 'src/app/shared/service/category/category.service';
import { FormCategoryComponent } from '../form-category/form-category.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {

  categories!: Category[];
  @ViewChild('confirmDelete') confirmDelete!: any;

  currentPage = 0;
  totalCategories = 0;


  constructor(private categoryService: CategoryService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.listCategories(this.currentPage, 10);
    this.categoryService.refresh.subscribe(res => {
      this.listCategories(this.currentPage, 10);
      this.modalService.dismissAll();
    });
  }

  //list of categories
  listCategories(page: number, size: number) {
    this.categoryService.getAllCategories(page, size).subscribe( res => {
      this.categories = res;
      this.currentPage = page;
      console.log(page);
    });
  }

  totalPages() {
    const count = Math.ceil(this.totalCategories / 10); // replace 10 with the actual page size
    return Array(count).fill(0).map((_, i) => i);
  }

  removeCategory(id:string): void {
    const modalRef = this.modalService.open(this.confirmDelete);
    modalRef.result.then((result) => {
      if (result === 'delete') {
       this.categoryService.deleteCategory(id).subscribe(() => {
      this.listCategories(this.currentPage, 10)
        });
      }
    });
  }


  onClickOpen(mode: string, category?: Category) {
        const modalRef = this.modalService.open(FormCategoryComponent, {
          ariaLabelledBy: 'modal-basic-title',
          // size: 'xl',
          windowClass: 'modal-css',
          backdrop: 'static',
          keyboard: false
        });
    modalRef.componentInstance.action = mode;
    modalRef.componentInstance.IdCategory = category?.id;
    modalRef.componentInstance.categories = category || new Category();
  }





}
