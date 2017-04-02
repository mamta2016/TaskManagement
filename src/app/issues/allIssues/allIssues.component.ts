import { Component, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { IssuesService } from 'app/services/issues.service';
import { UsersService } from 'app/services/users.service';
import { LoaderService } from 'app/services/loader.service';
import { ProjectService } from 'app/services/project.service';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { lyResizingCroppingImagesModule } from 'angular2-resizing-cropping-image';

@Component({
    selector: 'aIssues',
    templateUrl: 'allIssues.component.html',
    styleUrls: ['allIssues.component.css'],

})
export class allIssuesComponent {
    //public issues = [];
    public userUrl = 'http://localhost:9000/';
    public issues = [];
    public _id: any;
    public tracker: any;
    public subject: any;
    public description: any;
    public status: any;
    public assignee: any;
    public priority: any;
    public sDate: any;
    public eDate: any;
    public image: any;
    public projectId: any;
    public projectName: any;
    public assnedUsrId: any;
    public isUpdatelicked = false;
    public iscreateClicked = false;
    public list: any;
    public users = [];
    public projectSltUsr = [];
    public StrProjectId: string;
    public data: any;
    //cropperSettings: CropperSettings;
    public cropper:any;


    // @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

    constructor(public loader: LoaderService, public router: Router, public http: Http, public projectService: ProjectService,
        public usersService: UsersService, public issuesService: IssuesService, private element: ElementRef) {

        // this.cropperSettings = new CropperSettings();
        // this.cropperSettings.width = 100;
        // this.cropperSettings.height = 100;

        // this.cropperSettings.croppedWidth = 100;
        // this.cropperSettings.croppedHeight = 100;

        // this.cropperSettings.canvasWidth = 400;
        // this.cropperSettings.canvasHeight = 300;
        
        // this.cropperSettings.minWidth = 10;
        // this.cropperSettings.minHeight = 10;

        // this.cropperSettings.rounded = false;
        // this.cropperSettings.noFileInput = true;
        // this.data = {};

        this.issuesList();
        this.projectList();
        this.usersList();
    }


   uploadImage($event) {
        debugger;
        //let image: any = new Image();
        let file = $event.target.files[0];
        let reader = new FileReader();
        let ths = this;

        reader.onload = function (e: any) {
            let imgSrc = e.target.result;
            let image = <HTMLImageElement>document.getElementById("selectedImage");
            image.src = imgSrc;
            if(ths.cropper) {
                ths.cropper.destroy();
            }
            ths.cropper = new Cropper(image, {
              aspectRatio: 16 / 9,
              crop: function(e) {
               
              }
            });  
            let newImage =  ths.cropper.getCroppedCanvas().toDataURL('image/svg');          
            ths.image = newImage;
        };

        reader.readAsDataURL(file);
    }

    projectList() {
        let ths = this;
        var projectDtl = localStorage.getItem("projectId&N");
        var projectId = JSON.parse(projectDtl);
        ths.StrProjectId = projectId._id;

        this.projectService.projectList()
            .subscribe((project) => {
                for (var i = 0; i < project.length; i++) {
                    //for (var j = 0; j < issue.length; j++) {
                    if (ths.StrProjectId == project[i]._id) {
                        ths.projectSltUsr.push(project[i].users);

                    }
                }
            })
    };


    issuesList() {
        let ths = this;

        ths.loader.showLoader();

        this.issuesService.issueList()
            .subscribe((res) => {
                for (var i = 0; i < res.length; i++) {
                    if (res[i].projectId == ths.StrProjectId) {
                        ths.issues.push(res[i]);
                        ths.loader.hideLoader();
                    }
                }
            });
    };

    usersList() {
        let ths = this;
        this.usersService.usersList()
            .subscribe(users => {
                for (var i = 0; i < ths.projectSltUsr.length; i++) {
                    for (var j = 0; j < users.length; j++) {
                        var length = ths.projectSltUsr[i];
                        for (var k = 0; k < length.length; k++) {
                            if (users[j]._id == length[k]) {
                                ths.users.push(users[j]);
                                //ths.assnedUsrId.push(users[j]._id);
                            }
                        }
                    }

                }
            });
    };


    newIssue() {
        this.isUpdatelicked = false;
        this.iscreateClicked = true;
        this.tracker = '';
        this.subject = '';
        this.description = '';
        this.status = '';
        this.assignee = '';
        this.priority = '';
        this.sDate = '';
        this.eDate = '';
        this.image = '';
        this.assnedUsrId = '';


        let defaultCreateBtn = <HTMLImageElement>document.getElementById("update");
        defaultCreateBtn.style.display = 'none';
        let updateBtn = <HTMLImageElement>document.getElementById("create");
        updateBtn.style.display = 'block';

        let addModel: any = $('#newIssue');
        addModel.modal('show');

    }

    createBtn(data) {
        let ths = this;
        for (var i = 0; i < ths.users.length; i++) {
            if (ths.users[i]._id == ths.assnedUsrId) {
                ths.assignee = ths.users[i].name.first;
            }
        }

        var projectDtl = localStorage.getItem("projectId&N");
        var project = JSON.parse(projectDtl);
        ths.projectId = project._id;
        ths.projectName = project.name;

        this.isUpdatelicked = false;
        this.iscreateClicked = true;
        if (!this.tracker || !this.subject || !this.description || !this.status || !this.assignee || !this.priority || !this.sDate || !this.eDate) {

        } else {

            let list = JSON.stringify({
                projectId: ths.projectId, projectName: ths.projectName, tracker: this.tracker, subject: this.subject, description: this.description,
                status: this.status, assignee: this.assignee, priority: this.priority, sDate: this.sDate, eDate: this.eDate, image: ths.image,
                assnedUsrId: ths.assnedUsrId
            });
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.http.post(this.userUrl + 'newIssue/', list, { headers: headers })
                .subscribe((data) => {

                    ths.issues = [];
                    ths.issuesList();

                    // ths.projectList();
                },
                err => console.log('Error is..:' + err)
                );

            let addModel: any = $('#newIssue');
            addModel.modal('hide');
        }
    }


    editBtn(issue) {
        let ths = this;
        this.isUpdatelicked = true;
        this.iscreateClicked = false;
        this._id = issue._id;
        this.tracker = issue.tracker;
        this.subject = issue.subject;
        this.description = issue.description;
        this.status = issue.status;
        this.assignee = issue.assignee;
        this.priority = issue.priority;
        this.sDate = issue.sDate;
        this.eDate = issue.eDate;
        this.image = issue.image;
        // this.assnedUsrId = issue.assignee;

        let defaultCreateBtn = <HTMLImageElement>document.getElementById("update");
        defaultCreateBtn.style.display = 'block';
        let updateBtn = <HTMLImageElement>document.getElementById("create");
        updateBtn.style.display = 'none';

        let addModel: any = $('#newIssue');
        addModel.modal('show');
    };


    updateBtn(issue) {
        this.isUpdatelicked = true;
        this.iscreateClicked = false;
        let ths = this;
        for (var i = 0; i < ths.users.length; i++) {
            if (ths.users[i]._id == ths.assnedUsrId) {
                ths.assignee = ths.users[i].name.first;
            }
        }
        if (!this.tracker || !this.subject || !this.description || !this.status || !this.priority || !this.sDate || !this.eDate) {

        } else {


            let list = JSON.stringify({
                "_id": this._id, "tracker": this.tracker, "subject": this.subject, "description": this.description, "status": this.status,
                "assignee": this.assignee, "priority": this.priority, "sDate": this.sDate, "eDate": this.eDate, "image": ths.image,
                assnedUsrId: this.assnedUsrId
            });
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.http.post(this.userUrl + 'updateIssue/', list, { headers: headers })
                .subscribe((response) => {
                    ths.issues = [];
                    ths.issuesList();

                    //ths.projectList();

                },
                err => console.log('Error is..:' + err)
                );

            let addModel: any = $('#newIssue');
            addModel.modal('hide');

            let defaultCreateBtn = <HTMLImageElement>document.getElementById("update");
            defaultCreateBtn.style.display = 'none';
            let updateBtn = <HTMLImageElement>document.getElementById("create");
            updateBtn.style.display = 'block';


        }
    };

    delBtnPopup(issue) {
        this.list = JSON.stringify({ _id: issue._id });
        let delModel: any = $('#deletPopUp')
        delModel.modal('show');
    }

    deleteBtn() {
        let headers = new Headers();
        let ths = this;

        headers.append('Content-Type', 'application/json');
        this.http.post(ths.userUrl + 'deleteIssue/', ths.list, { headers: headers })
            .subscribe(data => {
                ths.issues = [];
                ths.issuesList();
                ths.projectList();

            },
            err => console.log('Error is..:' + err)
            );
        console.log("success data");
    };

    onBugClick() {
        this.router.navigate(["/issues/bug"]);
    }

    onTaskClick() {
        this.router.navigate(["/issues/task"]);
    }

}