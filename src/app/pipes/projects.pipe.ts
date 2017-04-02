import { Pipe, PipeTransform } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';


@Pipe({
    name: 'filter',
    pure: false
})

export class ProjectsPipe implements PipeTransform {
    private userUrl = 'http://localhost:9000/';
    public users = [];
    role: any;

    constructor(private http: Http) { }

    transform(users: any[], role: String): any {
        // return users.filter((users) =>{
        //      if (role == 'user') {
        //     return users.role ;
        // }
      //  });
       

        // return users.filter((users) => users.role == 'user');

    }
}