import { CanDeactivate } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';

export class DeactivateGuard implements CanDeactivate<AdminComponent> {

  canDeactivate(component: AdminComponent) {
    let can = component.canDeactivate();
    console.log('DeactivateGuard#canDeactivate called, can: ', can);
    if (!can) {
      // alert('Deactivation blocked');
      return false;
    }

    return true;
  }

}