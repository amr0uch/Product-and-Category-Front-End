import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../../shared/service/product/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../shared/models/product/product.model';
import { Category } from '../../../shared/models/category/category.model';
import { CategoryService } from 'src/app/shared/service/category/category.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css'],
})
export class FormProductComponent implements OnInit {
  @Input() action!: string;
  @Input() idProduct!: string;
  @Input() product= new Product();
  myForm!: FormGroup;

  categories!: Category[];

  constructor(
    private modalService: NgbModal,
    private productService: ProductService,
    public activeModal: NgbActiveModal,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadCategories();
  }

  createForm(): void {
    // this.myForm = new FormGroup({
    //   id: new FormControl(''),
    //   name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    //   description: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    //   buyPrice: new FormControl('', [Validators.required, Validators.min(3), Validators.max(99999)]),
    //   sellPrice: new FormControl('', [Validators.required, Validators.min(6), Validators.max(99999)]),
    //   stock: new FormControl('', [Validators.required, Validators.min(1)]),
    //   categories: new FormControl(''),
    // });

    this.myForm = new FormGroup({
      name: new FormControl({ value: this.product.name, disabled: false }, [
        Validators.required,
        Validators.maxLength(20),
      ]),
      description: new FormControl(
        { value: this.product.description, disabled: false },
        [Validators.required, Validators.maxLength(30)]
      ),
      buyPrice: new FormControl(
        { value: this.product.buyPrice, disabled: false },
        [Validators.required]
      ),
      sellPrice: new FormControl(
        { value: this.product.sellPrice, disabled: false },
        [Validators.required]
      ),
      stock: new FormControl({ value: this.product.stock, disabled: false }, [
        Validators.required,
      ]),
      categories: new FormControl({
        value: this.product.categories,
        disabled: false,
      }),
    });
  }

  saveProduct() {

    if (this.action === 'add') {
      console.log("im here: ",this.myForm.value);
      this.productService.addProduct(this.myForm.value).subscribe(res => {
        console.log('Added with success',res);

      });
    } else {
      console.log("im here on update id: ",this.idProduct," on update object: ",this.myForm.value);
      this.productService
        .updateProduct(this.myForm.value,this.idProduct)
        .subscribe(res => {
          console.log('Updated with success',res);

        });
    }
  }

  loadCategories(): void {
    this.categoryService.getAllCategories(0, 10).subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => console.log(error)
    );
  }

}
