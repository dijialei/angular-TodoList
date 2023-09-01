import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-urgent',
  templateUrl: './urgent.component.html',
  styleUrls: ['./urgent.component.css']
})
export class UrgentComponent implements OnInit {
  todos:Todo[]=[];
  userId:string = "";

  constructor(private _todoService:TodoService, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.userId= this.route.snapshot.params["userId"];
    this._todoService.findByUserId(this.userId)
    .subscribe(list=>{
      this.todos=list.filter(todo=>todo.cate=="urgent");      
    });
    
    
  }

}
