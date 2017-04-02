import { Component,OnInit, OnDestroy} from '@angular/core';
import { Router,ActivatedRoute  } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'calendar',
    template:`
    <div>
      Employee Id: {{id}}
    </div>
    <h1>calendarrrrrrrrr<h1>`
})
export class CalendarComponent {
private id;
  private sub: any;

    constructor(private router: Router,private route: ActivatedRoute) {

    }
  private ngOnInit() {
    this.sub = this.route.params.subscribe(pams => {
       this.id = +pams['id']; // (+) converts string 'id' to a number
    });
  }

  private ngOnDestroy() {
    this.sub.unsubscribe();
  }

}