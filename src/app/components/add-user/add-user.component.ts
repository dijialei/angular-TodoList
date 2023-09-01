import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  error: boolean = false;
  errorMessage: string = "";
  userExist = false;

  newUser: User = {};
  constructor(private _userService: UserService, private router: Router) { }

  addUser(f: NgForm) {
    

    this._userService.findByName(f.value.username).subscribe(users => {

      if (users.length != 0) {
        this.userExist = true;
      } else this.userExist = false;
      if (!this.userExist) {
        this.newUser.name = f.value.username;
        this.newUser.pwd = f.value.pwd;
        this.newUser.role = f.value.role;
        this._userService.create(this.newUser)
          .subscribe(() => {
            this.router.navigateByUrl("", { skipLocationChange: true })
              .then(() => this.router.navigateByUrl("/index"));
          });
      } else {
        this.error = true;
        this.errorMessage = "User already exists !"
      }

    });

  }
  cancel() {
    this.router.navigateByUrl("/index");
  }
}
