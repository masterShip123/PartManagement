import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { tableFilename, requestHeader, user } from '../../../shared/index.model';
import { IndexService } from '../../../shared/index.service';
import { DatePipe } from '@angular/common';
import { EmailService } from '../../../shared/email.service';
import { Observable, Subscription, timer } from 'rxjs';
import { IdleTimeoutServiceService } from '../../../shared/idle-timeout-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-repair-request',
  templateUrl: './repair-request.component.html',
  styleUrls: ['./repair-request.component.scss']
})
export class RepairRequestComponent implements OnInit {
  public _counter: number = 0;
  public _status: string = "Initialized.";
  private _timer: Observable<number>;
  private _timerSubscription: Subscription;
  private _idleTimerSubscription: Subscription;
  @ViewChild('labelImport')
  myDate = new Date();
  labelImport: ElementRef;
  name:string;
  ourFile: File; 
  formImport: FormGroup;
  fileToUpload: File = null;
  filename: string = "";
  empList: Array<tableFilename> = [];
  private tbUser:user[];
  today: number = Date.now();
  requestno: String = "";
  private tbrequestHeader:requestHeader[];
  constructor(private router: Router,public service: IndexService,private datePipe: DatePipe,private _emailService: EmailService,private changeRef: ChangeDetectorRef,
    private idleTimeoutSvc: IdleTimeoutServiceService) {
    this.formImport = new FormGroup({
      importFile: new FormControl('', Validators.required)
    });
    
  }

  ngOnInit() {
    console.log(this._emailService.test);
    console.log(JSON.parse(localStorage.getItem('sectionID')));
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
  onFileChange(files: FileList) {
    this.startCounter();
    this.idleTimeoutSvc.resetTimer();
    this.empList = [];
    this.empList.length = 0;
    this.filename = "";
    console.log("Log : "+files.length);
    for(var  i = 0 ; i < files.length; i++){
      let tablefilename = new tableFilename();
      tablefilename.name = files.item(i).name;
      this.empList.push(tablefilename);
    }
    for (let index = 0; index < this.empList.length; index++) {
      if(index == this.empList.length-1){
        this.filename = this.filename+this.empList[index].name;
      }else{
        this.filename = this.empList[index].name + "," + this.filename;    
      }
    }
    console.log("Name : "+this.filename )
    // this.labelImport.nativeElement.innerText = Array.from(files)
    //   .map(f => f.name)
    //   .join(', '); 
    // this.fileToUpload = files.item(0);
  }
  removeLanguague(empLists, index){
    this.startCounter();
    this.idleTimeoutSvc.resetTimer();
    this.filename = "";
    this.empList.splice(index, 1);

    // console.log(this.empList.length);
    for (let index = 0; index < this.empList.length; index++) {
     
      if(index == this.empList.length-1){
        this.filename = this.filename+this.empList[index].name;
      }else{
        this.filename = this.empList[index].name + "," + this.filename;    
      }
    }
    console.log("Name : "+this.filename )
  
}
createRequest(){
  this.startCounter();
    this.idleTimeoutSvc.resetTimer();
  var sectionEmail = new Array();
  var splitUserTypeLogin;
  var splitUserTypeDatabase;
  const myFormattedDate = this.datePipe.transform(this.today, 'yyyyMM');
  this.requestno = "PE"+myFormattedDate;
  this.service.getRequestHeader(myFormattedDate).subscribe((Response) => {
    //console.log("Ship : "+Response.user_name); 
    this.tbrequestHeader = Response; 
    var count = String(this.tbrequestHeader[0].count + 999);
    var checkDigit  = count.length;
    if(checkDigit == 1){
      count = "000"+count;
    }else if(checkDigit == 2){
      count = "00"+count;
    }else if(checkDigit == 3){
      count = "0"+count;
    }else{
      count = count;
    }
    this.requestno =  this.requestno + count;
    console.log( this.requestno);
    
  })
  localStorage.setItem('requestnoSection', JSON.stringify(this.requestno));
  const  requestDate = this.datePipe.transform(this.today, 'yyyy-MM-dd');
  const  requstTime = this.datePipe.transform(this.today, 'HH:mm:ss');
  var  requstBy = JSON.parse(localStorage.getItem('Username'))+" "+JSON.parse(localStorage.getItem('surname'))
  var sectionName = JSON.parse(localStorage.getItem('sectionname'))
  splitUserTypeLogin = JSON.parse(localStorage.getItem('Usertype')).split("UT");

  this.service.getRequestHeaderwhereDepartment(JSON.parse(localStorage.getItem('sectionID'))).subscribe((Response) => {
    this.tbUser = Response;
    for(let i=0;i<this.tbUser.length;i++){
      splitUserTypeDatabase = this.tbUser[i].userType_ID.split("UT");
      console.log(" splitUserTypeDatabase : "+splitUserTypeDatabase[1]);
      if(+splitUserTypeLogin[1] < +splitUserTypeDatabase[1] && +splitUserTypeDatabase[1] == (+splitUserTypeLogin[1]+1)){
        sectionEmail.push(this.tbUser[i].email);
        console.log("user.email : "+this.tbUser[i].email);
     }
     console.log("user.userType_ID : "+this.tbUser[i].userType_ID);
    }

      console.log("sectionEmail : "+sectionEmail);
  var user = {
    requestno: JSON.parse(localStorage.getItem('requestnoSection')),
    formEmail : JSON.parse(localStorage.getItem('UseremailUT4')),
    userPassword: JSON.parse(localStorage.getItem('passwordUserUT4')),
    lengthEmail: sectionEmail.length,
    sendToemail: sectionEmail,
  }
  console.log("User : "+user.sendToemail);
  console.log("UserlengthEmail : "+user.lengthEmail);
  this._emailService.sendEmail("http://localhost:3000/sendmail", user).subscribe(
      data => {
        let res:any = data; 
        console.log(
          `👏 > 👏 > 👏 > 👏 ${user.formEmail} is successfully register and mail has been sent and the message id is ${res.messageId}`
        );
      },
      err => {
        console.log(err);
      }
    );  
  })
}
}