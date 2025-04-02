import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../viewmodel/Iproduct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://localhost:44329/api/Products';
  private apiUrll = 'https://localhost:44329/api/Products/AddProduct';
  constructor(private http: HttpClient) {}

  getallproducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiUrl);
  }

  getallproductsbyid(id: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.apiUrl}/${id}`);
  }
  addProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.apiUrll}`, product);
  }
  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${productId}`);
  }

updateProduct(guid: string, product: IProduct): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/${guid}`, product);
}
  
}
