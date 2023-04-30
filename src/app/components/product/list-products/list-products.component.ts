import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../../shared/models/product/product.model';
import { ProductService } from '../../../shared/service/product/product.service';
import { FormProductComponent } from '../form-product/form-product.component';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  products!: Product[];

  @ViewChild('confirmDelete') confirmDelete!: any;

  constructor(private productService:ProductService,private modalService: NgbModal ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.productService.Refresh.subscribe(res => {
      this.getAllProducts();
      this.modalService.dismissAll();
    })
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe(res  => {
      this.products = res;
      console.log(res);
    });
  }

  removeProduct(id:string ){
    const modalRef = this.modalService.open(this.confirmDelete);
    modalRef.result.then((result) => {
      if (result === 'delete') {
        this.productService.deleteProduct(id).subscribe(() => {
          this.getAllProducts();
        });
      }
    });
  }

 openModal(mode: string, product?: Product) {
  const modalRef = this.modalService.open(FormProductComponent, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'xl',
        windowClass: 'modal-css',
        backdrop: 'static',
        keyboard: false
  });
  modalRef.componentInstance.action = mode;
  modalRef.componentInstance.idProduct = product?.id;
  modalRef.componentInstance.product = product || new Product();
 }
}
