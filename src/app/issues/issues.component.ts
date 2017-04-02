import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'app/services/project.service';
import { UsersService } from 'app/services/users.service';

@Component({
    selector: 'issues',
    templateUrl: 'issues.component.html',
    styleUrls: ['issues.component.css']
})
export class IssuesComponent {
    public users  = [];
    public userRole = [];
    
    constructor(private router: Router,public projectService: ProjectService, public usersService: UsersService,) {
        this.usersList();
        this.userRoleList();
    }

    usersList() {
    this.usersService.usersList()
      .subscribe((users) => {
        return this.users = users;
      });
  };

  userRoleList() {
        this.usersService.userRoleList()
            .subscribe((users) => {
                return this.userRole = users;
            });
        }

    goToHome() {
        this.router.navigate(["/project"]);
    }

}