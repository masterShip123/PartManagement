import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { tableFilename, requestHeader, user, requestPicture, tb_RepairDetail } from '../../../shared/index.model';
import { IndexService } from '../../../shared/index.service';
import { DatePipe } from '@angular/common';
import { EmailService } from '../../../shared/email.service';
import { Observable, Subscription, timer } from 'rxjs';
import { IdleTimeoutServiceService } from '../../../shared/idle-timeout-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService, NbGlobalPosition, NbGlobalPhysicalPosition, NbDialogService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { LightboxModule, Lightbox } from 'ngx-lightbox';
import { HttpClient } from '@angular/common/http';
import { AddRepairComponent } from '../add-repair/add-repair.component';
import { LocalDataSource } from 'ng2-smart-table';
import { EditRepairComponent } from '../edit-repair/edit-repair.component';
import { DeleteRepairComponent } from '../delete-repair/delete-repair.component';

@Component({
  selector: 'ngx-repair-request',
  templateUrl: './repair-request.component.html',
  styleUrls: ['./repair-request.component.scss']
})
export class RepairRequestComponent implements OnInit {
  private totalDate: Date;
  map1 = new Map<String, String>();
  map2 = new Map<String, String>();
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
  empList2: Array<tableFilename> = [];
  namePathArray: Array<any> = [];
  nameFileArray: Array<any> = [];
  namePathArray2: Array<any> = [];
  nameFileArray2: Array<any> = [];
  private tbUser:user[];
  today: number = Date.now();
  requestno: String = "";
  private tbrequestHeader:requestHeader[];
  private tbrequestPicture: requestPicture[];
  public imagePath;
  imgURL: any;
  public message: string;
  request_date: string = "";
  request_by: string = "";
   perMission: string = "";
  // requestPersonAvailable: boolean = true;
  section_d: string = "";
  urls : Array<any> = [];
  urls2 : Array<any> = [];
  id : number = 0;
  showRequestPerson: boolean = false;
  showTable: number = 0;
  requTypeName: string = "";  
  valueTextArea: string = "";
  statusShowHTML: string = "";
  statusKeyShowHTML: number = 0;
  requestNoShowHTML: string = "";
  requesttimeShowHTML: string = "";
  requestCorrentQA: number = 0;
  requestTypeShowHTML: number = 0;
  requestTypeShowHTMLValue: string = "";
  requestTypeShowHTMLValueID: string = "";
  locationShowHTMLValueID: string = "";
  locationShowHTMLValue: string = "";
  myData: any[] = [];
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
  private _album2: Array<any> = [];
  masterSelected:boolean;
  checklist:any;
  checklistArray: Array<tb_RepairDetail> = [];
  checkedList:any;
  itemIndex:any;
  itemcheckedList: tb_RepairDetail;
  math = Math;
  source: LocalDataSource = new LocalDataSource();
  showtabpermission: boolean = true;
  checkedListChekTool: Array<any> = [];
  checkedListChekToolAfther: Array<any> = [];
  checkedListMaintanan: Array<any> = [];
  checkedListMicJuddment: Array<any> = [];
  
  aftherTextArea: string = "";
  aftherCommnet: string = "";
  checkboxAttachfile1: boolean = false;
  checkboxAttachfile2: boolean = false;
  checkboxconcernQA1: boolean = false;
  checkboxconcernQA2: boolean = false;
  
  attachfilevalue: string = "";
  concernQAvalue: string = "";
  maintannaAddRepair: string = "";
  mainJuddgement: string = "" ;
  startHM: string = "";
  complezHM: string = "";
  totalMM: string = "";
  stH : string =  "";
   stHH : string = "";
   comH : string =  "";
   comHH : string = "";
   totalstH: string = "";
   totalcomH: string = "";
  constructor(private http : HttpClient,
    private _lightbox: Lightbox,
    private toastrService: NbToastrService,
    private route: ActivatedRoute,private router: Router,
    public service: IndexService,private datePipe: DatePipe,
    private _emailService: EmailService,
    private changeRef: ChangeDetectorRef,
    private idleTimeoutSvc: IdleTimeoutServiceService,
    private dialogService: NbDialogService) {
    this.formImport = new FormGroup({
      importFile: new FormControl('', Validators.required)
    });
    this.masterSelected = false;
    // this.service.getDatarepairDetail2();
      // this.checklist = [
      //   {id:1,part_ID:'Elenor Anderson',part_name:'asd',isSelected:false},
      //   {id:2,value:'Caden Kunze',value2:'aaaa',isSelected:true}];

  }

