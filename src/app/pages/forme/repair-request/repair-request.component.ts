import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { tableFilename, requestHeader, user } from '../../../shared/index.model';
import { IndexService } from '../../../shared/index.service';
import { DatePipe } from '@angular/common';
import { EmailService } from '../../../shared/email.service';
import { Observable, Subscription, timer } from 'rxjs';
import { IdleTimeoutServiceService } from '../../../shared/idle-timeout-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService, NbGlobalPosition, NbGlobalPhysicalPosition } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { LightboxModule, Lightbox } from 'ngx-lightbox';

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
  public imagePath;
  imgURL: any;
  public message: string;
  request_date: string = "";
  request_by: string = "";
   perMission: string = "";
  // requestPersonAvailable: boolean = true;
  section_d: string = "";
  urls : Array<any> = [];
  id : number = 0;
  showRequestPerson: boolean = false;
  requTypeName: string = "";  
  valueTextArea: string = "";
  statusShowHTML: string = "";
  requestNoShowHTML: string = "";
  requesttimeShowHTML: string = "";
  requestTypeShowHTML: number = 0;
  requestTypeShowHTMLValue: string = "";
  requestTypeShowHTMLValueID: string = "";
  locationShowHTMLValueID: string = "";
  locationShowHTMLValue: string = "";
  //DeclareShowError
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbToastStatus = NbToastStatus.DANGER;
  title = 'BeforeDetail Required';
  content = ``;
  leangthFileForInsert: number = 0;
  disableCreate: boolean = false;
  //////////////////
  private sub: any;
  private _album: Array<any> = [];
  constructor(private _lightbox: Lightbox,
    private toastrService: NbToastrService,
    private route: ActivatedRoute,private router: Router,
    public service: IndexService,private datePipe: DatePipe,
    private _emailService: EmailService,
    private changeRef: ChangeDetectorRef,
    private idleTimeoutSvc: IdleTimeoutServiceService) {
    this.formImport = new FormGroup({
      importFile: new FormControl('', Validators.required)
    });
    
  }

  ngOnInit() {
    this.service.getDataMicApplication();
    this.service.getDataRequestType();
    this.service.getDataLocation();
    //รับพารามิเตอร์จาก URL
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      if(params['id'] == "0"){
        this.requestTypeShowHTML = 0;
      //  this.statusShowHTML = this.service.listmicApplication[0].value1;
      this.statusShowHTML = "Create";
       console.log("ShowSTATUS: "+this.statusShowHTML);
        this.valueTextArea = "";
        this.requestNoShowHTML = "";
        this.requesttimeShowHTML = "";
         // SetPermission///////////////////////////////////////
          this.perMission = JSON.parse(localStorage.getItem('Usertype'));
          //////////////////////////////////////////////////////////////////
         
          var sectionName = JSON.parse(localStorage.getItem('sectionname'))
          this.section_d = sectionName;
          var  requstBy = JSON.parse(localStorage.getItem('Username'))+" "+JSON.parse(localStorage.getItem('surname'))
          this.request_by = requstBy;
          var  requestDate = this.datePipe.transform(this.today, 'yyyy-MM-dd');
          this.request_date = requestDate;
          console.log("RequstFrom: "+this.request_by);

          console.log(this._emailService.test);
          console.log("Section  : "+JSON.parse(localStorage.getItem('sectionID')));
      }else{
        this.service.getRequestHeaderwhereID(params['id']).subscribe((Response) => {
          this.requestNoShowHTML = params['id'];
          this.tbrequestHeader = Response; 
          this.request_date = this.tbrequestHeader[0].informDate;
          this.requesttimeShowHTML = this.tbrequestHeader[0].informTime;
          this.request_by = this.tbrequestHeader[0].user_ID;
          this.section_d = JSON.parse(localStorage.getItem('sectionname'));
          
          for(let index = 0;index< this.service.listmicApplication.length;index++){
            // console.log(this.tbrequestHeader[0].status+" : == : "+this.service.listmicApplication[index].misc_code)
            if(this.service.listmicApplication[index].misc_code == this.tbrequestHeader[0].status){
              this.statusShowHTML = this.service.listmicApplication[index].value1;
            }
          }
          this.requestTypeShowHTML = 1;
          for(let index = 0;index< this.service.listrequestTypeList.length;index++){
              if(this.service.listrequestTypeList[index].requestType_ID == this.tbrequestHeader[0].requestType_ID){
                this.requestTypeShowHTMLValueID = this.service.listrequestTypeList[index].requestType_ID;
                 this.requestTypeShowHTMLValue = this.service.listrequestTypeList[index].requestType_Name;
              }
          }
          for(let index =0; index<this.service.listLocation.length;index++){
            if(this.service.listLocation[index].location_ID == this.tbrequestHeader[0].location_ID){
              this.locationShowHTMLValueID = this.service.listLocation[index].location_ID;
              this.locationShowHTMLValue = this.service.listLocation[index].location_name;
            }
          }
          this.valueTextArea = this.tbrequestHeader[0].beforeDetail;
        });
       
      }
      console.log(this.id+" == ID")
     });
   
    this.startCounter();
  this._idleTimerSubscription = this.idleTimeoutSvc.timeoutExpired.subscribe(res => {
    localStorage.setItem('currentUser', null);
    localStorage.setItem('passwordUser', null);
    localStorage.setItem('sectionID', null);
    //localStorage.removeItem('currentUser');
    
    this.router.navigate(['./login']);
  })
  } // End ngOnInit
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
  } // End startCounter
  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'png') {
        return true;
    }
    else {
        return false;
    }
}//End Validate File
  onFileChange(files: FileList) {
    this.leangthFileForInsert = files.length;
    this.startCounter();
    this.idleTimeoutSvc.resetTimer();
    this.empList = [];
    this.empList.length = 0;
    this.filename = "";
    this.imagePath = files;
    this.urls = [];
    this._album = [];

    for(var  i = 0 ; i < files.length; i++){
      
      let tablefilename = new tableFilename();
      tablefilename.name = files.item(i).name;
      if(!this.validateFile(tablefilename.name)){
        return;
      }else{
        this.empList.push(tablefilename);
      }
       
     
    }

    console.log("Log : "+files.length);
    for(let file of this.imagePath){
      var reader = new FileReader();
      let tablefilename = new tableFilename();
      reader.onload = (files: any) => {
        // this.imgURL = reader.result; 
        this.imgURL = files.target.result;
        const src = this.imgURL;
      const caption = '';
      const thumb = this.imgURL;
      const album = {
         src: src,
         caption: caption,
         thumb: thumb
      };
        this._album.push(album);
        this.urls.push(this.imgURL);
        console.log(this.urls);
      }
            reader.readAsDataURL(file);

    }
    
    for (let index = 0; index < this.empList.length; index++) {
      if(index == this.empList.length-1){
        this.filename = this.filename+this.empList[index].name;
      }else{
        this.filename = this.empList[index].name + "," + this.filename;    
      }
    }
    console.log("Name : "+this.filename )
 
  }// End FileChang

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._album, index);
  }
 
  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
  
  removeLanguague(empLists, index){
    this.urls.splice(index,1);
    this._album.splice(index,1);
    console.log("IndexImage = "+index);
    this.startCounter();
    this.idleTimeoutSvc.resetTimer();
    this.filename = "";
    this.empList.splice(index, 1);
    console.log("Index : "+index);
    // console.log(this.empList.length);
    for (let index = 0; index < this.empList.length; index++) {
      if(index == this.empList.length-1){
        this.filename = this.filename+this.empList[index].name;
      }else{
        this.filename = this.empList[index].name + "," + this.filename;    
      }
    }
    console.log("Name : "+this.filename )
  
 }// End Remove
