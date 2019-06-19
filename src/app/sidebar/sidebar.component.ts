import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
   
  currentUrl: string;

//orig  constructor(private router: Router) { 
//orig    router.events.subscribe((_: NavigationEnd) => this.currentUrl = _.url);
//orig   }

//this is the solution to the above - evidently this works as a filter to only set currentUrl when NavigationEnd is in play
// https://stackoverflow.com/questions/52045246/angular-js-6-1-0-variable-not-being-passed-to-the-view

   constructor(private router: Router) {
    router.events.pipe(
      filter((evt) => evt instanceof NavigationEnd)
    ).subscribe((_: NavigationEnd) => {
      this.currentUrl = _.url;
      // easier to see stackblitz 
      //console.log("CURRENT", this.currentUrl)
    });
   }

  ngOnInit() {
  }

}
