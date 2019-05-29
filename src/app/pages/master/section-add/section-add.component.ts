import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NbGlobalPosition, NbDialogRef, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { FormBuilder } from '@angular/forms';
import { sectionList } from '../../../shared/index.model';
import { Observable, Subscription, timer } from 'rxjs';
import { IdleTimeoutServiceService } from '../../../shared/idle-timeout-service.service';

@Component({
  selector: 'ngx-section-add',
  templateUrl: './section-add.component.html',
  styleUrls: ['./section-add.component.scss']
})
export class SectionAddComponent implements OnInit {
  public _counter: number = 0;
  public _status: string = "Initialized.";
  private _timer: Observable<number>;
  private _timerSubscription: Subscription;
  private _idleTimerSubscription: Subscription;
  checkPrimarykey : number = 0;
  showValid: boolean = false;
  private sectionList: sectionList[];

  first = "";
  count = 0;
  userId= "";

  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  preventDuplicates = false;
  currentUser : string;
  status: NbToastStatus = NbToastStatus.SUCCESS;
  showMsgSucces: boolean = false;
  source: LocalDataSource = new LocalDataSource();
  validEmail:boolean = false;
  private data: string[];
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<SectionAddComponent>,
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
  ngOnInit() {
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.service.getDataDepartment();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.service.getLogin().subscribe((Response) =>{
        this.data = Response;
    });
    this.service.getSectionList().then((dataa) => {
      this.source.load(dataa);
      console.log(this.source.load(dataa));
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
  cancel() {
    this.startCounter();
    this.idleTimeoutSvc.resetTimer();
    this.ref.close();
  }
  
  submit(department,sectionid,sectionname,StatusValue) {
    this.startCounter();
    this.idleTimeoutSvc.resetTimer();
    // console.log(empid+" "+idsection+" "+miccode+" "+usertype);
    this.service.getCheckToolList().then((dataa) => {
      this.sectionList = dataa;
      for(let row of this.sectionList){
        //  console.log("Datas : "+row.factory_ID+", "+factoryid)

         if(row.section_ID == sectionid){
          this.checkPrimarykey++; 
          
        }
      }
      console.log("T : "+this.checkPrimarykey)
      if(this.checkPrimarykey > 0 ){
        this.showValid = true;
        this.checkPrimarykey = 0;
      }else{
        this.service.postDataSection(department,sectionid,sectionname,StatusValue)
        this.service.getSectionList().then((data) => {
          this.ref.close(this.source.load(data));
         });
      }
    
    });
    //  if(this.service.postDataSection(department,sectionid,sectionname,StatusValue) != null){
    //    console.log("Succes");
    //  }
    //  this.service.getSectionList().then((data) => {
    //   this.ref.close(this.source.load(data));
    //  });
  }

}
