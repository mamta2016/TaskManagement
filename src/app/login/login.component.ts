import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { UsersService } from 'app/services/users.service';
import { ActivateGuard } from 'app/app.activate.guard';
//import { DeactivateGuard } from 'app/app.deactivate.guard';

@Component({
    moduleId: module.id,
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent {
    public userUrl = 'http://localhost:9000/';
    public isLogin: boolean;
    public _id: any;
    public email: any;
    public password: any;
    public role: any;
    public users: any;
    public data: any;
    public image: any;
    public canActivate:any;
    public cropper:any;

    constructor(public activateGuard: ActivateGuard, public router: Router, private loginService: LoginService, public usersService: UsersService, public http: Http, private route: ActivatedRoute) {

    }
ngOnInit(){

//        var image = document.getElementById('image');
// var cropper = new Cropper(image, {
//   aspectRatio: 16 / 9,
//   crop: function(e) {
//     console.log(e.detail.x);
//     console.log(e.detail.y);
//     console.log(e.detail.width);
//     console.log(e.detail.height);
//     console.log(e.detail.rotate);
//     console.log(e.detail.scaleX);
//     console.log(e.detail.scaleY);
//   }
// });
}
 
    uploadImage($event) {
        debugger;
        //let image: any = new Image();
        let file = $event.target.files[0];
        let reader = new FileReader();
        let ths = this;

        reader.onload = function (e: any) {
            let imgSrc = e.target.result;
            var image = <HTMLImageElement>document.getElementById("selectedImage");
            image.src = imgSrc;
            if(ths.cropper) {
                ths.cropper.destroy();
            }
            ths.cropper = new Cropper(image, {
              aspectRatio: 16 / 9,
              crop: function(e) {
               
              }
            });            
            image.src = imgSrc;
            ths.image = image.src;
        };

        reader.readAsDataURL(file);
    }

    usersList() {
        this.usersService.usersList()
            .subscribe((users) => {
                this.users = users
            });
    };

    getData() {
        let ths = this;
        
        let isEmailValid = this.validateEmail(this.email);
        if (!isEmailValid || !this.email || !this.password) {

        } else {
            this.loginService.getLoginUser(this.email, this.password)
                .subscribe((res) => {
                    if ((res.msg == 'user does not exist') || (res.email == "") || (res.password == "")) {
                        let massege = <HTMLImageElement>document.getElementById("msg");
                        massege.style.display = 'block';
                    }
                    else if (res.email == ths.email && res.password == ths.password && res.role == "Admin") {
                        ths.router.navigate(['/admin']);
                        ths.checkboxChanged(ths);
                    }  else if (res.email == ths.email && res.password == ths.password && res.role == "Manager") {
                        ths.router.navigate(['/manager']);
                    } else if (res.email == ths.email && res.password == ths.password && res.role == "Lead") {
                        ths.router.navigate(['/lead']);
                    } else if (res.email == ths.email && res.password == ths.password && res.role == "User") {
                        let list = JSON.stringify({"_id":res._id, "name": res.name.first,});
                        localStorage.setItem("userDetail",list);
                        localStorage.setItem("userEmail", res.email);
                        ths.router.navigate(['/user']);
                        ths.checkboxChanged(ths);
                    } 
                },
                err => console.log('Error is..:' + err)
                )
        }

    };

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    checkboxChanged(canActivate) {
    this.activateGuard.setCanActivate(canActivate);
  }

}


