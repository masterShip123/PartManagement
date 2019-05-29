import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { Http } from '@angular/http';
import { count } from '@swimlane/ngx-charts';
import { FormGroup, FormBuilder,Validators, FormControl } from '@angular/forms';
import { NbDialogRef, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ToasterConfig } from 'angular2-toaster';
import { LocalDataSource } from 'ng2-smart-table';
import { UserComponent } from '../user/user.component';
import { user } from '../../../shared/index.model';
import { Observable, Subscription, timer } from 'rxjs';
import { IdleTimeoutServiceService } from '../../../shared/idle-timeout-service.service';

function emailDomainValidator(control: FormControl) {
  let email = control.value;
  if (email && email.indexOf("@") != -1) {
    let [_, domain] = email.split("@");
    if (domain !== "codecraft.tv") {
      return {
        emailDomain: {
          parsedDomain: domain
        }
      }
    }
  }
  return null;
}
@Component({
  selector: 'ngx-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
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
  source: LocalDataSource = new LocalDataSource();
  validEmail:boolean = false;
  checkPrimarykey : number = 0;
  showValid: boolean = false;
  private datauser: user[];
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<AdduserComponent>,
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
    //console.log("asd "+this.service.list[0].section_name);
    this.registerForm = this.formBuilder.group({
      
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),emailDomainValidator]]
      
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
  
  submit(surname,password,Email,Tel,Name,Username,empid,idsection,miccode,usertype) {
    // console.log(empid+" "+idsection+" "+miccode+" "+usertype);
    this.startCounter();
    this.idleTimeoutSvc.resetTimer();
    this.userId = Username +""+empid;
    this.service.getCheckToolList().then((dataa) => {
      this.datauser = dataa;
      for(let row of this.datauser){
         console.log("Datas : "+row.user_ID+", "+this.userId)

         if(row.user_ID == this.userId){
          this.checkPrimarykey++; 
          
        }
      }
      console.log("T : "+this.checkPrimarykey)
      if(this.checkPrimarykey > 0 ){
        this.showValid = true;
        this.checkPrimarykey = 0;
      }else{
        this.service.postDataUser(surname,password,this.userId,Email,Tel,Name,Username,empid,idsection,miccode,usertype)
        this.service.getUserList().then((data) => {
          this.ref.close(this.source.load(data));
         });
      }
    });
    // console.log("surname :"+surname+" password: "+password+" Email:"+Email+" Tel:"+Tel+" Name:"+Name+" Username:"+Username+" empid:"+empid+" idsection: "+idsection+" miccode:"+miccode+" usertype:"+usertype+" this.userId: "+this.userId);
    
    //  if(this.service.postDataUser(surname,password,this.userId,Email,Tel,Name,Username,empid,idsection,miccode,usertype) != null){
    //    console.log("Succes");
    //   //  this.ref.close();
    //    this.showMsgSucces = true;
    //   // this.userCom.showMe(this.showMsgSucces );
    //   // this.service.getUserList().then((data) => {
    //   //   // this.source.update(data.section_name,sectionname);
    //   //   // this.source.update(data.section_ID,sectionid);
    //   //     window.location.reload();
    //   //  });
       
    //  }
    //  this.service.getUserList().then((data) => {
    //   this.ref.close(this.source.load(data));
    //  });
     
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  onChange(newValue) {
    const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (validEmailRegEx.test(newValue)) {
        this.validEmail = true;
    }else {
      this.validEmail = false;
    }

  }

}
// interface sectionList{
//        section_ID : string;
//       section_name : string;
//          activeFlag : number;
//         createDate : Date;
//         createBy : string;
//          updateDate : Date;
//         updateBy : string;
//          dept_ID : string;

// }