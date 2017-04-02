import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class IssuesService {
    public userUrl = 'http://localhost:9000/';
    public issues: any;
    public id: any;
    public tracker: any;
    public subject: any;
    public description: any;
    public status: any;
    public assignee: any;
    public priority: any;
    public sDate: any;
    public eDate: any;
    public image: any;

    constructor(public router: Router, public http: Http) {
        this.id = '';
        this.tracker = '';
        this.subject = '';
        this.description = '';
        this.status = '';
        this.assignee = '';
        this.priority = '';
        this.sDate = '';
        this.eDate = '';
        this.image = '';
    }


    issueList() {
        return this.http.get(this.userUrl + 'issuesList/')
            .map(response => response.json())
    };

    issueBugList() {
        return this.http.get(this.userUrl + 'issuesBugList/')
            .map(response => response.json())
    };
    
    countBugList() {
        return this.http.get(this.userUrl + 'countBugList/')
            .map(response => response.json())
    };

    countNewBug() {
        return this.http.get(this.userUrl + 'countNewBug/')
            .map(response => response.json())
    };

    countCpltBug() {
        return this.http.get(this.userUrl + 'countCpltBug/')
            .map(response => response.json())
    };

    countInPrBug() {
        return this.http.get(this.userUrl + 'countInPrBug/')
            .map(response => response.json())
    };

    countOnHoldBug() {
        return this.http.get(this.userUrl + 'countOnHoldBug/')
            .map(response => response.json())
    };

    issueTaskList() {
        return this.http.get(this.userUrl + 'issueTaskList/')
            .map(response => response.json())
    };

    countTaskList() {
        return this.http.get(this.userUrl + 'countTaskList/')
            .map(response => response.json())
    };

    countNewTask() {
        return this.http.get(this.userUrl + 'countNewTask/')
            .map(response => response.json())
    };

    countCpltTask() {
        return this.http.get(this.userUrl + 'countCpltTask/')
            .map(response => response.json())
    };

    countInPrTask() {
        return this.http.get(this.userUrl + 'countInPrTask/')
            .map(response => response.json())
    };

    countOnHoldTask() {
        return this.http.get(this.userUrl + 'countOnHoldTask/')
            .map(response => response.json())
    };

}