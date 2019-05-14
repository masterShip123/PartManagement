import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
  constructor(private route: ActivatedRoute, private router: Router) { }
  ngOnInit() {
    if(JSON.parse(localStorage.getItem('currentUser')) == null){
      this.router.navigate(['../login']);
    }
  }
}
