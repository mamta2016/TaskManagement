import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivateGuard } from 'app/app.activate.guard';
import { DeactivateGuard } from 'app/app.deactivate.guard';

@Component({
    selector: 'admin',
    templateUrl: 'admin.component.html',
    styleUrls: ['admin.component.css']
})
export class AdminComponent {
    onClick;
    constructor(public activateGuard: ActivateGuard, public router: Router, ) {

    }
    project(){
        let ths = this;
        this.router.navigate(["/project"]);
        ths.checkboxChanged(ths);
    }
    users(){
        let ths = this;
        this.router.navigate(["/users"]);
        ths.checkboxChanged(ths);
    }

  canDeactivate() {
    return this.onClick;
  }

//   checkboxChanged(checked) {
//     this.onClick = checked;
//   }

checkboxChanged(canActivate) {
    this.activateGuard.setCanActivate(canActivate);
  }

  logOut() {
        this.router.navigate(["/login"]);
    }

}