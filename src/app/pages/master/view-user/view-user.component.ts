import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable, Subscription, timer } from 'rxjs';
import { IdleTimeoutServiceService } from '../../../shared/idle-timeout-service.service';

@Component({
  selector: 'ngx-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  public _counter: number = 0;
  public _status: string = "Initialized.";
  private _timer: Observable<number>;
  private _timerSubscription: Subscription;
  private _idleTimerSubscription: Subscription;
  empId: string = "";
  userName: string = "";
  name: string = "";
  section_name: string = "";
  userType_name: string = "";
  value1: string = "";
  surname: string = "";
         tel: number = 0;
         email: string = "";
        user_password: string = "";
  registerForm: FormGroup;
  source: LocalDataSource = new LocalDataSource();
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<ViewUserComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder,private changeRef: ChangeDetectorRef,
    private idleTimeoutSvc: IdleTimeoutServiceService) { }

  ngOnInit() {
    this.service.getDataUser(); 
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.empId = JSON.parse(localStorage.getItem('userListEmpId'));
    this.userName = JSON.parse(localStorage.getItem('currentUser'));
    this.name = JSON.parse(localStorage.getItem('name'));
    this.section_name = JSON.parse(localStorage.getItem('section_name'));
    this.userType_name =JSON.parse(localStorage.getItem('userType_name'));
    this.value1 = JSON.parse(localStorage.getItem('value1'));
    this.surname = JSON.parse(localStorage.getItem('surname'));
    this.tel = JSON.parse(localStorage.getItem('tel'));
    this.email = JSON.parse(localStorage.getItem('email'));
    this.user_password = JSON.parse(localStorage.getItem('password'));
    this.startCounter();
    this._idleTimerSubscription = this.idleTimeoutSvc.timeoutExpired.subscribe(res => {
      localStorage.setItem('currentUser', null);
      localStorage.setItem('passwordUser', null);
      localStorage.setItem('sectionID', null);
      //localStorage.removeItem('currentUser');
      this.router.navigate(['./login']);
    })
  }
  public startCounter() {
    if (this._timerSubscription) {
        this._timerSubscription.unsubscribe();
    }

    this._counter = 0;
    this._timer = timer(1000, 1000);
    this._timerSubscription = this._timer.subscribe(n => {
        this._counter++;
        this.changeRef.markForCheck();
    });
  }
  cancel() {
    this.startCounter();
    this.idleTimeoutSvc.resetTimer();
    this.ref.close();
  }
}
