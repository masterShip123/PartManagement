import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { SectionEditComponent } from '../section-edit/section-edit.component';
import { Observable, Subscription, timer } from 'rxjs';
import { IdleTimeoutServiceService } from '../../../shared/idle-timeout-service.service';

@Component({
  selector: 'ngx-factory-edit',
  templateUrl: './factory-edit.component.html',
  styleUrls: ['./factory-edit.component.scss']
})
export class FactoryEditComponent implements OnInit {
  public _counter: number = 0;
  public _status: string = "Initialized.";
  private _timer: Observable<number>;
  private _timerSubscription: Subscription;
  private _idleTimerSubscription: Subscription;
  factory_ID: string = "";
  factory_Name: string = "";
  activeFlag: string = "";
  value1: string = "";
  registerForm: FormGroup;
  source: LocalDataSource = new LocalDataSource();
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<FactoryEditComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder,private changeRef: ChangeDetectorRef,
    private idleTimeoutSvc: IdleTimeoutServiceService) { }


  ngOnInit() {
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.service.getDataDepartment();
    this.factory_ID = JSON.parse(localStorage.getItem('factory_ID'));
    this.factory_Name = JSON.parse(localStorage.getItem('factory_Name'));
    this.value1 = JSON.parse(localStorage.getItem('value1'));
    this.activeFlag = JSON.parse(localStorage.getItem('activeFlag2'));
    this.service.getFactoryList().then((newdata) => {
      this.source.load(newdata);
      //console.log("Shipp : "+data.password)
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
  save(factoryname,StatusValue){
    this.startCounter();
    this.idleTimeoutSvc.resetTimer();
      this.service.putFactoryList(factoryname,this.factory_ID,StatusValue);
      // this.ref.close();
      this.service.getFactoryList().then((data) => {
        // this.source.update(data.section_name,sectionname);
        // this.source.update(data.section_ID,sectionid);
          // window.location.reload();
          this.ref.close(this.source.load(data));
       });
    
    
  }

}
