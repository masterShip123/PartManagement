import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService, NbDialogService } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { ViewUserComponent } from '../../../pages/master/view-user/view-user.component';
import { ChangpasswordComponent } from '../../../changpassword/changpassword.component';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;
  userName: string = "";
  userMenu = [{ title: 'Change Password' }, { title: 'Log out', link: '../logot'  }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserData,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService,private dialogService: NbDialogService) {

                menuService.onItemClick().subscribe(( event ) => {
                  this.onItemSelection(event.item.title);
                });
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.nick);
      this.userName = JSON.parse(localStorage.getItem('currentUser'));
  }

  onItemSelection( title ) {
    if ( title === 'Change Password' ) {
      // Do something on Log out
      this.dialogService.open(ChangpasswordComponent);
    } 
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
