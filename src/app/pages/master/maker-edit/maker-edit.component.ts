import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { IndexService } from '../../../shared/index.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
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
  selector: 'ngx-maker-edit',
  templateUrl: './maker-edit.component.html',
  styleUrls: ['./maker-edit.component.scss']
})
export class MakerEditComponent implements OnInit {
  public _counter: number = 0;
  public _status: string = "Initialized.";
  private _timer: Observable<number>;
  private _timerSubscription: Subscription;
  private _idleTimerSubscription: Subscription;
  maker_ID : string = "";
  maker_name : string = "";
  maker_contactName : string = "";
  value1 : string = "";
  activeFlag : string = "";
  maker_province : string = "";
  maker_contactLastName : string = "";
  maker_tel : string = "";
  maker_email : string = "";
  maker_address1 : string = "";
  province_name_tha: string = "";
  source: LocalDataSource = new LocalDataSource();
  validEmail:boolean = false;
  registerForm: FormGroup;
  private data: string[];
  constructor(private router: Router,public service: IndexService,private fb: FormBuilder,protected ref: NbDialogRef<MakerEditComponent>,
    private toastrService: NbToastrService,private formBuilder: FormBuilder,private changeRef: ChangeDetectorRef,
    private idleTimeoutSvc: IdleTimeoutServiceService) { 
    
  }

  ngOnInit() {
    this.service.getDataSection();
    this.service.getDataMic();
    this.service.getDataUserType();
    this.service.getDataDepartment();
    this.service.getDataFactoryLine();
    this.service.getProvince();
    this.maker_ID = JSON.parse(localStorage.getItem('maker_ID'));
    this.maker_name = JSON.parse(localStorage.getItem('maker_name'));
    this.maker_contactName = JSON.parse(localStorage.getItem('maker_contactName'));
    this.value1 = JSON.parse(localStorage.getItem('value1'));
    this.activeFlag = JSON.parse(localStorage.getItem('activeFlag'));
    this.maker_province = JSON.parse(localStorage.getItem('maker_province'));
    this.maker_contactLastName = JSON.parse(localStorage.getItem('maker_contactLastName'));
    this.maker_tel = JSON.parse(localStorage.getItem('maker_tel'));
    this.maker_email = JSON.parse(localStorage.getItem('maker_email'));
    this.maker_address1 = JSON.parse(localStorage.getItem('maker_address1'));
    this.province_name_tha = JSON.parse(localStorage.getItem('province_name_tha'));
    this.service.getLogin().subscribe((Response) =>{
      this.data = Response;
  });
  this.service.getMakerLineList().then((dataa) => {
    this.source.load(dataa);
    console.log(this.source.load(dataa));
  });
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
  get f() { return this.registerForm.controls; }
  save(makername, contactName , lastName, tel
    , email, address, province, StatusValue){
      this.startCounter();
      this.idleTimeoutSvc.resetTimer();
      this.service.putMakerList(this.maker_ID,makername,contactName,lastName,tel,email,address,province,StatusValue);
      // this.ref.close();
      this.service.getMakerLineList().then((data) => {
        // this.source.update(data.section_name,sectionname);
        // this.source.update(data.section_ID,sectionid);
          // window.location.reload();
          this.ref.close(this.source.load(data));
       });
    
    
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  

}
