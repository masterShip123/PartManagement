import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { FormBuilder } from '@angular/forms';
import { NbToastrService, NbDialogRef } from '@nebular/theme';
import { checkToolList } from '../../../shared/index.model';
import { Observable, Subscription, timer } from 'rxjs';
import { IdleTimeoutServiceService } from '../../../shared/idle-timeout-service.service';

@Component({
  selector: 'ngx-check-tool-add',
  templateUrl: './check-tool-add.component.html',
  styleUrls: ['./check-tool-add.component.scss']
})
export class CheckToolAddComponent implements OnInit {
  public _counter: number = 0;
  public _status: string = "Initialized.";
  private _timer: Observable<number>;
  private _timerSubscription: Subscription;
  private _idleTimerSubscription: Subscription;
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  preventDuplicates = false;
  currentUser : string;
  checkPrimarykey : number = 0;
  showValid: boolean = false;
  source: LocalDataSource = new LocalDataSource();
  validEmail:boolean = false;
  private data: string[];
  private datacheckToolList: checkToolList[];
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<CheckToolAddComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder,private changeRef: ChangeDetectorRef,
    private idleTimeoutSvc: IdleTimeoutServiceService) { 
    
  }
  ngOnInit() {
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.service.getDataDepartment();
    this.service.getDataFactoryLine();
    this.service.getDataProductionLine();
    this.service.getDataMicTiming();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.service.getLogin().subscribe((Response) =>{
        this.data = Response;
    });
    this.service.getCheckToolList().then((dataa) => {
      this.source.load(dataa);
      this.datacheckToolList = dataa;
      for(let row of this.datacheckToolList){
         console.log("Chek : "+row.checkTool_ID)
      }
      console.log("DataList :"+dataa);
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
  
  submit(checkToolid,checkToolname,timing,StatusValue) {
    this.startCounter();
    this.idleTimeoutSvc.resetTimer();
    // console.log(empid+" "+idsection+" "+miccode+" "+usertype);
    this.service.getCheckToolList().then((dataa) => {
      this.datacheckToolList = dataa;
      for(let row of this.datacheckToolList){
         console.log("Datas : "+row.checkTool_ID+", "+checkToolid)

         if(row.checkTool_ID == checkToolid){
          this.checkPrimarykey++; 
          
        }
      }
      console.log("T : "+this.checkPrimarykey)
      if(this.checkPrimarykey > 0 ){
        this.showValid = true;
        this.checkPrimarykey = 0;
      }else{
        this.service.postDataCheckTool(checkToolid,checkToolname,timing,StatusValue) 
        this.service.getCheckToolList().then((data) => {
          this.ref.close(this.source.load(data));
         });
      }
    
    });
    // console.log("Ck2 : "+this.checkPrimarykey)
    // if(this.checkPrimarykey){
    //   console.log("Check Primary : "+this.checkPrimarykey)
    //   this.service.postDataCheckTool(checkToolid,checkToolname,timing,StatusValue) 
    //   this.service.getCheckToolList().then((data) => {
    //     // this.source.update(data.section_name,sectionname);
    //     // this.source.update(data.section_ID,sectionid);
    //     this.ref.close(this.source.load(data));
    //       // window.location.reload();
    //    });
    // }
    // console.log("Check Primary : "+this.checkPrimarykey)
    // this.service.postDataCheckTool(checkToolid,checkToolname,timing,StatusValue) 
    // this.service.getCheckToolList().then((data) => {
    //   // this.source.update(data.section_name,sectionname);
    //   // this.source.update(data.section_ID,sectionid);
    //   this.ref.close(this.source.load(data));
    //     // window.location.reload();
    //  });
     
    
     
  }

}
