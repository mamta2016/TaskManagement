import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { IssuesService } from 'app/services/issues.service';
import { UsersService } from 'app/services/users.service';
import { ProjectService } from 'app/services/project.service';
import { LoginService } from 'app/login/login.service';
import { LoaderService } from 'app/services/loader.service';

@Component({
    moduleId: module.id,
    selector: 'bugs',
    templateUrl: 'bugs.component.html',
})
export class BugsComponent {
    public userUrl = 'http://localhost:9000/';
    public issuesBug = [];
    public bugList = [];
    public _id: any;
    public tracker: any;
    public subject: any;
    public description: any;
    public status: any;
    public assignee: any;
    public assnedUsrId: any;
    public priority: any;
    public sDate: any;
    public eDate: any;
    public image: any;
    isUpdatelicked = false;
    iscreateClicked = false;
    public users = [];
    public assignedUser: String;
    public projects = [];
    public selectedProject :String;
    public projectId: any;
    public projectName: any;
    public projectSltUsr = [];
    public StrProjectId: string;

    constructor(public loader:LoaderService, public http: Http, private router: Router, private route: ActivatedRoute, public loginService: LoginService, public projectService: ProjectService, public usersService: UsersService, public issuesService: IssuesService) {

        this.sltProjectbugList();
        this.issueBugList();
        this.projectList();
        this.usersList();

        //this.BugList();

    }

    sltProjectbugList() {
        debugger;
        let ths = this;

      //  ths.loader.showLoader();
        
         ths.bugList = [];
        // let select = <HTMLImageElement>document.getElementById("selectedProject");
        // select.value = '';
        for (var j = 0; j < ths.issuesBug.length; j++) {
            if (ths.issuesBug[j].projectId == this.selectedProject) {
                ths.bugList = [];
                // this.bugList = this.issuesBug.filter((issue)=> issue.projectId == ths.selectedProject);
               ths.bugList.push(ths.issuesBug[j]);
              // ths.loader.hideLoader();
            }
        }
    }

    issueBugList() {
        debugger;
        let ths = this;
        let addModel: any = $('#search-select')
        addModel.dropdown();
        var userDtl = localStorage.getItem("userDetail");
        var assignedUser = JSON.parse(userDtl);
        assignedUser._id;
        assignedUser.name;
        ths.issuesService.issueBugList()
            .subscribe((res) => {
                for (var i = 0; i < res.length; i++) {
                    if (res[i].assnedUsrId == assignedUser._id) {
                        ths.issuesBug.push(res[i]);
                    }
                }
            });
    };

    projectList() {
        debugger;
        let ths = this;
        var projectDtl = localStorage.getItem("projectId&N");
        var projectId = JSON.parse(projectDtl);
        ths.StrProjectId = projectId._id;

        this.projectService.projectList()
            .subscribe((project) => {
                // for (var i = 0; i < project.length; i++) {
                //     for (var j = 0; j < ths.issuesBug.length; j++) {
                //         if (ths.issuesBug[j].projectId == project[i]._id) {
                //             ths.projects.push(project[i]);
                //             //ths.sltProjectbugList();
                //         }
                //     }
                // }
                 ths.projects = project
                // ths.sltProjectbugList();
            });
    };


    // usersList() {
    //     let ths = this;
    //     this.usersService.usersList()

    //         .subscribe((users) => {
    //             ths.users = users;
    //         });
    // };

    usersList() {
        let ths = this;
        this.usersService.usersList()
            .subscribe(users => {
                for (var i = 0; i < ths.projects.length; i++) {
                    for (var j = 0; j < users.length; j++) {
                        var length = ths.projects[i].users;
                        for (var k = 0; k < length.length; k++) {
                            if (users[j]._id == length[k]) {
                                ths.users.push(users[j]);
                            }
                        }
                    }

                }
            });
    };


    editBtn(issue) {
        this.isUpdatelicked = true;
        this.iscreateClicked = false;
        this._id = issue._id;
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

    };

    uploadImage(event: any) {
        let ths = this;
        let file = event.target.files[0];
        let reader = new FileReader();

        reader.onload = function (e: any) {
            let imgSrc = e.target.result;
            let image = <HTMLImageElement>document.getElementById("selectedImage");
            image.src = imgSrc;
            ths.image = image.src;
        };
        reader.readAsDataURL(file);
    }


    updateBtn(issue) {
        let ths = this;
        for (var i = 0; i < ths.users.length; i++) {
            if (ths.users[i]._id == ths.assnedUsrId) {
                ths.assignee = ths.users[i].name.first;
            }
        }

        if (!this.tracker || !this.subject || !this.description || !this.status || !this.assignee || !this.priority || !this.sDate || !this.eDate) {

        } else {

            ths.loader.showLoader();

            let list = JSON.stringify({
                "_id": this._id, "tracker": this.tracker, "subject": this.subject, "description": this.description, "status": this.status,
                "assignee": this.assignee, "priority": this.priority, "sDate": this.sDate, "eDate": this.eDate, "image": this.image,
                assnedUsrId: this.assnedUsrId
            });
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.http.post(this.userUrl + 'updateIssue/', list, { headers: headers })
                .subscribe((response) => {
                    ths.bugList = [];
                    ths.bugList.push(response);
                    ths.loader.hideLoader();

                },
                err => console.log('Error is..:' + err)
                );

            let addModel: any = $('#newIssue');
            addModel.modal('hide');

        }

    };

}