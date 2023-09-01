import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _baseUrl = environment.urlApi.todos;
  

  constructor(private _http: HttpClient,private router:Router) {}

findAll(){
  return this._http.get<Todo[]>(this._baseUrl);
}

public findById(id: string) {
  return this._http.get<Todo>(`${this._baseUrl}/${id}`);
}
public findByUserId(userId:string){
  return this._http.get<Todo[]>(`${this._baseUrl}?userId=${userId}`)
}

public create(created: Todo) {
  return this._http.post(this._baseUrl, created);
}

public update(updated: Todo) {
  return this._http.put(`${this._baseUrl}/${updated.id}`, updated);
}

public delete(id: string) {
  return this._http.delete(`${this._baseUrl}/${id}`);
}


}
