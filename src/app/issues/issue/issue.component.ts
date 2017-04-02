import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { IssuesService } from 'app/services/issues.service';
import { LoaderService } from 'app/services/loader.service';

@Component({
    selector: 'issue',
    templateUrl: 'issue.component.html',
    styleUrls: ['issue.component.css']
})
export class IssueComponent {
    public userUrl = 'http://localhost:9000/';
    public totalB = Number;
    public InProgressB = Number;
    public NewB = Number;
    public CompletedB = Number;
    public OnHoldB =Number;
    public totalT = Number;
    public InProgressT = Number;
    public NewT = Number;
    public OnHoldT =Number;
    public CompletedT = Number;
    public issuesBug = [];
    public id: any;
    public _id: any;
    public tracker:any;
    public subject: any;
    public description: any;
    public status: any;
    public assignee: any;
    public priority: any;
    public sDate: any;
    public eDate: any;
    public image: any;
    public projectId: any;
    public projectName: any;

    constructor(public loader:LoaderService, public router: Router, public http: Http, public issuesService: IssuesService) {
        this.countBugList();
        this.countNewBug();
        this.countCpltBug();
        this.countInPrBug();
        this.countOnHoldBug();
        
        this.countTaskList();
        this.countNewTask();
        this.countCpltTask();
        this.countInPrTask();
        this.countOnHoldTask();
    }
    onBugClick() {
        this.router.navigate(["/issues/bug"]);
    }
    onTaskClick() {
        this.router.navigate(["/issues/task"]);
    }

// bug count list

    countBugList() {
        let ths = this;
        let list = JSON.stringify({
                tracker: this.tracker, subject: this.subject, description: this.description, status: this.status,
                assignee: this.assignee, priority: this.priority, sDate: this.sDate, eDate: this.eDate, image: this.image
            });

        var projectDtl = localStorage.getItem("projectId&N");
        var project = JSON.parse(projectDtl);
        ths.projectId =  project._id;
        ths.projectName = project.name;
        
        this.issuesService.countBugList()
            .subscribe((res) => {
                this.totalB = res;
            });
    };


    countNewBug() {
        this.issuesService.countNewBug()
            .subscribe((res) => {
                 this.NewB = res;
            });
    };

    countCpltBug() {
        this.issuesService.countCpltBug()
            .subscribe((res) => {
                 this.CompletedB = res;
            });
    };

    countInPrBug() {
        this.issuesService.countInPrBug()
            .subscribe((res) => {
                 this.InProgressB = res;
            });
    };

    countOnHoldBug() {
        this.issuesService.countOnHoldBug()
            .subscribe((res) => {
                 this.OnHoldB = res;
            });
    };

    //task count list

    countTaskList() {
        this.issuesService.countTaskList()
            .subscribe((res) => {
                 this.totalT = res;
            });
    };

    countNewTask() {
        this.issuesService.countNewTask()
            .subscribe((res) => {
                 this.NewT = res;
            });
    };

    countCpltTask() {
        this.issuesService.countCpltTask()
            .subscribe((res) => {
                 this.CompletedT = res;
            });
    };

    countInPrTask() {
        this.issuesService.countInPrTask()
            .subscribe((res) => {
                 this.InProgressT = res;
            });
    };

    countOnHoldTask() {
        this.issuesService.countOnHoldTask()
            .subscribe((res) => {
                 this.OnHoldT = res;
            });
    };

}