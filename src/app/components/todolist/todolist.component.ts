import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  userId:string="";
  user:User={};
  todos:Todo[]=[];
  todosFini:Todo[]=[];
  constructor(private route:ActivatedRoute,private _todoService:TodoService,private _userService:UserService){}

ngOnInit(): void {  
  this.route.paramMap.subscribe(parammap=>{
    console.log("ngOnInit todolist");
    
    this.userId=parammap.get("userId") as string;
    this._userService.findById(this.userId)
    .subscribe(u=>this.user=u);
    this.todosInit();
  });
  
  
}

todosInit(){
 
  
  this._todoService.findByUserId(this.userId)
  .subscribe(todolist=>{
    this.todos=todolist.filter(todo=>todo.status); 
    this.todosFini=todolist.filter(todo=>!todo.status);    
  });
}


getCateClass(cate:any):string{
if (cate=="urgent") {
  return "btn btn-danger";  
}else return "btn btn-success";
}

getStatusClass(status:any):string{
  if (status) {
    return "btn btn-primary";  
  }else return "btn btn-secondary";
}

deleteTodo(id:any){
  this._todoService.delete(id)
  .subscribe(()=>this.todosInit());
}

changeCate(update:Todo){
  update.cate= update.cate == "urgent"? "normal":"urgent";  
  this._todoService.update(update)
  .subscribe(()=>{
    this.todosInit();
  });
}

changeStatus(update:Todo){
  update.status= !update.status;  
  this._todoService.update(update)
  .subscribe(()=>{
    this.todosInit();
  });
}

modifyTodo(update:Todo){
  update.edieable=true;
  this._todoService.update(update)
  .subscribe(()=>{
    this.todosInit();
  });
}

confirmModify(update:Todo){
  update.edieable=false;
  update.status =true;
  if (update.detail!="") {
    update.oldValue=update.detail;    
  }else update.detail=update.oldValue;
  this._todoService.update(update)
  .subscribe(()=>{
    this.todosInit();
  });
}

cancel(update:Todo){
  update.edieable=false;
  update.detail=update.oldValue;
  this._todoService.update(update)
  .subscribe(()=>{
    this.todosInit();
  });
}




}