  ngOnInit() {
    this.service.getDatarepairDetail();
    this.service.getDataMicApplication();
    this.service.getDataRequestType();
    this.service.getDataLocation();
    this.service.getDataMicMaintenanceType();
    this.service.getDataCheckTool();
    this.service.getDataCheckToolOne();
    this.service.getDataMicJuddment();
    this.perMission = JSON.parse(localStorage.getItem('Usertype'));
    if(this.perMission == "UT2" || this.perMission == "UT5" || this.perMission == "UT3" || this.perMission == "UT6"){
      this.showtabpermission = false
    }
   
    //รับพารามิเตอร์จาก URL
    this.sub = this.route.params.subscribe(params => {
     
      this.id = +params['id']; // (+) converts string 'id' to a number
      if(params['id'] == "0"){
        this.requestTypeShowHTML = 0;
        this.showTable = 1 ;
      //  this.statusShowHTML = this.service.listmicApplication[0].value1;
      this.statusShowHTML = "Create";
       console.log("ShowSTATUS: "+this.statusShowHTML);
        this.valueTextArea = "";
        this.requestNoShowHTML = "";
        this.requesttimeShowHTML = "";
         // SetPermission///////////////////////////////////////
          // this.perMission = JSON.parse(localStorage.getItem('Usertype'));
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

       
        setTimeout(() => {
          var countTest = 0;
          for(let maintenanceTypes of this.service.listmicMaintenanceType){
            this. checkedListMaintanan.push(false);
            console.log("Boolean checkedListMaintanan : "+this.checkedListMaintanan[countTest]);
            countTest++;
          }
          countTest = 0;
          for(let maintenanceTypes of this.service.listmicJudgement){
            this. checkedListMicJuddment.push(false);
            console.log("Boolean checkedListMaintanan : "+this.checkedListMicJuddment[countTest]);
            countTest++;
          }
          
          console.log("SSS : "+ this.service.listRepairDetail);
          for(let indexx = 0; indexx <  this.service.listRepairDetail.length ;indexx++){
            let repairDetailArray =  new tb_RepairDetail();
            repairDetailArray.id = this.service.listRepairDetail[indexx].ID;
            repairDetailArray.repairDetail_ID = this.service.listRepairDetail[indexx].repairDetail_ID;
            repairDetailArray.part_ID = this.service.listRepairDetail[indexx].part_ID;
            repairDetailArray.part_name = this.service.listRepairDetail[indexx].part_name;
            repairDetailArray.part_price = this.service.listRepairDetail[indexx].part_price;
            repairDetailArray.part_qty = this.service.listRepairDetail[indexx].part_qty;
            repairDetailArray.other_cost = this.service.listRepairDetail[indexx].other_cost;
            repairDetailArray.total_cost = this.service.listRepairDetail[indexx].total_cost;
            repairDetailArray.isSelected = false;
            this.checklistArray.push(repairDetailArray);
          }
         }, 1000);
        this.perMission = JSON.parse(localStorage.getItem('Usertype'));
        console.log("Permission : "+ this.perMission);
        var  requstBy = JSON.parse(localStorage.getItem('Username'))+" "+JSON.parse(localStorage.getItem('surname'))
        this.request_by = requstBy;
        this.disableCreate = true;
        this.showTable = 2;
        localStorage.setItem('requestSectionReID', JSON.stringify(params['id']));
        console.log(params['id']+" Check +: " +JSON.parse(localStorage.getItem('requestSectionReID')));
        // +JSON.parse(localStorage.getItem('requestSectionReID')) 
        this.service.getRequestHeaderwhereID(params['id']).subscribe((Response) => {
          
          // console.log("SSS : "+ this.service.listRepairDetail[0].part_ID);
          this.requestNoShowHTML = params['id'];
          this.tbrequestHeader = Response; 
          this.request_date = this.tbrequestHeader[0].informDate;
          this.requesttimeShowHTML = this.tbrequestHeader[0].informTime;
          this.requestCorrentQA = this.tbrequestHeader[0].concernQA;
          
          // this.request_by = this.tbrequestHeader[0].user_ID;
          this.section_d = JSON.parse(localStorage.getItem('sectionname'));
          
        
          for(let index = 0;index< this.service.listmicApplication.length;index++){
            // console.log(this.tbrequestHeader[0].status+" : == : "+this.service.listmicApplication[index].misc_code)
            if(this.service.listmicApplication[index].misc_code == this.tbrequestHeader[0].status){
              this.statusShowHTML = this.service.listmicApplication[index].value1;
              this.statusKeyShowHTML = this.service.listmicApplication[index].misc_code;
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
        
        this.service.getRequestPicturewhereID(params['id'],"Before").subscribe((Response) => {
            this.tbrequestPicture = Response;
            console.log("Respone Picture : "+this.tbrequestPicture);
            var checkIndexPicture = 0;
            this._album = [];
            this.namePathArray = [];
            this.nameFileArray = [];
            for(let ee of Response){
              
              var pathNamePic = this.tbrequestPicture[checkIndexPicture].attchfile_path.split("\\");
              // var namePic = pathNamePic[pathNamePic.length-1].split(".");
              this.namePathArray.push(pathNamePic[pathNamePic.length-1]);
              this.nameFileArray.push(this.tbrequestPicture[checkIndexPicture].attachfile_desc);
              this.map1.set(pathNamePic[pathNamePic.length-1],this.tbrequestPicture[checkIndexPicture].attachfile_desc);
              console.log(this.tbrequestPicture[checkIndexPicture].attachfile_desc);
              const src = this.tbrequestPicture[checkIndexPicture].attchfile_path;
              const caption = '';
              const thumb = this.imgURL;
              const album = {
                src: 'http://localhost:5000/api/upload/'+pathNamePic[pathNamePic.length-1],
                caption: caption,
                thumb: thumb
              };
                this._album.push(album);
              console.log("PicturePath2 : "+pathNamePic[pathNamePic.length-1]);

                checkIndexPicture++;
            }
            // for(let index =0 ;index<this.tbrequestPicture.length;index++){
            //   console.log("PicturePath : "+this.tbrequestPicture[index].attchfile_path);
            //    var pathNamePic = this.tbrequestPicture[index].attchfile_path.split("\\");
            //     var namePic = pathNamePic[pathNamePic.length].split(".");
            //     this.namePathArray.push(namePic[0]);
            //     console.log(namePic[0]);

            // }
        });

        this.service.getRequestPicturewhereID(params['id'],"Afther").subscribe((Response) => {
          this.tbrequestPicture = Response;
          console.log("Respone Picture : "+this.tbrequestPicture);
          var checkIndexPicture = 0;
          this._album2 = [];
          this.namePathArray2 = [];
          this.nameFileArray2 = [];
          for(let ee of Response){
            
            var pathNamePic = this.tbrequestPicture[checkIndexPicture].attchfile_path.split("\\");
            // var namePic = pathNamePic[pathNamePic.length-1].split(".");
            this.namePathArray2.push(pathNamePic[pathNamePic.length-1]);
            this.nameFileArray2.push(this.tbrequestPicture[checkIndexPicture].attachfile_desc);
            this.map2.set(pathNamePic[pathNamePic.length-1],this.tbrequestPicture[checkIndexPicture].attachfile_desc);
            console.log(this.tbrequestPicture[checkIndexPicture].attachfile_desc);
            const src = this.tbrequestPicture[checkIndexPicture].attchfile_path;
            const caption2 = '';
            const thumb2 = this.imgURL;
            const album2 = {
              src: 'http://localhost:5000/api/upload/'+pathNamePic[pathNamePic.length-1],
              caption: caption2,
              thumb: thumb2
            };
              this._album2.push(album2);
            console.log("PicturePath2 : "+pathNamePic[pathNamePic.length-1]);

              checkIndexPicture++;
          }
          // for(let index =0 ;index<this.tbrequestPicture.length;index++){
          //   console.log("PicturePath : "+this.tbrequestPicture[index].attchfile_path);
          //    var pathNamePic = this.tbrequestPicture[index].attchfile_path.split("\\");
          //     var namePic = pathNamePic[pathNamePic.length].split(".");
          //     this.namePathArray.push(namePic[0]);
          //     console.log(namePic[0]);

          // }
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
  
  // for(let indexx = 0; indexx <  this.service.listmicMaintenanceType.length ;indexx++){
  //   this. checkedListMaintanan.push(false);
  //   console.log("Boolean checkedListMaintanan : "+this.checkedListMaintanan[indexx]);
  // }
  } // End ngOnInit
  onCheckboxChangeCheckTool(option, event){
    if(event.target.checked) {
       this.checkedListChekTool.push(option.checkTool_ID);
    }else{
      for(var i=0 ; i < this.service.listCheckToolOne.length; i++) {
        if(this.checkedListChekTool[i] == option.checkTool_ID) {
          this.checkedListChekTool.splice(i,1);
       }
      }
    }
  } //End OncheckBoxChang CheckTool
  onCheckboxChangeCheckToolAfther(option, event){
    if(event.target.checked) {
       this.checkedListChekToolAfther.push(option.checkTool_ID);
    }else{
      for(var i=0 ; i < this.service.listCheckToolTwo.length; i++) {
        if(this.checkedListChekToolAfther[i] == option.checkTool_ID) {
          this.checkedListChekToolAfther.splice(i,1);
       }
      }
    }
  } //End onCheckboxChangeCheckToolAfther
 
  onClickMainTen(event,ind){ 
    
      if(this.checkedListMaintanan[ind]){
        for(let j =0 ;j<this.service.listmicMaintenanceType.length;j++){
          this.checkedListMaintanan[j] = false;
        }  
        this.maintannaAddRepair = "";
      }else{
        for(let j =0 ;j<this.service.listmicMaintenanceType.length;j++){
          if(ind == j){
            this.checkedListMaintanan[ind] = true;
          }else{
            this.checkedListMaintanan[j] = false;
          }
          
        }
        this.maintannaAddRepair = event.target.value;
      console.log("Check Log : "+this.maintannaAddRepair) ;
    }
     
  }// End onClickMainTen
  onClickJudgement(event,ind){ 
    
    if(this.checkedListMicJuddment[ind]){
      for(let j =0 ;j<this.service.listmicJudgement.length;j++){
        this.checkedListMicJuddment[j] = false;
      }  
      this.mainJuddgement = "";
    }else{
      for(let j =0 ;j<this.service.listmicJudgement.length;j++){
        if(ind == j){
          this.checkedListMicJuddment[ind] = true;
        }else{
          this.checkedListMicJuddment[j] = false;
        }
        
      }
      this.mainJuddgement = event.target.value;
    console.log("Check Log : "+this.mainJuddgement) ;
  }
   
}// End onClickJudgement
  onTime(event,checkboolen){
    
    var localtime = this.datePipe.transform(this.today, 'MM/dd/yyyy');
    if(checkboolen == 1){
      this.stH = "0"+event.target.value;
      if(this.stHH == ""){
        this.stHH = "00";
      }
  
    }
    if(checkboolen == 2){
      
      this.stHH = "0"+event.target.value;
      if( this.stH == ""){
        this.stH = "00";
      }
    }
    this.totalstH = this.stH+":"+ this.stHH+":00";
    console.log("Time : "+this.totalstH);
    if(checkboolen == 3){
      this.comH  = "0"+event.target.value;
      if(this.comHH == ""){
         this.comHH  = "00";  
      }
    }
    if(checkboolen == 4){
     
      this.comHH  = "0"+event.target.value;
      if( this.comH  == ""){
         this.comH  = "00";  
      }
    }
   
    this.totalcomH = this.comH +":"+ this.comHH+":00";
    console.log("Time2 : "+this.totalcomH);
    // this.startHM = stH;
    this.totalDate = new Date(0,0,0,0,0,0);
    if(this.stH != "" && this.comH == ""){
      var HH = +this.stH * 60;
      this.totalDate.setMinutes(HH + +this.stHH + +this.comHH);
    }if(this.comH != "" && this.stH == ""){
      var HH = +this.comH * 60;
      this.totalDate.setMinutes(HH + +this.stHH + +this.comHH);
    }if(this.comH != "" && this.stH != ""){
      var HHcomH = +this.comH * 60;
      var HHstH = +this.stH * 60;
      this.totalDate.setMinutes(HHstH + HHcomH + +this.stHH + +this.comHH);
    }if(this.comH == "" && this.stH == ""){
      this.totalDate.setMinutes(+this.stHH + +this.comHH);
    }
   
    
    console.log("Date HH:MM : "+this.totalDate);
    this.totalMM = +this.totalstH - +this.totalcomH + "";
    
  }// End OnTime
  onAttachfile1( event){
   
    if(this.checkboxAttachfile1 ){
      this.checkboxAttachfile2 = false;
      this.checkboxAttachfile1  = false;
      this.attachfilevalue = "";
    }else{
      this.attachfilevalue = event.target.value;
      this.checkboxAttachfile2 = false;
      this.checkboxAttachfile1 = true;
    }
    console.log("Check Option : "+this.attachfilevalue);
    // this.checkboxAttachfile1 
    // if(event.target.checked){
    //   console.log("Check Option : "+event.target.value);
    //   this.checkboxAttachfile1
    // }
  }// End onAttachfile1
  onAttachfile2(event){
    if(this.checkboxAttachfile2){
      this.checkboxAttachfile2 = false;
      this.checkboxAttachfile1 = false;
      this.attachfilevalue = "";
  }
  else{
    this.attachfilevalue = event.target.value;
      this.checkboxAttachfile2 = true;
      this.checkboxAttachfile1 = false;
  }
  } // End onAttachfile2
  onconcernQA1(event){
    if(this.checkboxconcernQA1 ){
      this.checkboxconcernQA2 = false;
      this.checkboxconcernQA1  = false;
      this.concernQAvalue = "";
    }else{
      this.concernQAvalue = event.target.value;
      this.checkboxconcernQA2 = false;
      this.checkboxconcernQA1 = true;
    }
    console.log("Check Option : "+this.concernQAvalue);
  }// End onconcernQA1
  onconcernQA2(event){
    if(this.checkboxconcernQA2){
      this.checkboxconcernQA2 = false;
      this.checkboxconcernQA1  = false;
      this.concernQAvalue = "";
  }
  else{
    this.concernQAvalue = event.target.value;
    this.checkboxconcernQA2 = true;
    this.checkboxconcernQA1 = false;
  }
  }// End onconcernQA2
  onafterDetail(value: string): void {
    this.aftherTextArea = value;
  }// End AftherDetail
  onaftercomment(value: string): void{
    this.aftherCommnet = value;
  }//End AftherComment
  onDeleteAll(): void{
  
    this.startCounter();
    this.idleTimeoutSvc.resetTimer();
    // let arraysectionLocal = JSON.parse(localStorage.getItem('sectionrepairDetail_ID'));
    var arr = [];
    JSON.parse(this.checkedList).forEach(element => {
       console.log("Length2 : "+element.repairDetail_ID);
      //  arraysectionLocal[element.ID] = element.repairDetail_ID;
      arr.push(element.repairDetail_ID);
      
    });
    console.log("arr : "+arr);
    localStorage.setItem('sectionrepairDetail_ID', JSON.stringify(arr));
    var retrievedData = localStorage.getItem("sectionrepairDetail_ID");
     var movies2 = JSON.parse(retrievedData);
     console.log("movies2.length : "+movies2.length + ", "+movies2[0]);
    
    this.dialogService.open(DeleteRepairComponent).onClose.subscribe((res) => {
      if(JSON.parse(localStorage.getItem('sectionstatus')) == "1"){
        this.service.getDatarepairDetail2().then((data) => {
          this.checklistArray = [];
          // this.service.listRepairDetail = this.service.checklistArray;
            for(let indexx = 0; indexx <  this.service.listRepairDetail2.length ;indexx++){
              let repairDetailArray =  new tb_RepairDetail();
              repairDetailArray.id = this.service.listRepairDetail2[indexx].ID;
              repairDetailArray.repairDetail_ID = this.service.listRepairDetail2[indexx].repairDetail_ID;
              repairDetailArray.part_ID = this.service.listRepairDetail2[indexx].part_ID;
              repairDetailArray.part_name = this.service.listRepairDetail2[indexx].part_name;
              repairDetailArray.part_price = this.service.listRepairDetail2[indexx].part_price;
              repairDetailArray.part_qty = this.service.listRepairDetail2[indexx].part_qty;
              repairDetailArray.other_cost = this.service.listRepairDetail2[indexx].other_cost;
              repairDetailArray.total_cost = this.service.listRepairDetail2[indexx].total_cost;
              repairDetailArray.isSelected = false;
              this.checklistArray.push(repairDetailArray);
            }
          console.log("DATA : "+this.checklistArray);
      
         });
      
      }
    });
    
  }// End DeleteAll 
  
  onDelete(item,index): void{
    this.startCounter();
    this.idleTimeoutSvc.resetTimer();
    // console.log("Check ItemPart : "+ item.repairDetail_ID);
    localStorage.setItem('sectionrepairDetail_ID', JSON.stringify(item.repairDetail_ID));
    this.dialogService.open(DeleteRepairComponent).onClose.subscribe((res) => {
      if(JSON.parse(localStorage.getItem('sectionstatus')) == "1"){
        // console.log("LongCheck : "+index);
        this.checklistArray.splice(index,1);
      }
    });
  }// End Delete Repair
  onEditRepair(item): void{
    this.startCounter();
    this.idleTimeoutSvc.resetTimer();
    console.log("Test item : "+item.part_price);
    localStorage.setItem('sectionpart_ID', JSON.stringify(item.part_ID));
    localStorage.setItem('sectionpart_name', JSON.stringify(item.part_name));
    localStorage.setItem('sectionrepairDetail_ID', JSON.stringify(item.repairDetail_ID));
    localStorage.setItem('sectionpart_price', JSON.stringify(parseFloat(item.part_price).toFixed(2)));
    localStorage.setItem('sectionpart_qty', JSON.stringify(parseFloat(item.part_qty).toFixed(2)));
    localStorage.setItem('sectionother_cost', JSON.stringify(parseFloat(item.other_cost).toFixed(2)));
      localStorage.setItem('sectiontotal_cost', JSON.stringify(parseFloat(item.total_cost).toFixed(2)));

    this.dialogService.open(EditRepairComponent).onClose.subscribe((res) => {
      if(JSON.parse(localStorage.getItem('sectionstatus')) == "1"){
        for(let item of this.checklistArray){
          if(item.part_ID == JSON.parse(localStorage.getItem('sectionpart_ID'))){
            item.part_ID = JSON.parse(localStorage.getItem('sectionpart_ID'));
            item.part_name = JSON.parse(localStorage.getItem('sectionpart_name'));
            item.part_qty = JSON.parse(localStorage.getItem('sectionpart_qty'));
            item.other_cost = JSON.parse(localStorage.getItem('sectionother_cost'));
            item.total_cost = JSON.parse(localStorage.getItem('sectiontotal_cost'));
          }
        }
      }
    });
  }// End EditButton
  
  onAddUserlist(): void{
    this.startCounter();
    this.idleTimeoutSvc.resetTimer();
  
    let dialogRef = this.dialogService.open(AddRepairComponent).onClose.subscribe((res) => {
      // location.reload();
      // this.checklistArray = res;
      // console.log("Res : "+res[0]);
        if(JSON.parse(localStorage.getItem('sectionstatus')) == "1"){
         
          this.service.getDatarepairDetail2().then((data) => {
            this.checklistArray = [];
            // this.service.listRepairDetail = this.service.checklistArray;
              for(let indexx = 0; indexx <  this.service.listRepairDetail2.length ;indexx++){
                let repairDetailArray =  new tb_RepairDetail();
                repairDetailArray.id = this.service.listRepairDetail2[indexx].ID;
                repairDetailArray.repairDetail_ID = this.service.listRepairDetail2[indexx].repairDetail_ID;
                repairDetailArray.part_ID = this.service.listRepairDetail2[indexx].part_ID;
                repairDetailArray.part_name = this.service.listRepairDetail2[indexx].part_name;
                repairDetailArray.part_price = this.service.listRepairDetail2[indexx].part_price;
                repairDetailArray.part_qty = this.service.listRepairDetail2[indexx].part_qty;
                repairDetailArray.other_cost = this.service.listRepairDetail2[indexx].other_cost;
                repairDetailArray.total_cost = this.service.listRepairDetail2[indexx].total_cost;
                repairDetailArray.isSelected = false;
                this.checklistArray.push(repairDetailArray);
              }
            console.log("DATA : "+this.checklistArray);
        
           });
          var arr = [];
          JSON.parse(this.checkedList).forEach(element => {
            console.log("Length777 : "+element.repairDetail_ID);
            //  arraysectionLocal[element.ID] = element.repairDetail_ID;
            arr.push(element.repairDetail_ID);
            
          });
          console.log("arr : "+arr);
          localStorage.setItem('sectionrepairDetail_ID', JSON.stringify(arr));
        }
    });
     
  
  }
  // End AddButton
 checkUncheckAll() {
    for (var i = 0; i < this.checklistArray.length; i++) {
      this.checklistArray[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    
    
    // console.log("this.itemIndex : "+this.itemIndex);
    this.masterSelected = this.checklistArray.every(function(item:any) {
      // item.isSelected = true;
     
        return item.isSelected == true;
      })
    this.getCheckedItemList();
  }
  getCheckedItemList(){
    this.checkedList = [];
    this.itemIndex = [];
    for (var i = 0; i < this.checklistArray.length; i++) {
      console.log("FFFF "+i+", "+this.checklistArray[i].isSelected);
      if(this.checklistArray[i].isSelected){
        this.itemIndex.push(i);
      
        this.checkedList.push(this.checklistArray[i]);
      }
      // console.log("this.checklistArray[i] : "+this.checklistArray[i]);
      // this.itemIndex.pop();
     
    }
   
      // this.itemIndex.push(index);
  
    this.checkedList = JSON.stringify(this.checkedList);
    this.itemIndex = JSON.stringify(this.itemIndex);
    console.log("Test Item: "+this.checkedList);
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
  onFileChange2(files: FileList) {
    this.leangthFileForInsert = files.length;
    this.startCounter();
    this.idleTimeoutSvc.resetTimer();
    this.empList2 = [];
    this.empList2.length = 0;
    this.filename = "";
    this.imagePath = files;
    this.urls2 = [];
    this._album2 = [];

    for(var  i = 0 ; i < files.length; i++){
      
      let tablefilename = new tableFilename();
      tablefilename.name = files.item(i).name;
      if(!this.validateFile(tablefilename.name)){
        return;
      }else{
        this.empList2.push(tablefilename);
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
      const caption2 = '';
      const thumb2 = this.imgURL;
      const album2 = {
         src: src,
         caption: caption2,
         thumb: thumb2
      };
        this._album2.push(album2);
        this.urls2.push(this.imgURL);
        console.log(this.urls2);
      }
            reader.readAsDataURL(file);

    }
    
    for (let index = 0; index < this.empList2.length; index++) {
      if(index == this.empList2.length-1){
        this.filename = this.filename+this.empList2[index].name;
      }else{
        this.filename = this.empList2[index].name + "," + this.filename;    
      }
    }
    console.log("Name : "+this.filename )
 
  }// onFileChang 2
  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._album, index);
  }
  open2(index: number): void {
    // open lightbox
    this._lightbox.open(this._album2, index);
  }// End open2
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

 removeLanguague2(empLists, index){
  this.urls2.splice(index,1);
  this._album2.splice(index,1);
  console.log("IndexImage = "+index);
  this.startCounter();
  this.idleTimeoutSvc.resetTimer();
  this.filename = "";
  this.empList2.splice(index, 1);
  console.log("Index : "+index);
  // console.log(this.empList.length);
  for (let index = 0; index < this.empList2.length; index++) {
    if(index == this.empList2.length-1){
      this.filename = this.filename+this.empList2[index].name;
    }else{
      this.filename = this.empList2[index].name + "," + this.filename;    
    }
  }
  console.log("Name : "+this.filename )

}// End Remonve 2
createRequest(requestTypess,locationList,beforeDetail){
  
  if(beforeDetail == ""){
    this.showToast(this.status, this.title, this.content);
    return;
  }
  //Uploade File
  let formData = new FormData();
  for(var i = 0; i < this.imagePath.length; i++) {
      
    formData.append("uploads[]", this.imagePath[i], this.imagePath[i].name);
  }
  console.log(formData);
    
  //////////////
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
      console.log("CheckFilename: "+this.filename)
      let splitFilename = this.filename.split(",");
      if(splitFilename.length >0){
        console.log("ImageLangth : "+this.imagePath.length);
        // for(let index = 1;index<=splitFilename.length;index++){
         
          this.http.post('/api/upload', formData)
            .subscribe((response)=>{
              // console.log("PathID : "+response['message1']);
            for(let index = 0 ;index<response['message1'].uploads.length;index++){
              var beforPicture = "Before"+this.requestno+"_"+index;
                // console.log('response receved is ', response['message1'].uploads[index].path);
                this.service.postDataRequestPicture(beforPicture,this.requestno,splitFilename[index],1,1
                  ,response['message1'].uploads[index].path)
            }
            
              // console.log('response receved is ', response['message1'].uploads.length);
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
                ""
                ,"");
            
            })
           
        // }
      }else{
        // for(let index = 0;index<this.imagePath.length;index++){
          console.log("Checkk: "+this.filename);
          this.http.post('/api/upload', formData)
          .subscribe((response)=>{
            var beforPicture = "Before"+this.requestno+"_1";
            this.service.postDataRequestPicture(beforPicture,this.requestno,this.filename,1,1
              ,response['message1'].uploads[0].path)

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
                ""
                ,""); 
          });
        
        // }
      }
    }
  
  
   
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
      console.log("CheckREqqq : "+this.requestno);
  var user = {
    requestnos: ""+this.requestno,
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
 updateRequest(permissionID: string){
  var statusInsert = 0; 
  if(this.requestCorrentQA == 0){
    statusInsert =  +this.statusKeyShowHTML + 1;
   }else if(this.requestCorrentQA == 1){
    statusInsert =  +this.statusKeyShowHTML + 2;
   }
  
  var checktoolBefor = "";
  var checktoolAfther = "";
  
    for(let i = 0 ; i<this.checkedListChekTool.length;i++){
      checktoolBefor = checktoolBefor + this.checkedListChekTool[i];
      console.log("Check ToolBefor "+checktoolBefor+" [kk] : "+this.checkedListChekTool[i]);
    }
    for(let i = 0 ; i<this.checkedListChekToolAfther.length;i++){
      checktoolAfther = checktoolAfther + this.checkedListChekToolAfther[i];
      console.log("Check ToolAfther "+checktoolAfther+" [kk] : "+this.checkedListChekToolAfther[i]);
    }
  
  
  //Update Status
  if(permissionID == "2"){
    //Uploade File
  let formData = new FormData();
  for(var i = 0; i < this.imagePath.length; i++) {
      
    formData.append("uploads[]", this.imagePath[i], this.imagePath[i].name);
  }
  console.log("FramData Afther : "+formData);
    
  //////////////
  this.disableCreate = true;
  // Set DialogSucces
  this.title = "CreateRequest SUCCESS";
  this.status = NbToastStatus.SUCCESS;
  ///////////////////
 
  this.showRequestPerson = true;
  this.startCounter();
    this.idleTimeoutSvc.resetTimer();
  var sectionEmail = new Array();
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
    
    console.log("Resquest No Insert Afther : "+ this.requestno);
    //Insert RequestPicture
    if(this.leangthFileForInsert>0){ // Check File Leangth
      console.log("CheckFilename: "+this.filename)
      let splitFilename = this.filename.split(",");
      if(splitFilename.length >0){
        console.log("ImageLangth : "+this.imagePath.length);
        // for(let index = 1;index<=splitFilename.length;index++){
         
          this.http.post('/api/upload', formData)
            .subscribe((response)=>{
              console.log("PathID : "+response['message1'].uploads.length);
            for(let index = 0 ;index<response['message1'].uploads.length;index++){
              var beforPicture = "Afther"+this.requestno+"_"+index;
                // console.log('response receved is ', response['message1'].uploads[index].path);
                this.service.postDataRequestPicture(beforPicture,this.requestno,splitFilename[index],1,1
                  ,response['message1'].uploads[index].path)
            }
            
              // console.log('response receved is ', response['message1'].uploads.length);
              console.log("Total Request : "+this.requestno+"  "+this.request_by+"  "+this.service.listmicApplication[0].misc_code);
              // var statusInsert = +this.service.listmicApplication[0].misc_code + 1;
              this.service.putDataRequestHeader(permissionID,this.requestNoShowHTML,statusInsert,this.request_by,
                checktoolBefor,this.aftherTextArea,this.attachfilevalue,this.totalstH,this.totalcomH
                ,this.maintannaAddRepair,checktoolAfther,this.aftherCommnet,this.concernQAvalue,this.mainJuddgement);
              });
           
        // }
      }else{
        // for(let index = 0;index<this.imagePath.length;index++){
          console.log("Checkk: "+this.filename);
          this.http.post('/api/upload', formData)
          .subscribe((response)=>{
            var beforPicture = "Afther"+this.requestno+"_1";
            this.service.postDataRequestPicture(beforPicture,this.requestno,this.filename,1,1
              ,response['message1'].uploads[0].path)

              console.log(this.requestno+"  "+this.request_by+"  "+this.service.listmicApplication[0].misc_code);
              // var statusInsert = +this.service.listmicApplication[0].misc_code + 1;
              this.service.putDataRequestHeader(permissionID,this.requestNoShowHTML,statusInsert,this.request_by,
                checktoolBefor,this.aftherTextArea,this.attachfilevalue,this.totalstH,this.totalcomH
                ,this.maintannaAddRepair,checktoolAfther,this.aftherCommnet,this.concernQAvalue,this.mainJuddgement);
      });
    }
  
  }
      });
      
    }else if(permissionID == "5" && statusInsert == 4){
         //Uploade File
  let formData = new FormData();
  for(var i = 0; i < this.imagePath.length; i++) {
      
    formData.append("uploads[]", this.imagePath[i], this.imagePath[i].name);
  }
  console.log("FramData Afther : "+formData);
    
  //////////////
  this.disableCreate = true;
  // Set DialogSucces
  this.title = "CreateRequest SUCCESS";
  this.status = NbToastStatus.SUCCESS;
  ///////////////////
 
  this.showRequestPerson = true;
  this.startCounter();
    this.idleTimeoutSvc.resetTimer();
  var sectionEmail = new Array();
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
    
    console.log("Resquest No Insert Afther : "+ this.requestno);
    //Insert RequestPicture
    if(this.leangthFileForInsert>0){ // Check File Leangth
      console.log("CheckFilename: "+this.filename)
      let splitFilename = this.filename.split(",");
      if(splitFilename.length >0){
        console.log("ImageLangth : "+this.imagePath.length);
        // for(let index = 1;index<=splitFilename.length;index++){
         
          this.http.post('/api/upload', formData)
            .subscribe((response)=>{
              console.log("PathID : "+response['message1'].uploads.length);
            for(let index = 0 ;index<response['message1'].uploads.length;index++){
              var beforPicture = "Afther"+this.requestno+"_"+index;
                // console.log('response receved is ', response['message1'].uploads[index].path);
                this.service.postDataRequestPicture(beforPicture,this.requestno,splitFilename[index],1,1
                  ,response['message1'].uploads[index].path)
            }
            
              // console.log('response receved is ', response['message1'].uploads.length);
              console.log("Total Request : "+this.requestno+"  "+this.request_by+"  "+this.service.listmicApplication[0].misc_code);
              // var statusInsert = +this.service.listmicApplication[0].misc_code + 1;
              this.service.putDataRequestHeader(permissionID,this.requestNoShowHTML,statusInsert,this.request_by,
                checktoolBefor,this.aftherTextArea,this.attachfilevalue,this.totalstH,this.totalcomH
                ,this.maintannaAddRepair,checktoolAfther,this.aftherCommnet,this.concernQAvalue,this.mainJuddgement);
              });
           
        // }
      }else{
        // for(let index = 0;index<this.imagePath.length;index++){
          console.log("Checkk: "+this.filename);
          this.http.post('/api/upload', formData)
          .subscribe((response)=>{
            var beforPicture = "Afther"+this.requestno+"_1";
            this.service.postDataRequestPicture(beforPicture,this.requestno,this.filename,1,1
              ,response['message1'].uploads[0].path)

              console.log(this.requestno+"  "+this.request_by+"  "+this.service.listmicApplication[0].misc_code);
              // var statusInsert = +this.service.listmicApplication[0].misc_code + 1;
              this.service.putDataRequestHeader(permissionID,this.requestNoShowHTML,statusInsert,this.request_by,
                checktoolBefor,this.aftherTextArea,this.attachfilevalue,this.totalstH,this.totalcomH
                ,this.maintannaAddRepair,checktoolAfther,this.aftherCommnet,this.concernQAvalue,this.mainJuddgement);
      });
    }
  
  }
      });
  }else{
    // this.service.putDataRequestHeader(permissionID,this.requestNoShowHTML,statusInsert,this.request_by);
   
  }
  var splitUserTypeDatabase;
  var sectionEmail = new Array();
    // Set DialogSucces
  this.title = "Approve SUCCESS";
  this.status = NbToastStatus.SUCCESS;
  ///////////////////
  this.service.getRequestHeaderwhereDepartment(JSON.parse(localStorage.getItem('sectionID'))).subscribe((Response) => {
    this.tbUser = Response;
    if(permissionID == "5" && statusInsert != 4){
      for(let i=0;i<this.tbUser.length;i++){
        splitUserTypeDatabase = this.tbUser[i].userType_ID.split("UT");
        console.log(" splitUserTypeDatabase : "+splitUserTypeDatabase[1]);
        if(1 == +splitUserTypeDatabase[1]){
          sectionEmail.push(this.tbUser[i].email);
          console.log("user.email : "+this.tbUser[i].email);
       }
       console.log("user.userType_ID : "+this.tbUser[i].userType_ID);
      }
      console.log("sectionEmail : "+sectionEmail);
    }else if(permissionID == "5" && statusInsert == 4 && this.requestCorrentQA == 1){
      for(let i=0;i<this.tbUser.length;i++){
        splitUserTypeDatabase = this.tbUser[i].userType_ID.split("UT");
        console.log(" splitUserTypeDatabase : "+splitUserTypeDatabase[1]);
        if(3 == +splitUserTypeDatabase[1]){
          sectionEmail.push(this.tbUser[i].email);
          console.log("user.email : "+this.tbUser[i].email);
       }
       console.log("user.userType_ID : "+this.tbUser[i].userType_ID);
      }
      console.log("sectionEmail : "+sectionEmail);
    }else if(permissionID == "5" && statusInsert == 4 && this.requestCorrentQA == 0){
      for(let i=0;i<this.tbUser.length;i++){
        splitUserTypeDatabase = this.tbUser[i].userType_ID.split("UT");
        console.log(" splitUserTypeDatabase : "+splitUserTypeDatabase[1]);
        if(6 == +splitUserTypeDatabase[1]){
          sectionEmail.push(this.tbUser[i].email);
          console.log("user.email : "+this.tbUser[i].email);
       }
       console.log("user.userType_ID : "+this.tbUser[i].userType_ID);
      }
      console.log("sectionEmail : "+sectionEmail);
    }
    else if(permissionID == "1"){
      for(let i=0;i<this.tbUser.length;i++){
        splitUserTypeDatabase = this.tbUser[i].userType_ID.split("UT");
        console.log(" splitUserTypeDatabase : "+splitUserTypeDatabase[1]);
        if(2 == +splitUserTypeDatabase[1]){
          sectionEmail.push(this.tbUser[i].email);
          console.log("user.email : "+this.tbUser[i].email);
       }
       console.log("user.userType_ID : "+this.tbUser[i].userType_ID);
      }
      console.log("sectionEmail : "+sectionEmail);
    }else if(permissionID == "2"){
      for(let i=0;i<this.tbUser.length;i++){
        splitUserTypeDatabase = this.tbUser[i].userType_ID.split("UT");
        console.log(" splitUserTypeDatabase : "+splitUserTypeDatabase[1]);
        if(5 == +splitUserTypeDatabase[1]){
          sectionEmail.push(this.tbUser[i].email);
          console.log("user.email : "+this.tbUser[i].email);
       }
       console.log("user.userType_ID : "+this.tbUser[i].userType_ID);
      }
      console.log("sectionEmail : "+sectionEmail);
    }
  var user = {
    requestnos: ""+this.requestNoShowHTML,
    formEmail : JSON.parse(localStorage.getItem('UseremailUT4')),
    userPassword: JSON.parse(localStorage.getItem('passwordUserUT4')),
    lengthEmail: sectionEmail.length,
    sendToemail: sectionEmail,
    approveOrCancel: "Approve",
    requestyp: this.requestTypeShowHTMLValue,
    link: "http://localhost:4200/#/pages/forme/repair/"+this.requestNoShowHTML
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
  
 }// End updateRequest
 cancelRequest(permissionID){
  var statusInsert = 99;
  //Update Status
  this.service.putDataRequestHeader(permissionID,this.requestNoShowHTML,statusInsert,this.request_by,
  "","","","","","","","","","");
  var splitUserTypeDatabase;
  var sectionEmail = new Array();
    // Set DialogSucces
  this.title = "Cancel SUCCESS";
  this.status = NbToastStatus.DANGER;
  ///////////////////
  this.service.getRequestHeaderwhereDepartment(JSON.parse(localStorage.getItem('sectionID'))).subscribe((Response) => {
    this.tbUser = Response;
          sectionEmail.push(JSON.parse(localStorage.getItem('UseremailUT4')));
  var user = {
    requestnos: ""+this.requestNoShowHTML,
    formEmail : JSON.parse(localStorage.getItem('UseremailUT4')),
    userPassword: JSON.parse(localStorage.getItem('passwordUserUT4')),
    lengthEmail: sectionEmail.length,
    sendToemail: sectionEmail,
    approveOrCancel: "Cancel",
    requestyp: this.requestTypeShowHTMLValue,
    link: "http://localhost:4200/#/pages/forme/repair/"+this.requestNoShowHTML
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
 }// End Cancel
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