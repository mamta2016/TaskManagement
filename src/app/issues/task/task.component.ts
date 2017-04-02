import { Component, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { IssuesService } from 'app/services/issues.service';
import { UsersService } from 'app/services/users.service';
import { ProjectService } from 'app/services/project.service';
import { LoaderService } from 'app/services/loader.service';

@Component({
    selector: 'task',
    templateUrl: 'task.component.html',
    styleUrls: ['task.component.css']
})
export class TaskComponent {
    issuesTask=[];
    public userUrl = 'http://localhost:9000/';
    public id: any;
    public _id: any;
    public tracker: any;
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
    public users = [];
    public projectSltUsr = [];
    public StrProjectId: string;

    constructor(public loader:LoaderService, public projectService: ProjectService, public router: Router, public usersService: UsersService, public http: Http, public issuesService: IssuesService) {
        this.projectList();
        this.issueTaskList();
        this.usersList();
    }

    projectList() {
        let ths = this;
        var projectDtl = localStorage.getItem("projectId&N");
        var projectId = JSON.parse(projectDtl);
        ths.StrProjectId =  projectId._id;

        this.projectService.projectList()
            .subscribe((project) => {
                for (var i = 0; i < project.length; i++) {
                    //for (var j = 0; j < issue.length; j++) {
                    if (ths.StrProjectId == project[i]._id) {
                        ths.projectSltUsr.push(project[i].users);

                    }
                }
            })
    };

    issueTaskList() {
        let ths = this;

        ths.loader.showLoader();

        var projectDtl = localStorage.getItem("projectId&N");
        var project = JSON.parse(projectDtl);
        ths.projectId =  project._id;
        ths.projectName = project.name;

        this.issuesService.issueTaskList()
            .subscribe((res) => {
                for (var i = 0; i < res.length; i++) {
                    if (res[i].projectId == ths.projectId) {
                        //this.issues=res;
                        ths.issuesTask.push(res[i]);
                        ths.loader.hideLoader();
                    }
                }
            });
    };

    usersList() {
        let ths = this;
        this.usersService.usersList()
            .subscribe(users => {
                for (var i = 0; i < ths.projectSltUsr.length; i++) {
                    for (var j = 0; j < users.length; j++) {
                        var length = ths.projectSltUsr[i];
                        for (var k = 0; k < length.length; k++) {
                            if (users[j]._id == length[k]) {
                                ths.users.push(users[j]);
                                //ths.assnedUsrId.push(users[j]._id);
                            }
                        }
                    }

                }
            });
    };

    editBtn(issue) {
        this._id = issue._id;
        this.id = issue.id;
        this.tracker = issue.tracker;
        this.subject = issue.subject;
        this.description = issue.description;
        this.status = issue.status;
        this.assignee = issue.assignee;
        this.priority = issue.priority;
        this.sDate = issue.sDate;
        this.eDate = issue.eDate;
        this.image = issue.image;

        let addModel: any = $('#newIssue');
        addModel.modal('show');

        // let defaultCreateBtn = <HTMLImageElement>document.getElementById("update");
        // defaultCreateBtn.style.display = 'block';
        // let updateBtn = <HTMLImageElement>document.getElementById("create");
        // updateBtn.style.display = 'none';
    };


    updateBtn() {
        let ths = this;
        if (!this.id || !this.tracker || !this.subject || !this.description || !this.status || !this.assignee || !this.priority || !this.sDate || !this.eDate) {

        } else {

            ths.loader.showLoader();

            let list = JSON.stringify({
                "_id": this._id, "id": this.id, "tracker": this.tracker, "subject": this.subject, "description": this.description, "status": this.status,
                "assignee": this.assignee, "priority": this.priority, "sDate": this.sDate, "eDate": this.eDate, "image": this.image
            });
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.http.post(this.userUrl + 'updateIssue/', list, { headers: headers })
                .subscribe(data => {
                    ths.issueTaskList();

                    ths.loader.hideLoader();
                },
                err => console.log('Error is..:' + err)
                );

            let addModel: any = $('#newIssue');
            addModel.modal('hide');
        }
    };
}