import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icatogry } from '../viewmodel/icatogry';

@Injectable({
  providedIn: 'root'
})
export class CatagoryService {

  private apiUrl = 'https://localhost:44329/api/Categories';  
  private apiUrll = 'https://localhost:44329/api/Categories/AddCategory';  
  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Icatogry[]> {
    return this.http.get<Icatogry[]>(this.apiUrl);
  }

  getCategoryById(id: string): Observable<Icatogry> {
    return this.http.get<Icatogry>(`${this.apiUrl}/${id}`);
  }

 
  addCategory(category: Icatogry): Observable<string> { 
    return this.http.post<string>(`${this.apiUrl}/AddCategory`, category);
  }

  updateCategory(id: string, category: Icatogry): Observable<void> {
    if (id !== category.id) {
      throw new Error('ID mismatch between URL and command');
    }
    return this.http.put<void>(`${this.apiUrl}/${id}`, category);
  }
  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
