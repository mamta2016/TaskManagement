import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LoginComponent }   from './login.component';
import {LoginService} from './login.service';

@NgModule({
    imports: [CommonModule,HttpModule, FormsModule],
    exports: [LoginComponent],
    declarations: [LoginComponent],
    providers: [LoginService],
})
export class LoginModule { 
    
}
