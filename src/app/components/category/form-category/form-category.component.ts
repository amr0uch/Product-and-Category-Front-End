import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CategoryService } from '../../../shared/service/category/category.service';
import { Category } from '../../../shared/models/category/category.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.css']
})
export class FormCategoryComponent implements OnInit {

  @Input() action!: string;
  @Input() categories = new Category();
  @Input() IdCategory!: string;
  myForm !: FormGroup;


  constructor(public activeModal: NgbActiveModal, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.myForm = new FormGroup({name: new FormControl({value : this.categories.name, disabled:false}, [Validators.required, Validators.maxLength(20)]),
    description: new FormControl({value: this.categories.description, disabled: false}, [Validators.required, Validators.maxLength(30)]),
  });
}

saveCategory() {
  if(this.action ==='add') {
    this.categoryService.addCategory(this.myForm.value).subscribe(
      res => {
      console.log("Added with success",res);
      this.activeModal.close()
    },
      error => console.error(error.message)
    );
  } else {
    this.categoryService.updateCategory(this.IdCategory,this.myForm.value).subscribe(res => {
      console.log("Updated with success");
      this.activeModal.close()
    })
  }
}

//   id!:string;
//   isEditMode!:string;
//    categories: Category[] = [];
//    @Input() isEdit: boolean = false;
//    @Input() cat!: Category ;
//    @Input() action!: string;


//   newCategory: Category = {
//     id: '',
//     name: '',
//     description: ''
//   };
//   nameControl = new FormControl('', [
//     Validators.required,
//     Validators.minLength(2),
//     Validators.maxLength(20)
//   ]);

// descriptionControl = new FormControl('', [
//     Validators.required,
//     Validators.minLength(5),
//     Validators.maxLength(30)
//   ]);


//   constructor(private modalService: NgbModal,private route: ActivatedRoute,public activeModal: NgbActiveModal, private categoryService: CategoryService ) {

//    }


//   ngOnInit(): void {
//     this.id = this.route.snapshot.params['id'];
//     if (this.id) {
//       this.isEdit = true;
//       this.getCategory(this.id);
//     }
//     this.showCategories();
//     // console.log("cat :: ",this.cat);
//   }


//   // Editdata : any;
//   getCategory(id:string){
//     this.categoryService.getCategory(id).subscribe(data => {
//       this.newCategory = data;
//       this.isEdit=true
//       console.log('modaldata:',data);
//       // this.catform.setValue(this.Editdata.name,this.Editdata.description);

//     })
//   }

//   saveCategory() {
//     if (this.action === 'edit')  {
//       this.categoryService.updateCategory(this.cat.id, this.newCategory).subscribe(
//         data => {
//           console.log('Category updated successfully', data);
//           this.activeModal.close();
//         }
//     );
//   }else
//     this.categoryService.addCategory(this.newCategory).subscribe(

//       data =>   {
//          console.log('Category added successfully', data) ,
//          this.activeModal.close();
//         } ,

//       error => { console.error("Im here on the error : ", error.message  )});
//     // location.reload();
//     }

//   closeModal(){
//     this.activeModal.dismiss(this.showCategories());
//   }

//   showCategories(){
//     this.categoryService.getAllCategories(0, 10)
//       .subscribe(data => this.categories = data);
//   }

  // Clearform(){
  //   this.catform.setValue({id:0,name:'',description:''})
  // }
  // open() {
  //   this.Clearform();
  //   this.modalService.open(this.addview, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
  //   }, (reason) => {
  //   });
  // }

  // editdata:any
  // LoadEditdata(id:string) {
  //   this.open();
  //   this.categoryService.getCategory(id).subscribe(data => {
  //     this.editdata=data;
  //     this.catform.setValue({id:this.editdata.id,name:this.editdata.name,description:this.editdata.description})
  //   } )
  // }
}
