import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "app/models/entities/category";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private httpUrl: string = "http://localhost:8080/api/category";

  constructor(private httpClient: HttpClient) {}

  public getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.httpUrl}/`);
  }
}