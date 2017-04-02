import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {
  private userUrl = 'http://localhost:9000/';
  users: any;
  user:any;
  public email: any;
  public password: any;
  //private can: boolean = false;

  constructor(private router: Router, public http: Http) {

  };

   getLoginUser(email,password){   
    return this.http.get(this.userUrl +"loginUser/"+ email +'/'+ password)
    .map(response => response.json())
  }


  /* canActivate() {
     console.log('ActivateGuard#canActivate called, can: ', this.can);
     if (!this.can) {
       alert('Activation blocked');
       return false;
     }
 
     return true;
   }
 
   setCanActivate(can) {
     this.can = can;
   }*/


}

