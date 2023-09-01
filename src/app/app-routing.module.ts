import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ModifyUserComponent } from './components/modify-user/modify-user.component';
import { TodolistComponent } from './components/todolist/todolist.component';
import { UrgentComponent } from './components/urgent/urgent.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"index",component:IndexComponent,
children:[
  {path:":userId",component:TodolistComponent},
  {path:"urgent/:userId",component:UrgentComponent},
  {path:"addUser/add",component:AddUserComponent},
  {path:"modifyUser/:id",component:ModifyUserComponent}
]},
  {path:"**",component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
