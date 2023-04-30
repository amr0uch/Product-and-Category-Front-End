import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product/product.model';
import { Category } from '../../models/category/category.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = "/product";

  private _refresh = new Subject<void>();

  get Refresh() {
    return this._refresh;
  }
  constructor(private http:HttpClient) { }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.apiUrl}${this.url}/add`,product).pipe(
      tap(() => {
        this._refresh.next();
      })
    );
  }
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}${this.url}/all`);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.apiUrl}${this.url}/getone/${id}`);
  }

  updateProduct(product: Product,id: string): Observable<Product> {
    return this.http.put<Product>(`${environment.apiUrl}${this.url}/update/${id}`,product).pipe(
      tap(() => {
        this._refresh.next();
      })
    );
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${environment.apiUrl}${this.url}/delete/${id}`);
  }

}
