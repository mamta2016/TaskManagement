import {Component, Injectable} from '@angular/core'
import {HmrState} from '@angular-hmr';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoaderService { 
isLoading:boolean=false;

  showLoader() {
    document.getElementById("preLoading").style.display = "block";
  }
  
  hideLoader() {
    document.getElementById("preLoading").style.display = "none";
  }

} 