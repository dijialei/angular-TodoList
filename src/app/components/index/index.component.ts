import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  users: User[] = [];
  loginUser: User = {};
  selectedUser: User = {};
  todoMessage:string="";
  todo:Todo={};
  constructor(private _userService: UserService, private router: Router,private _todoService:TodoService) { }

  ngOnInit() {
    if (!window.localStorage.getItem("id")) {
      this.router.navigateByUrl("");
    } else {
      this._userService.findById(<string>window.localStorage.getItem("id"))
        .subscribe(user => {
          this.loginUser = user;
          if (this.loginUser.role == "user") {
            this.selectedUser = this.loginUser;
            this.router.navigateByUrl(`/index/${this.loginUser.id}`);
          }else this.initUsers();
        });
      
    }

  }

  initUsers() {
    this._userService.findAll()
      .subscribe(list => this.users = list);
  }

  addUser() {
    this.selectedUser={};
    
    this.router.navigateByUrl("/index/addUser/add");
  }
  deleteUser(id: any) {
    this._userService.delete(id).subscribe(() => {
      this.initUsers();
    })
  }
  modifyUser(id: any) {
    this.router.navigateByUrl("",{skipLocationChange:true})
    .then(()=>this.router.navigateByUrl(`/index/modifyUser/${id}`));
    ;
  }
  disconnection(){
    window.localStorage.removeItem("id");
    this.router.navigateByUrl("");
  }

  addTodo(){
    
    if (this.todoMessage!="") {
      this.todo.cate="urgent";
    this.todo.detail=this.todoMessage;
    this.todo.edieable=false;
    this.todo.oldValue=this.todoMessage;
    this.todo.status=true;
    this.todo.userId = this.selectedUser.id;
    this._todoService.create(this.todo)
    .subscribe(()=>{
      this.todoMessage="";
      //this.router.navigateByUrl(`/index/${this.selectedUser.id}`);
      this.router.navigateByUrl("",{skipLocationChange:true})
      .then(()=>this.router.navigateByUrl(`/index/${this.selectedUser.id}`));
    });
    };

  }
  showUrgent(){
    this.router.navigateByUrl(`/index/urgent/${this.selectedUser.id}`)
  }

  showAll(){    
      this.router.navigateByUrl(`/index/${this.selectedUser.id}`)
   
  }

  selcetUser(u:User){
    this.selectedUser=u;
    
    this.router.navigateByUrl(`/index/${this.selectedUser.id}`);
    /*this.router.navigateByUrl("",{skipLocationChange:true})
    .then(()=>{
      this.router.navigateByUrl(`/index/${this.selectedUser.id}`);
    });*/
    

  }

}
