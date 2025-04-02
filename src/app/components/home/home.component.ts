import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { IProduct } from '../../viewmodel/Iproduct';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {
  

}
