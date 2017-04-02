import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class ActivateGuard implements CanActivate {

  private canActive: boolean = false;
  
  canActivate() {
    console.log('ActivateGuard#canActivate called, can: ', this.canActive);
    if (!this.canActive) {
     // alert('Activation blocked');
      return false;
    }

    return true;
  }

  setCanActivate(can) {
    this.canActive = can;
  }
}