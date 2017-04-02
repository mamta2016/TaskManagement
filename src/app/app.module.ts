import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule} from '@angular/router';
import { ROUTES } from './app.routes';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';

//activate and deactivate
import { ActivateGuard } from './app.activate.guard';
import { DeactivateGuard } from './app.deactivate.guard';

//pipe 
import { ProjectsPipe } from './pipes/projects.pipe.ts';

/* services*/
import { IssuesService } from './services/issues.service';
import { ProjectService } from './services/project.service';
import { UsersService } from './services/users.service';
import { LoaderService } from './services/loader.service';

/* Feature Modules for login  */
//import { LoginModule } from './login/login.module';
import { LoginComponent } from './login/login.component';
import {LoginService} from './login/login.service';
import { HeaderComponent } from './header/header.component.ts';
import { FooterComponent } from './footer/footer.component.ts';
import { AdminComponent } from './admin/admin.component';
import { ManagerComponent } from './manager/manager.component';
import { LeadComponent } from './lead/lead.component';
import { UserComponent } from './user/user.component';
/* onClick  in AdminComponent */
import { ProjectComponent } from './admin/project/project.component';
import { UsersComponent } from './admin/users/users.component';

/* onProjectClick in ProjectComponent */
import { IssuesComponent } from './issues/issues.component';
//issues child
import { IssueComponent } from './issues/issue/issue.component';
import { allIssuesComponent } from './issues/allIssues/allIssues.component';
//import { NewIssueComponent } from './issues/newissue/newissue.component';
import { BugComponent } from './issues/bug/bug.component';
import { TaskComponent } from './issues/task/task.component';

/* Modules for sidenav*/
import { MyProjectsComponent } from './user/sidenav-list-items/myprojects.component';
import { TasksComponent } from './user/sidenav-list-items/tasks.component';
import { BugsComponent } from './user/sidenav-list-items/bugs.component';
import { CalendarComponent } from './user/sidenav-list-items/calendar.component';
import { TimesheetComponent } from './user/sidenav-list-items/timesheet.component';
import { ReportsComponent } from './user/sidenav-list-items/reports.component';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
// App is our top level component
import { App } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InteralStateType } from './app.service';
import { Home } from './home';
import { About } from './about';
import { NoContent } from './no-content';
import { XLarge } from './home/x-large';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InteralStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    ImageCropperComponent,
    ProjectsPipe,
    LoginComponent,
    BugComponent,
    TaskComponent,
    allIssuesComponent,
   // NewIssueComponent,
    IssueComponent,
    IssuesComponent,
    HeaderComponent,
    FooterComponent,
    AdminComponent,
    ProjectComponent,
    UsersComponent,
    ManagerComponent,
    LeadComponent,
    UserComponent,
    MyProjectsComponent,
    TasksComponent,
    BugsComponent,
    CalendarComponent,
    TimesheetComponent,
    ReportsComponent,
    App,
    About,
    Home,
    NoContent,
    XLarge
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    //LoginModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    LoaderService,
    IssuesService,
    ProjectService,
    UsersService,
    LoginService,
    ActivateGuard,
    DeactivateGuard,
    //UsersPipe,
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) { }

  // hmrOnInit(store: StoreType) {
  //   if (!store || !store.state) return;
  //   console.log('HMR store', JSON.stringify(store, null, 2));
  //   // set state
  //   this.appState._state = store.state;
  //   // set input values
  //   if ('restoreInputValues' in store) {
  //     let restoreInputValues = store.restoreInputValues;
  //     setTimeout(restoreInputValues);
  //   }

  //   this.appRef.tick();
  //   delete store.state;
  //   delete store.restoreInputValues;
  // }

  // hmrOnDestroy(store: StoreType) {
  //   const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
  //   // save state
  //   const state = this.appState._state;
  //   store.state = state;
  //   // recreate root elements
  //   store.disposeOldHosts = createNewHosts(cmpLocation);
  //   // save input values
  //   store.restoreInputValues = createInputTransfer();
  //   // remove styles
  //   removeNgStyles();
  // }

  // hmrAfterDestroy(store: StoreType) {
  //   // display new elements
  //   store.disposeOldHosts();
  //   delete store.disposeOldHosts;
  // }

}

