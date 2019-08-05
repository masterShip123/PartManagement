import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogRef, NbToastrService, NbGlobalPosition, NbGlobalPhysicalPosition } from '@nebular/theme';
import { IdleTimeoutServiceService } from '../../../shared/idle-timeout-service.service';
import { Observable, Subscription, timer } from 'rxjs';
import { ToasterConfig } from 'angular2-toaster';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { tb_RepairDetail } from '../../../shared/index.model';

@Component({
  selector: 'ngx-edit-repair',
  templateUrl: './edit-repair.component.html',
  styleUrls: ['./edit-repair.component.scss']
})
export class EditRepairComponent implements OnInit {
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
  partnamesection: string = "";
  pricesection: string = "";
  otherSection: string = "0.00";
  Showtotalc: string = "";
  public showID = "";
  public showPublicQty = "";
  partIDsection: string = "";
  qtySection: string = "";
  checklistArray: Array<tb_RepairDetail> = [];
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<EditRepairComponent>,
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
    this.partIDsection = JSON.parse(localStorage.getItem('sectionpart_ID'));
    this.partnamesection = JSON.parse(localStorage.getItem('sectionpart_name'));
    this.qtySection = JSON.parse(localStorage.getItem('sectionpart_qty'));
    this.pricesection = JSON.parse(localStorage.getItem('sectionpart_price'));
    this.otherSection = JSON.parse(localStorage.getItem('sectionother_cost'));
    this.showPublicQty = this.qtySection;
    this.Showtotalc = (+this.showPublicQty * +this.pricesection) + +this.otherSection + "";
       this.startCounter();
      this._idleTimerSubscription = this.idleTimeoutSvc.timeoutExpired.subscribe(res => {
        localStorage.setItem('currentUser', null);
        localStorage.setItem('passwordUser', null);
        localStorage.setItem('sectionID', null);
        //localStorage.removeItem('currentUser');
        this.router.navigate(['./login']);
      })
  }
  // changeInput(value : string){
  //   console.log("Value Set :"+ value);
  //   this.service.getDatarepairDetailwhereID(value).subscribe(
  //     result => {
  //       try {
  //         this.showID = value;
  //         console.log(result[0].part_name);
  //         this.showName = result[0].part_name;
  //         this.showPrice = result[0].price;
          
  //       } catch (error) {
  //         this.showName = "";
  //         this.showPrice = "";
  //       }
  //      });
  // }
  changeQty(qtyval: string){
   
    this.service.getDatarepairDetailwhereID(this.partIDsection).subscribe(
      result => {
        try {
         
          if(+qtyval > result[0].qty || +qtyval == 0){
              this.showValid = true;
          }else{
            this.showPublicQty = qtyval;
            this.showValid = false;
          }
          this.Showtotalc = (+this.showPublicQty * +this.pricesection) + +this.otherSection + "";
        } catch (error) {
        }
       });
  }
  changeOther(priceVal : string){
    if(this.showPublicQty == "" || this.pricesection == ""){
      return;
    }
    this.Showtotalc = (+this.showPublicQty * +this.pricesection) + +priceVal + "";
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
  edit(partIDs,partnamee,qtys,prices,othercosts,totalcosts) {
    
    localStorage.setItem('sectionstatus', JSON.stringify("1"));
    console.log("Check +: "+JSON.parse(localStorage.getItem('requestSectionReID')) );
    if(partIDs == "" || partnamee == "" || qtys == ""
        || prices == "" || othercosts == "" ||totalcosts == ""){
          return;
        }
    console.log("Check Paraam : "+JSON.parse(localStorage.getItem('sectionrepairDetail_ID')))  
    this.startCounter();
    this.idleTimeoutSvc.resetTimer();
    this.service.puttb_RepairDetail(JSON.parse(localStorage.getItem('requestSectionReID')),JSON.parse(localStorage.getItem('sectionrepairDetail_ID')),partIDs,qtys,othercosts,totalcosts,JSON.parse(localStorage.getItem('Username')))
    localStorage.setItem('sectionpart_ID', JSON.stringify(partIDs));
    localStorage.setItem('sectionpart_name', JSON.stringify(partnamee));
    localStorage.setItem('sectionpart_qty', JSON.stringify(parseFloat(qtys).toFixed(2)));
    localStorage.setItem('sectionother_cost', JSON.stringify(parseFloat(othercosts).toFixed(2)));
      localStorage.setItem('sectiontotal_cost', JSON.stringify(parseFloat(totalcosts).toFixed(2)));
    this.ref.close();
   
  }

}
