import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Item } from '../item';
import { environment } from '../../environments/environment';
enum listDetailEndpoint {
  list = '/products',
  create = '/products',
  update = '/products/:id',
  delete = '/products/:id'
}
@Injectable({
  providedIn: 'root'
})
export class ListDetailService {
  constructor(private http: HttpClient) {}
  url: string = environment.SERVER_URL;

  getAllData(): Observable<Item[]> {
    return this.http.get<Item[]>(this.url + listDetailEndpoint.list);
  }
  createData(data: Item): Observable<Item> {
    return this.http.post<Item>(this.url + listDetailEndpoint.create, data);
  }

  updateData(data: Item): Observable<Item> {
    const { id, ...body } = data;
    return this.http.put<Item>(this.url + listDetailEndpoint.update.replace(`:id`, id), body);
  }

  deleteData(data: Item): Observable<Item> {
    return this.http.delete<Item>(this.url + listDetailEndpoint.delete.replace(`:id`, data.id));
  }
}
