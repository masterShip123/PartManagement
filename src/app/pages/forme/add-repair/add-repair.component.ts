import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogRef, NbToastrService, NbGlobalPosition, NbGlobalPhysicalPosition } from '@nebular/theme';
import { IdleTimeoutServiceService } from '../../../shared/idle-timeout-service.service';
import { timer, Observable, Subscription } from 'rxjs';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ToasterConfig } from 'angular2-toaster';
import { tb_RepairDetail } from '../../../shared/index.model';

@Component({
  selector: 'ngx-add-repair',
  templateUrl: './add-repair.component.html',
  styleUrls: ['./add-repair.component.scss']
})
export class AddRepairComponent implements OnInit {
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
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<AddRepairComponent>,
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
  changeInput(value : string){
    console.log("Value Set :"+ value);
    this.service.getDatarepairDetailwhereID(value).subscribe(
      result => {
        try {
          this.showID = value;
          console.log(result[0].part_name);
          this.showName = result[0].part_name;
          this.showPrice = result[0].price;
          
        } catch (error) {
          this.showName = "";
          this.showPrice = "";
        }
       });
  }
  changeQty(qtyval: string){
   
    this.service.getDatarepairDetailwhereID(this.showID).subscribe(
      result => {
        try {
          if(+qtyval > result[0].qty || +qtyval == 0){
              this.showValid = true;
          }else{
            this.showPublicQty = qtyval;
            this.showValid = false;
          }
        } catch (error) {
        }
       });
  }
  changeOther(priceVal : string){
    if(this.showPublicQty == "" || this.showPrice == ""){
      return;
    }
    this.Showtotalc = (+this.showPublicQty * +this.showPrice) + +priceVal + "";
    console.log("TestPriceVal : "+priceVal);
  }
  cancel() {
    this.startCounter();
    this.idleTimeoutSvc.resetTimer();
    localStorage.setItem('sectionstatus', JSON.stringify("0"));
    this.ref.close();
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  submit(partIDs,partnamee,qtys,prices,othercosts,totalcosts) {
    localStorage.setItem('sectionstatus', JSON.stringify("1"));
    console.log("Check +: "+JSON.parse(localStorage.getItem('requestSectionReID')) );
    if(partIDs == "" || partnamee == "" || qtys == ""
        || prices == "" || othercosts == "" ||totalcosts == ""){
          return;
    }
    this.startCounter();
    this.idleTimeoutSvc.resetTimer();
    this.service.posttb_RepairDetail(JSON.parse(localStorage.getItem('requestSectionReID')),partIDs,qtys,prices,othercosts,totalcosts,JSON.parse(localStorage.getItem('Username')))
    .then(function(resolveOutput) {
      console.log("Resolve : "+resolveOutput);
      localStorage.setItem('sectionpart_ID', JSON.stringify(partIDs));
    localStorage.setItem('sectionpart_name', JSON.stringify(partnamee));
    localStorage.setItem('sectionpart_price', JSON.stringify(parseFloat(prices).toFixed(2)));
    localStorage.setItem('sectionpart_qty', JSON.stringify(parseFloat(qtys).toFixed(2)));
    localStorage.setItem('sectionother_cost', JSON.stringify(parseFloat(othercosts).toFixed(2)));
      localStorage.setItem('sectiontotal_cost', JSON.stringify(parseFloat(totalcosts).toFixed(2)));
    });
    

    this.ref.close();
     
   
  }
  // refectdata(){
  //   this.checklistArray = [];
  //   for(let indexx = 0; indexx <  this.service.listRepairDetail.length ;indexx++){
      
  //     let repairDetailArray =  new tb_RepairDetail();
  //     console.log("Add Check3 : "+this.service.listRepairDetail[indexx].repairDetail_ID);
  //     repairDetailArray.id = 1;
  //     repairDetailArray.repairDetail_ID = this.service.listRepairDetail[indexx].repairDetail_ID;
  //     repairDetailArray.part_ID = this.service.listRepairDetail[indexx].part_ID;
  //     repairDetailArray.part_name = this.service.listRepairDetail[indexx].part_name;
  //     repairDetailArray.part_price = this.service.listRepairDetail[indexx].part_price;
  //     repairDetailArray.part_qty = this.service.listRepairDetail[indexx].part_qty;
  //     repairDetailArray.other_cost = this.service.listRepairDetail[indexx].other_cost;
  //     repairDetailArray.total_cost = this.service.listRepairDetail[indexx].total_cost;
  //     repairDetailArray.isSelected = false;
  //     this.checklistArray.push(repairDetailArray);

  //   }
  // }
}
