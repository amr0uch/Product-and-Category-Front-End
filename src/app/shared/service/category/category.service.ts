import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../models/category/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = "/category";
  constructor(private http:HttpClient) { }

  private _Refresh = new Subject<void>();
    get refresh() {
        return this._Refresh;
    }

  addCategory(data: Category): Observable<Category> {
    return this.http.post<Category>(`${environment.apiUrl}${this.url}/add`, data).pipe(
      tap(()=>this._Refresh.next())
    );

  }

  getCategory(id: string): Observable<Category> {
    return this.http.get<Category>(`${environment.apiUrl}${this.url}/getone/${id}`);
  }
  updateCategory(id: string, data: Category): Observable<Category> {
    return this.http.put<Category>(`${environment.apiUrl}${this.url}/update/${id}`, data).pipe(
      tap(()=>this._Refresh.next())
    );
  }
  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}${this.url}/delete/${id}`);
  }

  getAllCategories(page: number, size: number): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}${this.url}/allCategories/${page}/${size}`);
  }
}
