import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Observable, Subscription, timer } from 'rxjs';
import { IdleTimeoutServiceService } from '../../../shared/idle-timeout-service.service';

@Component({
  selector: 'ngx-producyion-edit',
  templateUrl: './producyion-edit.component.html',
  styleUrls: ['./producyion-edit.component.scss']
})
export class ProducyionEditComponent implements OnInit {
  public _counter: number = 0;
  public _status: string = "Initialized.";
  private _timer: Observable<number>;
  private _timerSubscription: Subscription;
  private _idleTimerSubscription: Subscription;
  productionLine_ID: string = "";
  productionLine_name: string = "";
  factory_Name: string = "";
  value1: string = "";
  factory_ID: string = "";
  activeFlag: string = "";
  registerForm: FormGroup;
  source: LocalDataSource = new LocalDataSource();
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<ProducyionEditComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder,private changeRef: ChangeDetectorRef,
    private idleTimeoutSvc: IdleTimeoutServiceService) { }


  ngOnInit() {
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.service.getDataDepartment();
    this.service.getDataFactoryLine();
    this.productionLine_ID = JSON.parse(localStorage.getItem('productionLine_ID'));
    this.productionLine_name = JSON.parse(localStorage.getItem('productionLine_name'));
    this.factory_Name = JSON.parse(localStorage.getItem('factory_name'));
    this.value1 = JSON.parse(localStorage.getItem('value1'));
    this.factory_ID = JSON.parse(localStorage.getItem('factory_ID'));
    this.activeFlag = JSON.parse(localStorage.getItem('activeFlag'));
    this.service.getProductionLineList().then((newdata) => {
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
  save(productionLinename,factoryname,StatusValue){
    this.startCounter();
    this.idleTimeoutSvc.resetTimer();
      this.service.putProductionLineList(this.productionLine_ID,productionLinename,factoryname,StatusValue);
      // this.ref.close();
      this.service.getProductionLineList().then((data) => {
        // this.source.update(data.section_name,sectionname);
        // this.source.update(data.section_ID,sectionid);
          // window.location.reload();
          this.ref.close(this.source.load(data));
       });
    
    
  }

}
