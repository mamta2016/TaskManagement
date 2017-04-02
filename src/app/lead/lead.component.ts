import { Component } from '@angular/core';

@Component({
    selector: 'lead',
    template: `
    <div id="headerMain">
        <h3 style="color: white;cursor: pointer;" class="ui right floated header">
            Welcome to Lead
        </h3>
    </div>
   <div style="border: 1px solid red; padding: 1rem;">
	<h4>Child Component with Select</h4>
	<div style="border: 1px solid orange; padding: 1rem">
		<ng-content select="header"></ng-content>
	</div>
	<div style="border: 1px solid green; padding: 1rem">
		<ng-content select="section"></ng-content>
	</div>
	<div style="border: 1px solid pink; padding: 1rem">
		<ng-content select=".class-select"></ng-content>
	</div>
	<div style="border: 1px solid purple; padding: 1rem">
		<ng-content select="footer"></ng-content>
	</div>
</div>

    
    `
})
export class LeadComponent {

num = 0;
message = "helloooo I am in Team";

  increment() {
    this.num++;
  }
}