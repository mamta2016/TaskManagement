import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ActivatedRoute, Params, Router } from "@angular/router";

@Injectable()
export class ProjectService {

    private userUrl = 'http://localhost:9000/';

    constructor(public router: Router, public http: Http ) {

    };

   projectList(){
       return this.http.get(this.userUrl + 'projectList/')
            .map(response => response.json())
    };
  

}