createRequest(requestTypess,locationList,beforeDetail){
  
  if(beforeDetail == ""){
    this.showToast(this.status, this.title, this.content);
    return;
  }
  this.disableCreate = true;
  // Set DialogSucces
  this.title = "CreateRequest SUCCESS";
  this.status = NbToastStatus.SUCCESS;
  ///////////////////
  for(let index = 0 ;index<this.service.listrequestTypeList.length;index++){
    if(this.service.listrequestTypeList[index].requestType_ID == requestTypess){
      this.requTypeName = this.service.listrequestTypeList[index].requestType_Name;
    }
  }
  this.showRequestPerson = true;
  var  requestTime = this.datePipe.transform(this.today, 'HH:mm:ss');
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
    //Insert RequestPicture
    if(this.leangthFileForInsert>0){ // Check File Leangth
      let splitFilename = this.filename.split(",");
      if(splitFilename.length >0){
        console.log("ImageLangth : "+this.imagePath.length);
        for(let index = 1;index<=splitFilename.length;index++){
          var beforPicture = "Before"+this.requestno+"_"+index;
           this.service.postDataRequestPicture(beforPicture,this.requestno,splitFilename[index-1],1,1)
        }
      }else{
        // for(let index = 0;index<this.imagePath.length;index++){
          var beforPicture = "Before"+this.requestno+"_1";
           this.service.postDataRequestPicture(beforPicture,this.requestno,this.filename,1,1)
        // }
      }
    }
  
  console.log(this.requestno+"  "+this.request_by+"  "+this.service.listmicApplication[0].misc_code);
  var statusInsert = +this.service.listmicApplication[0].misc_code + 1;
  //Insert RequsetHeadder
  this.service.postDataRequestHeader(this.requestno,
    this.request_date,
    requestTime,
    this.request_by
    ,JSON.parse(localStorage.getItem('sectionID')),
    statusInsert,
    requestTypess,
    locationList,
    beforeDetail,
    this.request_by,
    this.request_by
    ,this.request_by);
   
  })
  
  localStorage.setItem('requestnoSection', JSON.stringify(this.requestno));
  
  const  requstTime = this.datePipe.transform(this.today, 'HH:mm:ss');
  
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
    requestno: this.requestno,
    formEmail : JSON.parse(localStorage.getItem('UseremailUT4')),
    userPassword: JSON.parse(localStorage.getItem('passwordUserUT4')),
    lengthEmail: sectionEmail.length,
    sendToemail: sectionEmail,
    approveOrCancel: "Approve",
    requestyp: this.requTypeName,
    link: "http://localhost:4200/#/pages/forme/repair/"+this.requestno
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
    this.showToast(this.status, this.title, this.content);
    
  })

 }//End Create
 private showToast(type: NbToastStatus, title: string, body: string) {
  const config = {
    status: type,
    destroyByClick: this.destroyByClick,
    duration: this.duration,
    hasIcon: this.hasIcon,
    position: this.position,
    preventDuplicates: this.preventDuplicates,
  };
  const titleContent = title ? ` ${title}` : '';

 
  this.toastrService.show(
    body,
    `${titleContent}`,
    config);
 }//End showToast
}