import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class UsersService {
data:any;
id:any;
first:String;
last:String;
email: any;
password: any;
role: any;

selectedUser:any;
private userUrl = 'http://localhost:9000/';

    constructor(public router: Router, public http: Http) {

    };


    usersList(){
       return this.http.get(this.userUrl + 'usersList/')
            .map(response => response.json())
    };

userRoleList(){
       return this.http.get(this.userUrl + 'userRoleList/')
            .map(response => response.json())
    };


    addNew(){
      let list = JSON.stringify({ id: this.id, "name.first": this.first, "name.last": this.last, email: this.email,password: this.password, role: this.role });
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.userUrl + 'newUser/', list, { headers: headers })

    }

  
  home(){
   return this.router.navigate(["/login"]);
  }
}