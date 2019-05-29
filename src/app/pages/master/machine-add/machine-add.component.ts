import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { FormBuilder } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { machineList } from '../../../shared/index.model';
import { Observable, Subscription, timer } from 'rxjs';
import { IdleTimeoutServiceService } from '../../../shared/idle-timeout-service.service';

@Component({
  selector: 'ngx-machine-add',
  templateUrl: './machine-add.component.html',
  styleUrls: ['./machine-add.component.scss']
})
export class MachineAddComponent implements OnInit {
  public _counter: number = 0;
  public _status: string = "Initialized.";
  private _timer: Observable<number>;
  private _timerSubscription: Subscription;
  private _idleTimerSubscription: Subscription;
  checkPrimarykey : number = 0;
  showValid: boolean = false;
  private machineList: machineList[];

  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  preventDuplicates = false;
  currentUser : string;
  
  source: LocalDataSource = new LocalDataSource();
  validEmail:boolean = false;
  private data: string[];
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<MachineAddComponent>,
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
    this.service.getDataFactoryLine();
    this.service.getDataProductionLine();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.service.getLogin().subscribe((Response) =>{
        this.data = Response;
    });
    this.service.getMachineList().then((dataa) => {
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
  
  submit(machinename,machineid,productionLine,StatusValue) {
    this.startCounter();
    this.idleTimeoutSvc.resetTimer();
    // console.log(empid+" "+idsection+" "+miccode+" "+usertype);
    this.service.getCheckToolList().then((dataa) => {
      this.machineList = dataa;
      for(let row of this.machineList){
        //  console.log("Datas : "+row.factory_ID+", "+factoryid)

         if(row.machine_ID == machineid){
          this.checkPrimarykey++; 
          
        }
      }
      console.log("T : "+this.checkPrimarykey)
      if(this.checkPrimarykey > 0 ){
        this.showValid = true;
        this.checkPrimarykey = 0;
      }else{
        this.service.postDataMachine(machinename,machineid,productionLine,StatusValue)
        this.service.getMachineList().then((data) => {
          this.ref.close(this.source.load(data));
       });
      }
    
    });
    //  if(this.service.postDataMachine(machinename,machineid,productionLine,StatusValue) != null){
    //    console.log("Succes");
    //  }
    //  this.service.getMachineList().then((data) => {
    
    //     this.ref.close(this.source.load(data));
    //  });
     
  }

}
