import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { IProduct } from '../../viewmodel/Iproduct';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule, NgFor,CurrencyPipe,TitleCasePipe, NgIf } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-body',
  imports: [NgFor, CurrencyPipe, FormsModule, CommonModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent implements OnInit,OnDestroy {
  newproduct:IProduct={} as IProduct;
  products: IProduct[] = [];
  totalorderprice:number=0
  selecttedcatagoryname!: string; 
  filtldproduct!: IProduct[];
  filterldproduct!: IProduct[];
subscribition!:Subscription;
filteredProducts: any;
proid: any;
editingProduct: IProduct = {
  id: '',
  name: '',
  priceValue: 0,
  currency: 'USD',
  categoryId: ''
};
  constructor(public productService: ProductsService,private _location:Location,private router:Router) {

    
  }
  ngOnDestroy(): void {
    this.subscribition.unsubscribe();
  }

  ngOnInit(): void {
   this.subscribition= this.productService.getallproducts().subscribe({
      next: (data: IProduct[]) => { 
        console.log('Products from API:', data);
        this.products = data;
        this.filtldproduct=this.products},
        
        error: (err: HttpErrorResponse) => { 
          console.error('Error fetching products:', err);
          
        },
       
      });
  }



  filter() {
    if(this.selecttedcatagoryname=="all")
      {
this.filtldproduct=this.products

    }
    else{
    this.filtldproduct=this.products.filter((pro)=>pro.name==this.selecttedcatagoryname)
  }
  }

    back() {
      this._location.back();
    }
   deleteProduct(productId: number) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.productService.deleteProduct(productId).subscribe({
            next: () => {
              Swal.fire("Deleted!", "Your product has been deleted.", "success");
    
              this.router.navigate(["/body"]);
            },
            error: (err) => {
              Swal.fire("Error!", "There is no product for this ID", "error");
              console.error("Delete failed:", err);
            }
          });
        }
      });
    }
    addnewproduct() {
      this.productService.addProduct(this.newproduct).subscribe(
        {
          next:()=>{
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your work has been added",
              showConfirmButton: false,
              timer: 1500
            });
            console.log(this.newproduct);
            this.router.navigate(["/body"]);
    
          },
          error:(err)=>{
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: '<a href="#">Why do I have this issue?</a>'
            });
            console.log(err);
          }
        }
      )
      }

      getById(id: string) {
        this.productService.getallproductsbyid(id).subscribe(
          (products: IProduct[]) => {
            this.filterldproduct = products; 
            console.log(this.filtldproduct);
          },
          (error: any) => {
            console.error("Error fetching products by ID:", error);
          }
        );
      
    }
    openEditModal(product: IProduct) {
      this.editingProduct = { ...product }; 
    }
  
    updateProduct() {
      this.productService.updateProduct(this.editingProduct.id, this.editingProduct)
        .subscribe({
          next: () => {
            console.log('Product updated successfully');
            this.router.navigate(["/body"]);
          },
          error: (err) => {
            console.error('Error updating product:', err);
          }
        });
      }}
