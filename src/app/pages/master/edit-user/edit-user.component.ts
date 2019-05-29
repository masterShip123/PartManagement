import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable, Subscription, timer } from 'rxjs';
import { IdleTimeoutServiceService } from '../../../shared/idle-timeout-service.service';

@Component({
  selector: 'ngx-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
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
  password: string = "";
  email: string = "";
  section_IDUser: string = "";
  tel: string = "";
  surname: string = "";
  activeFlag: string = "";
  userType_ID: string = "";
  registerForm: FormGroup;
  source: LocalDataSource = new LocalDataSource();
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<EditUserComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder,private changeRef: ChangeDetectorRef,
    private idleTimeoutSvc: IdleTimeoutServiceService) { }

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
  ngOnInit() {
    this.service.getDataUser(); 
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.empId = JSON.parse(localStorage.getItem('userListEmpId'));
    this.userName = JSON.parse(localStorage.getItem('currentUser'));
    this.name = JSON.parse(localStorage.getItem('name'));
    this.section_name = JSON.parse(localStorage.getItem('section_name'));
    this.section_IDUser = JSON.parse(localStorage.getItem('section_IDUser'));
    this.userType_ID = JSON.parse(localStorage.getItem('userType_ID'));
    this.userType_name = JSON.parse(localStorage.getItem('userType_name'));
    this.value1 = JSON.parse(localStorage.getItem('value1'));
    this.activeFlag = JSON.parse(localStorage.getItem('activeFlag'));
    this.password = JSON.parse(localStorage.getItem('password'));
    this.email = JSON.parse(localStorage.getItem('email'));
    this.tel = JSON.parse(localStorage.getItem('tel'));
    this.surname = JSON.parse(localStorage.getItem('surname'));
    
    this.registerForm = this.formBuilder.group({
      
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
      
  });
      this.startCounter();
      this._idleTimerSubscription = this.idleTimeoutSvc.timeoutExpired.subscribe(res => {
        localStorage.setItem('currentUser', null);
        localStorage.setItem('passwordUser', null);
        localStorage.setItem('sectionID', null);
        //localStorage.removeItem('currentUser');
        this.router.navigate(['./login']);
      })
  }
  get f() { return this.registerForm.controls; }
  cancel() {
    this.startCounter();
    this.idleTimeoutSvc.resetTimer();
    this.ref.close();
  }
  save(surname,password,email,Tel,Name,sectionValue,StatusValue,UsertypeValue){
      // this.empId;
      this.startCounter();
    this.idleTimeoutSvc.resetTimer();
      this.service.putUserList(this.empId,surname,password,email,Tel,Name,sectionValue,StatusValue,UsertypeValue);
        // this.ref.close();
        this.service.getUserList().then((data) => {
          this.ref.close(this.source.load(data));
            // window.location.reload();
         });
        
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

}
