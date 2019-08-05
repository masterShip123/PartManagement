import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { timer, Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NbDialogRef, NbToastrService, NbGlobalPosition, NbGlobalPhysicalPosition } from '@nebular/theme';
import { IndexService } from '../../../shared/index.service';
import { IdleTimeoutServiceService } from '../../../shared/idle-timeout-service.service';
import { tb_RepairDetail } from '../../../shared/index.model';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'ngx-delete-repair',
  templateUrl: './delete-repair.component.html',
  styleUrls: ['./delete-repair.component.scss']
})
export class DeleteRepairComponent implements OnInit {
  public _counter: number = 0;
  public _status: string = "Initialized.";
  private _timer: Observable<number>;
  private _timerSubscription: Subscription;
  private _idleTimerSubscription: Subscription;
  // private tbsection:sectionList[];
  //countryForm: FormGroup;
  first = "";
  count = 0;
  userId= "";
  config: ToasterConfig;

  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbToastStatus = NbToastStatus.SUCCESS;
  showMsgSucces: boolean = false;
  title = 'HI there!';
  content = `I'm cool toaster!`;
  validEmail:boolean = false;
  checkPrimarykey : number = 0;
  showValid: boolean = false;
  private tb_RepairDetail:tb_RepairDetail[];
  showName: string = "";
  showPrice: string = "";
  showOther: string = "0.00";
  Showtotalc: string = "";
  public showID = "";
  public showPublicQty = "";
  checklistArray: Array<tb_RepairDetail> = [];
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<DeleteRepairComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder,private changeRef: ChangeDetectorRef,
    private idleTimeoutSvc: IdleTimeoutServiceService) { 
    
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
  registerForm: FormGroup;
  ngOnInit() {
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.service.getDatarepairDetail();
    
    //console.log("asd "+this.service.list[0].section_name);
    
       this.startCounter();
      this._idleTimerSubscription = this.idleTimeoutSvc.timeoutExpired.subscribe(res => {
        localStorage.setItem('currentUser', null);
        localStorage.setItem('passwordUser', null);
        localStorage.setItem('sectionID', null);
        //localStorage.removeItem('currentUser');
        this.router.navigate(['./login']);
      })
  }
  
  cancel() {
    this.startCounter();
    this.idleTimeoutSvc.resetTimer();
    localStorage.setItem('sectionstatus', JSON.stringify("0"));
    this.ref.close();
  }
  delete(){
    this.startCounter();
    this.idleTimeoutSvc.resetTimer();
    localStorage.setItem('sectionstatus', JSON.stringify("1"));
    var retrievedData = localStorage.getItem("sectionrepairDetail_ID");
     var movies2 = JSON.parse(retrievedData);
     console.log("retrievedData : "+retrievedData);
     for(let indexs = 0 ;indexs<movies2.length;indexs++){
      this.service.deletetb_RepairDetail(JSON.parse(localStorage.getItem('requestSectionReID')),movies2[indexs],JSON.parse(localStorage.getItem('Username')));
     }
     console.log("movies2.length : "+movies2.length + ", "+movies2[0]);
    // this.service.deletetb_RepairDetail(JSON.parse(localStorage.getItem('requestSectionReID')),JSON.parse(localStorage.getItem('sectionrepairDetail_ID')),JSON.parse(localStorage.getItem('Username')));
    this.ref.close();
  }

}
