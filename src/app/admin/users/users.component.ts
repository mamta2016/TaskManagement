import { Component } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import { UsersService } from 'app/services/users.service';
import { LoaderService } from 'app/services/loader.service';
import { ActivateGuard } from 'app/app.activate.guard';
//import { DeactivateGuard } from 'app/app.deactivate.guard';

@Component({
  selector: 'users',
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.css']
})
export class UsersComponent {
  public userUrl = 'http://localhost:9000/';
  public data: any;
  public isLogin: boolean;
  public selectedUser: boolean;
  public selectedId: String;
  public _id: any;
  public users = [];
  public first: String;
  public last: String;
  public email: any;
  public password: any;
  public role: any;
  public list: any;
  public reLoadData: any;
  public msg :any;

  constructor(public loader:LoaderService, public activateGuard: ActivateGuard, public router: Router, public usersService: UsersService, public http: Http) {

    this.usersList();
  };

  addUser() {
    let ths = this;
    this.first = " ";
    this.last = " ";
    this.email = " ";
    this.role = " ";
    this.password = "";
    
    let updateBtn = <HTMLImageElement>document.getElementById("submit");
    updateBtn.style.display = 'block';
    let defaultCreateBtn = <HTMLImageElement>document.getElementById("update");
    defaultCreateBtn.style.display = 'none';
    

    let addModel: any = $('#newUser');
    addModel.modal('show');
  };

  editBtn(user) {
    this._id = user._id;
    this.first = user.name.first;
    this.last = user.name.last;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;

    let updateBtn = <HTMLImageElement>document.getElementById("update");
    updateBtn.style.display = 'block';
    let submitBtn = <HTMLImageElement>document.getElementById("submit");
    submitBtn.style.display = 'none';

    let msg = <HTMLImageElement>document.getElementById("msg");
        msg.style.display = 'none';
    
    let addModel: any = $('#newUser');
    addModel.modal('show');
    
  };

  usersList() {
    let ths = this;
    ths.loader.showLoader();
    this.usersService.usersList()
      .subscribe((users) => {
         this.users = users;
        ths.loader.hideLoader();
      });
  };

  submitBtn() {
    let ths = this;

    ths.loader.showLoader();

    let list = JSON.stringify({ "name.first": this.first, "name.last": this.last, email: this.email, password: this.password, role: this.role });
    let isEmailValid = this.validateEmail(this.email);
    for(var i=0; i<this.users.length;i++){
      if(ths.email==ths.users[i].email){
       ths.msg = "this email Id already created.";
       ths.email = "";
      }
    }
    if (!isEmailValid || !this.email || !this.password  || !this.role || !this.first || !this.last) { 
      this.validation();
    } else {
      
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.userUrl + 'newUser/', list, { headers: headers })
        .subscribe(data => {
          ths.usersList();
          ths.loader.hideLoader();
        },
        err => console.log('Error is..:' + err)
        );

      // this. validation();
      this.selectedUser = true;
      let addModel: any = $('#newUser');
      addModel.modal('hide');

    }

  };

  updateBtn() {
    let ths = this;

    ths.loader.showLoader();

    let list = JSON.stringify({ "_id": this._id, "name.first": this.first, "name.last": this.last, "email": this.email, "password": this.password, "role": this.role });
    let isEmailValid = this.validateEmail(this.email);
    
      for(var i=0; i<this.users.length;i++){
        if(ths.email==ths.users[i].email && ths._id !==ths.users[i]._id){
       ths.msg = "this email Id already created.";
       let msg = <HTMLImageElement>document.getElementById("msg");
        msg.style.display = 'block';
       ths.email = "";
      }
    }

    if (!isEmailValid || !this.email || !this.password  || !this.role || !this.first || !this.last) {
      this.validation();
    } else {

      let ths = this;
      
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(this.userUrl + 'updateUser/', list, { headers: headers })
        .subscribe((data) => {
          ths.usersList();
          ths.loader.hideLoader();
        });
      console.log("success data");

      let addModel: any = $('#newUser');
      addModel.modal('hide');

    let updateBtn = <HTMLImageElement>document.getElementById("submit");
    updateBtn.style.display = 'block';
    let defaultCreateBtn = <HTMLImageElement>document.getElementById("update");
    defaultCreateBtn.style.display = 'none';
    }

  };


  delBtnPopup(user) {
    this.list = JSON.stringify({ '_id': user._id });
    let delModel: any = $('#deletPopUp')
    delModel.modal('show');
  }

  deleteUser() {
    let headers = new Headers();
    let ths = this;

    ths.loader.showLoader();

    headers.append('Content-Type', 'application/json');
    this.http.post(this.userUrl + 'deleteUser/', this.list, { headers: headers })
      .map(response => response.json())
      .subscribe(data => {
        ths.usersList();
        ths.loader.hideLoader();
      },
      err => console.log('Error is..:' + err)
      );
    console.log("success data");

    //  location.reload();


  };

  goToHome() {
    this.router.navigate(["/admin"]);
  }

logOut() {
    this.router.navigate(["/login"]);
  }

    validateEmail(email) {
    var regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(email);
  
  }


  validation() {
    let ths = this;
     for(var i=0; i<this.users.length;i++){
      if(ths.email==ths.users[i].email){
       ths.email = "";
      }
    }
    let userForm: any = $('.ui.form');
      userForm.form({
        inline: true,
        on  : 'submit',
        fields: {
          email: {
            identifier: 'email',
            rules: [
              {
                type: 'empty',
                prompt: 'Please enter newUser email'
              },
              {
                type: 'email',
                prompt: 'Please enter a valid email'
              },
            ]
          },
          password: {
            identifier: 'password',
            rules: [
              {
                type: 'empty',
                prompt: 'Please enter password'
              }
            ]
          },

          first: {
            identifier: 'first',
            rules: [
              {
                type: 'empty',
                prompt: 'Please enter a first name '
              }
            ]
          },
          last: {
            identifier: 'last',
            rules: [
              {
                type: 'empty',
                prompt: 'Please enter a last name '
              }
            ]
          },
          role: {
            identifier: 'role',
            rules: [
              {
                type: 'empty',
                prompt: 'Please select a role '
              }
            ]
          },
        }
      });
  }


  cancelBtn(){
    this.first = " ";
    this.last = " ";
    this.email = " ";
    this.role = " ";
    this.password = " ";

    let defaultCreateBtn = <HTMLImageElement>document.getElementById("update");
    defaultCreateBtn.style.display = 'none';
    let updateBtn = <HTMLImageElement>document.getElementById("submit");
    updateBtn.style.display = 'block';
  }

};