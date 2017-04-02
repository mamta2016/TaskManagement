import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { IssuesService } from 'app/services/issues.service';
import { UsersService } from 'app/services/users.service';
import { ProjectService } from 'app/services/project.service';
import { LoginService } from 'app/login/login.service';
import { LoaderService } from 'app/services/loader.service';

@Component({
    moduleId: module.id,
    selector: 'tasks',
    styleUrls: ['tasks.component.css'],
    templateUrl: 'tasks.component.html',
})
export class TasksComponent {
public issuesTask = [];
public userUrl = 'http://localhost:9000/';
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
    isUpdatelicked = false;
    iscreateClicked = false;
    public users = [];
    public assignedUser:String;
    public projects = [];
    public selectedProject: any;
    public projectId: any;
    public projectName: any;
    public projectSltUsr = [];
    public StrProjectId: string;

    constructor(public loader:LoaderService, public router: Router, public http: Http,public loginService: LoginService, public projectService: ProjectService, public usersService: UsersService, public issuesService: IssuesService) {
      this.usersList();
      this.issueTaskList();
      this.projectList();
    }

issueTaskList() {
        let ths = this;
        var userDtl = localStorage.getItem("userDetail");
        var assignedUser = JSON.parse(userDtl);
        assignedUser._id;
        assignedUser.name;

          ths.loader.showLoader();

        this.issuesService.issueTaskList()
            .subscribe((res) => {
                for (var i = 0; i < res.length; i++) {
                        if (res[i].assnedUsrId == assignedUser._id) {
                            ths.issuesTask.push(res[i]);
                            ths.loader.hideLoader();
                        }
                }
            });
    };

    usersList() {
        let ths = this;
        this.usersService.usersList()
        
            .subscribe((users) => {
                ths.users = users;
            });
    };

        projectList() {
        debugger;
        let ths = this;

       // ths.loader.showLoader();
        
        var projectDtl = localStorage.getItem("projectId&N");
        var projectId = JSON.parse(projectDtl);
        ths.StrProjectId = projectId._id;

        this.projectService.projectList()
            .subscribe((project) => {
                for (var i = 0; i < project.length; i++) {
                    for (var j = 0; j < ths.issuesTask.length; j++) {
                        if (ths.issuesTask[j].projectId == project[i]._id) {
                            ths.projects.push(project[i]);
                            ths.loader.hideLoader();
                        }
                    }
                }
                // ths.projects = project
                // ths.sltProjectbugList();
            });
    };

}










// <div id="div1">
//             <h5 style='background-color:gray;' class="ui attached header">
//               None
//             </h5>
//             <div class="ui attached segment">
//               <p>My first Project</p>
//             </div>
//         </div>
//         <div id="div2">
//             <h5 style='background-color:green;' class="ui attached header">
//               Low
//             </h5>
//             <div class="ui attached segment">
//               <p>My first Project</p>
//             </div>
//         </div>
//         <div id="div3">
//             <h5 style='background-color:orange;' class="ui attached header">
//               Medium
//             </h5>
//             <div class="ui attached segment">
//               <p>My first Project</p>
//             </div>
//         </div>