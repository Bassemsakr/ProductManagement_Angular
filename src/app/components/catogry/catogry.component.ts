import { Component, OnDestroy, OnInit } from '@angular/core';


import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Icatogry } from '../../viewmodel/icatogry';
import { CatagoryService } from '../../service/catagory.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catogry.component.html',
  styleUrls: ['./catogry.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {
  newCategory: Icatogry = {
    name: '',
    id: ''
  };
  categories: Icatogry[] = [];
  filteredCategory: any;
  categoryIdToDelete: string = '';
  editingCategory: Icatogry = { id: '', name: '' };
  private subscription!: Subscription;

  constructor(
    private categoryService: CatagoryService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadCategories(): void {
    this.subscription = this.categoryService.getAllCategories().subscribe({
      next: (data: Icatogry[]) => {
        this.categories = data;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  getById(id: string): void {
    this.categoryService.getCategoryById(id).subscribe({
      next: (category: Icatogry) => {
        this.filteredCategory = category;
      },
      error: (error: any) => {
        console.error("Error fetching category by ID:", error);
      }
    });
  }

  addCategory(): void {
    this.categoryService.addCategory(this.newCategory).subscribe({
      next: () => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Category added successfully",
          showConfirmButton: false,
          timer: 1500
        });
        this.loadCategories();
        this.newCategory = { name: '',id:'' };
      },
      error: (err: any) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add category",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
        console.error(err);
      }
    });
  }

  deleteCategory(id: string): void {
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
        this.categoryService.deleteCategory(id).subscribe({
          next: () => {
            Swal.fire("Deleted!", "The category has been deleted.", "success");
            this.loadCategories();
          },
          error: (err: any) => {
            Swal.fire("Error!", "Failed to delete category", "error");
            console.error("Delete failed:", err);
          }
        });
      }
    });
  }

  openEditModal(category: Icatogry): void {
    this.editingCategory = { ...category };
  }

  updateCategory(): void {
    this.categoryService.updateCategory(this.editingCategory.id, this.editingCategory)
      .subscribe({
        next: () => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Category updated successfully",
            showConfirmButton: false,
            timer: 1500
          });
          this.loadCategories();
        },
        error: (err: any) => {
          console.error('Error updating category:', err);
          Swal.fire("Error!", "Failed to update category", "error");
        }
      });
  }

  back(): void {
    this.location.back();
  }
}