import { Component } from '@angular/core';
import { IssuesService } from 'app/services/issues.service';
import { UsersService } from 'app/services/users.service';
import { ProjectService } from 'app/services/project.service';
import { LoginService } from 'app/login/login.service';

@Component({
    moduleId: module.id,
    selector: 'myProjects',
    templateUrl: 'myprojects.component.html',
})
export class MyProjectsComponent {
public userUrl = 'http://localhost:9000/';
public issues = [];

    constructor( public projectService: ProjectService, public usersService: UsersService, public issuesService: IssuesService) {
        let addModel: any = $('#search-select')
          addModel.dropdown();
    }

        issueList() {
        let ths = this;
       // var projectId = localStorage.getItem("projectId");
        //this.assignedUser = localStorage.getItem("userDetail");
        var userDtl = localStorage.getItem("userDetail");
        var assignedUser = JSON.parse(userDtl);
        assignedUser._id;
        assignedUser.name;
        ths.issuesService.issueList()
            .subscribe((res) => {
                for (var i = 0; i < res.length; i++) {
                    if (res[i].assnedUsrId == assignedUser._id) {
                        ths.issues.push(res[i]);
                    }
                }
            });
    };
  
}