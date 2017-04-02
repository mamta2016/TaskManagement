import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { ProjectService } from 'app/services/project.service';
import { AppState, InteralStateType } from './app.service';
import { UsersService } from 'app/services/users.service';
import { LoaderService } from 'app/services/loader.service';
import { UsersPipe } from './pipes/users.pipe.ts';

@Component({
    selector: 'project',
    templateUrl: 'project.component.html',
    styleUrls: ['project.component.css']
})
export class ProjectComponent {

    public userUrl = 'http://localhost:9000/';
    public isCreateClicked: boolean = false;
    public isUpdateClicked: boolean = false;
    public users = [];
    public names: any;
    public projects = [];
    public _id: any;
    public name: String;
    public description: String;
    public list: any;
    public selectedUser = [];
    public allUsers = [];


    constructor(public loader: LoaderService, public router: Router, public projectService: ProjectService, public usersService: UsersService, public http: Http) {
        this.projectList();
        this.usersList();
        this.userRoleList();
    }

    addNew() {
        let ths = this;
        this.name = '';
        this.description = '';
        this.allUsers = [];
        this.usersService.userRoleList()
            .subscribe(res => {
                for (var i = 0; i < res.length; i++) {
                    res[i].isSelectedUser = false;
                    ths.allUsers.push(res[i]);
                }
            });

        let defaultCreateBtn = <HTMLImageElement>document.getElementById("update");
        defaultCreateBtn.style.display = 'none';
        let updateBtn = <HTMLImageElement>document.getElementById("create");
        updateBtn.style.display = 'block';

        let createModel: any = $('#newProject');
        createModel.modal('show');

    }

    projectList() {
        let ths = this;

        this.loader.showLoader();
        this.projectService.projectList()
            .subscribe((project) => {
                this.projects = project;
                ths.loader.hideLoader();
            });
    };


    userRoleList() {
        let ths = this;
        this.usersService.userRoleList()
            .subscribe(res => {
                for (var i = 0; i < res.length; i++) {
                    res[i].isSelectedUser = false;
                    ths.allUsers.push(res[i]);
                }
            });
    }


    createBtn() {
        let ths = this

        for (var i = 0; i < ths.allUsers.length; i++) {
            if (this.allUsers[i].isSelectedUser == true) {
                ths.selectedUser.push(ths.allUsers[i]._id);
            }
        }

        if (!this.name || !this.description) {
            //ths. validation();
        } else {

            let list = JSON.stringify({ "name": this.name, "description": this.description, "users": ths.selectedUser });
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.http.post(this.userUrl + 'createProject/', list, { headers: headers })
                .subscribe((Response) => {
                    ths.projectList();
                },
                err => console.log('Error is..:' + err)
                );

            let addModel: any = $('#newProject');
            addModel.modal('hide');
        }

    }


    editBtn(project) {
        let ths = this;

        this._id = project._id;
        this.name = project.name;
        this.description = project.description;

        let defaultCreateBtn = <HTMLImageElement>document.getElementById("update");
        defaultCreateBtn.style.display = 'block';
        let updateBtn = <HTMLImageElement>document.getElementById("create");
        updateBtn.style.display = 'none';

        for (var i = 0; i < ths.allUsers.length; i++) {
            ths.allUsers[i].isSelectedUser = false;
            for (var j = 0; j < project.users.length; j++) {
                if (ths.allUsers[i]._id == project.users[j]) {
                    ths.allUsers[i].isSelectedUser = true;
                }
            }
        }

        let editModel: any = $('#newProject');
        editModel.modal('show');

    }

    delBtnPopup(Project) {
        this.list = JSON.stringify({ _id: Project._id });
        let delModel: any = $('#deletPopUp')
        delModel.modal('show');
    }

    deleteProject() {
        let headers = new Headers();
        let ths = this;

        headers.append('Content-Type', 'application/json');
        this.http.post(this.userUrl + 'deleteProject/', this.list, { headers: headers })
            .map(response => response.json())
            .subscribe(data => {
                ths.projectList();
            },
            err => console.log('Error is..:' + err)
            );
        console.log("success data");
    }

    ngOnInit() {
        this.projectList();
    }


    updateBtn() {
        let ths = this
        debugger;

        for (var i = 0; i < ths.allUsers.length; i++) {
                if (this.allUsers[i].isSelectedUser == true) {
                    this.selectedUser.push(ths.allUsers[i]._id);
                }
            }

        if (!this.name || !this.description) {

        } else {


            let list = JSON.stringify({ "_id": ths._id, "name": this.name, "description": this.description, "users": ths.selectedUser });
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.http.post(this.userUrl + 'updateProject/', list, { headers: headers })
                .map(response => response.json())
                .subscribe(data => {
                ths.projectList();
            },
            err => console.log('Error is..:' + err)
            );
            console.log("Updated");

            let addModel: any = $('#newProject');
            addModel.modal('hide');

            let defaultCreateBtn = <HTMLImageElement>document.getElementById("update");
            defaultCreateBtn.style.display = 'none';
            let updateBtn = <HTMLImageElement>document.getElementById("submit");
            updateBtn.style.display = 'block';
        }
    };

    usersList() {
        this.usersService.usersList()
            .subscribe((users) => {
                return this.users = users;
            });
    };


    onProject(project) {
        this.isCreateClicked = false;
        this.isUpdateClicked = false;
        let ths = this;
        let list = JSON.stringify({ "_id": project._id, "name": project.name });
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var _id: string;
        _id = project._id;
        localStorage.setItem("projectId&N", list);

        this.router.navigate(["/issues"]);

    }

    cancelBtn() {
        let ths = this;
        this.name = '';
        this.description = '';
        ths.selectedUser = [];

        let defaultCreateBtn = <HTMLImageElement>document.getElementById("update");
        defaultCreateBtn.style.display = 'none';
        let updateBtn = <HTMLImageElement>document.getElementById("submit");
        updateBtn.style.display = 'block';
    }

    goToHome() {
        this.router.navigate(["/admin"]);
    }

    logOut() {
        this.router.navigate(["/login"]);
    }

}