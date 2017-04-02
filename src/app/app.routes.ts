import { Routes, RouterModule ,CanActivate} from '@angular/router';
//import { CanActivate } from '@angular/router';
import { Home } from './home';
import { About } from './about';

//activate and deactivate
import { ActivateGuard } from 'app/app.activate.guard';
import { DeactivateGuard } from 'app/app.deactivate.guard';

//loginPage
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
//header and footer
import { HeaderComponent } from './header/header.component.ts';
import { FooterComponent } from './footer/footer.component.ts';
//Login roles 
import { AdminComponent } from './admin/admin.component';
import { ManagerComponent } from './manager/manager.component';
import { LeadComponent } from './lead/lead.component';
import { UserComponent } from './user/user.component';

//admin role 
import { ProjectComponent } from './admin/project/project.component';
import { UsersComponent } from './admin/users/users.component';
//issues component
import { IssuesComponent } from './issues/issues.component';
import { IssueComponent } from './issues/issue/issue.component';
//import { NewIssueComponent } from './issues/newissue/newissue.component';
import { BugComponent } from './issues/bug/bug.component';
import { TaskComponent } from './issues/task/task.component';
import { allIssuesComponent } from './issues/allIssues/allIssues.component';

//users sideNav component
import { MyProjectsComponent } from './user/sidenav-list-items/myprojects.component';
import { TasksComponent } from './user/sidenav-list-items/tasks.component';
import { BugsComponent } from './user/sidenav-list-items/bugs.component';
import { CalendarComponent } from './user/sidenav-list-items/calendar.component';
import { TimesheetComponent } from './user/sidenav-list-items/timesheet.component';
import { ReportsComponent } from './user/sidenav-list-items/reports.component';

import { NoContent } from './no-content';
import { DataResolver } from './app.resolver';
//import { sidenavRouting } from './user/user.routes';
export const ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', component: LoginComponent },
  { path: 'admin', component: AdminComponent,},
  { path: 'header', component: HeaderComponent},
  { path: 'footer', component: FooterComponent, },
  { path: 'manager', component: ManagerComponent, },
  { path: 'lead', component: LeadComponent,},
  {
    path: 'user', component: UserComponent,
    children: [
      { path: '', redirectTo: 'bugs', pathMatch: 'full' },
      { path: 'myProjects', component: MyProjectsComponent },
      { path: 'tasks', component: TasksComponent },
      { path: 'bugs', component: BugsComponent },
      { path: 'calendar/:id', component: CalendarComponent },
      { path: 'timesheet', component: TimesheetComponent },
      { path: 'reports', component: ReportsComponent },
    ]
  },
  //admin page 
  { path: 'project', component: ProjectComponent,},
  { path: 'users', component: UsersComponent,},
  //issues page
  {
    path: 'issues', component: IssuesComponent,
    //  canActivate: [ActivateGuard],
    children: [
      { path: '', redirectTo: 'aIssues', pathMatch: 'full' },
      { path: 'issue', component: IssueComponent },
      { path: 'bug', component: BugComponent},
      { path: 'task', component: TaskComponent},
      { path: 'aIssues', component: allIssuesComponent},
    ]
  },
  { path: 'home', component: Home },
  { path: 'about', component: About },
  { path: 'detail', loadChildren: () => System.import('./+detail') },
  { path: '**', redirectTo: '' },
  //...sidenavRouting,
];
