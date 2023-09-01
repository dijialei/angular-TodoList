import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  error:boolean=false;
  errorMessage = "";
  loginUser :User={};
 
  
  constructor(private _userService : UserService, private router:Router){}


ngOnInit(): void {
  if (window.localStorage.getItem('id')) {  
    this.router.navigateByUrl("/index");  
  }
}

  hidenError(){
    this.error = false;
    this.errorMessage="";
  }
  
  verify(f:NgForm){
    let name :string = f.value.username;
    name=name.toLowerCase();
    this._userService.findByName(name)
    .subscribe(users=>{
      if (users.length!=0 && users[0].pwd == f.value.password) {
        window.localStorage.setItem("id",users[0].id? users[0].id:"");
        this.router.navigateByUrl("/index");
        
      }else{
        this.error=true;
        this.errorMessage="Username or password error!"
        f.reset();
      }
    });
    
    
  }

}
