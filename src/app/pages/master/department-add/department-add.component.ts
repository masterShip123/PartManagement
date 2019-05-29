import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { FormBuilder } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { departmentList } from '../../../shared/index.model';
import { Observable, Subscription, timer } from 'rxjs';
import { IdleTimeoutServiceService } from '../../../shared/idle-timeout-service.service';

@Component({
  selector: 'ngx-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.scss']
})
export class DepartmentAddComponent implements OnInit {
  public _counter: number = 0;
  public _status: string = "Initialized.";
  private _timer: Observable<number>;
  private _timerSubscription: Subscription;
  private _idleTimerSubscription: Subscription;
  validEmail:boolean = false;
  private data: string[];
  checkPrimarykey : number = 0;
  showValid: boolean = false;
  private dataDepartmentList: departmentList[];

  source: LocalDataSource = new LocalDataSource();
  // validEmail:boolean = false;
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<DepartmentAddComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder,private changeRef: ChangeDetectorRef,
    private idleTimeoutSvc: IdleTimeoutServiceService) { 
    
  }
  ngOnInit() {
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.service.getDataDepartment();
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
  
  submit(departmentid,departmentname,StatusValue) {
    this.startCounter();
    this.idleTimeoutSvc.resetTimer();
    // console.log(empid+" "+idsection+" "+miccode+" "+usertype);
    this.service.getCheckToolList().then((dataa) => {
      this.dataDepartmentList = dataa;
      for(let row of this.dataDepartmentList){
         console.log("Datas : "+row.dept_ID+", "+departmentid)

         if(row.dept_ID == departmentid){
          this.checkPrimarykey++; 
          
        }
      }
      console.log("T : "+this.checkPrimarykey)
      if(this.checkPrimarykey > 0 ){
        this.showValid = true;
        this.checkPrimarykey = 0;
      }else{
        this.service.postDataDepartment(departmentid,departmentname,StatusValue)
        this.service.getDepartmentList().then((data) => {
          this.ref.close(this.source.load(data));
         });
      }
    
    });
    //  if(this.service.postDataDepartment(departmentid,departmentname,StatusValue) != null){
    //    console.log("Succes");
    //   //  this.ref.close();
       
    //   // this.ref.close();
      
      
    //  }
    //  this.service.getDepartmentList().then((data) => {
    //   this.ref.close(this.source.load(data));
  
    //  });
     
  }

}
