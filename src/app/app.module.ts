import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { IndexComponent } from './components/index/index.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ModifyUserComponent } from './components/modify-user/modify-user.component';
import { TodolistComponent } from './components/todolist/todolist.component';
import { UrgentComponent } from './components/urgent/urgent.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    AddUserComponent,
    ModifyUserComponent,
    TodolistComponent,
    UrgentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
