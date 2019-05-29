import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../shared/index.service';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { user } from '../shared/index.model';
import { Observable, Subscription, timer } from 'rxjs';
import { IdleTimeoutServiceService } from '../shared/idle-timeout-service.service';

@Component({
  selector: 'ngx-changpassword',
  templateUrl: './changpassword.component.html',
  styleUrls: ['./changpassword.component.scss']
})
export class ChangpasswordComponent implements OnInit {
  public _counter: number = 0;
  public _status: string = "Initialized.";
  private _timer: Observable<number>;
  private _timerSubscription: Subscription;
  private _idleTimerSubscription: Subscription;
  userName: string = "";
  password: string = "";
  data: string = "";
  private tbUser:user[];
  formData  : user;
  registerForm: FormGroup;
  source: LocalDataSource = new LocalDataSource();
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<ChangpasswordComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder,private changeRef: ChangeDetectorRef,
    private idleTimeoutSvc: IdleTimeoutServiceService) { }

  ngOnInit() {
    this.userName = JSON.parse(localStorage.getItem('currentUser'));
    this.service.getUserview(this.userName).subscribe((Response) => {
      this.tbUser = Response; 
        console.log("Test :"+JSON.stringify(this.tbUser[0].user_password));
         localStorage.setItem('passwordUser', JSON.stringify(this.tbUser[0].user_password));
        this.password = JSON.parse(localStorage.getItem('passwordUser'));
    }) 
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
  changPass(newpassword){
    this.startCounter();
    this.idleTimeoutSvc.resetTimer();
    this.service.putChangPassWord(this.userName,newpassword);
    this.ref.close();
  }
  cancel() {
    this.startCounter();
    this.idleTimeoutSvc.resetTimer();
    this.ref.close();
  }

}
