import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.css']
})
export class ModifyUserComponent implements OnInit {
  id: string = "";
  user: User = {};
  error: boolean = false;
  errorMessage: string = "";
  userExist: boolean = false;
  constructor(private route: ActivatedRoute, private _userService: UserService, private router: Router) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this._userService.findById(this.id)
      .subscribe(u => {
        this.user = u;
      });

  }


  ModifyUser(f: NgForm) {

    this._userService.findByName(f.value.username).subscribe(users => {

      if (users.length != 0) {
        this.userExist = true;
      } else this.userExist = false;
      if (!this.userExist) {
        this.user.name = f.value.username != "" ? f.value.username : this.user.name;
        this.user.pwd = f.value.pwd != "" ? f.value.pwd : this.user.pwd;
        this.user.role = f.value.role != "" ? f.value.role : this.user.role;
        this._userService.update(this.user)
          .subscribe(() => {
            this.router.navigateByUrl("", { skipLocationChange: true })
              .then(() => this.router.navigateByUrl("/index"));
          });
      } else {
        this.error = true;
        this.errorMessage = "Username already exists !"
      }

    });




  }

  cancel() {
    this.router.navigateByUrl("/index");
  }

}
