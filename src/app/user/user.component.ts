import { Component,OnInit, OnDestroy} from '@angular/core';
import { Router,ActivatedRoute  } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { MyProjectsComponent } from './sidenav-list-items/myprojects.component';
import { TasksComponent } from './sidenav-list-items/tasks.component';
import { BugsComponent } from './sidenav-list-items/bugs.component';
import { CalendarComponent } from './sidenav-list-items/calendar.component';
import { TimesheetComponent } from './sidenav-list-items/timesheet.component';
import { ReportsComponent } from './sidenav-list-items/reports.component';
import { IssuesService } from 'app/services/issues.service';
import { UsersService } from 'app/services/users.service';
import { ProjectService } from 'app/services/project.service';

@Component({
    selector: 'user',
    templateUrl: 'user.component.html',
    styleUrls: ['user.component.css'],
})
export class UserComponent {
    public id: number;
    public userAddress:any;
    public sub:any;
    public issues =[];

    constructor(public http: Http,private route: ActivatedRoute,public router: Router,public issuesService: IssuesService, public projectService: ProjectService, public usersService: UsersService) {
         this.userAddress = JSON.stringify(localStorage.getItem("userEmail"));
    }
onBugsClick(){
  this.router.navigate(["/user/bugs"]);
}

onMyProjectClick(){
  this.router.navigate(["/user/myProjects"]);
}

 ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

 logOut() {
    this.router.navigate(["/login"]);
  }

  // userId() {
  //  this.userAddress = localStorage.getItem("userEmail");
  // }

}