import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _baseUrl = environment.urlApi.users;
  

  constructor(private _http: HttpClient,private router:Router) {}
  
  public findAll() {
    return this._http.get<User[]>(this._baseUrl);
  }

  public findById(id: string) {
    return this._http.get<User>(`${this._baseUrl}/${id}`);
  }
  public findByName(name:string){
    return this._http.get<User[]>(`${this._baseUrl}?name=${name}`)
  }

  public create(created: User) {
    return this._http.post(this._baseUrl, created);
  }

  public update(updated: User) {
    return this._http.put(`${this._baseUrl}/${updated.id}`, updated);
  }

  public delete(id: string) {
    return this._http.delete(`${this._baseUrl}/${id}`);
  }
  /*public auth(){
    if (this.loginUser.id) {
      console.log(this.loginUser);
    }else{
      this.router.navigateByUrl("");      
    }
  }*/
  public auth(){

    if (!window.localStorage.getItem("id")) {      
      this.router.navigateByUrl("");
    }
    
  }

}
